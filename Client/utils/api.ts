import { get } from "./localStorage";
import { ErrorResponse, Household, LoginResponse, Profile, RegisterResponse } from "./type";

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
  try {
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
  } catch (error) {
    throw new Error("Could not fetch households");
  }
};

const applicationRequest = async (code: string) => {
  const response = await fetch(`${url}/household/CreateApplication`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await get("auth.token")}`,
    },
    body: JSON.stringify({
      code,
    }),
  });

  if (response.ok) {
    return true;
  }

  throw response;
};

const applicationResponseRequest = async (applicationId: number, accept: boolean) => {
  const response = await fetch(`${url}/household/ApplicationResponse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await get("auth.token")}`,
    },
    body: JSON.stringify({
      applicationId: applicationId,
      accepted: accept,
    }),
  });

  if (response.ok) {
    return true;
  }

  throw response;
};

const createHouseholdRequest = async (name: string) => {
  const response = await fetch(`${url}/household/CreateHousehold`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await get("auth.token")}`,
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  throw response;
};

const transferOwnershipRequest = async (householdId: number, email: string) => {
  const response = await fetch(`${url}/household/TransferAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await get("auth.token")}`,
    },
    body: JSON.stringify({
      householdId,
      email,
    }),
  });

  if (response.ok) {
    return true;
  }

  throw response;
};

const changeHouseholdNameRequest = async (householdId: number, name: string) => {
  const response = await fetch(`${url}/household/ChangeHouseholdName`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await get("auth.token")}`,
    },
    body: JSON.stringify({
      householdId,
      name,
    }),
  });

  if (response.ok) {
    return true;
  }

  throw response;
};

const leaveHouseholdRequest = async (householdId: number) => {
  const response = await fetch(`${url}/household/LeaveHousehold`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await get("auth.token")}`,
    },
    body: JSON.stringify({
      householdId,
    }),
  });

  if (response.ok) {
    return true;
  }

  throw response;
};

const updateProfileRequest = async (id: number, profile: Profile) => {
  const response = await fetch(`${url}/household/UpdateProfileInHousehold`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await get("auth.token")}`,
    },
    body: JSON.stringify({
      id,
      profile,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  throw response;
};

export {
  loginRequest,
  registerRequest,
  fetchMyHouseholdsRequest,
  applicationRequest,
  createHouseholdRequest,
  applicationResponseRequest,
  transferOwnershipRequest,
  changeHouseholdNameRequest,
  leaveHouseholdRequest,
  updateProfileRequest,
};
