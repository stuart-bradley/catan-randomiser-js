# Decision Log - Form Library

This document outlines the decision process for determining which Form library to use for the project. The following
projects are under consideration:

- Generic HTML
- React Hook Form (RHF)
- Shadcn

## Comparison

| Generic HTML                                                          | React Hook Form                                                                 | Shadcn                                             |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------- |
| [ + ] Doesn't require additional libraries                            | [ + ] Widely used by the community                                              | [ + ] Built ontop of React Hook Form               |
| [ - ] Doesn't include functionality such as input dependency natively | [ + ] Additional functionality such as schema validation and input dependencies | [ + ] Includes Component library                   |
|                                                                       | [ + ] Uses standard HTML tags                                                   | [ + ] Integrated with Tailwind CSS                 |
|                                                                       |                                                                                 | [ - ] Component complexity hides RHF functionality |

While the Form component is relatively simple, and does not require validation, the types of algorithms possible is
dependent on the selected expansions. Therefore, some form of input management is required. RNF provides this via
`watch`.

In terms of layout and styling, having a Tailwind CSS compatible set of Components is likely to speed up development.
RHF integrates well with a number of component libraries, but Shadcn requires no additional work. However, Shadcn
Components are overly verbose and complex and hide some of the RHF functionality in a way that decreases development
speed even when custom component creation time is taken into consideration.

## Outcome

**React Hook Form** has been chosen as the form library.

### Additional Suggested Functionality

Two systems may help speed up the development of custom components and should be explored:

- [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms): Basic styles for form components.
- [Flowbite](https://flowbite.com/): Open source component library for Tailwind that provides styling examples.
