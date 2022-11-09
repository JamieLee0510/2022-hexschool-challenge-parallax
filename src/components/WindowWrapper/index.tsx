import React from 'react';

import './windowWraper.scss';

export default function WindowWraper() {
    return (
        <div className="window-wrapper">
            <div className="window-toolbar"></div>
            <div className="window-container">
                <div className="window-footer"></div>
            </div>
        </div>
    );
}
