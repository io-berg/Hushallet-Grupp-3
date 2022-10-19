const url = "http://10.0.2.2:5279/api/Auth";

export interface LoginResponse {
  expiration: string;
  token: string;
  user: { username: string; email: string };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegisterResponse {}

export interface ErrorResponse {
  errors: { [key: string]: string[] };
}

const loginRequest = async (username: string, password: string) => {
  const response = await fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data as LoginResponse;
  }

  const data = await response.json();
  throw data as ErrorResponse;
};

const registerRequest = async (username: string, email: string, password: string) => {
  const response = await fetch(`${url}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data as RegisterResponse;
  }

  const data = await response.json();
  throw data as ErrorResponse;
};

export { loginRequest, registerRequest };
