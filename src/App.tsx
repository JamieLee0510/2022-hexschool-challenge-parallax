import React from 'react';
import logo from './logo.svg';

import Area1 from './blocks/Area1';
import Area2 from './blocks/Area2';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Area3 from './blocks/Area3';
import Area4 from './blocks/Area4';
import Area5 from './blocks/Area5';
import SliceInternal from './components/SliceInternal';

function App() {
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        }

        window.addEventListener('resize', handleResize);
    });

    return (
        <>
            {/* <Header /> */}
            <Area1 />
            <Area2 />
            <Area3 />
            <SliceInternal />
            <Area4 />
            <Area5 />
        </>
    );
}

export default App;
