import { Household } from "./type";

export const LegalAvatarColorCombos = [
  { icon: "🐙", color: "#ee7e86" },
  { icon: "🦊", color: "#f7ad71" },
  { icon: "🦄", color: "#f795e0" },
  { icon: "🐋", color: "#94c3f9" },
  { icon: "🦉", color: "#bc9991" },
  { icon: "🐷", color: "#f9c9c9" },
  { icon: "🐸", color: "#79f189" },
  { icon: "🐥", color: "#f1ec79" },
];

export function availibleAvatars(household: Household) {
  const newArray: string[] = [];
  const array = household.profiles;
  array.forEach((profile) => {
    newArray.push(profile.avatar.icon);
  });

  return newArray;
}
