import { useEffect, useState } from 'react';
import { getSecureData } from '../utils/getData';

export const useStorageData = (key: string) => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const storedData = await getSecureData(key);
            setData(storedData as string);
            setLoading(false);
        };

        fetchData();
    }, [key]);

    return { data, loading };
};