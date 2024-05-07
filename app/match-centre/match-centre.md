## Tech/Skills

- API development

## Summary

The 'Match Centre' is a part of the Twenty3 Toolbox, an area designed for live in-game use (although which can also be used to review individual matches). After the design process, I led the development of the API endpoints for the front-end team to develop the Match Centre itself from. As with all Toolbox products, the Match Centre is designed to offer the same functionality for different data providers which Twenty3 works with.

## Learnings

**Technical scoping**
The scoping involved a number of features, with various different types of statistical presentation and event-based data visualisations. Unlike [Twenty3's main visualisations](/twenty3-visualisations), Match Centre visualisations were designed to have a limited set of quick filters, to help with their use during live matches.

This involved a lot of consideration into how to capture the features required across a range of data providers and their different data schemas. To be dull, it showed the value of notes, planning, and collaboration.

## Deep dive

A unique point about Twenty3's Toolbox is its design to work with different data providers while still allowing full capabilities of that provider's dataset. That means that a lot of the infrastructure involves up-front 'design cost' to account for different providers' variations in order to remove, or at the very least heavily minimise, provider-specific code down the line, particularly in the front-end.

This extends to things like terminology as well, meaning that sometimes the same set of filters may require different labels, or - where naming conventions aren't quite clear - involve glossary-type elements for certain providers. Even if only relevant for one provider's data, it still requires consideration on the general structure.
