import { get } from "./localStorage";
import { ErrorResponse, LoginResponse, RegisterResponse } from "./type";

const url = "http://10.0.2.2:5279/api";

const loginRequest = async (username: string, password: string) => {
  const response = await fetch(`${url}/auth/login`, {
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
  const response = await fetch(`${url}/auth/register`, {
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

const fetchMyHouseholdsRequest = async () => {
  const response = await fetch(`${url}/household/MyHouseholds`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await get("auth.token")}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  console.log(response.status);

  console.log("Error fetching households");
  const data = await response.json();
  console.log(data);
  throw data as ErrorResponse;
};

export { loginRequest, registerRequest, fetchMyHouseholdsRequest };
