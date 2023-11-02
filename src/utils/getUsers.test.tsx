import { getUsers } from "./getUsers"; //
import { User } from "../types/User";

global.fetch = jest.fn();

describe("getUsers function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch users from the correct endpoint", async () => {
    const mockUsers: User[] = [
      { id: "1", name: "John", email: "john@example.com" },
      { id: "2", name: "Jane", email: "jane@example.com" },
    ];
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    } as any);

    const result = await getUsers();

    expect(fetch).toHaveBeenCalledWith("http://localhost:3003/users");
    expect(result).toEqual(mockUsers);
  });

  it("should throw an error if the fetch fails", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error("Fetch failed")
    );

    await expect(getUsers()).rejects.toThrow("Fetch failed");
  });
});
