import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './area4.scss';
import { RaceInfo, raceInfoList } from '../../utils/const';

/**
 * week1/2/3
 * icon and text section be spin and cover another
 */

export default function Area4() {
    gsap.registerPlugin(ScrollTrigger);
    const container = useRef<HTMLDivElement>(null);
    const timeLineRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            ScrollTrigger.create({
                trigger: container.current!,
                scrub: true,
                pin: true,
                pinSpacing: true,
                start: 'top top',
                end: 'bottom center', //scroll more 100%height
                markers: false,
                onEnter: (self) => {},
                onUpdate: (self) => {
                    let p = self.progress;
                    if (p > 0.1) {
                        gsap.to(timeLineRef.current!, {
                            xPercent: -150 * (p - 0.1),
                            ease: 'none'
                        });
                    }
                },
                onLeave: (self) => {},
                onEnterBack: (self) => {}
            });
        }, container);
        return () => ctx.revert();
    }, []);

    const TimeItemContainer = (timeItem: RaceInfo) => {
        return (
            <span className="timeline-item">
                <div> {timeItem.title}</div>
                <div style={{ borderBottom: 'solid black' }}>{timeItem.desc}</div>
                <div>
                    {timeItem.startDate}
                    {timeItem.startDetail}
                </div>
                <div>
                    {timeItem.dueDate} {timeItem.dueDetail}
                </div>
            </span>
        );
    };

    const RepeatText = ({ textData }: any) => {
        const text = textData.repeat(10);
        return <div className="text">{text}</div>;
    };
    return (
        <div className="root4" ref={container}>
            <div className="marquee-area">
                <div className="marquee marquee2">
                    <RepeatText textData={'THEF2E4TH · '} />
                    <RepeatText textData={'THEF2E4TH · '} />
                </div>
                <div className="marquee marquee1">
                    <RepeatText textData={'THEF2E4TH · '} />
                    <RepeatText textData={'THEF2E4TH · '} />
                </div>
            </div>
            <div className="timeline-area">
                <div className="timeline" ref={timeLineRef}>
                    {raceInfoList.map((item, index) => {
                        return <TimeItemContainer {...item} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
}
