_June 2023_

It's a task in itself to keep on top of all of the work in the world of football analytics.

A good while ago, I started storing PDFs that I'd read and made notes on in their own particular cloud storage folder. That was ok, but it got to a point where I wanted more control. What if I wanted to find papers on a particular topic? Or featuring a particular researcher?

As a mini-project to implement what I was learning at my day-job, I used Django as a back-end framework to create and manage a Postgres database. It gave me more flexibility with the amount of data I could store and filter on, including my own tagging categorisation system, but the process was still cumbersome.

!["Screen showing a PDF reader on the right-hand two thirds, a tree menu of categories on the left above a list of 'Listed Research' on the left"](/images/analytics_library/research_paper_screenshot.png)

This interface was as much a ChatGPT project as a front-end/React development project, given that I was nearly completely new to front-end development: the experiment with the former enabled the experiment with the latter.

The 'library' is hooked up to the database, generating a categories menu and then a list of research papers tagged with the selected categories; it's also connected to the cloud storage folder, so the PDFs can be pulled through in the PDF viewer.

There's also a notes section, which can be updated and pulls from the database each time the paper is loaded. And there's an upload element, which saves a new PDF to both the database and the cloud storage folder.

!["Screenshot of the library application: The PDF reader displays a new PDF, and the left-hand interface is scrolled down to display the PDF uploader input and the start of a form to add details of the research"](/images/analytics_library/new_paper_entry_screenshot.png)

It was a fascinating experiment with ChatGPT as a coding aid too, and altogether a very useful - if at times quite difficult - project.
