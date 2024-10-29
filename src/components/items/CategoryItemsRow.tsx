import React from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';

const Row = styled.div`
    display: flex;
    gap: 16px;
`;

interface Item {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
}

interface ItemRowProps {
    items: Item[];
}

export default function itemRow({ items }: ItemRowProps) {
    return (
        <Row>
            {items.map((item) => (
                <CategoryItem key={item.id} item={item} />
            ))}
        </Row>
    );
}