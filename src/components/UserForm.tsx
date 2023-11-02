import React, { useState } from "react";
import { User } from "../types/User";
import { addUser } from "../utils/postUser";

interface UserFormProps {
  onAddUser: (user: User) => void;
  usePlaceholderData: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  onAddUser,
  usePlaceholderData,
}) => {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    dateOfBirth: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (usePlaceholderData) {
      // Mock the addition of a user
      const mockId = Math.random().toString(36).substr(2, 9); // Generate a random ID for mock purposes
      const mockUser: User = { ...formData, id: mockId };
      onAddUser(mockUser);
      setFormData({ name: "", email: "", dateOfBirth: "" });
    } else {
      // Use the actual API to add a user
      try {
        const addedUser = await addUser(formData);
        onAddUser(addedUser);
        setFormData({ name: "", email: "", dateOfBirth: "" });
      } catch (error) {
        console.error("Error adding user:", error);
        // Optionally, handle the error further
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Namn"
        onChange={handleChange}
        value={formData.name}
      />
      <input
        type="email"
        name="email"
        placeholder="E-post"
        onChange={handleChange}
        value={formData.email}
      />
      <input
        type="date"
        name="dateOfBirth"
        placeholder="Födelsedatum"
        onChange={handleChange}
        value={formData.dateOfBirth}
      />
      <button type="submit">Lägg till</button>
    </form>
  );
};

export default UserForm;
