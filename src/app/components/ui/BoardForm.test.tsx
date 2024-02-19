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
    const useSeafarersCheckbox: HTMLInputElement = screen.getByTestId(
      "use-seafarers-checkbox",
    );
    const randAlgorithmSelector: HTMLSelectElement = screen.getByTestId(
      "rand-algorithm-selector",
    );
    const players4Radio: HTMLInputElement =
      screen.getByTestId("players-4-radio");
    const players6Radio: HTMLInputElement =
      screen.getByTestId("players-6-radio");
    const submitButton: HTMLButtonElement = screen.getByTestId("submit-button");

    expect(useSeafarersCheckbox.checked).toBe(false);
    expect(randAlgorithmSelector.length).toBe(ALGORITHMS_BASE.length);
    expect(randAlgorithmSelector.selectedOptions[0].value).toBe(
      ALGORITHM_RANDOM,
    );
    expect(players4Radio.checked).toBe(true);
    expect(players6Radio.checked).toBe(false);
    expect(submitButton.textContent).toBe("Generate");
  });
  it("should change select values when use-seafarers is checked", async () => {
    const user = userEvent.setup();
    const useSeafarersCheckbox: HTMLInputElement = screen.getByTestId(
      "use-seafarers-checkbox",
    );
    const randAlgorithmSelector: HTMLSelectElement = screen.getByTestId(
      "rand-algorithm-selector",
    );

    await user.click(useSeafarersCheckbox);
    await user.selectOptions(randAlgorithmSelector, ALGORITHM_COASTAL);

    expect(randAlgorithmSelector.length).toBe(ALGORITHMS_SEAFARERS.length);
    expect(randAlgorithmSelector.selectedOptions[0].value).toBe(
      ALGORITHM_COASTAL,
    );
  });
});
