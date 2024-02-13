# Decision Log - Hexagon Grid Library

This document outlines the decision process for determining which hexagon grid library to use for the project. The following
projects are under consideration:

- [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)
- [Konvas JS](https://konvajs.org/)
- [Honeycomb](https://abbekeultjes.nl/honeycomb/)
- [react-honeycomb](https://github.com/taraspolovyi/react-honeycomb)
- [react-hexgrid](https://github.com/Hellenic/react-hexgrid)

## Comparison

| HTML5 Canvas                                      | Konvas JS                                                                                             | Honeycomb                                                                                 | react-honeycomb                                            | react-hexgrid                                                                  |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [ + ] No additional library required              | [ + ] Declarative React Canvas                                                                        | [ + ] Grid can be defined instead of individual hexagons                                  | [ + ] Grid can be defined instead of individual hexagons   | [ + ] Grid can be defined instead of individual hexagons                       |
| [ - ] Requires specific math drawing calculations | [ + ] Includes a huge range of additional functionality (events, animations, data serialisation, etc) | [ + ] Includes `json` serialisation                                                       | [ - ] Does not allow for Catan shaped grids                | [ + ] Uses SVG to create auto scaling grids                                    |
|                                                   | [ - ] Requires specific math drawing calculations                                                     | [ - ] Does not include native image output (includes examples with third-party libraries) | [ - ] Single contributor, does not appear to be maintained | [ + ] Includes examples for Catan style grids                                  |
|                                                   |                                                                                                       |                                                                                           |                                                            | [ ~ ] Last release in 2022, but it has 300 stars and multiple contributors     |
|                                                   |                                                                                                       |                                                                                           |                                                            | [ - ] Only uses cubic coordinates (which were not used in the original project |

In the original project, the grid math was a significant time sink, and a large proportion of the overall code.
Interestingly, it appears that a number of projects have sprung up since then to try and handle this specific use-case,
often referencing the [same document](https://www.redblobgames.com/grids/hexagons/) that was used in the original project.

Therefore, it is probably prudent to ignore the general canvas solutions and pick a library that handles the coordinate
geometry behind the scenes.

With that in mind, `react-hexgrid` looks the most promising. However, it should be noted that the cubic coordinate
system will require additional translation of the original algorithms.

## Outcome

**react-hexgrid** has been chosen as the hexagon grid library.
