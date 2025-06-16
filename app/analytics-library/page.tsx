import markdown from "./analytics-library.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/analytics_library/new_analytics_library_landing.png";

const AnalyticsLibraryProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"Django + React football analytics library"}
      pageMarkdown={markdown}
      dateString="June 2023, April 2025"
      headerImage={headerImage}
    />
  );
};

export default AnalyticsLibraryProjectPage;
