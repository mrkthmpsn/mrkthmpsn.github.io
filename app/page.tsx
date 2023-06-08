import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages-styles.css';
import CustomNavbar from '@/components/navbar';
import HomePageCard from '@/components/homePageCard';
import analyticsLibraryThumb from '@/public/images/home_page_thumbs/analytics_library_thumb.png';
import xGTimelineThumb from '@/public/images/home_page_thumbs/xg_timeline_design_thumb.png';
import codingTutorialsThumb from '@/public/images/home_page_thumbs/coding_tutorials_thumb.png';
import realMadridD3Thumb from '@/public/images/home_page_thumbs/real_madrid_d3_thumb.png';
import getGoalsideThumb from '@/public/images/home_page_thumbs/get_goalside_thumb.png';
import statsbombLabellingThumb from '@/public/images/home_page_thumbs/statsbomb_labelling_thumb.png';

const HomePage = () => {
  return (
  <>

  <div>
      <CustomNavbar />
  </div>
    
      
    <div>  
      <br />
      <h3 style={{ textAlign: 'center', paddingBottom: '2px' }}>
        <i>When your hands are busy holding an idea they can't type.</i>
      </h3>
      <p style={{ textAlign: 'right' }}>-- Seth Godin</p>
      <br />
      <p style={{ marginBottom: 0 }}>
        Hi, I'm Mark.
      </p>

      <p>You can find some of my projects below</p>
      
      {/* <p style={{ marginBottom: '20px' }}>
        📚 <a href="/analytics-library" className="homepage-link">
          Creating a personal analytics library app
        </a>
        <br />
        <small>
          <i>Using React to create an interface for a personal football analytics library database, with files stored in and retrieved from cloud storage.</i>
        </small>
      </p> */}

      <HomePageCard emoji='📚' linkUrl='/analytics-library' linkExternal={false} anchorText='Creating a personal analytics library app' descriptionText='Using React to create an interface for a personal football analytics library database, with files stored in and retrieved from cloud storage.' imageUrl={analyticsLibraryThumb.src} />

      {/* <p style={{ marginBottom: '20px' }}>
        🎨 <a href="https://www.twenty3.sport/twenty3-introducing-our-xg-timelines-visualisations/" className="homepage-link" target="_blank">
          Article: Designing a data visualisation for media and professional 
          football use
        </a>
        <br />
        <small>
          <i>An article from 2021 on the release of Twenty3's take on an xG 
            timeline visualisation, giving a bit of thought into the design 
            thinking. [External link]</i>
        </small>
      </p> */}

      <HomePageCard emoji='🎨' linkUrl='https://www.twenty3.sport/twenty3-introducing-our-xg-timelines-visualisations/' linkExternal={true} anchorText='Article: Designing a data visualisation for media and professional 
          football use' descriptionText="An article from 2021 on the release of Twenty3's take on an xG 
            timeline visualisation, giving a bit of thought into the design 
            thinking. [External link]" imageUrl={xGTimelineThumb.src} />

      {/* <p style={{ marginBottom: '20px' }}>
        👨‍‍🏫 <a href="https://mrkthmpsn-streamlit-coding-tutorial-home-wk3wn4.streamlit.app/" className="homepage-link" target="_blank">
          Learn-to-code with football data tutorials, using Streamlit
        </a>
        <br />
        <small>
          <i>A mini-site of tutorials to help people learn to code using football data (from the website FBref), using the Python framework Streamlit. [External link]</i>
        </small>
      </p> */}

      <HomePageCard emoji='👨‍‍🏫' linkUrl='https://mrkthmpsn-streamlit-coding-tutorial-home-wk3wn4.streamlit.app/' linkExternal={true} anchorText='Learn-to-code with football data tutorials, using Streamlit' descriptionText="A mini-site of tutorials to help people learn to code using football data (from the website FBref), using the Python framework Streamlit. [External link]" imageUrl={codingTutorialsThumb.src} />
      
      {/* <p style={{ marginBottom: '20px' }}>
        📊 <a href="/real-madrid" className="homepage-link">
          Article: 'The renewal of Real Madrid' (experimenting with d3)
        </a>
        <br />
        <small>
          <i>An article from July 2022 about the turnover of Real Madrid men's squad
            featuring some interactive d3 visualisations.</i>
        </small>
      </p> */}

      <HomePageCard emoji='📊' linkUrl='/real-madrid' linkExternal={false} anchorText="Article: 'The renewal of Real Madrid' (experimenting with d3)" descriptionText="An article from July 2022 about the turnover of Real Madrid men's squad
            featuring some interactive d3 visualisations." imageUrl={realMadridD3Thumb.src} />

      {/* <p style={{ marginBottom: '20px' }}>
        📰 <a href="https://www.getgoalsideanalytics.com/" className="homepage-link" target="_blank">
          The <i>Get Goalside</i> newsletter
        </a>
        <br />
        <small>
          <i>A newsletter about football analytics. [External link]</i>
        </small>
      </p> */}

      <HomePageCard emoji='📰' linkUrl='https://www.getgoalsideanalytics.com/' linkExternal={true} anchorText="The 'Get Goalside' newsletter" descriptionText="A newsletter about football analytics. [External link]" imageUrl={getGoalsideThumb.src} />

      {/* <p style={{ marginBottom: '20px' }}>
        🏷️ <a href="https://www.getgoalsideanalytics.com/high-fat-data-for-low-er-fat-costs/" className="homepage-link" target="_blank">
          Creating labels from unlabelled data - football positions and Statsbomb 360
        </a>
        <br />
        <small>
          <i>An edition of the <b>Get Goalside</b> newsletter aiming to take existing analytics research and apply it to a slightly different use-case, creating positional labels from unlabelled data. [External link]</i>
        </small>
      </p> */}

      <HomePageCard emoji='🏷️' linkUrl='https://www.getgoalsideanalytics.com/high-fat-data-for-low-er-fat-costs/' linkExternal={true} anchorText="Creating labels from unlabelled data - football positions and Statsbomb 360" descriptionText="An edition of the 'Get Goalside' newsletter aiming to take existing analytics research and apply it to a slightly different use-case, creating positional labels from unlabelled data. [External link]" imageUrl={statsbombLabellingThumb.src} />

    </div>
    
    </>
  );
};

export default HomePage;
