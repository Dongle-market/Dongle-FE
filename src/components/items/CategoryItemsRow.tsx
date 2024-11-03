// CategoryItemsRow.tsx
import React from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';

const Row = styled.div`
    display: flex;
    gap: 16px;
`;

interface Item {
    itemId: number;
    image: string;
    title: string;
    lprice: number;
}

interface ItemRowProps {
    items: Item[];
}

export default function CategoryItemsRow({ items }: ItemRowProps) {
    return (
        <Row>
            {items.map((item) => (
                <CategoryItem key={item.itemId} item={item} />
            ))}
        </Row>
    );
}
