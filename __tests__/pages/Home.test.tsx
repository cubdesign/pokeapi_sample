import Home from "@/pages";
import { describe, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

describe("Home", () => {
  it("renders a heading", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    mockAllIsIntersecting(true);
    await waitFor(() =>
      screen.getByRole("heading", {
        name: /pokeapi sample/i,
      })
    );

    const heading = screen.getByRole("heading", {
      name: /pokeapi sample/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
