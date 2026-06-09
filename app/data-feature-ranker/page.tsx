import markdown from "./data-feature-ranker.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/data-feature-ranker/global-rankings.png";

const DataFeatureRankerProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"Football data feature battle ranker"}
      pageMarkdown={markdown}
      dateString="Spring 2026"
      headerImage={headerImage}
    />
  );
};

export default DataFeatureRankerProjectPage;
