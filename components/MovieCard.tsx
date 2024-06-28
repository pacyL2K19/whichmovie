import Atropos from "atropos/react";
import Image from "next/image";

export interface Movie {
  title: string;
  description: string;
  image: string;
  accuracy: number;
  id: string;
}

export const MovieCard = (props: Movie) => {
  const { title, description, image, accuracy } = props;
  return (
    <div className="border-2 border-gray-500 overflow-hidden rounded-lg shadow-lg lg:flex-row lg:items-start lg:justify-between p-2 w-[200px]">
      <Atropos activeOffset={40} shadowScale={1.05}>
        <Image src={image} alt="Movie poster" width={200} height={300} />
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
