import markdown from "./personal-site-project.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/galleries/personal-site-sep-2026.png";

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
