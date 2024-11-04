// src/utils/removeHtmlTags.ts
import { parse } from 'node-html-parser';

export const removeHtmlTags = (text: string): string => {
    // HTML 태그 제거
    const plainText = text.replace(/<[^>]*>/g, '');

    // HTML 엔티티 디코딩
    const root = parse(`<div>${plainText}</div>`);
    return root.textContent || '';
};
