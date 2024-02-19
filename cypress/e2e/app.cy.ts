import { ALGORITHM_COASTAL, ALGORITHM_RANDOM } from "../../src/lib/constants";

describe("BoardForm", () => {
  it("should have all the correct input elements", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-cy="use-seafarers-checkbox"]').should("not.be.checked");

    cy.get('[data-cy="rand-algorithm-selector"] option:selected').should(
      "have.value",
      ALGORITHM_RANDOM,
    );

    cy.get('[data-cy="players-4-radio"]').should("be.checked");
    cy.get('[data-cy="players-6-radio"]').should("not.be.checked");

    cy.get('[data-cy="submit-button"]').should("have.text", "Generate");
  });
  it("should change select values when use-seafarers is checked", () => {
    cy.visit("http://localhost:3000/");

    // Assert form is in base state.
    cy.get('[data-cy="use-seafarers-checkbox"]').should("not.be.checked");
    cy.get('[data-cy="rand-algorithm-selector"] option:selected').should(
      "have.value",
      ALGORITHM_RANDOM,
    );
    cy.get('[data-cy="rand-algorithm-selector"] option').should(
      "not.have.value",
      ALGORITHM_COASTAL,
    );

    // Select the seafarers checkbox. force: true is required due to div overlaying input.
    cy.get('[data-cy="use-seafarers-checkbox"]').check({ force: true });
    cy.get('[data-cy="use-seafarers-checkbox"]').should("be.checked");

    cy.wait(5000);

    // Assert it's possible to select a seafarers algorithm.
    cy.get('[data-cy="rand-algorithm-selector"]').select(1);
    cy.get('[data-cy="rand-algorithm-selector"] option:selected').should(
      "have.value",
      ALGORITHM_COASTAL,
    );
  });
  it("should display a random board on submit", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-cy="submit-button"]').click();
    // Top level node of an SVG is a single <g>, so to check hexagons we have to go a level lower.
    cy.get('[data-cy="hexgrid-svg"]')
      .children()
      .first()
      .should("have.descendants", "g.hexagon-group");
  });
});
