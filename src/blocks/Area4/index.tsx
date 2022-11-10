import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './area4.scss';

/**
 * week1/2/3
 * icon and text section be spin and cover another
 */

export default function Area4() {
    gsap.registerPlugin(ScrollTrigger);
    const container = useRef<HTMLDivElement>(null);


   
  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const panels = self.selector!(".animate-panel") as Array<gsap.TweenTarget>;
      gsap.set(panels, { yPercent: 100, opacity: 1 });
      const tl = gsap.timeline();
      panels!.forEach((panel, i) => {
        tl.to(panel, {
          yPercent: 0,
          ease: "none"
        });
      });
      ScrollTrigger.create({
        animation: tl,
        trigger: container.current,
        start: "top top",
        end: () => "+=" + 100 * panels.length + "%",
        pin: true,
        markers: false,
        scrub: 0.5,
        snap: {
          snapTo: 1 / panels.length,
          duration: 0.25,
          ease: "power2.out",
          delay: 0
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);
    return (
        <div className="root4 panels-container" ref={container}>
            <div className="container4 section1" >
                <h1>week1</h1>
            </div>
            <div className="container4 animate-panel section2" >
                <h1>week2</h1>
            </div>
            <div className="container4 animate-panel section3" >
                <h1>week3</h1>
            </div>
        </div>
    );
}
