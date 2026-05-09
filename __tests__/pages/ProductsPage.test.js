import { render, screen, waitFor } from "@testing-library/react";
import ProductsPage from "../../app/products/page";

// Mock child components that might have complex logic or styling
jest.mock("../../components/FilterSidebar", () => () => <div data-testid="filter-sidebar" />);
jest.mock("../../components/ActiveFilters", () => () => <div data-testid="active-filters" />);
jest.mock("../../components/Breadcrumbs", () => () => <nav data-testid="breadcrumbs" />);

describe("Products Page Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading skeletons initially", () => {
    // Unresolved promise to keep it in loading state
    global.fetch.mockImplementationOnce(() => new Promise(() => {}));

    const { container } = render(<ProductsPage />);
    
    // Check if the skeleton loading divs are present
    const skeletons = container.querySelectorAll("div[class*='skeleton']");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders products after fetching", async () => {
    const mockProducts = [
      { _id: "1", name: "Test Product 1", price: 100, image: "/img1.jpg", category: "Women", countInStock: 5 },
      { _id: "2", name: "Test Product 2", price: 200, image: "/img2.jpg", category: "Men", countInStock: 5 },
    ];

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockProducts }),
      })
    );

    render(<ProductsPage />);

    // Wait for the fetch to resolve and the loading state to disappear
    await waitFor(() => {
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
      expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    });

    expect(screen.getByText("2 Results")).toBeInTheDocument();
    expect(screen.getByTestId("filter-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("active-filters")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  it("renders empty state if no products match", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, data: [] }),
      })
    );

    render(<ProductsPage />);

    await waitFor(() => {
      expect(screen.getByText("No products found.")).toBeInTheDocument();
    });
    
    expect(screen.getByText("0 Results")).toBeInTheDocument();
  });
});
