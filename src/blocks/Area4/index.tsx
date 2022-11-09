import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './area4.scss';

/**
 * week1/2/3
 * icon and text section be spin and cover another
 */

export default function Area4() {
    const container = useRef<HTMLDivElement>(null);

    const section1 = useRef<HTMLDivElement>(null);
    const section2 = useRef<HTMLDivElement>(null);
    const section3 = useRef<HTMLDivElement>(null);

    function pinChecker(index: number) {}

    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger);
    //     const panels = gsap.utils.toArray('.container4');
    //     // const panels = [section1.current!, section2.current!, section3.current!];

    //     panels.forEach((panel, i) => {
    //         ScrollTrigger.create({
    //             trigger: panel as HTMLDivElement,
    //             start: 'top top',
    //             pin: i === panels.length - 1 ? false : true,
    //             // end: 'bottom bottom-30px',
    //             pinSpacing: false
    //         });
    //     });

    //     // ScrollTrigger.create({
    //     //     snap: 1 / 4 // snap whole page to the closest section!
    //     // });
    //     return () => {
    //         // ScrollTrigger.killAll();
    //     };
    // }, [section1, section2, section3]);

    return (
        <div className="root4" ref={container}>
            <div className="container4 section1" ref={section1}>
                <h1>week1</h1>
            </div>
            <div className="container4 section2" ref={section2}>
                <h1>week2</h1>
            </div>
            <div className="container4 section3" ref={section3}>
                <h1>week3</h1>
            </div>
        </div>
    );
}
