// Fix: Import ComponentType from 'react' to resolve namespace error.
import type { ComponentType } from 'react';

export enum ExecutiveFunction {
    PLANNING = "Planificación",
    DECISION_MAKING = "Toma de Decisiones",
    COGNITIVE_FLEXIBILITY = "Flexibilidad Cognitiva",
    INHIBITION = "Inhibición",
    REFLECTION = "Reflexión y Metacognición"
}

export interface Stage {
    id: number;
    title: string;
    executiveFunction: ExecutiveFunction;
    question: string;
    image: string;
    icon: ComponentType<{ className?: string }>;
}