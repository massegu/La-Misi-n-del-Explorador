import React, { useState, useCallback, useEffect } from 'react';
import { ADVENTURE_STAGES } from './constants';
import type { Stage } from './types';
import { getFeedback } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
    <div className="text-center p-8 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-teal-800 mb-4">¡Bienvenido/a a la Isla Mágica!</h1>
        <img src="https://picsum.photos/seed/welcome/800/400" alt="Isla Mágica" className="rounded-2xl shadow-lg my-6 w-full object-cover h-64" />
        <p className="text-lg text-gray-700 mb-8">Soy Kai, tu guía en esta increíble aventura. Juntos exploraremos selvas misteriosas, playas de arena dorada y cuevas secretas. En nuestro camino, nos encontraremos con desafíos que pondrán a prueba tu ingenio de explorador/a. ¿Estás listo/a para comenzar la expedición?</p>
        <button
            onClick={onStart}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
            ¡Empezar Aventura!
        </button>
    </div>
);

const StageComponent = ({
    stage,
    onNextStage,
}: {
    stage: Stage;
    onNextStage: () => void;
}) => {
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const Icon = stage.icon;

    // Fix: Add useEffect to reset state when the stage changes. This replaces the functionality of the 'key' prop to fix a TypeScript error.
    useEffect(() => {
        setAnswer('');
        setFeedback('');
        setIsLoading(false);
        setIsSubmitted(false);
    }, [stage.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!answer.trim()) return;
        setIsLoading(true);
        setIsSubmitted(true);
        const generatedFeedback = await getFeedback(stage, answer);
        setFeedback(generatedFeedback);
        setIsLoading(false);
    };

    return (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 transition-all duration-500 transform animate-fade-in">
            <div className="flex items-center mb-4">
                <div className="bg-teal-100 text-teal-700 p-3 rounded-full mr-4">
                    <Icon className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-teal-800">{stage.title}</h2>
                    <p className="font-semibold text-teal-600">{stage.executiveFunction}</p>
                </div>
            </div>
            <img src={stage.image} alt={stage.title} className="w-full h-64 object-cover rounded-xl mb-6 shadow-md" />
            
            <p className="text-gray-700 text-lg mb-6">{stage.question}</p>

            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-300"
                        rows={4}
                        placeholder="Escribe aquí tu plan..."
                    />
                    <button
                        type="submit"
                        disabled={!answer.trim()}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                    >
                        ¡Esta es mi respuesta!
                    </button>
                </form>
            ) : (
                <div className="space-y-4">
                    <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                        <p className="font-bold text-amber-800">Tu respuesta:</p>
                        <p className="text-amber-700 italic">"{answer}"</p>
                    </div>

                    <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-400 min-h-[100px] flex items-center justify-center">
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <div>
                                <p className="font-bold text-emerald-800">Kai el guía dice:</p>
                                <p className="text-emerald-700">{feedback}</p>
                            </div>
                        )}
                    </div>
                    {!isLoading && (
                        <button
                            onClick={onNextStage}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-all duration-300 transform hover:scale-105 animate-fade-in"
                        >
                            Siguiente Desafío &rarr;
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

const ConclusionScreen = ({ onRestart }: { onRestart: () => void }) => (
    <div className="text-center p-8 max-w-2xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-black text-teal-800 mb-4">¡Aventura Completada!</h1>
        <img src="https://picsum.photos/seed/complete/800/400" alt="Tesoro" className="rounded-2xl shadow-lg my-6 w-full object-cover h-64" />
        <p className="text-lg text-gray-700 mb-8">¡Felicidades, increíble explorador/a! Has demostrado una gran valentía, creatividad y sabiduría. Cada decisión que tomaste te hizo más fuerte. La isla mágica te agradece tu visita y siempre recordará tus hazañas. ¡El mayor tesoro es todo lo que aprendiste!</p>
        <button
            onClick={onRestart}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
            Jugar de Nuevo
        </button>
    </div>
);


const App = () => {
    const [currentStageIndex, setCurrentStageIndex] = useState(-1); // -1 for welcome screen

    const handleStart = () => {
        setCurrentStageIndex(0);
    };

    const handleNextStage = useCallback(() => {
        setCurrentStageIndex(prev => prev + 1);
    }, []);
    
    const handleRestart = () => {
        setCurrentStageIndex(-1);
    };

    const renderContent = () => {
        if (currentStageIndex === -1) {
            return <WelcomeScreen onStart={handleStart} />;
        }
        if (currentStageIndex >= ADVENTURE_STAGES.length) {
            return <ConclusionScreen onRestart={handleRestart} />;
        }
        const currentStage = ADVENTURE_STAGES[currentStageIndex];
        // Fix: Removed the 'key' prop to resolve a TypeScript error. State reset logic has been moved to a useEffect hook within StageComponent.
        return <StageComponent stage={currentStage} onNextStage={handleNextStage} />;
    };

    return (
        <div className="min-h-screen bg-teal-50 flex flex-col items-center justify-center p-4 bg-cover bg-center" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}>
            <main className="w-full">
                {renderContent()}
            </main>
             <footer className="text-center text-gray-500 text-sm mt-8">
                <p>&copy; 2024 Expedición a la Isla Mágica. Creado con imaginación.</p>
            </footer>
        </div>
    );
};

export default App;