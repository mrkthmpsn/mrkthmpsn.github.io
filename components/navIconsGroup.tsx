import { BeakerIcon } from "@heroicons/react/24/solid";
import {
  InformationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const NavIconsGroup = () => {


return (<>
            <div className="flex justify-center items-center">
              <a href="/about" className="space-x-2">
                <InformationCircleIcon className="h-4 w-4 md:h-6 md:w-6" />
                <p className="mb-0">About</p>
                <InformationCircleIcon className="h-4 w-4 md:h-6 md:w-6" />
              </a>
            </div>
            <div className="flex justify-center items-center">
              <a href="/projects" className="space-x-2">
                <BeakerIcon className="h-4 w-4 md:h-6 md:w-6" />
                <p className="mb-0">Projects</p>
                <BeakerIcon className="h-4 w-4 md:h-6 md:w-6" />
              </a>
            </div>
            <div className="flex justify-center items-center">
              <a href="/contact" className="space-x-2">
                <PaperAirplaneIcon className="h-4 w-4 md:h-6 md:w-6" />
                <p className="mb-0">Contact</p>
                <PaperAirplaneIcon className="h-4 w-4 md:h-6 md:w-6" />
              </a>
            </div>
            </>
          )
}

export default NavIconsGroup