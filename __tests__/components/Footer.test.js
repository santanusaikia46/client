import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../../components/Footer";
import { useToast } from "../../context/ToastContext";

jest.mock("../../context/ToastContext", () => ({
  useToast: jest.fn(),
}));

describe("Footer Component", () => {
  let addToastMock;

  beforeEach(() => {
    addToastMock = jest.fn();
    useToast.mockReturnValue({ addToast: addToastMock });
    jest.clearAllMocks();
  });

  it("renders the footer sections correctly", () => {
    render(<Footer />);
    
    expect(screen.getByText("TatiAssam")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
    expect(screen.getByText("Stay in the Loop")).toBeInTheDocument();
  });

  it("submits the newsletter form and shows a toast", () => {
    render(<Footer />);
    
    const emailInput = screen.getByPlaceholderText("your@email.com");
    const subscribeButton = screen.getByRole("button", { name: "Subscribe" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(subscribeButton);

    expect(addToastMock).toHaveBeenCalledWith("Thanks for subscribing!", "success");
  });
});
