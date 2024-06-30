export const MovieCardSkeleton = () => {
  return (
    <div className="border-2 border-gray-700 overflow-hidden rounded-lg shadow-lg p-2 w-[300px]">
      <div className="w-full h-[300px] bg-gray-300 animate-pulse relative">
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-300 to-transparent" />
      </div>
      <div className="py-2">
        <div className="h-6 bg-gray-300 rounded-md mb-2 animate-pulse" />
        <div className="h-24 bg-gray-300 rounded-md animate-pulse" />
      </div>
    </div>
  );
};

export const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 w-full justify-items-center">
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
    </div>
  );
}
