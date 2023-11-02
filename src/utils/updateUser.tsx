import { User } from "../types/User";

export const updateUser = async (user: User): Promise<void> => {
  const response = await fetch(`http://localhost:3003/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to update user");
  }
};
