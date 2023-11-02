import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import UserForm from "./UserForm";
import { addUser } from "../utils/postUser";

jest.mock("../utils/postUser");

describe("<UserForm />", () => {
  it("renders without crashing", () => {
    const mockFn = jest.fn();
    render(<UserForm onAddUser={mockFn} usePlaceholderData={true} />);
  });

  it("updates input fields correctly", () => {
    const mockFn = jest.fn();
    const { getByPlaceholderText } = render(
      <UserForm onAddUser={mockFn} usePlaceholderData={true} />
    );

    const nameInput = getByPlaceholderText("Namn") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Ulf Doe" } });
    expect(nameInput.value).toBe("Ulf Doe");
  });

  it("calls onAddUser with mock data when usePlaceholderData is true", async () => {
    const mockFn = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <UserForm onAddUser={mockFn} usePlaceholderData={true} />
    );

    fireEvent.change(getByPlaceholderText("Namn"), {
      target: { value: "Ulf Doe" },
    });
    fireEvent.change(getByPlaceholderText("E-post"), {
      target: { value: "Ulf@example.com" },
    });
    fireEvent.submit(getByText("Lägg till"));

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalled();
      const user = mockFn.mock.calls[0][0];
      expect(user.name).toBe("Ulf Doe");
      expect(user.email).toBe("Ulf@example.com");
    });
  });

  it("calls addUser and onAddUser when usePlaceholderData is false", async () => {
    const mockFn = jest.fn();
    const mockAddedUser = {
      id: "test-id",
      name: "Ulf Doe",
      email: "Ulf@example.com",
      dateOfBirth: "1990-01-01",
    };
    (addUser as jest.Mock).mockResolvedValue(mockAddedUser);

    const { getByPlaceholderText, getByText } = render(
      <UserForm onAddUser={mockFn} usePlaceholderData={false} />
    );

    fireEvent.change(getByPlaceholderText("Namn"), {
      target: { value: "Ulf Doe" },
    });
    fireEvent.change(getByPlaceholderText("E-post"), {
      target: { value: "Ulf@example.com" },
    });
    fireEvent.submit(getByText("Lägg till"));

    await waitFor(() => {
      expect(addUser).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledWith(mockAddedUser);
    });
  });
});
