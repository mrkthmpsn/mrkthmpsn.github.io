## Tech/Skills

- Django
- React

## Summary

An interface for a 'library' of documents, generally PDFs of football analytics research papers.

The collection was something I'd been collecting already, in a Microsoft OneDrive folder, but I wanted to be able to search the documents easier. The idea of categorising the contents in a Django database came first, and then - when ChatGPT launched - creating a front-end interface.

PDFs can be read, accessed from the OneDrive folder, and saved alongside the relevant info for the PostgreSQL database. The project runs locally, started by a bash script saved to my desktop - something I'd like to change to make it easier to use and possible to use across devices.

## Learnings

**Introduction to React**
To be honest, this was throwing myself in at the deep-ish end of the pool. This work introduced my to concepts like components, dealing with state, and React hooks, all of which I understand much better now than when this was first being cobbled together.

**Using ChatGPT**
Using ChatGPT (GPT3.5 at the time) was an interesting experience. There was a marked difference between how accurate its code was when dealing with general Django or React matters and with some more specific packages I wanted to try, such as connecting the project with the OneDrive folder the files are stored in.

Over time - partly with the help of this project - I think I've developed a sense of how to check whether ChatGPT is sure on what it's saying. Often that involves switching to asking a general question, or asking it a repeat of a previous question phrased slightly differently.

## Deeper dive

As well as serving as an introduction to React, the project has also been a case of ambition growing with experience. Shortly after completing the basic functionality of reading and storing PDFs, I added a video player, and then a notes section for each item. (I'd grown used to annotating PDFs while reading them, but couldn't work out how to replicate that with the PDF reader/renderer that I was using).

Better search has been the next stage, particularly as more and more items have been added to the system. Navigating by category was fine when there were fifty or so items, but not so much when sub-categories grew to contain ten or more items.

In hindsight, this has also been, or become, a product design project. There have been times when I've found myself reluctant to use the app and had to work out why that is and what could change it. At one point, it was the fear of entering details incorrectly, because that would require chaning in the database directly. After realising that, I added a detail editing area to the app.

My experience and ability in these areas have grown a lot since this project started, but it was an important first step.
