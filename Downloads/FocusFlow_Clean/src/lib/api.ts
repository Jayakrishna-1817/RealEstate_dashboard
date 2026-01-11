const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Auth storage
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  setUser: (user: any) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  removeUser: () => localStorage.removeItem(USER_KEY),
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

// API client
const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = authStorage.getToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
};

// Auth API
export const authAPI = {
  signup: async (email: string, password: string, name: string) => {
    const data = await apiClient('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    authStorage.setToken(data.token);
    authStorage.setUser(data.user);
    return data;
  },

  login: async (email: string, password: string) => {
    const data = await apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    authStorage.setToken(data.token);
    authStorage.setUser(data.user);
    return data;
  },

  logout: () => {
    authStorage.clear();
  },

  getCurrentUser: async () => {
    return await apiClient('/auth/me');
  },
};

// Drafts API
export const draftsAPI = {
  getAll: async () => {
    return await apiClient('/drafts');
  },

  getOne: async (id: string) => {
    return await apiClient(`/drafts/${id}`);
  },

  create: async (title: string = 'Untitled', content: string = '') => {
    return await apiClient('/drafts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    });
  },

  update: async (id: string, updates: { title?: string; content?: string; isFavorite?: boolean }) => {
    return await apiClient(`/drafts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  delete: async (id: string) => {
    return await apiClient(`/drafts/${id}`, {
      method: 'DELETE',
    });
  },
};

// Focus Sessions API
export const focusSessionsAPI = {
  create: async (data: { draftId?: string; duration: number; startTime: string; endTime: string; wordCount: number }) => {
    return await apiClient('/focus-sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAll: async () => {
    return await apiClient('/focus-sessions');
  },

  getStats: async () => {
    return await apiClient('/focus-sessions/stats');
  },
};

// Shop API
export const shopAPI = {
  getItems: async () => {
    return await apiClient('/shop/items');
  },

  getCredits: async () => {
    return await apiClient('/shop/credits');
  },

  purchase: async (itemId: string) => {
    return await apiClient('/shop/purchase', {
      method: 'POST',
      body: JSON.stringify({ itemId }),
    });
  },

  activate: async (itemId: string) => {
    return await apiClient('/shop/activate', {
      method: 'POST',
      body: JSON.stringify({ itemId }),
    });
  },

  awardCredits: async () => {
    return await apiClient('/shop/award-credits', {
      method: 'POST',
    });
  },

  getPreferences: async () => {
    return await apiClient('/shop/preferences');
  },
};

export const grammarAPI = {
  check: async (text: string) => {
    return await apiClient('/grammar/check', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },
};
