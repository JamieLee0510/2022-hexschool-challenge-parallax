import React, { useEffect, useState } from 'react';

export default function Clock() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    }, []);

    return <span> {date.toLocaleTimeString()}</span>;
}
