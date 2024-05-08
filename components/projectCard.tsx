import React from "react";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  backgroundImage: any;
  internalLink: string;
  subtitleColour?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  backgroundImage,
  internalLink,
  subtitleColour = "black",
}) => {
  return (
    <a href={internalLink} className="no-underline">
      <div
        className="basis-1/3 group w-48 h-32 md:w-72 md:h-48 bg-cover bg-center border-brandStraw-950 border-2 rounded-lg shadow-md shadow-gray-400 hover:shadow-brandStraw-200 relative flex items-end justify-center overflow-hidden cursor-pointer transition-all m-2 md:m-4"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full hover:!bg-black hover:!bg-opacity-5 rounded-lg duration-150">
          <div className="flex flex-col w-11/12 md:w-5/6 items-center justify-center text-center text-black">
            <p className="text-lg md:text-2xl px-2 bg-brandStraw-200 rounded-m font-['Roboto Slab']">
              {title}
            </p>
          </div>
          <div
            className={`flex flex-col items-center justify-end text-center text-${subtitleColour} w-full h-full absolute bottom-0 md:pb-4 md:!opacity-0 md:text-normal md:group-hover:!opacity-100 transition-opacity duration-150`}
          >
            <p className="text-sm mb-2 md:mb-4 md:text-lg">{subtitle}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
