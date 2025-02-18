import { useLayoutEffect, useRef, useState } from "react";

export function useNow(
    updateInterval: number,
    enabled: number | null,
    cb?: (timestamp: number) => void
): number {
    const cbRef = useRef(cb);
    cbRef.current = cb;
    const [now, setNow] = useState(Date.now());

    useLayoutEffect(() => {
        if (!enabled) {
            return;
        }

        setNow(Date.now());
        cbRef.current?.(Date.now());

        const interval = setInterval(() => {
            const timestamp = Date.now();
            setNow(timestamp);
            cbRef.current?.(timestamp);
        }, updateInterval);

        return () => {
            clearInterval(interval);
        };
    }, [updateInterval, enabled]);

    return now;
}
