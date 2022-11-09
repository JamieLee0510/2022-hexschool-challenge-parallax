import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type TitleProps = {
    titleUrl: string;
    top?: string;
    left?: string;
    width: string;
    height: string;
    // direction: 'up' | 'down';
    startPoint: string;
};

export default function TitleWraper({ titleUrl, top, left, width, height, startPoint }: TitleProps) {
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(
            titleRef.current!,
            {
                y: startPoint
            },
            { y: ' 0' }
        );
    }, [startPoint]);

    return (
        <div
            style={{
                position: 'relative',
                margin: '0',
                zIndex: '10',
                top,
                left,
                width,
                height
            }}
            ref={titleRef}
        >
            <img src={titleUrl} alt="" style={{ width: '100%' }} />
        </div>
    );
}
