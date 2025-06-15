import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'https://dummyjson.com';

export const refreshToken = async (refreshToken) => {
    const res = await axios.post(`${BASE_URL}/auth/refresh`, {
        refreshToken
    });

    return res.data; // { accessToken, expiresIn }
};


const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor
api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const refresh = JSON.parse(localStorage.getItem('user'))?.refreshToken;
            if (!refresh) {
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                const data = await refreshToken(refresh);

                const storedUser = JSON.parse(localStorage.getItem('user'));
                storedUser.accessToken = data.accessToken;
                localStorage.setItem('user', JSON.stringify(storedUser));

                // Retry the failed request with new token
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshErr) {
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(refreshErr);
            }
        }

        return Promise.reject(error);
    }
);

// Login
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}

// getMe 
export const getMe = async () => {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
        throw new Error('No token found');
    }
    try {
        const response = await api.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}



export const getProducts = async (page = 1, limit = 6) => {
    const skip = (page - 1) * limit;
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  };
  
  export const searchProducts = async (query) => {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  };
  

// Get all posts with pagination and search
export const getPostsLImit = async ({ queryKey }) => {
    const [_key, page = 1, search = ''] = queryKey;
    const limit = 6;
    const skip = (page - 1) * limit;

    try {
        const response = await api.get(`/posts/search?q=${search}&limit=${limit}&skip=${skip}`);
        return response.data; // { posts: [...], total: 42, skip, limit }
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Get Post by ID
export const getPostById = async (id) => {
    try {
        const response = await api.get(`/posts/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}

// Get all todos 
export const getTodos = async () => {
    try {
        const response = await api.get('/todos');
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};