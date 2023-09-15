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
        Hi, I'm Mark. <b>Mark Thompson</b>. I'm usually either making stuff, making sense of stuff, or making sense of it to others. 
      </p>
      <p>
        At the moment that's mostly in the world of football, but Python, data science, and a good attitude transfer elsewhere pretty well. 
      </p>
      <p>  
        You can find some of my projects below:
      </p>
      
      <HomePageCard emoji='🎨' linkUrl='https://www.twenty3.sport/twenty3-introducing-our-xg-timelines-visualisations/' linkExternal={true} anchorText='Article: Designing a data visualisation for media and professional 
          football use' descriptionText="An article from 2021 on the release of Twenty3's take on an xG 
            timeline visualisation, giving a bit of thought into the design 
            thinking. [External link]" imageUrl={xGTimelineThumb.src} />
      
      <HomePageCard emoji='🧤' linkUrl='/goalkeeper-tracking' linkExternal={false} anchorText="Working with tracking data to investigate goalkeeper pressure" descriptionText="A write-up of a project using tracking data to, first, try and look at how teams prepare themselves for second balls, and then a pivot to looking at how goalkeepers respond to pressure when on the ball." imageUrl={trackingDataProjectThumb.src} />

      <HomePageCard emoji='🏷️' linkUrl='https://www.getgoalsideanalytics.com/high-fat-data-for-low-er-fat-costs/' linkExternal={true} anchorText="Creating labels from unlabelled data - football positions and Statsbomb 360" descriptionText="An edition of the 'Get Goalside' newsletter aiming to take existing analytics research and apply it to a slightly different use-case, creating positional labels from unlabelled data. [External link]" imageUrl={statsbombLabellingThumb.src} />

      <HomePageCard emoji='📚' linkUrl='/analytics-library' linkExternal={false} anchorText='Creating a personal football analytics library app' descriptionText='Using React to create an interface for a personal football analytics library database, with files stored in and retrieved from cloud storage.' imageUrl={analyticsLibraryThumb.src} />

      <HomePageCard emoji='👨‍‍🏫' linkUrl='https://mrkthmpsn-streamlit-coding-tutorial-home-wk3wn4.streamlit.app/' linkExternal={true} anchorText='Learn-to-code with football data tutorials, using Streamlit' descriptionText="A mini-site of tutorials to help people learn to code using football data (from the website FBref), using the Python framework Streamlit. [External link]" imageUrl={codingTutorialsThumb.src} />
      
      {/* <HomePageCard emoji='📰' linkUrl='https://www.getgoalsideanalytics.com/' linkExternal={true} anchorText="The 'Get Goalside' newsletter" descriptionText="A newsletter about football analytics. [External link]" imageUrl={getGoalsideThumb.src} /> */}

      <HomePageCard emoji='📊' linkUrl='/real-madrid' linkExternal={false} anchorText="Article: 'The renewal of Real Madrid' (experimenting with d3)" descriptionText="An article from July 2022 about the turnover of Real Madrid men's squad
            featuring some interactive d3 visualisations." imageUrl={realMadridD3Thumb.src} />

      

    </div>
    
    </>
  );
};

export default HomePage;
