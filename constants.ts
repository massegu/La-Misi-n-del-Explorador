
import type { Stage } from './types';
import { ExecutiveFunction } from './types';
import { BackpackIcon, CrossroadsIcon, MapIcon, ForbiddenFruitIcon, StarIcon } from './components/Icons';

export const ADVENTURE_STAGES: Stage[] = [
    {
        id: 1,
        title: "Preparación para la Aventura",
        executiveFunction: ExecutiveFunction.PLANNING,
        question: "¡Hola, valiente explorador/a! Vamos a una isla mágica. En tu mochila solo caben 3 cosas. ¿Qué 3 objetos esenciales te llevarías y por qué?",
        image: "https://picsum.photos/seed/island1/800/600",
        icon: BackpackIcon,
    },
    {
        id: 2,
        title: "El Cruce de Caminos",
        executiveFunction: ExecutiveFunction.DECISION_MAKING,
        question: "Hemos llegado a un cruce. Un camino es largo y parece muy seguro, bordeando la playa. El otro es un atajo corto a través de una cueva misteriosa y oscura. ¿Cuál eliges y por qué?",
        image: "https://picsum.photos/seed/island2/800/600",
        icon: CrossroadsIcon,
    },
    {
        id: 3,
        title: "La Lluvia Sorpresa",
        executiveFunction: ExecutiveFunction.COGNITIVE_FLEXIBILITY,
        question: "De repente, ¡empieza a llover a cántaros! El mapa que dibujaste se ha mojado y la tinta se ha corrido. Ya no se entiende nada. ¿Qué haces ahora?",
        image: "https://picsum.photos/seed/island3/800/600",
        icon: MapIcon,
    },
    {
        id: 4,
        title: "Las Frutas Brillantes",
        executiveFunction: ExecutiveFunction.INHIBITION,
        question: "¡Mira eso! Un árbol con unas frutas que brillan con luz propia y huelen delicioso. Nunca las habías visto. Parecen muy tentadoras. ¿Las pruebas o las ignoras? ¿Por qué?",
        image: "https://picsum.photos/seed/island4/800/600",
        icon: ForbiddenFruitIcon,
    },
    {
        id: 5,
        title: "El Tesoro del Saber",
        executiveFunction: ExecutiveFunction.REFLECTION,
        question: "¡Lo logramos, llegamos al corazón de la isla! ¿Qué fue lo más importante que aprendiste en esta aventura? ¿Hay algo que harías diferente la próxima vez?",
        image: "https://picsum.photos/seed/island5/800/600",
        icon: StarIcon,
    }
];
