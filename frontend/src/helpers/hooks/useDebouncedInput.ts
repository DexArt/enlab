import { useState, useEffect } from 'react';

export const useDebouncedInput = (initialValue: string = '', delay: number = 150): [string, string, (value: string) => void] => {
    const [inputValue, setInputValue] = useState<string>(initialValue);
    const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, delay]);

    return [inputValue, debouncedValue, setInputValue];
}