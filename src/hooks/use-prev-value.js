import React, { useRef, useEffect } from "react";

export default function usePrevValue(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}
