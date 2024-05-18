## Tech/Skills

- Python
- FastAPI
- React
- Product design
- Database & cloud set-up

## Summary

The starting idea: what would it look like for football coaches on the sideline to have Formula One-style telemetry to help diagnosing and adjusting in response to problems?

The resulting application uses [publicly-available data from Metrica Sports](https://github.com/metrica-sports/sample-data). Data processing identifies moments when a team is in a 'build-up' phase, provides playback ability of the tracking data, and gives some basic metrics with mild alerts for certain thresholds being reached.

A more detailed project write-up can be found [in the Python Github repo here](https://github.com/mrkthmpsn/tracking-data-app-project/blob/main/project_writeup.md).

## Learnings

**Product design**

The idea was for an application to be used in-game, live. This meant that clarity was an even higher priority than it might usually be.

The 'final' design shares the essence of the original, but went through a number of iterations pre- and during development to refine this sense of immediate utility as well as deeper dive possibilities.

**Data processing**

Implementing a pipeline from database to application was an aim for this project, and involved setting up all of those components. As the application was designed for live match usage, the speed of processing was important (although in practice this was more of an internal test rather than something users would be able to experience).

From there, I was more keenly aware of `numpy`'s vectorisation operations than I have usually had cause to be, and experienced the value in shaving time off quite-quick-but-incredibly-frequent functions.

**Pitch control**

With the help of ChatGPT4, I tried creating a very basic pitch control model to use in creating metrics. However, I struggled with the amount of processing time this required and ultimately decided that it was better to drop it and focus on other aspects of the project. In the end, this may well have improved the clarity of the application too.

## Deeper dive

The build-up phase was always the intended focus, as an area that is repeated frequently. The definition didn't need to be sophisticated, but needed to be good enough for the primary part of the project - the product design - to work. The key-framing was done on the basis of:

- a player being within 2m of the ball for one second or more
- the ball 50-80m from the opponent's goal
- the ball is further from goal than the highest edge of the defensive block
- the possession phase is over 3.5 seconds old

These were arrived at largely on feel and seeing examples in the results. Multiple frames in a passage of play can meet the criteria (rather than just the first instance). This was 'passively intentional': the simplest method which helped streamline the project, but also a likely positive feature in a version with more granular filtering of the keyframe timeline.

In the project, I added options for the first half and second half, but I think that navigation could still be easier. For example, in a live match, I envision an option for a 'live' segment of the timeline, over the previous five or ten minutes.

In terms of the design, the face that coaches are likely to be football-first influenced the decision to have the pitch visualisation take up the primary spot of real estate. This is one element that never changed from the initial designs, along with the timeline components and statistic side panel.

The chart on the right-hand side was the latest (and last) addition to the tool's design. Originally, I'd thought that it might be too distracting, but it being present for 'defensive block area' is probably the perfect use. The metric had previously been included in the list of statistics, but the figure itself didn't seem tangible, so I switched it for the values for width and height. However, knowing whether the area is small or large is still useful, and the chart provides a useful snapshot when entering a keyframe.

I ended up dealing with 2fps, down from the data's 25fps. I started off aiming for 5fps, but because I was setting up several stages of processing I wanted a set of data at each point as a kind of checkpoint. This led to storage issues on the free MongoDB tier I was using, so I dropped it down. Improving this pipeline might be a good future project.
