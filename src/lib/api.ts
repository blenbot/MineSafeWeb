const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8080/api';

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getHeaders(requiresAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: response.statusText || 'An error occurred',
      }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }

    return {} as T;
  }

  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { requiresAuth = false, ...fetchOptions } = options;

    const url = `${this.baseURL}${endpoint}`;
    const headers = this.getHeaders(requiresAuth);

    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        ...headers,
        ...fetchOptions.headers,
      },
    });

    return this.handleResponse<T>(response);
  }

  // Auth endpoints
  async signup(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    mining_site: string;
    location: string;
  }) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getMe() {
    return this.request('/me', {
      requiresAuth: true,
    });
  }

  // Miner endpoints
  async getMiners() {
    return this.request('/miners', {
      requiresAuth: true,
    });
  }

  async getMiner(id: string) {
    return this.request(`/miners/${id}`, {
      requiresAuth: true,
    });
  }

  async createMiner(data: {
    name: string;
    email: string;
    password: string;
    phone_number?: string;
    role?: string;
    mining_site?: string;
  }) {
    return this.request('/miners', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async updateMiner(
    id: string,
    data: { 
      name: string; 
      email: string; 
      phone_number?: string;
      role?: string;
      mining_site?: string;
    }
  ) {
    return this.request(`/miners/${id}`, {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async deleteMiner(id: string) {
    return this.request(`/miners/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  }

  // Module endpoints
  async getModules() {
    return this.request('/modules', {
      requiresAuth: true,
    });
  }

  async getModule(id: string) {
    return this.request(`/modules/${id}`, {
      requiresAuth: true,
    });
  }

  async createModule(data: {
    title: string;
    description: string;
    video_url: string;
    duration: number;
    category: string;
    thumbnail: string;
  }) {
    return this.request('/modules', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async getStarVideo() {
    return this.request('/modules/star', {
      requiresAuth: true,
    });
  }

  async setStarVideo(videoId: string) {
    return this.request(`/modules/${videoId}/star`, {
      method: 'POST',
      requiresAuth: true,
    });
  }

  async getQuestions(videoId: string) {
    return this.request(`/modules/${videoId}/questions`, {
      requiresAuth: true,
    });
  }

  async createQuestion(data: {
    video_id: number;
    question: string;
    options: string[];
    answer: number;
  }) {
    return this.request('/modules/questions', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async submitModuleAnswers(data: { video_id: number; answers: number[] }) {
    return this.request('/modules/submit', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  // Streak endpoints
  async getLearningStreaks() {
    return this.request('/streaks', {
      requiresAuth: true,
    });
  }

  async getMinerStreak() {
    return this.request('/streak/me', {
      requiresAuth: true,
    });
  }

  async getMinerCompletions() {
    return this.request('/completions/me', {
      requiresAuth: true,
    });
  }

  async getDashboardStats() {
    return this.request('/dashboard/stats', {
      requiresAuth: true,
    });
  }

  // Emergency endpoints
  async createEmergency(data: {
    user_id: string;
    emergency_id: number;
    severity: string;
    latitude: number;
    longitude: number;
    issue: string;
    media_status?: string;
  }) {
    return this.request('/emergencies', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async getEmergencies(params?: { status?: string; user_id?: string }) {
    const queryParams = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    return this.request(`/emergencies${queryParams ? `?${queryParams}` : ''}`, {
      requiresAuth: true,
    });
  }

  async getEmergency(id: string) {
    return this.request(`/emergencies/${id}`, {
      requiresAuth: true,
    });
  }

  async updateEmergencyMedia(id: string, data: { media_url: string; media_status: string }) {
    return this.request(`/emergencies/${id}/media`, {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async updateEmergencyStatus(id: string, status: string) {
    return this.request(`/emergencies/${id}/status`, {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify({ status }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
