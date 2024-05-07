import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/pages-styles.css";
import Markdown from "react-markdown";
import CustomNavbar from "./navbar";

interface PageWrapperProps {
  pageTitle: string;
  pageMarkdown: string;
  isCategoryPage: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  pageTitle,
  pageMarkdown,
  isCategoryPage,
}) => {
  return (
    <>
      <CustomNavbar />
      <p
        className={`mt-4 md:mt-8 mx-auto text-center ${
          isCategoryPage
            ? "text-4xl md:text-5xl lg:text-6xl"
            : "text-2xl md:text-3xl lg:text-4xl"
        }  font-['Roboto_Slab']`}
      >
        {pageTitle}
      </p>
      <div className="article">
        <Markdown>{pageMarkdown}</Markdown>
      </div>
    </>
  );
};

export default PageWrapper;
