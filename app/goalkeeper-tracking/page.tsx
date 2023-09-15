'use client';

import CustomNavbar from '@/components/navbar';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import '/app/pages-styles.css';

import NeuerHeartAttack1 from '@/public/images/goalkeeper_tracking/neuer_heart_attack_1.gif';
import OddBallTrajectory from '@/public/images/goalkeeper_tracking/odd_ball_trajectory.gif';
import AlissonHeartAttack from '@/public/images/goalkeeper_tracking/alisson_heart_attack.gif';

const GoalkeeperTrackingArticlePage = () => {
  
    return (
    <>
      <Head>
        <title>Working with tracking data to investigate goalkeeper pressure</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
          charSet="UTF-8"
        />
      </Head>

      <CustomNavbar/>

      <Container fluid className="article">
        <h1>Working with tracking data to investigate goalkeeper pressure</h1>
        <p><i>15 September 2023</i></p>
        <h3>Introduction</h3>
        <p>It’s a joke in football analytics that, when looking at a new attacking metric, you sort the players top to bottom and look for Lionel Messi. Similarly, if you create a metric about goalkeepers holding onto the ball under pressure (and call it ‘heart attack’), you do the same and look for Manuel Neuer.</p>
        <p>This project – diving into a <a href='https://github.com/SkillCorner/opendata'>publicly-available trove of Skillcorner broadcast tracking data</a> – didn’t start with goalkeepers though. It started with a quote from Xavi about long balls, hit some educational roadbumps, and ended with the German stopper.</p>
        <p>Along the way, we:</p>
        <ul>
            <li>Process some raw tracking data (<a href='#process-data-section'>Jump to section</a>)</li>
            <li>Encounter and deal with some problems with (broadcast) tracking data (<a href='#problems-section'>Jump to section</a>)</li>
            <li>Refine project ideas (<a href='#refine-idea-section'>Jump to section</a>)</li>
            <li>Create new metrics (<a href='#metrics-section'>Jump to section</a>)</li>
        </ul>
        <p><i>An example of a 'heart attack' - pitch plotting with the help of mplsoccer Python package:</i></p>
        <Image src={NeuerHeartAttack1.src} fluid/>
        <h3>A brief, patchy history of generating event data from tracking data</h3>
        <p>History is the oldest source of riveting tales and the idea of generating event data from tracking data is no different.</p>
        <p>One of the most recent pieces of work came from Ferran Vidal-Cordina of MIT and three FIFA researchers*, ‘<a href="https://arxiv.org/abs/2202.00804">Automatic event detection in football using tracking data</a>’ (2022). As they write, though, work predates them by a long time.</p>
        <p><i>*Nicolas Evans, Bahaeddine El Fakir, Johsan Billingham</i></p>
        <p>For one, the <a href='https://www.soccer-net.org/'>SoccerNet</a> dataset, collaborators, and challenges date back to 2018. ‘Automatic event detection’ also references a paper from way back in 2003, ‘<a href="https://www.researchgate.net/publication/222834584_Semantic_Annotation_of_Soccer_Videos_Automatic_Highlights_Identification">Semantic annotation of soccer videos: automatic highlights identification</a>’, which in turn points to ‘<a href='https://ieeexplore.ieee.org/document/484921'>Automatic parsing of TV soccer programs</a>’, a paper from the mid-90s that is even older than me. While this earlier work isn’t about generating event data per se, it’s a clear predecessor to it, focusing on using computers to go from video to an output without the need for human tagging.</p>
        <p>‘Automatic event detection’, though, <i>is</i> expressly about event data generation from tracking data. To simplify its method: they check for when the ball is within a given distance (a ‘possession zone’) of a player, and ‘events’ happen when the ball leaves a player’s possession zone to arrive in another’s. Unlike previous work which focused heavily on shots and breaks in play, this could pick up passes as well.</p>
        <p>This wasn’t the method I set out to use.</p>
        <h3>The initial project</h3>
        <p>You probably don’t associate Xavi Hernández with long ball football, but this was the starting point for my project.</p>
        <p>It was based on a quote from the former Barcelona player (and now Barcelona manager) in <a href='https://www.youtube.com/watch?v=3yR5B8viTWQ'>one of his appearances on the Coaches Voice YouTube channel, talking about some of his tactics as manager of Qatari side Al Sadd</a>. “If they [the opposition] play the long ball? Here’s the key to success. […] The goalkeeper sends a long ball forward, so we must all drop back – and always in front of our marker. […] We’re always one metre in front of our man in order to win the second ball, which is so important in football today.”</p>
        <p>The idea would be to try and replicate this with <a href='https://github.com/SkillCorner/opendata'>Skillcorner’s trove of open data</a>, released in 2020 and featuring nine matches from the 2019/20 season: to what extent were teams defending long balls with this strategy of ‘separation’? This project didn’t require a full event dataset and also featured areas of play – long balls travelling over players' heads, and aerial duels – where I wasn’t sure how well the ‘Automatic event detection’ method would suit. It therefore seemed simpler to base the ‘event detection’ element of this little project around the <i>acceleration</i> and <i>change of direction</i> of the ball.</p>
        <h3 id='problems-section'>Some bumps in the road</h3>
        <p>To save time, let’s quickly bullet point our way through some issues that became roadbumps and/or death knells for the long ball project:</p>
        <ul className='article-list'>
            <li>Data smoothing, which is always important when working with tracking data, was far more important for this method of ‘event detection’ than it might have been for a project on shape analysis, for example. A first attempt at smoothing still resulted in instances where acceleration and direction change values (falsely) fluctuated within what was actually a continuous movement, and meant that this early stage of processing data took up a lot of time.</li>
            <li>Quality of the ball tracking: although usually fine for this specific use-case, the X/Y coordinates sometimes seemed to struggle with the arc of a long ball in particular <i>(see an example further down)</i>. </li>
            <li>Replays: Although the data appeared to deal with camera angle changes quite well, data was blank while replays were being shown in the TV broadcast.</li>
            <li>Definitions: what is a ‘long ball’? Is a ‘pass over the top’ a ‘long ball’? Is a chipped pass from a goalkeeper out to a free full-back or winger a ‘long ball’? (Also, as these matches featured the top men’s teams in Europe, there weren’t that many long balls present anyway)</li>
            <li>Limits of the camera frame: although the presence of a long ball was fairly easy to determine using the acceleration of the ball and some distance travelled criteria, it was rare to have both ‘ends’ of a long ball in the same frame at the start of the action.</li>
        </ul>
        <p>This last bullet point was the final nail in the coffin. The starting point for the analysis in this project would be to look at whether players who were acting as ‘markers’ at the start of a long ball created the type of separation that Xavi talked about by the time the long ball was ending in a duel. The ‘frame scope’ limitation made that difficult, as these ‘markers’ were often not visible at the start of a long ball. And, equally importantly, the fun little side-project was no longer very fun.</p>
        <p><i>An example of a slightly odd ball-tracking trajectory, as well as the 'frame scope' issue:</i></p>
        <Image src={OddBallTrajectory.src} fluid/>
        <h3 id='process-data-section'>A change in direction</h3>
        <p>So, a crossroads. The long balls project was over. What now? How did I arrive at turning to goalkeepers and Manuel Neuer’s effect on heart rates?</p>
        <p>The work for that project had already resulted in ‘pre-processing’ and ‘post-processing’ processes (a distinction which may not be hugely meaningful, but was a line that helped to split the process up, first transforming the raw JSON files into an initial csv and then adding further metrics, whose definitions might change, on top).</p>
        <p>Pre-processing:</p>
        <ul>
            <li>Removing frames which took place pre- or post-match, or during half-time</li>
            <li>Add the player match side (home/away) to their data, using the metadata file for each match</li>
            <li>Add some data to each frame about the number of players in the frame and size of the area that these players covered. I never actually used this data, but processed it with the idea that it could be used to filter out ‘low quality/low use’ frames</li>
        </ul>
        <p>Post-processing:</p>
        <ul>
            <li>Smooth coordinates (final attempt at this used a Savitzky-Gavol filter (Python function: <code>scipy.signal.savgol</code>) with a 10-frame window length and polynomial order of 3)</li>
            <li>Flip second half coordinates, so that the whole match is oriented in the same way</li>
            <li>Add object speeds, acceleration, and change of direction (the Skillcorner data has player detection to enable this kind of processing, although not on all players in all frames)</li>
        </ul>
        <p>On top of this, I had a version of the acceleration-based basis for detecting ‘proto-events’ from the long ball project. I settled on a rolling average of ball acceleration (on top of the smoothed data) with a threshold of 2.25 m/s/s (several values were tried between 1.5 and 3), which gave a reasonable set of divisions in the ball tracking data (separated at this point from the player tracking data). Periods where this threshold was reached were classed ‘in impact’, and the set of frames between each ‘in impact’ set of frames were given a sequential ID as a 'non impact period'.</p>
        <p>To help with the project, I also had a set of functions to generate a gif of action saved to an output location. As seen in this post, this made things very streamlined. With a dataframe of relevant 'non impact periods', I could take a row, grab its start and end frame IDs, add a 'buffer' either side of the period to include the 'in impact' frames and make the whole thing less abrupt, and then feed those frame IDs into the main gif-creation function. The code entry point for all of the gifs in this write-up were just references to a row in a dataframe.</p>
        <p>Briefly, I considered pivoting from the long ball project into a full ‘event detection’ project, until realising that a pass received in-stride by the receiver would have no discernible change to the ball’s acceleration, deceleration, or direction. (Shout-out to <a href='https://www.getgoalsideanalytics.com/where-analytics-what-analytics-autumn-2022-update/'>a newsletter I wrote a year ago</a>: this is why you don’t simply do away with buying event data).</p>
        <p>So, another – smaller – topic was needed.</p>
        <h3 id='refine-idea-section'>Arriving at goalkeepers</h3>
        <p>Something else that I’ve been interested in for a while is how goalkeepers feel pressure when on the ball. In years gone by it always seemed as though they felt pressure much more acutely, or simply from much further away, than outfielders. (I wonder how much the change in goalkeeper play on the ball is about their technique being closer to that of outfielders and how much is actually about their reaction to nearby opponents being more like outfielders).</p>
        <p>Investigating this could quite easily make use of the previous work. Passes back to a goalkeeper would be expected to show up in the ‘proto-event detection’ described previously, and other aspects are fairly simple to derive using the processed data too:</p>
        <ul>
            <li>Look for instances where players are reducing the distance to the goalkeeper at a rate of X and/or within a distance of Y</li>
            <li>Take a 'starting' distance from the goalkeeper to the closest opponent in these instances</li>
            <li>Take the minimum distance that a closing player reaches before the play moves on (i.e. another ‘proto-event’ is detected)</li>
        </ul>
        <p>Pure intuition led me to have a couple of different criteria for the first bullet point. To be exact: be within 25m and advancing at a rate of 7m/s <i>or</i> be within 15m and advancing at a rate of 3m/s <i>or</i> simply be within 10m. These choices will be discussed more in the ‘Future Work’ section.</p>
        <p>Regarding the second bullet point, I decided to take opponents’ ‘starting’ distances from the goalkeeper at the point the ball was first 5m away from the goalkeeper. The reasoning for this was that, at this point, the goalkeeper could already be in a decision-making process around the pressure approaching them, and could take a decision to just boot the ball forward first-time. A distance of further than that felt like leaving too much time before the ball would reach them.</p>
        <h3 id='metrics-section'>Metrics and 'Results'</h3>
        <p>The ‘heart attack’ metric referenced at the start of this post is defined as the number of instances where the closest ‘starting’ distance of an opponent was over 10m away from the goalkeeper and the minimum was closer than 3m. Conceptually, these would be instances where a goalkeeper had time to do what they wanted and still ended up with an opponent in very close proximity to them. Manuel Neuer had two of those moments (as detected by the code process) in the November 2019 Bundesliga match against Dortmund; no other goalkeeper in the sample had more than one.</p>
        <p>But this is where metric creation gets interesting and complex. Goalkeepers may have different sizes of ‘comfort bubbles’ against pressure, but both being comfortable and uncomfortable - both ends of the bell curve, if you like - could result in pressers getting close by. Comfortable goalkeepers might spend longer on the ball intentionally, feeling safer with the pressure. Uncomfortable goalkeepers who are instructed to try and play with the ball might invite pressure onto them with poor play.</p>
        <p>The size of their ‘pressure sphere’ also doesn’t mean much if an opponent is already inside it when the goalkeeper receives a pass. The very idea of a comfort/pressure radius that players have implies a level of control that the player doesn’t have – the opponents, the teammate’s decision to pass, and teammates potential receiving positions all have an influence.</p>
        <p>One way I decided to approach this was to split the pressure instances by the closest ‘starting’ distance of an opponent, with 15m as a boundary (a figure which seemed fair as ‘far enough away not to be considered an immediate threat’). Then, out of those ‘safer’ instances where the closest opponent was relatively far away, what was the median minimum distance that an opponent reached?</p>
        <p>There were seven goalkeepers with 5 or more of these instances (across either one or two matches), and their median minimum opponent distances during ‘safer’ initial pressure instances were:</p>
        <ol>
            <li>Ederson (Manchester City): 6.95m</li>
            <li>Wojciech Szczesny (Juventus): 7.1m</li>
            <li>Samir Handanovic (Inter): 8.24m</li>
            <li>Manuel Neuer (Bayern Munich): 8.43m</li>
            <li>Roman Bürki (Dortmund): 9.07m</li>
            <li>Alisson Becker (Liverpool): 11.3m</li>
            <li>Marc-Andre ter Stegen (Barcelona): 12.69m</li>
        </ol>
        <h3>Discussion and Further Work</h3>
        <p>The values of Szczesny and Handanovic in the previous metric are interesting because neither has a reputation similar to the players they’re sandwiched between, Ederson and Neuer. Similarly, Marc-Andre ter Stegen has a good on-ball reputation. Perhaps part of what is being captured here are the ability or propensity of their teammates to make themselves available for easy passes once the ball is played back to the goalkeeper. Then again, being technically good on the ball doesn’t necessarily mean a player will invite pressure onto themselves.</p>
        <p>There’s also the possibility that variables arrived at through intuition and some video checks alone, along with a sample size of one or two matches, isn’t enough to lead to useful metrics. In a proper working environment, or simply a side-project that wasn’t spun up from the ashes of a previous aborted side-project, we’d use some expert opinion and more thorough data exploration for the pressure definitions at least.</p>
        <p>Other than that type of refinement, another natural next step would be to consider available passing options (although this would probably require full-pitch tracking data). Why a goalkeeper comes under pressure may be just as important, or maybe even more important, to a team than what the goalkeeper does when they find themselves in those situations.</p>
        <p>Finally, the flipped version of the situation has potential too, focusing on how teams pressure and affect the goalkeepers that they come up against.</p>
        <h3>Postscript: A note on tracking data</h3>
        <p>It’s worth noting that this tracking data was released three years ago, although some of its problems may still be present in some providers’ data. Skillcorner, for its part, now advertises predicted off-camera locations for players as part of its data (although I can’t speak for its accuracy), and, in my opinion, things like data smoothing and the velocity of objects should probably be expected as standard by now, in my opinion. (Partly, on the smoothing, so that no-one knows how janky your raw computer vision data actually is).</p>
        <p>Of course, the offering that tracking data providers put forward nowadays usually includes a whole suite of metrics too. They might even package up things as discrete, separate, events for you, as well as the tracking data and counting stats. Because, as I wrote in a piece 15 months ago that is now already a little dated, <a href='https://www.getgoalsideanalytics.com/everyone-hybrid-data/'>everyone has hybrid data now</a>. Yet unlike with event data, which at least had a healthy black market before <a href='https://github.com/statsbomb/open-data'>large open datasets</a> were available, not many people on the outside of the profession will be getting a proper taste of that.</p>
        <p><i>One last 'heart attack', this time from Alisson against Manchester City:</i></p>
        <Image src={AlissonHeartAttack.src} fluid/>
        <hr className="dotted" />
        <i>Thanks for reading.</i>
        </Container>
    </>
        )}

export default GoalkeeperTrackingArticlePage;