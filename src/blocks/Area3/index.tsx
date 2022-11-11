import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './area3.scss';

import { companyInfoList } from '../../utils/const';
import { CompanyInfo } from '../../utils/type';

type CompanyWrapperProps = {
    index: number;
    companyInfo: CompanyInfo;
};

export default function Area3() {
    gsap.registerPlugin(ScrollTrigger);
    const panelsContainer = useRef<HTMLDivElement>(null);

    const CompanyWrapper = ({ companyInfo, index }: CompanyWrapperProps) => {
        const animateClass = index === 0 ? '' : 'animate-panel';

        return (
            <div className={`panel ${animateClass}`}>
                <div className="company-panel">
                    <div className="company-icon">
                        <img src={companyInfo.iconUrl} alt="" />
                    </div>
                    <div className="panel-desc-area">
                        <div className=" font-white title">Week{index + 1}</div>
                        <div className="font-white title">{companyInfo.title}</div>
                        <div className="panel-desc-bottom">
                            <div className="panel-desc-bottom-text font-white">
                                {companyInfo.companyName} ｜ {companyInfo.mainSkill}
                            </div>
                            <div className="panel-desc-bottom-text">
                                <a
                                    target="_blank"
                                    href={companyInfo.detailUrl}
                                    rel="noreferrer"
                                >{`MORE >`}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            const panels = self.selector!('.animate-panel') as Array<gsap.TweenTarget>;
            gsap.set(panels, { yPercent: 100, opacity: 1 });
            const tl = gsap.timeline();
            panels!.forEach((panel, i) => {
                tl.to(panel, {
                    yPercent: 0,
                    ease: 'none'
                });
            });
            ScrollTrigger.create({
                animation: tl,
                trigger: panelsContainer.current!,
                start: 'top top',
                end: () => '+=' + 100 * panels.length + '%',
                pin: true,
                markers: false,
                scrub: 0.5,
                snap: {
                    snapTo: 1 / panels.length,
                    duration: 0.25,
                    ease: 'power2.out',
                    delay: 0
                }
            });
        }, panelsContainer);
        return () => ctx.revert();
    }, []);

    return (
        <div className="panels-container" ref={panelsContainer}>
            {companyInfoList.map((company, index) => {
                return <CompanyWrapper key={index} companyInfo={company} index={index} />;
            })}
        </div>
    );
}
