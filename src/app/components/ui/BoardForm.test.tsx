import { render, screen, cleanup } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import BoardForm from "./BoardForm";
import { describe, it, expect, beforeEach } from "vitest";
import {
  ALGORITHM_COASTAL,
  ALGORITHM_RANDOM,
  ALGORITHMS_BASE,
  ALGORITHMS_SEAFARERS,
} from "../../../lib/constants";

describe("BoardFrom", () => {
  beforeEach(async () => {
    render(<BoardForm />);

    return async () => {
      cleanup();
    };
  });
  it("should render properly", () => {
    const randAlgorithmSelector: HTMLSelectElement = screen.getByTestId(
      "rand-algorithm-selector",
    );

    expect(
      screen.getByTestId<HTMLInputElement>("use-seafarers-checkbox").checked,
    ).toBe(false);
    expect(randAlgorithmSelector.length).toBe(ALGORITHMS_BASE.length);
    expect(randAlgorithmSelector.selectedOptions[0].value).toBe(
      ALGORITHM_RANDOM,
    );
    expect(
      screen.getByTestId<HTMLInputElement>("players-4-radio").checked,
    ).toBe(true);
    expect(
      screen.getByTestId<HTMLInputElement>("players-6-radio").checked,
    ).toBe(false);
    expect(
      screen.getByTestId<HTMLButtonElement>("submit-button").textContent,
    ).toBe("Generate");
  });
  it("should change select values when use-seafarers is checked", async () => {
    const user = userEvent.setup();
    const randAlgorithmSelector: HTMLSelectElement = screen.getByTestId(
      "rand-algorithm-selector",
    );

    await user.click(
      screen.getByTestId<HTMLInputElement>("use-seafarers-checkbox"),
    );
    await user.selectOptions(randAlgorithmSelector, ALGORITHM_COASTAL);

    expect(randAlgorithmSelector.length).toBe(ALGORITHMS_SEAFARERS.length);
    expect(randAlgorithmSelector.selectedOptions[0].value).toBe(
      ALGORITHM_COASTAL,
    );
  });
});
