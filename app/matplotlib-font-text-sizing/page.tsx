import markdown from "./matplotlib-font-text-sizing.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/home_page_thumbs/custom-fonts-example-squawka.png";

const FontTextSizingProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={
        "Custom fonts & automatic font size in matplotlib visualisations"
      }
      pageMarkdown={markdown}
      dateString="Autumn 2023"
      headerImage={headerImage}
    />
  );
};

export default FontTextSizingProjectPage;
