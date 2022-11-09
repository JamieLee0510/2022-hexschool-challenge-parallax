import React from 'react';

import './loading.scss';

export default function SpinnerLoader() {
    return (
        <div className="lds-ellipsis">
            <div className="loader-element" />
            <div className="loader-element" />
            <div className="loader-element" />
            <div className="loader-element" />
        </div>
    );
}
