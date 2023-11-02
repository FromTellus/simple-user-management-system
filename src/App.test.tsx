import {
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import { getUsers } from "./utils/getUsers";
import { deleteUser } from "./utils/deleteUser";
import { updateUser } from "./utils/updateUser";
import { MOCK_USERS } from "./mockdata";

// Mock the utilities
jest.mock("./utils/getUsers");
jest.mock("./utils/deleteUser");
jest.mock("./utils/updateUser");

describe("<App />", () => {
  beforeEach(() => {
    (getUsers as jest.Mock).mockResolvedValue(MOCK_USERS);
    (deleteUser as jest.Mock).mockResolvedValue(null);
    (updateUser as jest.Mock).mockResolvedValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the app and toggle placeholder mode", async () => {
    const { getByText, queryByText } = render(<App />);

    expect(getByText("Toggle Database Mode")).toBeInTheDocument();

    fireEvent.click(getByText("Toggle Database Mode"));

    await waitFor(() => {
      expect(queryByText("Toggle Placeholder Mode")).toBeInTheDocument();
    });
  });
});
