# Decision Log - Javascript (JS) Framework

This document outlines the decision process for determining which JS library to use for the project.
The following projects are under consideration:

- [React](https://react.dev/)
- [React + Next.js](https://nextjs.org/)

## Comparison

| React                                                                                        | React + Next.js                                               |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [ + ] Does not require additional framework knowledge                                        | [ + ] Provides API functionality via Node.js                  |
| [ - ] Does not include App Routing as default                                                | [ + ] Includes native App Routing                             |
| [ - ] Requires a seperate backend or frontend implementation of the randomisation algorithms | [ + ] Allows for Hydration of static parts of the application |
|                                                                                              | [ - ] Adds an additional layer of complexity                  |

While the project being built is relatively simple, it is useful to leverage some advanced functionality provided by
Next.js:

- To align with the Separation of Concerns (SoC) design pattern, the randomisation algorithms should be computed server
  side. This has the added benefit of being more extensible (e.g. saving boards in a DB), if future Product Requirements
  change.
- To allow for sharing of boards, there needs to be dynamically routed pages, which is automatically supported by
  Next.js.

## Outcome

**Next.js** has been chosen as the JS framework.
