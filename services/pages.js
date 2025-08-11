import { fetchAPI } from "./api";
import { cache } from "react";

/**
 * Get all pages
 * @returns {Promise<Array>} - List of pages
 */
export const getPages = cache(async () => {
  return await fetchAPI("pages", {
    next: { revalidate: 3600 }, // Обновяване на всеки час
  });
});

/**
 * Get page by slug
 * @param {string} slug - Page slug
 * @returns {Promise<Object|null>} - Page data
 */
export const getPageBySlug = cache(async (slug) => {
  return await fetchAPI(`pages?slug=${slug}`, {
    next: { revalidate: 3600 }, // Обновяване на всеки час
  });
});

/**
 * Get page by ID
 * @param {number} id - Page ID
 * @returns {Promise<Object|null>} - Page data
 */
export const getPageById = cache(async (id) => {
  return await fetchAPI(`pages/${id}?_fields=id,slug,yoast_head_json,content,excerpt,title`, {
    next: { revalidate: 3600 }, // Обновяване на всеки час
  });
});
