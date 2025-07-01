/**
 * API调用工具函数
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '请求失败');
      }

      return data;
    } catch (error) {
      console.error('API请求错误:', error);
      throw error;
    }
  }

  // 认证相关
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email, name, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, name, password }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // 用户相关
  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(data) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // 好友相关
  async getFriends() {
    return this.request('/friends');
  }

  async addFriend(friendId) {
    return this.request(`/friends/${friendId}`, {
      method: 'POST',
    });
  }

  async removeFriend(friendId) {
    return this.request(`/friends/${friendId}`, {
      method: 'DELETE',
    });
  }

  // 聊天相关
  async getChatMessages(contactId) {
    return this.request(`/chat/messages?contact_id=${contactId}`);
  }

  async sendMessage(receiverId, content, type = 'text') {
    return this.request('/chat/messages', {
      method: 'POST',
      body: JSON.stringify({ receiver_id: receiverId, content, type }),
    });
  }

  // 视频通话相关
  async createVideoSession(participantId) {
    return this.request('/video/sessions', {
      method: 'POST',
      body: JSON.stringify({ participant_id: participantId }),
    });
  }

  async getVideoSession(sessionId) {
    return this.request(`/video/sessions/${sessionId}`);
  }

  async updateVideoSessionStatus(sessionId, status) {
    return this.request(`/video/sessions/${sessionId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }
}

export default new ApiClient();