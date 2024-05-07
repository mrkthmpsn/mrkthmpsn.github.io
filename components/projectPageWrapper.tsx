import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/pages-styles.css";
import Markdown from "react-markdown";
import CustomNavbar from "./navbar";

interface ProjectPageWrapperProps {
  pageTitle: string;
  pageMarkdown: any;
  dateString: string;
  headerImage: any;
}

const ProjectPageWrapper: React.FC<ProjectPageWrapperProps> = ({
  pageTitle,
  pageMarkdown,
  dateString,
  headerImage,
}) => {
  return (
    <>
      <CustomNavbar />
      <p
        className="mt-4 md:mt-8 mx-auto text-center 
          text-2xl md:text-3xl lg:text-4xl
          font-['Roboto_Slab']"
      >
        {pageTitle}
      </p>
      <p className="justify-center text-center">
        <i>{dateString}</i>
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-6">
          <img
            className="w-4/5 sm:w-3/5 mx-auto lg:w-4/5 lg:sticky lg:top-12 shadow"
            src={headerImage.src}
          ></img>
        </div>
        <div className="article lg:col-span-6 lg:col-start-7">
          <Markdown>{pageMarkdown}</Markdown>
        </div>
      </div>
    </>
  );
};

export default ProjectPageWrapper;
