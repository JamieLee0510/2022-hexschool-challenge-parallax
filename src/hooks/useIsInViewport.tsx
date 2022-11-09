import React, { useEffect, useMemo, useState } from 'react';

function useIsInViewport(ref: React.RefObject<HTMLDivElement>) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(
        () =>
            new IntersectionObserver(([entry]) => {
                // console.log(entry);
                return setIsIntersecting(entry.isIntersecting);
            }),
        []
    );

    useEffect(() => {
        observer.observe(ref.current!);

        return () => {
            observer.disconnect();
        };
    }, [ref, observer]);

    return isIntersecting;
}

export default useIsInViewport;
