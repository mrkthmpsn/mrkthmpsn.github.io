import PageWrapper from "@/components/pageWrapper";
import markdown from "./about.md";

const AboutPage = () => {
  return (
    <PageWrapper
      pageTitle={"About"}
      pageMarkdown={markdown}
      isCategoryPage={true}
    />
  );
};

export default AboutPage;
