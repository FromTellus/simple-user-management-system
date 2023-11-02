import {
  render,
  fireEvent,
  screen,
} from "@testing-library/react";
import UserList from "./UserList"; 

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    dateOfBirth: "2000-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    dateOfBirth: "1990-12-12",
  },
];

describe("<UserList />", () => {
  it("renders users", () => {
    const { getByText } = render(<UserList users={mockUsers} />);
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("jane@example.com")).toBeInTheDocument();
  });

  it("allows editing of user information", () => {
    const { getByText, getByDisplayValue } = render(
      <UserList users={mockUsers} />
    );
    const editButtons = screen.getAllByText("Redigera");
    fireEvent.click(editButtons[0]);

    const nameInput = getByDisplayValue("John Doe");
    expect(nameInput).not.toBeDisabled();
  });

  it("updates user information", () => {
    const onUpdateUser = jest.fn();
    const { getByText, getByDisplayValue } = render(
      <UserList users={mockUsers} onUpdateUser={onUpdateUser} />
    );

    
    const editButtons = screen.getAllByText("Redigera");
    fireEvent.click(editButtons[0]);

    
    const nameInput = getByDisplayValue("John Doe");
    fireEvent.change(nameInput, { target: { value: "John Updated" } });

    
    const updateButton = getByText("Uppdatera");
    fireEvent.click(updateButton);

    expect(onUpdateUser).toHaveBeenCalledWith({
      ...mockUsers[0],
      name: "John Updated",
    });
  });

  it("deletes users", () => {
    const onDeleteUser = jest.fn();
    const { getAllByText } = render(
      <UserList users={mockUsers} onDeleteUser={onDeleteUser} />
    );

    const deleteButtons = getAllByText("Ta bort");
    fireEvent.click(deleteButtons[0]); 

    expect(onDeleteUser).toHaveBeenCalledWith(mockUsers[0].id);
  });
});
