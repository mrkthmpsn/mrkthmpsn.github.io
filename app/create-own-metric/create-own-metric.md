## Tech/Skills

- Tracking data
- Streamlit

## Summary

I created a simple webapp allowing non-technical users to create their own statistical metrics based on tracking data, using an simple interface.

Part of enabling the user to create these metrics is being able to select an example clip to check that what they've created is what they're envisaging.
!["Screenshot of video player for tracking data clips in a Streamlit app; above is a dropdown menu titled 'Check a sequence based on your phase of play design from the list below'"](/images/streamlit-video-example-clip.png)

There was also a basic 'report' concept, running the chosen metrics on the full match and producing a basic table of the statistics for both teams.

## Learnings

**Processing tracking and event data**

Every new dataset has its quirks, and opportunities to use packages that are 60% as helpful as you hoped they'd be.

**Feature-creation choices**

The concept revolves a meaningful selection of features that a user could choose from, and the interaction that could happen between them. The choice didn't tend to be difficult (pitch location, pressure, end result of the passage of play), but it was important to refine it as much as possible for choices to be intuitive and maximise utility.

## Dive deeper

The project sprang from the idea that there's a (often) gap between football experts and not just data technical expertise, but conceptual understanding as well. In many cases, data sources do not directly reflect football concepts that coaches and analysts use day-to-day (and concepts/terminology can differ from coach to coach or club to club too).

A lot of the concept was solid but would require a proper infrastructure to progress. The data was processed into a basic CSV which could live inside the project, but that would obviously need to change to be properly operational. (The more recent ['debug build-up' app](/debug-buildup) involved a slight progression towards a proper end-to-end infrastructure).

Similarly, a proper user system would be necessary for the application to be useful in the real world, for different users to be able to save their own metrics and reports.

The more interesting area for improvement/expansion, though, would be how the application could be used for different areas of play. This project was based around early build-up sequences of play, but it would be ideal to be able to cover full matches. I truly believe that it'd be possible to develop a system that would make that possible, as coaches already have quite specific game models that they base their analysis and training on.
