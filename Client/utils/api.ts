import { get } from "./localStorage";
import { ErrorResponse, LoginResponse, RegisterResponse, Task, TaskHistory } from "./type";

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

const updateProfileRequest = async (
  householdId: number,
  profileId: number,
  name: string,
  color: string,
  icon: string
) => {
  const response = await fetch(`${url}/household/UpdateProfileInHousehold`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await get("auth.token")}`,
    },
    body: JSON.stringify({
      householdId,
      profileId,
      name,
      color,
      icon,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw response;
};

const createTaskRequest = async (task: Task, householdId: number) => {
  const response = await fetch(`${url}/task/CreateTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await get("auth.token")}`,
    },
    body: JSON.stringify({
      householdId,
      task,
    }),
  });

  if (response.ok) {
    return true;
  }

  throw response;
};

const editTaskRequest = async (task: Task, householdId: number) => {
  const response = await fetch(`${url}/task/EditTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await get("auth.token")}`,
    },
    body: JSON.stringify({
      householdId,
      task,
    }),
  });

  if (response.ok) {
    return true;
  }

  throw response;
};

const createTaskHistoryItemRequest = async (
  householdId: number,
  taskId: number,
  taskHistory: TaskHistory
) => {
  const response = await fetch(`${url}/task/CreateTaskHistory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await get("auth.token")}`,
    },
    body: JSON.stringify({
      Task: taskHistory,
      TaskId: taskId,
      HouseholdId: householdId,
    }),
  });

  if (response.ok) {
    return taskHistory;
  }

  throw response;
};

const deleteTaskRequest = async (task: Task, householdId: number) => {
  const response = await fetch(`${url}/task/DeleteTask`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await get("auth.token")}`,
    },
    body: JSON.stringify({
      householdId,
      task,
    }),
  });

  if (response.ok) {
    return true;
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
  createTaskRequest,
  editTaskRequest,
  createTaskHistoryItemRequest,
  deleteTaskRequest,
};
