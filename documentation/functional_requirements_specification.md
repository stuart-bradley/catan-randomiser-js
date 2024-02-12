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

- An expansions group checkbox (or multi-select).
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

### 4 API

### 4.1 API Implementation

### 4.2 Board Unique Identifier

### 5 E2E Testing

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
