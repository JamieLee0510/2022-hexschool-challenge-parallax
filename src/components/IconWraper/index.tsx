import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
type IconProps = {
    iconUrl: string;
    direction: 'left' | 'right';
    startPoint: string;
};

const iconSize = '85px';

export default function IconWraper({ iconUrl, direction, startPoint }: IconProps) {
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(
            innerRef.current!,
            {
                x: startPoint
            },
            { x: ' 0' }
        );
    });

    if (direction === 'left') {
        return (
            <div
                ref={innerRef}
                style={{ width: iconSize, height: iconSize, marginTop: '10px', marginRight: 'auto', willChange: 'transform-x' }}
            >
                <img src={iconUrl} alt="" style={{ width: '100%', height: '100%' }} />
            </div>
        );
    }
    return (
        <div
            ref={innerRef}
            style={{ width: iconSize, height: iconSize, marginTop: '10px', marginLeft: 'auto', willChange: 'transform-x' }}
        >
            <img src={iconUrl} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
    );
}
