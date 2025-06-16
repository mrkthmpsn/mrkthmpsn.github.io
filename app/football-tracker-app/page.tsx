import markdown from "./football-tracker-app.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/home_page_thumbs/football-tracker-app-full-screen.png";

const AnalyticsLibraryProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"React Native match tracker app"}
      pageMarkdown={markdown}
      dateString="Spring 2025"
      headerImage={headerImage}
    />
  );
};

export default AnalyticsLibraryProjectPage;
