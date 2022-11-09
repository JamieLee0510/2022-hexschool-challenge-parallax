import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './area2.scss';
import ImageWraper from '../../components/ImageWraper';
import msg01 from '../../assets/section02/icon01.png';
import msg02 from '../../assets/section02/icon02.png';
import msg03 from '../../assets/section02/icon03.png';
import msg04 from '../../assets/section02/icon04.png';
import cooTitle from '../../assets/section01/cn_logo.png';
import cooLeft from '../../assets/section02/cor_left.png';
import cooRight from '../../assets/section02/cor_right.png';

export default function QuesAndCoo() {
    const msgRef = useRef<HTMLDivElement>(null);
    const msgQaRef1 = useRef<HTMLDivElement>(null);
    const msgQaRef2 = useRef<HTMLDivElement>(null);
    const msgQaRef3 = useRef<HTMLDivElement>(null);
    const cooUxFrontendTrigger = useRef<HTMLDivElement>(null);
    const cooUxFrontendTitle = useRef<HTMLDivElement>(null);
    const cooUxFrontendLeft = useRef<HTMLDivElement>(null);
    const cooUxFrontendRight = useRef<HTMLDivElement>(null);

    const msgQaMove = () => {
        const scrollTriggerOption = {
            trigger: msgRef.current!,
            start: 'top center',
            end: 'top top',
            scrub: 1
        };

        gsap.fromTo(
            msgQaRef1.current!,
            { y: '300px', opacity: 0 },
            {
                y: '0',
                opacity: 1,
                scrollTrigger: scrollTriggerOption
            }
        );
        gsap.fromTo(
            msgQaRef2.current!,
            { y: '500px', opacity: 0 },
            {
                y: '0',
                opacity: 1,
                scrollTrigger: scrollTriggerOption
            }
        ).delay(0.5);
        gsap.fromTo(
            msgQaRef3.current!,
            { y: '800px', opacity: 0 },
            {
                y: '0',
                opacity: 1,
                scrollTrigger: scrollTriggerOption
            }
        ).delay(1);
    };

    const uxFrontendMove = () => {
        const scrollTriggerOption = {
            trigger: cooUxFrontendTrigger.current!,
            start: 'top center',
            end: 'center center',
            scrub: 1
        };

        gsap.fromTo(
            cooUxFrontendTitle.current!,
            { opacity: 0 },
            {
                opacity: 1,
                scrollTrigger: scrollTriggerOption
            }
        );
        gsap.fromTo(
            cooUxFrontendLeft.current!,
            { x: '-800px' },
            {
                x: '0',
                ease: 'bounce',
                scrollTrigger: scrollTriggerOption
            }
        );
        gsap.fromTo(
            cooUxFrontendRight.current!,
            { x: '800px' },
            {
                x: '0',
                ease: 'bounce',
                scrollTrigger: scrollTriggerOption
            }
        );
    };

    useEffect(() => {
        msgQaMove();
        uxFrontendMove();
    }, []);

    return (
        <>
            <div className="question-message-area" ref={msgRef}>
                <div className="msg-container-left">
                    <div className="message">
                        <ImageWraper imgUrl={msg01} />
                    </div>
                </div>
                <div className="msg-container-right" ref={msgQaRef1}>
                    <div className="message">
                        <ImageWraper imgUrl={msg02} />
                    </div>
                </div>
                <div className="msg-container-right" ref={msgQaRef2}>
                    <div className="message">
                        <ImageWraper imgUrl={msg03} />
                    </div>
                </div>
                <div className="msg-container-right" ref={msgQaRef3}>
                    <div className="message">
                        <ImageWraper imgUrl={msg04} />
                    </div>
                </div>
            </div>
            <div className="ux-frontend-area" ref={cooUxFrontendTrigger}>
                <div className="ux-frontend-title" ref={cooUxFrontendTitle}>
                    <ImageWraper imgUrl={cooTitle} />
                </div>
                <div className="ux-frontend-cooperate-area">
                    <div className="ux-frontend-cooperate-img" ref={cooUxFrontendLeft}>
                        <ImageWraper imgUrl={cooLeft} />
                    </div>
                    <div className="ux-frontend-cooperate-img" ref={cooUxFrontendRight}>
                        <ImageWraper imgUrl={cooRight} />
                    </div>
                </div>
            </div>
        </>
    );
}
