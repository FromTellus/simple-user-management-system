import React, { useState, useEffect } from "react";
import { User } from "./types/User";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { getUsers } from "./utils/getUsers";
import { deleteUser } from "./utils/deleteUser";
import { MOCK_USERS } from "./mockdata";
import { updateUser } from "./utils/updateUser";
import "./styles/global.css";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usePlaceholderData, setUsePlaceholderData] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (usePlaceholderData) {
          setUsers(MOCK_USERS);
        } else {
          const usersFromApi = await getUsers();
          setUsers(usersFromApi);
          setError(null);
        }
      } catch (error) {
        setError("Failed to fetch users.");
        console.error("Failed to fetch users:", error);
      }
    };

    loadUsers();
  }, [usePlaceholderData]);

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      if (!usePlaceholderData) {
        await updateUser(updatedUser);
      }
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      setError(null);
    } catch (error) {
      setError("Failed to update user.");
      console.error("Failed to update user:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      if (!usePlaceholderData) {
        await deleteUser(userId);
      }
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      setError(null);
    } catch (error) {
      setError("Failed to delete user.");
      console.error("Failed to delete user:", error);
    }
  };

  const handleAddUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <div className="centered-container">
      {error && <p className="error-message">{error}</p>}{" "}
      <button className="toggle-button" onClick={() => setUsePlaceholderData(!usePlaceholderData)}>
        Toggle {usePlaceholderData ? "Database Mode" : "Placeholder Mode"}
      </button>
      <UserForm
        onAddUser={handleAddUser}
        usePlaceholderData={usePlaceholderData}
      />
      <UserList
        users={users}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default App;
