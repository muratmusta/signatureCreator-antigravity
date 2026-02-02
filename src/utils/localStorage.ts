import type { SignatureData } from '../types/signature';
import { defaultSignatureData } from '../types/signature';

const STORAGE_KEY = 'email-signature-data';

/**
 * Saves signature data to localStorage
 */
export const saveToLocalStorage = (data: SignatureData): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
};

/**
 * Loads signature data from localStorage
 */
export const loadFromLocalStorage = (): SignatureData => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return { ...defaultSignatureData, ...JSON.parse(stored) };
        }
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
    }
    return defaultSignatureData;
};

/**
 * Clears signature data from localStorage
 */
export const clearLocalStorage = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear localStorage:', error);
    }
};
