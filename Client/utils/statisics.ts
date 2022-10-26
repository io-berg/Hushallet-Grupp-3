import { Profile, Task } from "./type";

const today = new Date();

export type statisticsData = {
  overallData: {
    name: string;
    effortPoints: number;
    color: string;
    legendFontColor: string;
    legendBackgroundColor: string;
    legendFontSize: number;
  }[];
  taskData: {
    name: string;
    data: {
      effortPoints: number;
      color: string;
    }[];
  }[];
};

export const mapThisWeeksData = (profiles?: Profile[], Tasks?: Task[]) => {
  if (!profiles || !Tasks) return;
  const midnightToday = new Date();
  midnightToday.setUTCHours(24, 0, 0, 0);

  const thisMonday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 1
  );

  if (!Tasks.some((task) => task.taskHistory?.length > 0)) return;

  const filtered = filterTaskhitoryByDate(Tasks, thisMonday, midnightToday);

  const overallData = getOverAllData(profiles, filtered);
  const perTaskData = getPerTaskData(profiles, filtered);

  return { overallData: overallData, taskData: perTaskData } as statisticsData;
};

export const mapLastWeeksData = (profiles?: Profile[], Tasks?: Task[]) => {
  if (!profiles || !Tasks) return;

  const lastWeekMonday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() - 6
  );
  const thisMonday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 1
  );

  if (!Tasks.some((task) => task.taskHistory?.length > 0)) return;

  const filtered = filterTaskhitoryByDate(Tasks, lastWeekMonday, thisMonday);

  const overallData = getOverAllData(profiles, filtered);
  const perTaskData = getPerTaskData(profiles, filtered);

  return {
    overallData: overallData,
    taskData: perTaskData,
  } as statisticsData;
};

export const mapLastMonthsData = (profiles?: Profile[], Tasks?: Task[]) => {
  if (!profiles || !Tasks) return;

  const lastMonthFirstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0);

  // Not effective but works
  if (!Tasks.some((task) => task.taskHistory?.length > 0)) return;

  const filtered = filterTaskhitoryByDate(Tasks, lastMonthFirstDay, lastMonthLastDay);

  if (!filtered.some((task) => task.taskHistory?.length > 0)) return;

  const overallData = getOverAllData(profiles, filtered);
  const perTaskData = getPerTaskData(profiles, filtered);

  return {
    overallData: overallData,
    taskData: perTaskData,
  } as statisticsData;
};

function filterTaskhitoryByDate(tasks: Task[], startDate: Date, endDate: Date) {
  return tasks.map((task) => {
    const taskHistory = task.taskHistory.filter(
      (history) =>
        new Date(history.date).getTime() >= startDate.getTime() &&
        new Date(history.date).getTime() <= endDate.getTime()
    );

    return {
      ...task,
      taskHistory: taskHistory,
    };
  });
}

function getPerTaskData(profiles: Profile[], tasks: Task[]) {
  const points = tasks?.map((task) => {
    const mappedTaskData = profiles?.map((profile) => {
      const profileEffortPoints =
        task.taskHistory.filter((history) => history.profileId === profile.id).length * task.effort;

      return {
        effortPoints: profileEffortPoints,
        color: profile.avatar.color,
      };
    });

    return {
      name: task.title,
      data: mappedTaskData,
    };
  });

  const filteredPoints = points?.filter((task) => {
    return task.data?.some((profile) => profile.effortPoints > 0);
  });

  return filteredPoints;
}

function getOverAllData(profiles: Profile[], tasks: Task[]) {
  const points = profiles?.map((profile) => {
    const profileTasks = tasks?.map((task) => {
      const taskHistory = task.taskHistory.filter((history) => history.profileId === profile.id);
      return {
        ...task,
        taskHistory: taskHistory,
      };
    });
    const profileEffortPoints = profileTasks?.reduce(
      (acc, task) => acc + task.taskHistory.length * task.effort,
      0
    );

    return {
      name: profile.name,
      effortPoints: profileEffortPoints,
      avatar: profile.avatar,
    };
  });

  const mappedData = points?.map((values) => {
    return {
      name: values.avatar.icon,
      effortPoints: values.effortPoints,
      color: values.avatar.color,
      legendFontColor: "#7F7F7F",
      legendBackgroundColor: "#C9C9C9",
      legendFontSize: 17,
    };
  });

  const hasNoData = mappedData?.every((data) => data.effortPoints === 0);

  if (hasNoData) return [];

  return mappedData;
}
