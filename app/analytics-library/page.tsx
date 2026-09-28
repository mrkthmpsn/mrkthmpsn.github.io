import markdown from "./analytics-library.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/analytics_library/analytics_library_2026_home.png";

const AnalyticsLibraryProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"Django + React football analytics library"}
      pageMarkdown={markdown}
      dateString="2023-present"
      headerImage={headerImage}
    />
  );
};

export default AnalyticsLibraryProjectPage;
