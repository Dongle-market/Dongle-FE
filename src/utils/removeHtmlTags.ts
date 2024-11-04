// src/utils/removeHtmlTags.ts

export const removeHtmlTags = (text: string): string => {
    // HTML 태그 제거
    const plainText = text.replace(/<[^>]*>/g, '');

    // HTML 엔티티 디코딩
    const parser = new DOMParser();
    const decoded = parser.parseFromString(`<!doctype html><body>${plainText}`, 'text/html');
    return decoded.body.textContent || '';
};
