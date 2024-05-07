import markdown from "./debug-buildup.md";
import ProjectPageWrapper from "@/components/projectPageWrapper";
import headerImage from "@/public/images/home_page_thumbs/debug_buildup_app.png";

const DebugBuildupProjectPage = () => {
  return (
    <ProjectPageWrapper
      pageTitle={"'Debug your build-up' prototype sideline app"}
      pageMarkdown={markdown}
      dateString="April 2024"
      headerImage={headerImage}
    />
  );
};

export default DebugBuildupProjectPage;
