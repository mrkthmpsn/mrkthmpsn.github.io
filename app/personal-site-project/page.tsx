import markdown from "./personal-site-project.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/home_page_thumbs/personal-site-may-2024.png";

const PersonalSiteProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"This site!"}
      pageMarkdown={markdown}
      dateString="April-May 2024"
      headerImage={headerImage}
    />
  );
};

export default PersonalSiteProjectPage;
