import React from 'react';

export const BrainCircuitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.25v-1.5h-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15.75v1.5h1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75h1.5v-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 8.25h-1.5v1.5" />
    </svg>
);
