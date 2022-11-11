import React from 'react';

import './area5.scss';
import blockImg from '../../assets/section05/section08_icon01.png';
import blockShallowImg from '../../assets/section05/section08_icon01_2.png';
import kdanImg from '../../assets/section05/section08_icon02.png';
import titanImg from '../../assets/section05/section08_icon03.png';
import titanShallowImg from '../../assets/section05/section08_icon03_2.png';
import kdanShallowImg from '../../assets/section05/section08_icon02_2.png';
import CompanyLogoWrapper from './CompanyLogoWrapper';

export default function Area5() {
    return (
        <div className="root5">
            <div className="title-area">
                <span>鑽石級贊助商</span>
            </div>
            <div className="sponsor-area">
                <CompanyLogoWrapper img={blockImg} imgWithShadow={blockShallowImg} />
                <CompanyLogoWrapper img={kdanImg} imgWithShadow={kdanShallowImg} />
                <CompanyLogoWrapper img={titanImg} imgWithShadow={titanShallowImg} />
            </div>
        </div>
    );
}
