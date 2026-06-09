import markdown from "./personal-site-project.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/galleries/personal-site-may-2024.png";

const PersonalSiteProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"This site!"}
      pageMarkdown={markdown}
      dateString="April-May 2024, June 2026"
      headerImage={headerImage}
    />
  );
};

export default PersonalSiteProjectPage;
