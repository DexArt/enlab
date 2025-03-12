import { useSearchParams } from 'react-router-dom';

export const useQueryParam = (key: string, defaultValue: string = ''): [string, (newValue: string) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();
    const value = searchParams.get(key) || defaultValue;

    const setValue = (newValue: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (newValue) {
            newSearchParams.set(key, newValue);
        } else {
            newSearchParams.delete(key);
        }
        setSearchParams(newSearchParams);
    };

    return [value, setValue];
};

export default useQueryParam;