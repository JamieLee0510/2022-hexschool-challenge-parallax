import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './area2.scss';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import loadingTextImg from '../../assets/section02/loading_text.png';
import Loading from '../../components/Loading';
import LoadingProgress from '../../components/LoadingProgress';
import msg01 from '../../assets/section02/icon01.png';
import msg02 from '../../assets/section02/icon02.png';
import msg03 from '../../assets/section02/icon03.png';
import msg04 from '../../assets/section02/icon04.png';
import cooTitle from '../../assets/section01/cn_logo.png';
import cooLeft from '../../assets/section02/cor_left.png';
import cooRight from '../../assets/section02/cor_right.png';
import ImageWraper from '../../components/ImageWraper';
import QuesAndCoo from './QuesAndCoo';

export default function Area2() {
    gsap.registerPlugin(ScrollTrigger);

    const pinTrigger = useRef<HTMLDivElement>(null);
    const loadingRef = useRef<HTMLDivElement>(null);

    const [msgFlag, setMsgFlag] = useState(false);
    const [cooFlag, setCooFlag] = useState(false);
    const msgRef = useRef<HTMLDivElement>(null);
    const cooUxFrontendTrigger = useRef<HTMLDivElement>(null);
    const cooUxFrontendTitle = useRef<HTMLDivElement>(null);
    const cooUxFrontendLeft = useRef<HTMLDivElement>(null);
    const cooUxFrontendRight = useRef<HTMLDivElement>(null);
    const [loadingProgressdata, setLoadingProgressData] = useState(0);

    const msgQaRef0 = useRef<HTMLDivElement>(null);
    const msgQaRef1 = useRef<HTMLDivElement>(null);
    const msgQaRef2 = useRef<HTMLDivElement>(null);
    const msgQaRef3 = useRef<HTMLDivElement>(null);

    const msgQaMove = () => {
        const scrollTriggerOption = {
            trigger: msgRef.current!,
            start: 'top center',
            end: 'top top',
            scrub: 1
        };

        gsap.fromTo(
            msgQaRef0.current!,
            { y: '800px', opacity: 0 },
            {
                y: '0',
                opacity: 1
                //scrollTrigger: scrollTriggerOption
            }
        );

        gsap.fromTo(
            msgQaRef1.current!,
            { y: '300px', opacity: 0 },
            {
                y: '0',
                opacity: 1
                //scrollTrigger: scrollTriggerOption
            }
        ).delay(0.2);
        gsap.fromTo(
            msgQaRef2.current!,
            { y: '500px', opacity: 0 },
            {
                y: '0',
                opacity: 1
                //scrollTrigger: scrollTriggerOption
            }
        ).delay(0.5);
        gsap.fromTo(
            msgQaRef3.current!,
            { y: '800px', opacity: 0 },
            {
                y: '0',
                opacity: 1
                //scrollTrigger: scrollTriggerOption
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
                opacity: 1
                // scrollTrigger: scrollTriggerOption
            }
        );
        gsap.fromTo(
            cooUxFrontendLeft.current!,
            { x: '-800px' },
            {
                x: '0',
                ease: 'bounce'
                // scrollTrigger: scrollTriggerOption
            }
        );
        gsap.fromTo(
            cooUxFrontendRight.current!,
            { x: '800px' },
            {
                x: '0',
                ease: 'bounce'
                //scrollTrigger: scrollTriggerOption
            }
        );
    };

    const hide = (ref: React.RefObject<HTMLDivElement>) => {
        gsap.to(ref.current!, {
            opacity: 0
        });
    };

    const unhide = (ref: React.RefObject<HTMLDivElement>) => {
        gsap.to(ref.current!, {
            opacity: 1
        });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Loading pin area & init message position
            ScrollTrigger.create({
                trigger: pinTrigger.current!,
                scrub: true,
                pin: true,
                pinSpacing: true,
                start: 'top top',
                end: 'bottom -250%', //scroll more 100%height
                markers: true,
                onEnter: (self) => {
                    //gsap.fromTo(loadingRef.current!, { opacity: 0 }, { opacity: 1 });
                },
                onUpdate: (self) => {
                    let p = self.progress;

                    if (p <= 0.3) {
                        setLoadingProgressData(Math.ceil((Number(p.toFixed(2)) / 0.3) * 10));
                        unhide(loadingRef);
                        if (msgFlag) {
                            hide(msgRef);
                            setMsgFlag(false);
                        }
                    }
                    if (p > 0.3) {
                       
                        hide(loadingRef);
                    }
                   
                    if (Math.ceil(p * 10) === 4) {
                     
                        hide(cooUxFrontendTrigger);
                        setCooFlag(false);
                        if (!msgFlag) {
                            unhide(msgRef);
                            msgQaMove();
                            setMsgFlag(true);
                        }
                    }
                    if (Math.ceil(p * 10) === 8) {
                        hide(msgRef);
                        if (!cooFlag) {
                            unhide(cooUxFrontendTrigger);
                            uxFrontendMove();
                            setCooFlag(true);
                        }
                    }
                },

                onLeave: (self) => {
                    // self.disable();
                },
                onEnterBack: (self) => {
                    // self.enable();
                }
            });
        }, pinTrigger);

        return () => {
            ctx.revert();
        };
    }, [cooFlag, msgFlag]);

    return (
        <div className="root2">
            <div className="loading-area" ref={pinTrigger}>
                <div className="loading-dislay-area" ref={loadingRef}>
                    <div className="loading-title">
                        <h1>Loading</h1>
                        <div className="loading-effect">
                            <Loading />
                        </div>
                    </div>

                    <div className="loading-progress-area">
                        <LoadingProgress scrolledInt={loadingProgressdata} />
                    </div>
                </div>
                <div className="question-message-area" ref={msgRef}>
                    <div className="msg-container-left" ref={msgQaRef0}>
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
            </div>
        </div>
    );
}
