export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('adminToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
    // Appointments
    createAppointment: async (data: any) => {
        const response = await fetch(`${API_URL}/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to create appointment');
        }
        return response.json();
    },

    getAppointments: async () => {
        const response = await fetch(`${API_URL}/appointments`, {
            headers: getAuthHeader(),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch appointments');
        }
        return response.json();
    },

    // Contact
    sendContactMessage: async (data: any) => {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
        return response.json();
    },

    getMessages: async () => {
        const response = await fetch(`${API_URL}/contact`, {
            headers: getAuthHeader(),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        return response.json();
    },

    // Blog
    getBlogPosts: async () => {
        const response = await fetch(`${API_URL}/blog`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }
        return response.json();
    },

    getBlogPost: async (id: number) => {
        const response = await fetch(`${API_URL}/blog/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog post');
        }
        return response.json();
    },

    createBlogPost: async (data: any) => {
        const response = await fetch(`${API_URL}/blog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to create blog post');
        }
        return response.json();
    },

    deleteBlogPost: async (id: number) => {
        const response = await fetch(`${API_URL}/blog/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader(),
        });
        if (!response.ok) {
            throw new Error('Failed to delete blog post');
        }
        return response.json();
    },

    // Team
    getTeam: async () => {
        const response = await fetch(`${API_URL}/team`);
        if (!response.ok) {
            throw new Error('Failed to fetch team members');
        }
        return response.json();
    },

    createTeamMember: async (data: any) => {
        const response = await fetch(`${API_URL}/team`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to create team member');
        }
        return response.json();
    },

    updateTeamMember: async (id: number, data: any) => {
        const response = await fetch(`${API_URL}/team/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to update team member');
        }
        return response.json();
    },

    deleteTeamMember: async (id: number) => {
        const response = await fetch(`${API_URL}/team/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader(),
        });
        if (!response.ok) {
            throw new Error('Failed to delete team member');
        }
        return response.json();
    },
};
