import React from 'react';
import logo from './logo.svg';

import Area1 from './blocks/Area1';
import Area2 from './blocks/Area2';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Area3 from './blocks/Area3';
import Area4 from './blocks/Area4';
import Area5 from './blocks/Area5';

function App() {
    return (
        <>
            {/* <Header /> */}
            <Area1 />
            <Area2 />
            <Area3 />
            {/* <Area4 /> */}
            <Area5 />
        </>
    );
}

export default App;
