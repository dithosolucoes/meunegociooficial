import React from 'react';

export const MindMapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.5 12.5L15 15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 12.5L4 15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.5V15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V4m0 11v5" />
    </svg>
);