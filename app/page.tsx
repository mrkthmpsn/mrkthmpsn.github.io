import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages-styles.css';
import CustomNavbar from '@/components/navbar';

const HomePage = () => {
  return (
  <>

  <div>
      <CustomNavbar/>
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
      
      <p style={{ marginBottom: '20px' }}>
        <a href="/analytics-library" className="homepage-link">
          Creating a personal analytics library app
        </a>
        <br />
        <small>
          <i>Using React to create an interface for a personal football analytics library database, with files stored in and retrieved from OneDrive.</i>
        </small>
      </p>
      
      <p style={{ marginBottom: '20px' }}>
        <a href="/real-madrid" className="homepage-link">
          Article: 'The renewal of Real Madrid' (experimenting with d3)
        </a>
        <br />
        <small>
          <i>An article from July 2022 about the turnover of Real Madrid men's squad
            featuring some interactive d3 visualisations.</i>
        </small>
      </p>

      <p style={{ marginBottom: '20px' }}>
        <a href="https://www.getgoalsideanalytics.com/" className="homepage-link">
          The <i>Get Goalside</i> newsletter
        </a>
        <br />
        <small>
          <i>A newsletter about football analytics</i>
        </small>
      </p>

    </div>
    
    </>
  );
};

export default HomePage;
