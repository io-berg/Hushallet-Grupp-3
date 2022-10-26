interface User {
  username: string;
  email: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  effort: number;
  frequency: number;
  taskHistory: TaskHistory[];
}

interface TaskHistory {
  id: number;
  profileId: number;
  date: string;
}

interface Household {
  id: number;
  name: string;
  code: string;
  profiles: Profile[];
  tasks: Task[];
  applications: Application[];
}

interface Application {
  id: number;
  username: string;
  email: string;
}

interface Profile {
  id: number;
  user: User;
  role: "admin" | "user";
  avatar: Avatar;
  name: string;
}

interface Avatar {
  color: string;
  icon: string;
  token: boolean;
}

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

export type { User, Task, TaskHistory, Household, Application, Profile, Avatar };
