import markdown from "./analytics-library.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/analytics_library/research_paper_screenshot.png";

const AnalyticsLibraryProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"Django + React football analytics library"}
      pageMarkdown={markdown}
      dateString="June 2023"
      headerImage={headerImage}
    />
  );
};

export default AnalyticsLibraryProjectPage;
