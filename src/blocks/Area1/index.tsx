import React, { RefObject, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import IconWraper from '../../components/IconWraper';
import WindowWraper from '../../components/WindowWraper01';
import windowBackgrountImg from '../../assets/section01/background02.png';
import iconMenu from '../../assets/section01/bar_icon.png';
import iconInternet from '../../assets/section01/icon_Internet.png';
import iconMission from '../../assets/section01/icon_Mission.png';
import iconDesign from '../../assets/section01/icon_Design.png';
import iconRecyle from '../../assets/section01/icon_RecycleBin.png';
import iconCode from '../../assets/section01/icon_Code.png';
import title1 from '../../assets/section01/Thef2e4th_logo.png';
import title2 from '../../assets/section01/cn_logo.png';
import window1 from '../../assets/section01/windowVer1/window_ver1_01.png';
import window2 from '../../assets/section01/windowVer1/window_ver1_02.png';
import window3 from '../../assets/section01/windowVer1/window_ver1_03.png';

import './area1.scss';
import Clock from '../../components/Clock';
import TitleWraper from '../../components/TitleWraper';
import ImageWraper from '../../components/ImageWraper';

export default function Area1() {
    // const container = useRef<HTMLDivElement>(null);

    const windowBg = useRef<HTMLDivElement>(null);

    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        windowBg.current!.style.backgroundImage = `url(${windowBackgrountImg})`;
        // windowBg.current!.style.backgroundSize = '150%';
        windowBg.current!.style.backgroundPosition = 'center';

        const ctx = gsap.context(() => {
            gsap.fromTo(
                windowBg.current!,
                {
                    backgroundSize: '150%'
                },
                {
                    backgroundSize: '100%'
                }
            );
        },windowBg);
        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div className="root1">
            <div className="title">
                <h1>THE F2E 4TH</h1>
            </div>

            {/* <div className="window_area_outer" ref={windowBg}> */}
            <div className="window_area_inner" ref={windowBg}>
                <div className="window_desktop">
                    <div className="area1">
                        <IconWraper
                            iconUrl={iconInternet}
                            direction={'left'}
                            startPoint={'-100px'}
                        />
                        <IconWraper
                            iconUrl={iconMission}
                            direction={'left'}
                            startPoint={'-150px'}
                        />
                        <IconWraper iconUrl={iconDesign} direction={'left'} startPoint={'-180px'} />
                    </div>
                    <div className="area2">
                        <TitleWraper
                            titleUrl={title1}
                            top={'30%'}
                            left={'1%'}
                            width={'500px'}
                            height={'90px'}
                            startPoint={'-500px'}
                        />
                        <TitleWraper
                            titleUrl={title2}
                            top={'35%'}
                            left={'40%'}
                            width={'300px'}
                            height={'70px'}
                            startPoint={'500px'}
                        />
                        <WindowWraper
                            windowUrl={window1}
                            top={'25%'}
                            left={'25%'}
                            width={'600px'}
                            height={'340px'}
                            zIndex={'4'}
                            startX={'-300px'}
                            startY={'300px'}
                        />
                        <WindowWraper
                            windowUrl={window2}
                            top={'15%'}
                            left={'20%'}
                            width={'300px'}
                            height={'200px'}
                            zIndex={'3'}
                            startX={'-300px'}
                            startY={'-300px'}
                        />
                        <WindowWraper
                            windowUrl={window3}
                            top={'18%'}
                            left={'60%'}
                            width={'300px'}
                            height={'250px'}
                            zIndex={'3'}
                            startX={'300px'}
                            startY={'300px'}
                        />
                    </div>
                    <div className="area3">
                        <IconWraper iconUrl={iconRecyle} direction={'right'} startPoint={'100px'} />
                        <IconWraper iconUrl={iconCode} direction={'right'} startPoint={'150px'} />
                    </div>
                </div>
                <div className="window_dock">
                    <div className="window_menu window_dock_item">
                        <div className="menu_icon">
                            <ImageWraper imgUrl={iconMenu} />
                        </div>
                        Menu
                    </div>
                    <div className="window_clock window_dock_item">
                        <Clock />
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
    );
}
