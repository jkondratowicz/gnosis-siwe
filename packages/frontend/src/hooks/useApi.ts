const BACKEND_ADDR = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export const useApi = () => {
  return async (path: string, options?: RequestInit) => {
    const response = await fetch(`${BACKEND_ADDR}${path}`, {
      credentials: 'include',
      ...options,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    return response.json();
  };
};
