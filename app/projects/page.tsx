import "@/app/pages-styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CustomNavbar from "@/components/navbar";
import ProjectCard from "@/components/projectCard";

import analyticsLibraryThumb from "@/public/images/home_page_thumbs/analytics_library_thumb.png";
import debugBuildupThumb from "@/public/images/home_page_thumbs/debug_buildup_app.png";
import twenty3VisThumb from "@/public/images/home_page_thumbs/twenty3-vis-1.png";
import twenty3MatchCentreThumb from "@/public/images/home_page_thumbs/twenty3_match_centre.png";
import metricsCreatorThumb from "@/public/images/home_page_thumbs/streamlit-metrics-creator-webapp.png";

const ProjectsPage = () => {
  return (
    <>
      <CustomNavbar />
      <div className="grid grid-cols-1 mb-4">
        <p className="my-4 md:my-8 mx-auto text-center text-4xl md:text-5xl lg:text-6xl font-['Roboto_Slab']">
          Projects
        </p>
        <div>
          <p className="my-4 md:my-8 mx-auto text-center text-2xl md:text-3xl lg:text-4xl font-['Roboto_Slab']">
            Work
          </p>

          <div className="w-4/5 md:w-4/5 mt-4 md:mt-8 mx-auto md:gap-y-6 flex flex-wrap flex-row justify-around">
            <ProjectCard
              title="Football data visualisations"
              subtitle="Vis design | Matplotlib"
              backgroundImage={twenty3VisThumb}
              internalLink={"/twenty3-visualisations"}
            />
            <ProjectCard
              title="Match Centre development"
              subtitle="Python | APIs"
              backgroundImage={twenty3MatchCentreThumb}
              internalLink={"/match-centre"}
            />
          </div>
          <br />
          <div>
            <p className="my-4 md:my-8 mx-auto text-center text-2xl md:text-3xl lg:text-4xl font-['Roboto_Slab']">
              Hobby Projects
            </p>
          </div>
          <div className="w-4/5 md:w-4/5 mt-4 md:mt-8 mx-auto md:gap-y-6 flex flex-wrap flex-row justify-around">
            <ProjectCard
              title="Football pitwall app"
              subtitle="Product design | FastAPI | React"
              backgroundImage={debugBuildupThumb}
              internalLink={"/debug-buildup"}
            />
            <ProjectCard
              title="Analytics library"
              subtitle="Django | React"
              backgroundImage={analyticsLibraryThumb}
              internalLink={"/analytics-library"}
            />
            <ProjectCard
              title="Create-your-own-metric app"
              subtitle="Streamlit | Tracking data"
              backgroundImage={metricsCreatorThumb}
              internalLink={"/create-own-metric"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
