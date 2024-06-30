import { VideoCameraIcon } from "@heroicons/react/24/solid";
import Atropos from "atropos/react";
import { Movie } from "./types";

export const MovieCard = (props: Movie) => {
  const { title, description, image } = props;
  return (
    <div className="border-2 border-gray-700 overflow-hidden rounded-lg shadow-lg lg:flex-row lg:items-start lg:justify-between p-2 w-[300px] relative">
      <Atropos activeOffset={40} shadowScale={1.05}>
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
          }}
          className="w-full h-[300px] bg-center bg-no-repeat bg-cover relative rounde-lg"
        >
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-2 left-2 w-[300px]">
            <button className="px-4 py-2 text-white rounded-lg flex items-center justify-center bg-blue-500 hover:bg-blue-600 gap-2">
              <VideoCameraIcon className="w-6 h-6 text-red-900 dark:text-red-900" />
              Watch
            </button>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 py-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </Atropos>
    </div>
  );
};
