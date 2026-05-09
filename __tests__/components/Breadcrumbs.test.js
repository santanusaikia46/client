import { render, screen } from "@testing-library/react";
import Breadcrumbs from "../../components/Breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders null if items array is empty or undefined", () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders correct number of items", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Details", href: "/products/1" },
    ];
    
    render(<Breadcrumbs items={items} />);
    
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    
    // There should be two separators for three items
    expect(screen.getAllByText("/")).toHaveLength(2);
  });

  it("does not render link for the last item", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
    ];
    
    render(<Breadcrumbs items={items} />);
    
    const homeLink = screen.getByText("Home");
    expect(homeLink.tagName).toBe("A");
    expect(homeLink).toHaveAttribute("href", "/");

    const productsSpan = screen.getByText("Products");
    expect(productsSpan.tagName).toBe("SPAN");
    expect(productsSpan).toHaveAttribute("aria-current", "page");
  });
});
