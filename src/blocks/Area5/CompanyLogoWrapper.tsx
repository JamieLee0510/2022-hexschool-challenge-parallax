import React, { useEffect, useRef, useState } from 'react';

type CompanyImg = {
    img: string;
    imgWithShadow: string;
};

export default function CompanyLogoWrapper({ img, imgWithShadow }: CompanyImg) {
    const imgRef = useRef<HTMLDivElement>(null);
    const [isHover, setIsHover] = useState(false);
    const [imgUrl, setImgUrl] = useState(img);

    useEffect(() => {
        if (isHover) {
            setImgUrl(imgWithShadow);
            // imgRef.current!.style.height = '400px';
            // imgRef.current!.style.width = '400px';
        } else {
            setImgUrl(img);
            // imgRef.current!.style.height = '350px';
            // imgRef.current!.style.width = '350px';
        }
    }, [img, imgWithShadow, isHover]);

    return (
        <div
            ref={imgRef}
            className="sponsor-img"
            onMouseEnter={() => {
                setIsHover(true);
            }}
            onMouseLeave={() => {
                setIsHover(false);
            }}
        >
            <img src={imgUrl} alt="" style={{ width: '100%', height: 'auto' }} />
        </div>
    );
}
