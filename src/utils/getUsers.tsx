import { User } from "../types/User";

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch("http://localhost:3003/users");
  if (!response.ok) {
    throw new Error("Failed to get the users.");
  }
  const data = await response.json();
  return data;
};
