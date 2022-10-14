interface User {
  id: number;
  userName: string;
  email: string;
}

interface Task {
  id: number;
  household: HouseHold;
  title: string;
  description: string;
  effort: number;
  frequency: number;
}

interface TaskHistory {
  id: number;
  task: Task;
  profile: number;
  date: Date;
}

interface HouseHold {
  id: number;
  name: string;
  code: string;
}

interface Application {
  id: number;
  user: User;
  household: HouseHold;
  accepted: boolean;
}

interface Profile {
  id: number;
  user: User;
  houshold: HouseHold;
  role: "admin" | "user";
  avatar: Avatar;
  name: string;
}

interface Avatar {
  color: string;
  icon: string;
}

export type { User, Task, TaskHistory, HouseHold, Application, Profile, Avatar };
