import Home from "@/pages";
import { describe, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
describe("Home", () => {
  it("renders a heading", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    const heading = screen.getByRole("heading", {
      name: /pokeapi sample/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
