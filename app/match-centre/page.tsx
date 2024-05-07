import markdown from "./match-centre.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/home_page_thumbs/twenty3_match_centre.png";

const Twenty3MatchCentreProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"Twenty3 Match Centre"}
      pageMarkdown={markdown}
      dateString="Summer 2023"
      headerImage={headerImage}
    />
  );
};

export default Twenty3MatchCentreProjectPage;
