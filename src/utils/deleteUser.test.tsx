import { deleteUser } from "./deleteUser";

global.fetch = jest.fn();

describe("deleteUser function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully delete a user", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as any);

    await deleteUser("123");

    expect(fetch).toHaveBeenCalledWith("http://localhost:3003/users/123", {
      method: "DELETE",
    });
  });

  it("should throw an error if the response is not ok", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
    } as any);

    await expect(deleteUser("123")).rejects.toThrow(
      "Failed to delete the user."
    );

    expect(fetch).toHaveBeenCalledWith("http://localhost:3003/users/123", {
      method: "DELETE",
    });
  });

  it("should throw an error on fetch failure", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error("Fetch failed")
    );

    await expect(deleteUser("123")).rejects.toThrow("Fetch failed");
  });
});
