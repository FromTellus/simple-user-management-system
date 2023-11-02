import { addUser } from "./postUser";
import { User } from "../types/User";

global.fetch = jest.fn();

describe("addUser", () => {
  beforeEach(() => {
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  it("should successfully add a user and return the added user", async () => {
    const mockUser: User = {
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      dateOfBirth: "2000-01-01",
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    } as any);

    const newUser = await addUser({
      name: "John Doe",
      email: "john@example.com",
      dateOfBirth: "2000-01-01",
    });
    expect(newUser).toEqual(mockUser);
  });

  it("should throw an error when the response is not ok", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      statusText: "Bad Request",
      json: async () => ({ message: "Error" }),
    } as any);

    await expect(
      addUser({
        name: "John Doe",
        email: "john@example.com",
        dateOfBirth: "2000-01-01",
      })
    ).rejects.toThrow("Failed to add user: Bad Request");
  });

  it("should send correct request details", async () => {
    const mockUser: User = {
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      dateOfBirth: "2000-01-01",
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    } as any);

    await addUser({
      name: "John Doe",
      email: "john@example.com",
      dateOfBirth: "2000-01-01",
    });

    expect(fetch).toHaveBeenCalledWith("http://localhost:3003/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        dateOfBirth: "2000-01-01",
      }),
    });
  });
});
