import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './questionArea.scss';
import useIsInViewport from '../../hooks/useIsInViewport';

export default function QuestionArea() {
    const msgContainer = useRef<HTMLDivElement>(null);
    const msg1 = useRef<HTMLDivElement>(null);
    const msg2 = useRef<HTMLDivElement>(null);
    const msg3 = useRef<HTMLDivElement>(null);

    const isInViewport = useIsInViewport(msg1);

    useEffect(() => {
        // console.log('isInViewport?', isInViewport);
        if (isInViewport) {
            gsap.to(msgContainer.current!, { opacity: 1, transition: '2s' });
        }
    }, [isInViewport]);

    return (
        <div className="question-messages" ref={msgContainer}>
            <div className="message">
                <h1>是否有以下困擾？</h1>
            </div>
            <div className="message" ref={msg1}>
                <h1>困擾1</h1>
            </div>
            <div className="message" ref={msg2}>
                <h1>困擾2</h1>
            </div>
            <div className="message" ref={msg3}>
                <h1>困擾3</h1>
            </div>
        </div>
    );
}
