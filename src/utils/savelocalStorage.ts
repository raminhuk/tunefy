export const saveLocalStorage = (name: string, value?: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(name, value);
    }
};
