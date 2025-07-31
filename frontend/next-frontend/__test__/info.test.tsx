import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "@/app/components/Navbar";

describe("Navbar component", () => {
  it("renders logo, title, and navigation links", () => {
    render(<Navbar />);

    expect(screen.getByText("Turtask")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Home/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: /New/i })).toHaveAttribute(
      "href",
      "/tasks/create"
    );
  });
});
