import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type WindowProps = {
    windowUrl: string;
    top?: string;
    left?: string;
    width: string;
    height: string;
    zIndex: string;
    startX: string;
    startY: string;
};

export default function WindowWraper({ windowUrl, top, left, zIndex, width, height, startX, startY }: WindowProps) {
    const windowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(
            windowRef.current!,
            {
                x: startX,
                y: startY
            },
            { y: ' 0', x: '0' }
        );
    }, [startX, startY]);

    return (
        <div
            style={{
                position: 'absolute',
                margin: '0',
                zIndex,
                top,
                left,
                width,
                height
            }}
            ref={windowRef}
        >
            <img src={windowUrl} alt="" style={{ width: '100%' }} />
        </div>
    );
}
