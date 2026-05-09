import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "../../components/AuthForm";

// Mock the AuthContext
jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

describe("AuthForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form correctly", () => {
    render(<AuthForm mode="login" />);
    
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Minimum 6 characters")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Jane Doe")).not.toBeInTheDocument();
  });

  it("renders signup form correctly", () => {
    render(<AuthForm mode="signup" />);
    
    expect(screen.getByText("Create your account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Minimum 6 characters")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Signup" })).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    render(<AuthForm mode="login" />);
    
    const emailInput = screen.getByPlaceholderText("you@example.com");
    const passwordInput = screen.getByPlaceholderText("Minimum 6 characters");
    const submitButton = screen.getByRole("button", { name: "Login" });

    await userEvent.type(emailInput, "invalidemail");
    await userEvent.type(passwordInput, "password123");
    
    fireEvent.click(submitButton);

    expect(await screen.findByText("Please enter a valid email address.")).toBeInTheDocument();
  });

  it("shows validation error for short password", async () => {
    render(<AuthForm mode="login" />);
    
    const emailInput = screen.getByPlaceholderText("you@example.com");
    const passwordInput = screen.getByPlaceholderText("Minimum 6 characters");
    const submitButton = screen.getByRole("button", { name: "Login" });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "123");
    
    fireEvent.click(submitButton);

    expect(await screen.findByText("Password must be at least 6 characters long.")).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    // Mock successful fetch
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: "fake-token", user: { name: "Test" } }),
      })
    );

    // Mock API base URL
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:5000";

    render(<AuthForm mode="login" />);
    
    const emailInput = screen.getByPlaceholderText("you@example.com");
    const passwordInput = screen.getByPlaceholderText("Minimum 6 characters");
    const submitButton = screen.getByRole("button", { name: "Login" });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5000/api/auth/login",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "test@example.com", password: "password123" }),
        })
      );
    });
  });
});
