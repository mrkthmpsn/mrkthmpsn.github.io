## Tech/Skills

- Django
- React

## Summary

I created an interface for a 'library' of documents, generally PDFs of football analytics research papers.

The library also features a Django ORM-managed database component, and saves to and draws files from a Microsoft OneDrive folder. The project was also as a personal 'first try' for both ChatGPT as a coding tool, and React. After about 18 months, I decided it was time for a refresh of the front-end, which made this a Cursor-plus-React project.

The project currently runs locally, started by a bash script saved to my desktop - something I'd like to change to make it easier to use and possible to use across devices.

## Learnings

**Introduction to React**

To be honest, this was throwing myself in at the deep-ish end of the pool. This work introduced my to concepts like components, dealing with state, and React hooks, all of which I understand much better now than when this was first being cobbled together.

The subsequent refresh produced a much better interface, and a much more well-structured project repo.

**Using ChatGPT (and Cursor)**

Using ChatGPT (GPT3.5 at the time) was an interesting experience. There was a marked difference between how accurate its code was when dealing with general Django or React matters and with some more specific packages I wanted to try, such as connecting the project with the OneDrive folder the files are stored in.

Over time - partly with the help of this project - I developed a sense of how to check whether ChatGPT was sure on what it's saying, although this has obviously now evolved. The front-end refresh was also a useful use of Cursor's Agent in developing a project repo from scratch and, like with ChatGPT, developing a feel for its boundaries. (Creating small features across multiple files - good; consistent, sensible visual styling - ok but surprisingly hit-and-miss, at the time).

## Deeper dive

As well as serving as an introduction to React, the project has also been a case of ambition growing with experience. Shortly after completing the basic functionality of reading and storing PDFs, I added a video player, and then a notes section for each item. (I'd grown used to annotating PDFs while reading them, but couldn't work out how to replicate that with the PDF reader/renderer that I was using).

Better search has been the next stage, particularly as more and more items have been added to the system. Navigating by category was fine when there were fifty or so items, but not so much when sub-categories grew to contain ten or more items.

This also became a product design project. There have been times when I've found myself reluctant to use the app and had to work out why that is and what could change it. At one point, it was the fear of entering details incorrectly, as that would require editing the database directly - so naturally I added a detail editing area to the app.

The refresh of the front-end in 2025 was a great chance to think about all of this, and offered the breathing space to make some tweaks. A better search experience helps navigate tags more easily; a 'to review' list feature means I can bookmark related papers to read or produce a write-up of at a later date; and I also streamlined the upload process for files which I want to read later, and might not want to fill in the full range of data about.
