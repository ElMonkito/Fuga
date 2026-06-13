import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { SearchStrip } from "@/components/search-strip";

const push = vi.fn();
let currentSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push
  }),
  useSearchParams: () => currentSearchParams
}));

describe("SearchStrip", () => {
  beforeEach(() => {
    push.mockReset();
    currentSearchParams = new URLSearchParams();
  });

  it("préremplit les valeurs par défaut et pousse la bonne URL de recherche", () => {
    render(
      <SearchStrip
        defaultDestination="Espagne"
        defaultDepartureDate="2026-07-01"
        defaultReturnDate="2026-07-07"
        defaultBudget="300"
      />
    );

    fireEvent.change(screen.getByLabelText("Destination"), {
      target: { value: "Italie" }
    });
    fireEvent.change(screen.getByLabelText("Budget"), {
      target: { value: "350" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Chercher" }));

    expect(push).toHaveBeenCalledWith(
      "/recherche?destination=Italie&departureDate=2026-07-01&returnDate=2026-07-07&budget=350"
    );
  });

  it("affiche le budget modifié en direct", () => {
    render(<SearchStrip defaultBudget="450" />);

    fireEvent.change(screen.getByLabelText("Budget"), {
      target: { value: "520" }
    });

    expect(screen.getByText("520 CHF")).toBeInTheDocument();
  });
});
