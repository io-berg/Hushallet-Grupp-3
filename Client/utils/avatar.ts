import { Household } from "./type";

export function textToEmoji(icon = "") {
  switch (icon.toLocaleLowerCase()) {
    case "chicken":
      return "🐥";
    case "squid":
      return "🐙";
    case "whale":
      return "🐋";
    case "owl":
      return "🦉";
    case "fox":
      return "🦊";
    case "unicorn":
      return "🦄";
    case "pig":
      return "🐷";
    case "frog":
      return "🐸";
    default:
      return "";
  }
}

export function availibleAvatars(household: Household) {
  let newArray: string[] = [];
  const array = household.profiles;
  array.forEach((profile) => {
    newArray.push(profile.avatar.icon);
  });

  return newArray;
}
