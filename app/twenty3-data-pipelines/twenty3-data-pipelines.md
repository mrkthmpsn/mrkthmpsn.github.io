## Tech/Skills

- Multi-provider data architecture
- Football data domain knowledge
- Python, SQL, Django ORM, AWS, IaC

## Summary

Twenty3's products rely on data from multiple football data providers, each with their own schemas, endpoint structures, and offerings. I have been responsible for maintaining and building on the data pipelines that ingest, transform, and serve this data across the company's products.

The pipelines need to handle everything from live match data arriving in near-real-time to large historical backfills, all while maintaining a suite of products that works across providers. This is particularly challenging with event data for visualisations, where the differences between data providers is largest.

## Learnings

**Failure states and validation**

One of the most common problems, I think, are rare or unforeseen issues from the data providers which affect the data pipeline downstream. Some kinds of missing events or erroneous statistics might be fine, but if a team lineup in a match is incorrect, that cascades through a variety of processes. 

In some ways, managing a data pipeline can be an exercise in practical pessimism: what could go wrong, what impact could that have, and how should that impact be dealt with or averted. That can mean taking a flexible approach to validation of the incoming data, because sometimes data providers don't follow their docs and you've just gotta deal with it.

**Data updates, cleanliness, and observability**

As football data can be hard to collect quickly and accurately, it's common for it to update after initial collection, which needs to be ingested in a timely manner (particularly as several clients use live data). It's important to be able to do this, and to have an overview of the state of play of the data. 


## Deeper dive

There's a really interesting sense, that I'm sure there's a word of in some language, for trying to keep something as flexible as possible while being as solid as necessary, concrete enough to be built on but with possible connections for changes or extensions that may arrive in the future. People talk about re-building the aeroplane while it's in the air, but working on a data pipeline (with football data, in the current fast-moving era in football, at least) feels like re-building an aeroplane which may, at any moment, be required to be adapted for a water landing or to be changed into a helicopter.

The mindset of architecting a data system, which requires solid tangible features but a mind to a myriad possible futures, is wild.
