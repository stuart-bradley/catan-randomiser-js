import { ALGORITHM_COASTAL, ALGORITHM_RANDOM } from "../../src/lib/constants";

describe("BoardForm", () => {
  it("should display a random board on submit", () => {
    cy.visit("http://localhost:3000/");

    // Assert form is in base state.
    cy.get('[data-testid="use-seafarers-checkbox"]').should("not.be.checked");
    cy.get('[data-testid="rand-algorithm-selector"] option:selected').should(
      "have.value",
      ALGORITHM_RANDOM,
    );
    cy.get('[data-testid="rand-algorithm-selector"] option').should(
      "not.have.value",
      ALGORITHM_COASTAL,
    );

    // Select the seafarers checkbox. force: true is required due to div overlaying input.
    cy.get('[data-testid="use-seafarers-checkbox"]').check({ force: true });

    // Assert it's possible to select a seafarers algorithm.
    cy.get('[data-testid="rand-algorithm-selector"]').select(ALGORITHM_COASTAL);

    cy.get('[data-testid="submit-button"]').click();
    // Top level node of an SVG is a single <g>, so to check hexagons we have to go a level lower.
    cy.get('[data-testid="hexgrid-svg"]')
      .children()
      .first()
      .should("have.descendants", "g.hexagon-group");
  });
});
