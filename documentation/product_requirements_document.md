# Product Requirements Document (PRD)

This document outlines the high level requirements that this project needs to be considered feature complete for
Version 1.

## Description

The Catan Randomiser application should be a web application accessible over the internet that allows a user to generate
visual representations of a Settlers of Catan board for use when setting up the physical game.

## User Stories

- US1: A user should be able to generate a Settlers of Catan board based on their physical setup (expansions,
  number of players, etc).
- US2: A user should be able to share generated boards via a unique URL that is generated for each board.

## Wireframe

![Draw.io mockup of the expected UI for the Catan Randomiser](images/catan-randomiser-js-wireframe.png)

The UI for this project should consist of an image of the final board, as well as a form that includes the following
fields:

1. Select which expansions a player has.
2. Select the randomisation algorithm (may change based on 1.).
3. Select the number of players.
4. A button to generate a new field.

This wireframe is missing the following functionality that should be included:

- Colour coding of the board, and a way for the user to determine how colours match to physical board pieces
  (e.g.) a legend or tooltips, etc.
