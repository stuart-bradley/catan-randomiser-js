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

### 3 Board Generation Algorithms

### 4 API

### 4.1 API Implementation

### 4.2 Board Unique Identifier

### 5 E2E Testing

### 6 Containerisation

#### 6.1 Docker

#### 6.2 Kubernetes
