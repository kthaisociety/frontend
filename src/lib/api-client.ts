const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type AuthResponse = {
  user: {
    id: number;
    email: string;
    provider: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
  message?: string;
};

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Network error" }));
    throw new ApiError(
      response.status,
      error.error || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
}

const defaultOptions: RequestInit = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        ...defaultOptions,
        method: "POST",
        body: JSON.stringify(credentials),
      });
      return handleResponse<AuthResponse>(response);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      ...defaultOptions,
      method: "POST",
      body: JSON.stringify(credentials),
    });

    return handleResponse<AuthResponse>(response);
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      ...defaultOptions,
      method: "GET",
    });

    return handleResponse(response);
  },

  getSession: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/status`, {
        ...defaultOptions,
        method: "GET",
      });

      if (!response.ok) {
        throw new ApiError(response.status, "Failed to fetch session");
      }

      const data = await response.json();

      if (!data.authenticated) {
        throw new ApiError(401, "Not authenticated");
      }

      // Fetch user data
      const userResponse = await fetch(`${API_URL}/auth/user`, {
        ...defaultOptions,
        method: "GET",
      });

      return handleResponse<AuthResponse>(userResponse);
    } catch (error) {
      console.error("Session error:", error);
      throw error;
    }
  },
};
