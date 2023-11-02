export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3003/users/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the user.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
