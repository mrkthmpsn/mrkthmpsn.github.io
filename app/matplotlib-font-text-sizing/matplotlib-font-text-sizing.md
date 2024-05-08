## Tech/Skills

- Matplotlib
- Python development

## Summary

I led the research and development of enabling custom fonts in Twenty3 matplotlib visualisations, and text elements on visualisations to be automatically sized inside a bpundary box (a feature which didn't seem to be available elsewhere in matplotlib or add-on packages).

The task was slightly less trivial than it might otherwise have been due to the way matplotlib deals with custom fonts. The majority of the in-built functionality is based around the idea of having a file locally, which doesn't gel well with a software production environment where users may be uploading fonts as they see fit.

## Learnings

**Step back from the problem**
The project was one I returned to at intervals over a period of nine months or so, and the first attempt sent me down a rabbithole a little. I wouldn't have got to the eventual solution without the second learning (below), but I may have moved away from an unsuitable concept sooner if I had been less focused on making that _approach_ work and more focused on achieving the _goal_.

**Reading technical package documentation**
The project ended up requiring a lot of reading of matplotlib's technical documentation around `Text` objects and font properties. The resizing aspect of the project involved more reading, around the types/stages of rendering that matplotlib can do. It gave me a finer appreciation for both documentation reading and writing.

## Deep dive

One concern that had held up this kind of work was about the potential for different fonts to have different base sizes. As the appeal to media is such a large part of the Toolbox's value (you can get away with a certain amount of visual clunkiness within professional sports internally), the text size and positioning on certain visualisations had been set carefully. Changing the font risked messing with that.

Util functions were developed to set boundaries for each text element, and repeatedly try and fit the given text string into it. On the face of it, this is a simple logical loop, but there were some challenges:

- Finding how to render matplotlib text mid-process to check that it fits the space
- Dealing with the logic around line-breaks
- Setting a reasonable maximum font size as a starting point, depending on the visualisation

This latter challenge led to a hidden elegance. In visualisations where there are multiple text elements, I decided to check a medium-length text string in the given font and given space, and use that as the maximum font size for the rest of the text on the vis. That means that for text like player names, a short string and a long string won't be as far apart in size as they might be if the short string was being fit into the space independently of other text strings.

Custom fonts had previously been a limitation on some visualisations. The default font that matplotlib uses is inoffensive, but not suitable for a lot of media companies (who often, understandably, want their own fonts). In many circumstances, Smart Graphic templates (which visualisations sit in) had been the workaround - a radar chart might be set up with certain stats, and those stat titles be placed on the Smart Graphic rather than being used from the radar visualisation itself. This work freed up the restrictions that these workarounds had involved, particularly around the use of programmatic visualisation keys.

Shortly after completing this work, an opportunity came up which required translating the Toolbox into Japanese - requiring a different character set to the one used as default in matplotlib images. Fortunately, the work done on variable fonts enabled this more easily fairly easily, as all of our visualisations had just been set up with variable font properties.
