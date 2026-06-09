import markdown from "./football-tracker-app.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/galleries/football-tracker-app-full-screen.png";

const FootballTrackerAppProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"React Native match tracker app"}
      pageMarkdown={markdown}
      dateString="Spring 2025"
      headerImage={headerImage}
    />
  );
};

export default FootballTrackerAppProjectPage;
