import { fireEvent, render, screen } from "@testing-library/react";
import { HomeDiscovery } from "@/components/home-discovery";
import type { CountryTile } from "@/components/country-explorer";

const countries: CountryTile[] = [
  {
    name: "Espagne",
    offers: 5,
    image: "https://images.unsplash.com/photo-1",
    keywords: ["Plage", "Ville", "Culture"]
  },
  {
    name: "Croatie",
    offers: 4,
    image: "https://images.unsplash.com/photo-2",
    keywords: ["Plage", "Nature", "Aventure"]
  },
  {
    name: "Allemagne",
    offers: 4,
    image: "https://images.unsplash.com/photo-3",
    keywords: ["Ville", "Culture", "Aventure"]
  }
];

describe("HomeDiscovery", () => {
  it("affiche les pays triés par nombre d'offres puis alphabétiquement", () => {
    render(
      <HomeDiscovery
        heroImage="https://images.unsplash.com/photo-hero"
        tagline="Partis vite"
        subtitle="Trouve une destination"
        countries={countries}
      />
    );

    const links = screen.getAllByTestId("country-tile");
    expect(links[0]).toHaveTextContent("Espagne");
    expect(links[1]).toHaveTextContent("Allemagne");
    expect(links[2]).toHaveTextContent("Croatie");
  });

  it("filtre les pays via les mots-clés saisis", () => {
    render(
      <HomeDiscovery
        heroImage="https://images.unsplash.com/photo-hero"
        tagline="Partis vite"
        subtitle="Trouve une destination"
        countries={countries}
      />
    );

    fireEvent.change(screen.getByLabelText("Recherche de pays"), {
      target: { value: "plage" }
    });

    expect(screen.getByText("Espagne")).toBeInTheDocument();
    expect(screen.getByText("Croatie")).toBeInTheDocument();
    expect(screen.queryByText("Allemagne")).not.toBeInTheDocument();
  });
});
