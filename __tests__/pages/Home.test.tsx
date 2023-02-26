import Home from "@/pages";
import { describe, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
describe("Home", () => {
  it("renders a heading", async () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /pokeapi sample/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
