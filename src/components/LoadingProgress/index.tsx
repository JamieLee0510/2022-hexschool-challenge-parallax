import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './loadingProgress.scss';

type LoadingProgerssProps = {
    scrolledInt: number;
};

export default function LoadingProgress({ scrolledInt }: LoadingProgerssProps) {
    const loadingBox = useRef<HTMLDivElement>(null);

    const test = () => {
        gsap.to(loadingBox.current!.childNodes[0], { opacity: 0 });
    };
    useEffect(() => {
        for (let i = 0; i < loadingBox.current!.childNodes.length; i++) {
            if (i <= scrolledInt) {
                gsap.to(loadingBox.current!.childNodes[i], {
                    opacity: 1
                });
            } else {
                gsap.to(loadingBox.current!.childNodes[i], {
                    opacity: 0
                });
            }
        }
    }, [scrolledInt]);

    return (
        <>
            <div className="loading-box" ref={loadingBox}>
                <div className="loading-data"></div>
                <div className="loading-data"></div>
                <div className="loading-data"></div>
                <div className="loading-data"></div>
                <div className="loading-data"></div>
                <div className="loading-data"></div>
                <div className="loading-data"></div>
                <div className="loading-data"></div>
                <div className="loading-data"></div>
                <div className="loading-data"></div>
                <div className="loading-data"></div>
            </div>
        </>
    );
}
