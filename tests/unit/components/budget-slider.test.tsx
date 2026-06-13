import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { BudgetSlider } from "@/components/budget-slider";

const replace = vi.fn();
let currentPathname = "/recherche";
let currentSearchParams = new URLSearchParams("destination=Espagne&budget=450");

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace
  }),
  usePathname: () => currentPathname,
  useSearchParams: () => currentSearchParams
}));

describe("BudgetSlider", () => {
  beforeEach(() => {
    replace.mockReset();
    currentPathname = "/recherche";
    currentSearchParams = new URLSearchParams("destination=Espagne&budget=450");
  });

  it("met à jour le paramètre budget dans l'URL", () => {
    render(<BudgetSlider defaultValue={450} min={150} max={750} step={10} />);

    fireEvent.change(screen.getByLabelText("Budget max"), {
      target: { value: "320" }
    });

    expect(replace).toHaveBeenCalledWith("/recherche?destination=Espagne&budget=320");
    expect(screen.getByText("320 CHF")).toBeInTheDocument();
  });
});
