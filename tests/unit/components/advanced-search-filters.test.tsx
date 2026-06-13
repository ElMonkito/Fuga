import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { AdvancedSearchFilters } from "@/components/advanced-search-filters";

const replace = vi.fn();
let currentPathname = "/recherche";
let currentSearchParams = new URLSearchParams(
  "destination=Espagne&country=Portugal&tag=Ville&budget=450"
);

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace
  }),
  usePathname: () => currentPathname,
  useSearchParams: () => currentSearchParams
}));

describe("AdvancedSearchFilters", () => {
  beforeEach(() => {
    replace.mockReset();
    currentPathname = "/recherche";
    currentSearchParams = new URLSearchParams(
      "destination=Espagne&country=Portugal&tag=Ville&budget=450"
    );
  });

  it("met à jour le pays sélectionné dans les paramètres", () => {
    render(
      <AdvancedSearchFilters
        countries={["Portugal", "Espagne"]}
        departureLabels={["Vendredi"]}
        tags={["Ville", "Plage"]}
      />
    );

    fireEvent.change(screen.getByLabelText("Pays"), {
      target: { value: "Espagne" }
    });

    expect(replace).toHaveBeenCalledWith(
      "/recherche?destination=Espagne&country=Espagne&tag=Ville&budget=450"
    );
  });

  it("réinitialise les filtres avancés sans perdre la destination", () => {
    render(
      <AdvancedSearchFilters
        countries={["Portugal", "Espagne"]}
        departureLabels={["Vendredi"]}
        tags={["Ville", "Plage"]}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Réinitialiser" }));

    expect(replace).toHaveBeenCalledWith("/recherche?destination=Espagne");
  });
});
