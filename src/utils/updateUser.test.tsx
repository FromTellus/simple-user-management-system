import { updateUser } from "./updateUser";
import { User } from "../types/User";

global.fetch = jest.fn();

describe("updateUser", () => {
  beforeEach(() => {
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  it("should successfully update a user without throwing an error", async () => {
    const mockUser: User = {
      id: "123",
      name: "John Updated",
      email: "john.updated@example.com",
      dateOfBirth: "2001-01-01",
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as any);

    await expect(updateUser(mockUser)).resolves.not.toThrow();
  });

  it("should throw an error when the response is not ok", async () => {
    const mockUser: User = {
      id: "123",
      name: "John Updated",
      email: "john.updated@example.com",
      dateOfBirth: "2001-01-01",
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Error updating user" }),
    } as any);

    await expect(updateUser(mockUser)).rejects.toThrow("Error updating user");
  });

  it("should send correct request details when updating a user", async () => {
    const mockUser: User = {
      id: "123",
      name: "John Updated",
      email: "john.updated@example.com",
      dateOfBirth: "2001-01-01",
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as any);

    await updateUser(mockUser);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:3003/users/${mockUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockUser),
      }
    );
  });
});
