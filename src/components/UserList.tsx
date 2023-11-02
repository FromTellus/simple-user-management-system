import React, { useState } from "react";
import { User } from "../types/User";
import { updateUser } from "../utils/updateUser";

interface UserListProps {
  users: User[];
  onDeleteUser?: (userId: string) => void;
  onUpdateUser?: (updatedUser: User) => void;
  onDeletedUser?: (deletedUser: User) => void;
}

interface EditingState {
  userId: string;
}

const UserList: React.FC<UserListProps> = ({
  users = [],
  onDeleteUser,
  onUpdateUser,
}) => {
  const [editValues, setEditValues] = useState<User | null>(null);

  const [editingState, setEditingState] = useState<EditingState | null>(null);

  const handleEditClick = (userId: string) => {
    if (isEditing({ id: userId })) {
      if (editValues && onUpdateUser) {
        onUpdateUser(editValues);
      }
      setEditingState(null);
      setEditValues(null);
    } else {
      const userToEdit = users.find((user) => user.id === userId);
      setEditingState({ userId });
      setEditValues(userToEdit || null);
    }
  };

  if (!Array.isArray(users)) {
    return <div>Loading...</div>;
  }
  const isEditing = (user: User) => {
    return editingState?.userId === user.id;
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Namn</th>
          <th>E-post</th>
          <th>Födelsedatum</th>
          <th>Åtgärder</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <input
                type="text"
                value={
                  isEditing(user) && editValues ? editValues.name : user.name
                }
                onChange={(e) =>
                  setEditValues((prev) =>
                    prev ? { ...prev, name: e.target.value } : null
                  )
                }
                disabled={!isEditing(user)}
              />
            </td>
            <td>
              <input
                type="email"
                value={
                  isEditing(user) && editValues ? editValues.email : user.email
                }
                onChange={(e) =>
                  setEditValues((prev) =>
                    prev ? { ...prev, email: e.target.value } : null
                  )
                }
                disabled={!isEditing(user)}
              />
            </td>
            <td>
              <input
                type="date"
                value={
                  isEditing(user) && editValues
                    ? editValues.dateOfBirth?.substring(0, 10) || ""
                    : user.dateOfBirth?.substring(0, 10) || ""
                }
                onChange={(e) =>
                  setEditValues((prev) =>
                    prev ? { ...prev, dateOfBirth: e.target.value } : null
                  )
                }
                disabled={!isEditing(user)}
              />
            </td>

            <td>
              <button onClick={() => handleEditClick(user.id)}>
                {isEditing(user) ? "Uppdatera" : "Redigera"}
              </button>
              <button onClick={() => onDeleteUser && onDeleteUser(user.id)}>
                Ta bort
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
