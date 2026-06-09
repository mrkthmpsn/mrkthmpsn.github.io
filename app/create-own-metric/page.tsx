import markdown from "./create-own-metric.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/galleries/streamlit-metrics-creator-webapp.png";

const CreateOwnMetricProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"Football data visualisations"}
      pageMarkdown={markdown}
      dateString="October 2023"
      headerImage={headerImage}
    />
  );
};

export default CreateOwnMetricProjectPage;
