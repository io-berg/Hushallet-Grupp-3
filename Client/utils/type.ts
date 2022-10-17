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
}

interface Application {
  id: number;
  user: User;
  household: Household;
  accepted: boolean;
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
}

export type { User, Task, TaskHistory, Household, Application, Profile, Avatar };
