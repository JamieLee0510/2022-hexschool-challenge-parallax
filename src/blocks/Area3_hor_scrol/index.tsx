import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';


import './area3.scss';

import { companyInfoList } from '../../utils/const';

type CompanyWrapperProps = {
    companyName: string;
    index: number;
    title: string;
    mainSkill: string;
    iconUrl: string;
    detailUrl?: string;
};

export default function Area3() {
    const panelsContainer = useRef<HTMLDivElement>(null);
    const panels = useRef<Array<HTMLDivElement | null>>([]);

    const createPanelsRefs = (panel: HTMLDivElement | null, index: number) => {
        panels.current[index] = panel;
    };

    const CompanyWrapper =
        ({ companyName, index, title, mainSkill, iconUrl, detailUrl }:CompanyWrapperProps) => {
            return (
                <div className="company-panel" ref={(e) => createPanelsRefs(e, index)}>
                    <div className="company-icon">
                        <img src={iconUrl} alt="" />
                    </div>
                    <div className="panel-desc-area">
                        <div>Week{index + 1}</div>
                        <div>{title}</div>
                        <div className="panel-desc-bottom">
                            <div className="panel-desc-bottom-text">
                                {companyName} ｜ {mainSkill}
                            </div>
                            <div className="panel-desc-bottom-text">MORE</div>
                        </div>
                    </div>
                </div>
            );
        }
    

    useEffect(() => {
        const totalPanels = panels.current.length;
        const ctx = gsap.context(() => {
            gsap.to(panels.current, {
                xPercent: -100 * (totalPanels - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: panelsContainer.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (totalPanels - 1),
                    // base vertical scrolling on how wide the container is so it feels more natural.
                    end: () => '+=' + panelsContainer.current!.offsetWidth
                }
            });
        }, panelsContainer);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div className="root3" ref={panelsContainer}>
            {companyInfoList.map((company, index) => {
                return (
                    <CompanyWrapper
                        key={index}
                        companyName={company.companyName}
                        index={index}
                        title={company.title}
                        iconUrl={company.icon}
                        mainSkill={company.mainSkill}
                    />
                );
            })}
        </div>
    );
}
