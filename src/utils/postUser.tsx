import { User } from "../types/User";

export const addUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await fetch("http://localhost:3003/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Failed to add user: ${response.statusText}`);
  }

  const data: User = await response.json();
  return data;
};
