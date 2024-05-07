import markdown from "./label-unlabelled-statsbomb.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import statsbombLabellingThumb from "public/images/home_page_thumbs/statsbomb_labelling_thumb.png";

const LabelStatsBombDataProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"Labelling unlabelled data"}
      pageMarkdown={markdown}
      dateString={"July 2023"}
      headerImage={statsbombLabellingThumb}
    />
  );
};

export default LabelStatsBombDataProjectPage;
