import { useEffect } from "react";

export const useKeyDown = (handler, deps = []) => {
    useEffect(() => {
        document.addEventListener("keydown", handler);
        // clean up
        return () => {
            document.removeEventListener("keydown", handler);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deps]);
};
