'use client';

import CustomNavbar from '@/components/navbar';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/app/pages-styles.css';
import { Container } from 'react-bootstrap';

import researchPaperScreenshot from '@/public/images/analytics_library/research_paper_screenshot.png';
import researchPaperNotesScreenshot from '@/public/images/analytics_library/research_paper_notes_screenshot.png';
import newPaperEntryScreenshot from '@/public/images/analytics_library/new_paper_entry_screenshot.png';
import chatGPTJokePrompt from '@/public/images/analytics_library/chat_gpt_joke_prompt.png';

const AnalyticsLibraryPage = () => {
  
  return (
  <>
  <Head>
        <title>Analytics library React project</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
          charSet="UTF-8"
        />
    </Head>

  <div>
      <CustomNavbar/>
</div>

    <Container fluid className="article">
        <h1>A personal analytics library using React, Postgres, Django, and the cloud</h1>
        <img src={researchPaperScreenshot.src} alt="Screen showing a PDF reader on the right-hand two thirds, a tree menu of categories on the left above a list of 'Listed Research' on the left" />
        <br />
        <p>
          It's a task in itself to keep on top of all of the work in the world of football analytics. 
        </p>
        <p>
          A good while ago, I started storing PDFs that I'd read and made notes on in their own particular cloud storage folder. That was ok, but it got to a point where I wanted more control. What if I wanted to find papers on a particular topic? Or featuring a particular researcher?
        </p>

        <p>
          As a mini-project to implement what I was learning at my day-job, I used Django as a back-end framework to create and manage a Postgres database. It gave me more flexibility with the amount of data I could store and filter on, including my own tagging categorisation system.
        </p>
        <p>
          But the process was still a little cumbersome. So...
        </p>
        
      <img src={chatGPTJokePrompt.src} alt="A screenshot of the ChatGPT 'new chat' screen, with the a phrase typed into the interface: 'Can you build me a React app for my analytics library?'" />
      <br />
      <p>
        This interface was as much a ChatGPT project as a front-end/React development project, given that I was nearly completely new to front-end development: the experiment with the former enabled the experiment with the latter.
      </p>
      <p>
        The 'library' is hooked up to the database, generating a categories menu and then a list of research papers tagged with the selected categories; it's also connected to the cloud storage folder, so the PDFs can be pulled through in the PDF viewer.
      </p>
      <p>
        There's also a notes section, which can be updated and pulls from the database each time the paper is loaded.
      </p>

      <img src={researchPaperNotesScreenshot.src} alt="A version of the first library screenshot but with a text input below a reduced-height PDF reader" />
      <br />
      <p>
        However, the ball of analytics keeps rolling, so there's also an upload element, which saves a new PDF to both the database and the cloud storage folder.
      </p>

      <img src={newPaperEntryScreenshot.src} alt="Screenshot of the library application: The PDF reader displays a new PDF, and the left-hand interface is scrolled down to display the PDF uploader input and the start of a form to add details of the research" />
      <p>
        It was a fascinating experiment with ChatGPT as a coding aid too, and altogether a very useful - if at times very difficult - project.
      </p>
      <br />
    </Container>
    

    </>
  )
}

export default AnalyticsLibraryPage;