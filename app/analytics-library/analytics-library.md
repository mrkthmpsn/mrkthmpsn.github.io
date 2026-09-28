## Tech/Skills

- Django
- React
- Scaleway

## Summary

I created an interface for a 'library' of documents, generally PDFs of football analytics research papers.

The library also features a Django ORM-managed database component, and saves to and draws files from a Scaleway cloud storage. The project has also been a personal test base for various generations of LLM coding, starting with ChatGPT in 2023, then Cursor in 2025, and most recently Claude Code in 2026.

The project is deployed online and gated behind a login screen, with designs and functionality across devices so that I can use it on my laptop or on the go on mobile devices.

## Learnings

**Introduction to React**

To be honest, this was throwing myself in at the deep-ish end of the pool. This work introduced my to concepts like components, dealing with state, and React hooks, all of which I understand much better now than when this was first being cobbled together.

The subsequent refresh produced a much better interface, and a much more well-structured project repo.

**Using ChatGPT (and Cursor (and Claude Code))**

Using ChatGPT (GPT3.5 at the time, in 2023) was an interesting experience. There was a marked difference between how accurate its code was when dealing with general Django or React matters and with some more specific packages I wanted to try, such as connecting the project with the OneDrive folder the files are stored in.

Over time - partly with the help of this project - I developed a sense of how to check whether ChatGPT was sure on what it's saying, although this has obviously now evolved. The front-end refresh was also a useful use of Cursor's Agent in developing a project repo from scratch and, like with ChatGPT, developing a feel for its boundaries. (Creating small features across multiple files - good; consistent, sensible visual styling - ok but surprisingly hit-and-miss, at the time).

By the time of 2026's refresh with Claude Code (Opus 4.6 and Opus 5.5), things were night and day. The infrastructure changes (a move to Scaleway, a cloud services provider) were a slower process of producing planning documents, but by the time of the implementation and front-end changes (with Opus 5.5), things were astonishingly simple. Design capabilities were far improved, although the original 'paint' of the design needed some design choices to make it seem a little less AI-styled.

**Building blocks as future-proofing**

The evolution of the app hasn't necessitated much change of the back-end, whose database structure and API have been largely unchanged during the facelifts. Overwhelmingly, the changes have been additions for nice-to-have features, a nice example of the advantages of a stable API.

## Deeper dive

As well as serving as an introduction to React, the project has also been a case of ambition growing with experience. Shortly after completing the basic functionality of reading and storing PDFs, I added a video player, and then a notes section for each item. (I'd grown used to annotating PDFs while reading them, but couldn't work out how to replicate that with the PDF reader/renderer that I was using).

Better search has been the next stage, particularly as more and more items have been added to the system. Navigating by category was fine when there were fifty or so items, but not so much when sub-categories grew to contain ten or more items.

This also became a product design project. There have been times when I've found myself reluctant to use the app and had to work out why that is and what could change it. At one point, it was the fear of entering details incorrectly, as that would require editing the database directly - so naturally I added a detail editing area to the app.

The refresh of the front-end in 2025 was a great chance to think about all of this, and offered the breathing space to make some tweaks. A better search experience helps navigate tags more easily; a 'to review' list feature means I can bookmark related papers to read or produce a write-up of at a later date; and I also streamlined the upload process for files which I want to read later, and might not want to fill in the full range of data about.

The 2026 changes were mainly inspired by a desire to move to a cloud infrastructure to allow for access on multiple devices. That necessitated a design change, but I was fairly confident that I could steer Claude to produce something I was happy with (as it turned out, it needed less steering than anticipated). 
