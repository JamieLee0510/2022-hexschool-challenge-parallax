import React from 'react';

type ImageProps = {
    imgUrl: string;
};

export default function ImageWraper({ imgUrl }: ImageProps) {
    return <img src={imgUrl} alt="" style={{ width: '100%', height: '100%' }} />;
}
