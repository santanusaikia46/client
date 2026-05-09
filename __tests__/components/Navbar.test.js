import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders brand logo and basic links", () => {
    useAuth.mockReturnValue({
      isAdmin: false,
      isAuthenticated: false,
      isLoading: false,
      user: null,
      logout: jest.fn(),
    });

    render(<Navbar />);
    
    expect(screen.getByText("TatiAssam")).toBeInTheDocument();
    expect(screen.getAllByText("Women")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Men")[0]).toBeInTheDocument();
  });

  it("shows Login and Sign up buttons when not authenticated", () => {
    useAuth.mockReturnValue({
      isAdmin: false,
      isAuthenticated: false,
      isLoading: false,
      user: null,
      logout: jest.fn(),
    });

    render(<Navbar />);
    
    expect(screen.getAllByText("Login")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Sign up")[0]).toBeInTheDocument();
    expect(screen.queryByText("My Profile")).not.toBeInTheDocument();
  });

  it("shows user dropdown when authenticated", () => {
    useAuth.mockReturnValue({
      isAdmin: false,
      isAuthenticated: true,
      isLoading: false,
      user: { name: "John Doe" },
      logout: jest.fn(),
    });

    render(<Navbar />);
    
    expect(screen.getByText("J")).toBeInTheDocument(); // Avatar initial
    expect(screen.getAllByText("My Profile")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Logout")[0]).toBeInTheDocument();
    expect(screen.queryByText("Command Centre")).not.toBeInTheDocument();
  });

  it("shows Command Centre link for admin users", () => {
    useAuth.mockReturnValue({
      isAdmin: true,
      isAuthenticated: true,
      isLoading: false,
      user: { name: "Admin" },
      logout: jest.fn(),
    });

    render(<Navbar />);
    
    expect(screen.getAllByText("Command Centre")[0]).toBeInTheDocument();
  });

  it("submits search form correctly", () => {
    useAuth.mockReturnValue({
      isAdmin: false,
      isAuthenticated: false,
      isLoading: false,
      user: null,
      logout: jest.fn(),
    });

    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    render(<Navbar />);
    
    // Toggle search open
    const searchToggle = screen.getByLabelText("Toggle search");
    fireEvent.click(searchToggle);

    const searchInput = screen.getByPlaceholderText("Search…");
    fireEvent.change(searchInput, { target: { value: "silk" } });
    
    // Submit form (simulate pressing Enter in input)
    fireEvent.submit(searchInput.closest("form"));

    expect(mockPush).toHaveBeenCalledWith("/products?search=silk");
  });
});
