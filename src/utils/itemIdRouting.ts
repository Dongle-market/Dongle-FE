// utils/itemIdRouting.ts

import { useRouter } from 'next/router';

export const useItemRouting = () => {
    const router = useRouter();
    
    return (itemId: number) => {
        router.push(`/item/${itemId}`);
    };
};
