import markdown from "./twenty3-data-pipelines.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/galleries/twenty3-sport-homepage.png";

const Twenty3DataPipelinesProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"Twenty3 Data Pipelines"}
      pageMarkdown={markdown}
      dateString="2021-present"
      headerImage={headerImage}
    />
  );
};

export default Twenty3DataPipelinesProjectPage;
