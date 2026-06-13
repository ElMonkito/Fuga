import { fireEvent, render, screen } from "@testing-library/react";
import { DateRangePickerField } from "@/components/date-range-picker-field";

describe("DateRangePickerField", () => {
  it("complète une plage de dates quand un départ existe déjà", () => {
    const onChange = vi.fn();

    render(
      <DateRangePickerField
        departureDate="2026-07-10"
        returnDate=""
        onChange={onChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Période de voyage" }));
    fireEvent.click(screen.getAllByRole("button", { name: "15" })[0]);

    expect(onChange).toHaveBeenCalledWith({
      departureDate: "2026-07-10",
      returnDate: "2026-07-15"
    });
  });

  it("inverse la plage si la date choisie est avant le départ", () => {
    const onChange = vi.fn();

    render(
      <DateRangePickerField
        departureDate="2026-07-10"
        returnDate=""
        onChange={onChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Période de voyage" }));
    fireEvent.click(screen.getAllByRole("button", { name: "8" })[0]);

    expect(onChange).toHaveBeenCalledWith({
      departureDate: "2026-07-08",
      returnDate: "2026-07-10"
    });
  });
});
