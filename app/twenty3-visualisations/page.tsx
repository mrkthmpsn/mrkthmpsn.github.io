import markdown from "./twenty3-visualisations.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/home_page_thumbs/twenty3-vis-1.png";

const Twenty3VisualisationsProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"Football data visualisations"}
      pageMarkdown={markdown}
      dateString="2019-present"
      headerImage={headerImage}
    />
  );
};

export default Twenty3VisualisationsProjectPage;
