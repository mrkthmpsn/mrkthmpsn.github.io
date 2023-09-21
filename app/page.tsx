import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages-styles.css';
import Head from 'next/head';
import CustomNavbar from '@/components/navbar';
import HomePageCard from '@/components/homePageCard';
import analyticsLibraryThumb from '@/public/images/home_page_thumbs/analytics_library_thumb.png';
import xGTimelineThumb from '@/public/images/home_page_thumbs/xg_timeline_design_thumb.png';
import codingTutorialsThumb from '@/public/images/home_page_thumbs/coding_tutorials_thumb.png';
import realMadridD3Thumb from '@/public/images/home_page_thumbs/real_madrid_d3_thumb.png';
import trackingDataProjectThumb from '@/public/images/home_page_thumbs/tracking_data_thumb.png';
import getGoalsideThumb from '@/public/images/home_page_thumbs/get_goalside_thumb.png';
import statsbombLabellingThumb from "public/images/home_page_thumbs/statsbomb_labelling_thumb.png";

const HomePage = () => {
  return (
  <>
  <Head>
    <title>Mark Thompson.</title>
  </Head>

  <div>
      <CustomNavbar />
  </div>
    
      
    <div>  
      <br />
      <h3 style={{ textAlign: "center", paddingBottom: "2px" }}>
        <i>When your hands are busy holding an idea they can't type.</i>
      </h3>
      <p style={{ textAlign: 'right' }}>-- Seth Godin</p>
      <br />
      <p>
        Hi, I'm Mark. <b>Mark Thompson</b>. I make stuff, make sense of stuff, or make sense of it for others. 
      </p>
      <p>
        So far, that's mostly been in the world of football, but Python, data science, and a good attitude go a long way.
      </p>
      <p>  
        You can find some of my projects (on football data insights, spatio-temporal data, data visualisation design, React and Django Rest Framework use) below:
      </p>
      
      <HomePageCard emoji='🎨' linkUrl='https://www.twenty3.sport/twenty3-introducing-our-xg-timelines-visualisations/' linkExternal={true} anchorText='Article: Designing a data visualisation for media & professional 
          football use' descriptionText="A blog for Twenty3 on the design of our take on an xG (expected goals) timeline data visualisation, with considerations for multiple audiences. [External link]" imageUrl={xGTimelineThumb.src} />
      
      <HomePageCard emoji='🧤' linkUrl='/goalkeeper-tracking' linkExternal={false} anchorText="Working with spatio-temporal tracking data to investigate goalkeeper pressure" descriptionText="A project write-up on the processing, ideation, and repurposing of prior work, pivoting from a previous idea to looking at how goalkeepers respond to pressure when on the ball in football." imageUrl={trackingDataProjectThumb.src} />

      <HomePageCard emoji='📚' linkUrl='/analytics-library' linkExternal={false} anchorText='Creating a personal football analytics library app with React and Django' descriptionText='Write-up of a project to create an interface for a personal football analytics library database, with files stored in and retrieved from cloud storage.' imageUrl={analyticsLibraryThumb.src} />

      <HomePageCard emoji='🏷️' linkUrl='https://www.getgoalsideanalytics.com/high-fat-data-for-low-er-fat-costs/' linkExternal={true} anchorText="Creating labels from unlabelled data - football positions and Statsbomb 360" descriptionText="An edition of the 'Get Goalside' newsletter aiming to take existing analytics research and apply it to a slightly different use-case, creating positional labels from unlabelled data. [External link]" imageUrl={statsbombLabellingThumb.src} />

      <HomePageCard emoji='👨‍‍🏫' linkUrl='https://mrkthmpsn-streamlit-coding-tutorial-home-wk3wn4.streamlit.app/' linkExternal={true} anchorText='Learn-to-code with football data tutorials, using Streamlit' descriptionText="A mini-site of tutorials to help people learn to code using football data (from the website FBref), using the Python framework Streamlit. [External link]" imageUrl={codingTutorialsThumb.src} />

      <HomePageCard emoji='📊' linkUrl='/real-madrid' linkExternal={false} anchorText="Article: 'The renewal of Real Madrid' (experimenting with d3)" descriptionText="An article from July 2022 about the turnover of Real Madrid men's squad
            featuring some interactive d3 visualisations." imageUrl={realMadridD3Thumb.src} />

    </div>
    
    </>
  );
};

export default HomePage;
