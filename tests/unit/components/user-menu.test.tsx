import { fireEvent, render, screen } from "@testing-library/react";
import type { Session } from "next-auth";
import { vi } from "vitest";
import { UserMenu } from "@/components/user-menu";

const { signOut } = vi.hoisted(() => ({
  signOut: vi.fn()
}));

vi.mock("next-auth/react", () => ({
  signOut
}));

describe("UserMenu", () => {
  beforeEach(() => {
    signOut.mockReset();
  });

  it("affiche le lien login quand l'utilisateur est déconnecté", () => {
    render(<UserMenu session={null} />);

    const loginLink = screen.getByRole("link", { name: "Login" });
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("ouvre le menu du compte et permet la déconnexion", () => {
    const session = {
      user: {
        id: "user_1",
        firstName: "Valentin",
        lastName: "Durand",
        email: "valentin@example.com"
      },
      expires: "2099-01-01T00:00:00.000Z"
    } satisfies Session;

    render(<UserMenu session={session} />);

    fireEvent.click(screen.getByRole("button", { name: /Valentin/i }));

    expect(screen.getByRole("link", { name: "Mon compte" })).toHaveAttribute("href", "/compte");

    fireEvent.click(screen.getByRole("button", { name: "Se déconnecter" }));

    expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/" });
  });
});
