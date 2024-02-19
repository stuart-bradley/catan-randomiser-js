# Functional Requirements Specification (FRS)

This document outlines the technical work required to meet the requirements set out by the
[PRD](product_requirements_document.md).

## Description

The project can be broken down into the following units of work. Where possible, these will align with Pull Requests.

### 1 Initial Setup and Documentation

To begin the project, a `Next.js` project (see [Decision Log](decision_logs/decision_log_js_framework.md)) must be
created using the `create-next-app` package. The following functionality should be included during setup:

- Enable Typescript: The app should use the Typescript superset to reduce bugs introduced by dynamic typing.
- Enable ESLint: Development should include ESLint so that the codebase adheres to common standards.
- Enable Tailwind CSS: Tailwind should be used over custom CSS as there are not specific CSS requirements in the PRD
  and this should save development time.

In addition to the above, additional repo functionality should be setup:

- Install Prettier for standardised code formatting.
- Install pre-commit hooks and enable the ESLint and Prettier.
- Setup a Github Action for linting on PRs with ESLint and Prettier.

Finally, documentation should be created to fully document the design and development process. This should consist of:

- [Readme](/README.md)
- [License](/LICENSE)
- [Product Requirements Document (PRD)](product_requirements_document.md)
- Functional Requirements Specification (FRS)
- [Decision Logs](decision_logs)

### 2 React Component Library

In the [PRD](product_requirements_document.md), the Wireframe describes 3 high level components:

- The App.
  - The Canvas.
  - The Form.

#### 2.1 App

The App Component should contain both the Canvas and the Form and provide high-level CSS to generally style the
application.

#### 2.2 Form

The Form Component consists of the following fields:

- A toggle for Seafarers (this differentiates from the PRD as it's noted Cities and Knights does not change
  tile composition).
- An algorithm selector.
  - This will have dynamic options based on the expansions selected.
- A number of players radio group.

Due to the requirement for dynamic select, `React Hook Form` (see [Decision Log](decision_logs/decision_log_form_library.md))
should be used to create the form.

The form should submit a `json` payload to the API endpoint defined in 4.

#### 2.3 Canvas

The Canvas Component should accept a serialised board identifier (see 4.2) and generate a Settlers of Catan board from
this input.

There are a number of options for drawing in HTML elements, the most promising of which is `react-hexgrid`
(see [Decision Log](decision_logs/decision_log_hexagon_grid_library.md)).

##### Board Styling

To keep things simple initially, individual hexes can be coloured based on their corresponding tiles
(colours were defined in the [original project](https://github.com/stuart-bradley/Catan-Randomiser/blob/master/CatanBackend.py)):

- Wheat: ![#ccb804](https://placehold.co/15x15/ccb804/ccb804.png) `#ccb804`
- Sheep: ![#a5c13f](https://placehold.co/15x15/a5c13f/a5c13f.png) `#a5c13f`
- Rock: ![#7f7f7f](https://placehold.co/15x15/7f7f7f/7f7f7f.png) `#7f7f7f`
- Tree: ![#3a7044](https://placehold.co/15x15/3a7044/3a7044.png) `#3a7044`
- Brick: ![#c7490a](https://placehold.co/15x15/c7490a/c7490a.png) `#c7490a`
- Desert: ![#fceac4](https://placehold.co/15x15/fceac4/fceac4.png) `#fceac4`
- Gold: ![#ffcf00](https://placehold.co/15x15/ffcf00/ffcf00.png) `#ffcf00`
- Ocean: ![#3daace](https://placehold.co/15x15/3daace/3daace.png) `#3daace`

Some of the colours have been modified to increase differentiation. It may be advisable to move to `svg` icons;
no full free set appears to exist, so this may require creation for the project.

Tiles have also been named so that each tile can have a unique first letter identifier.

### 3 Board Generation Algorithms

In the [original project](https://github.com/stuart-bradley/Catan-Randomiser/blob/master/CatanBackend.py), there were a
number of different algorithms. However, they all followed a similar pattern:

1. Generate a blank grid using [Offset Coordinates](https://www.redblobgames.com/grids/hexagons/#coordinates-offset)
   with odd-r rows.
2. Initialise the grid with Ocean tiles.
3. Set certain tiles as "border" tiles to create the Catan board shape.
4. For each hex in the grid, use some form of random number generation to pick the new tile.
   - In some cases the number of nearby neighbour land pieces is used to inform the calculation.
   - Tiles are picked from a pot of decreasing tiles.

This is already a reasonable approach. While the UX uses [Cube Coordinates](https://www.redblobgames.com/grids/hexagons/#coordinates-cube)
there aren't built in datastructures that make traversing and finding neighbours particularly easy (as opposed to
standard array traversal), which is required for some of the algorithms.

However, the initial approach also falls short in some areas:

- Board shape and size is hardcoded, as are the border positions.
- Tile counts are hardcoded.
- Tile information is encoded as RGB 0-1 values.

To handle the hardcoded data, an algorithm will need to be developed based on the defined size and width for the number
of players and the expansions (See Appendix B). Similarly, tile pots should change on this information as well. For a complete set of
tiles, see Appendix C.

### 4 API

The API for this project consists of a single endpoint to handle the generate form submission.

### 4.1 API Implementation

Next.js suggests using [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations),
instead of the older Node.js `/api/` endpoints.

The endpoint should: validate incoming form data using [Zod](https://zod.dev/); pass the validated data to the Board
Generation Algorithm (described in 3); and then redirect back to a URL with a Unique Board Identifier (described in 4.2).

### 4.2 Unique Board Identifier

To be able to save and share boards, each board needs a unique identifier encoded in the URL. Because the Board
Generation Algorithm (described in 3) uses unique characters for each tile type, an encoded board can look as follows:

```
RST-WBSB-WTDTR-TRWS-BWS
```

Each block of letters describes a row of the board, so the middle block is the largest, and decreases by 1 for each row
further out.

This identifier could easily be extended to include additional metadata, and even allows a user to create or modify a board
solely from the identifier.

To render the identifier, it can be pulled from the URL using Next.js [useParams](https://nextjs.org/docs/app/api-reference/functions/use-params)
functionality.

### 5 Testing

Next.js has a number of guides for setting up various
[testing libraries](https://nextjs.org/docs/app/building-your-application/testing) with the framework.

While using [Jest](https://jestjs.io/) was attempted (due to prior knowledge), initial configuration for Typescript didn't work so
[Vitest](https://vitest.dev/) should be used for unit testing.

For E2E testing, [Cypress](https://www.cypress.io/) due to prior experience. As it stands Cypress does not support component testing with
[Server Actions](https://nextjs.org/docs/app/building-your-application/testing/cypress), therefore it's best to stick
with E2E testing. Component testing can be handled inside Vitest.

See Appendix D for a list of errors found during the testing process.

### 5.1 Unit Testing - Vitest

The main file that should be unit tested is `src/lib/CatanBoardGenerator.ts`, as this file generates the all the
possible Catan boards. A test suite should be setup with parameterised tests for all the different algorithms.

### 5.2 Component Testing - Vitest

`<BoardFrom />` should be tested in the following ways:

1. Assert the form renders with the expected fields.
2. Assert the form select options change when `Use Seafarers` is clicked.

`<BoardGrid />` should be tested in the following ways:

1. Mock `useParams` and assert an `svg` is created.

### 5.3 E2E Testing - Cypress

E2E should cover as many user paths as possible, including those covered in 5.1 and 5.2 for completeness. Given there is
a single user path in the application:

1. Configure and submit a form, asserting a `svg` is created. This test will implicitly cover much of the functionality
   of 5.2.

### 6 Containerisation

#### 6.1 Docker

#### 6.2 Kubernetes

## Appendix

### A: Conversion of RBG Coordinates to Hexcodes

```python3
# Wheat, Sheep, Ore, Wood, Brick, Desert, Gold, Ocean
rgb_list = [[0.92,0.72,0.26], [0.65,0.76,0.25], [0.5,0.5,0.5], [0.23,0.44,0.27], [0.9,0.61,0.32], [0.99,0.92,0.77], [0.95,0.95,0], [0.24,0.67,0.81]]
for (r,g,b) in rgb_list:
    print('%02x%02x%02x' % (int(r*255), int(g*255), int(b*255)))
```

### B: Board Sizes

(Col \* Rows)

- Settlers of Catan: 5 \* 5
- Settlers of Catan 5 & 6 Player Expansion: 6 \* 7
- Settlers of Catan Seafarers: 7 \* 7
- Settlers of Catan Seafarers 5 & 6 Player Expansion: 10 \* 7

### C: Tile List

Taken from this [document](https://idoc.pub/documents/catan-components-list-wl1pddpzx1lj).

**Note:** All tiles can be flipped to become ocean.

- Settlers of Catan
  - Wheat: 4
  - Sheep: 4
  - Rock: 3
  - Tree: 4
  - Brick: 3
  - Desert: 1
- Settlers of Catan 5 & 6 Player Expansion
  - Wheat: 2
  - Sheep: 2
  - Rock: 2
  - Tree: 2
  - Brick: 2
  - Desert: 1
- Seafarers
  - Wheat: 1
  - Sheep: 1
  - Rock: 2
  - Tree: 1
  - Brick: 2
  - Desert: 2
  - Gold: 2
  - Ocean: 19
- Seafarers 5 & 6 Player Expansion
  - Desert: 1
  - Gold: 2
  - Ocean: 7

### D: Errors from Testing

1. The [Cypress Github Action](https://github.com/cypress-io/github-action) caused a failure on the
   `should change select values when use-seafarers is checked` test, as it could not find the new options in the select.
   The test works locally, and fine when a manual github action is setup.
2. `TypeError: useFormStatus is not a function` when Component testing `<BoardForm />`. This appears to be a Typescript
   issue, but the functionality is not required for MVP so has been removed.
