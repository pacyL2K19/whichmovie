"use client";

import { ChangeEvent, useState } from "react";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";
import "atropos/css";

import { MovieCard } from "@/components";
import { searchByQuery } from "@/api-service";
import { Movie } from "@/components/types";
import { WeaviateReturn } from "weaviate-client";
import { SkeletonGrid } from "@/components/MovieSkeleton";
import { QUERY_EXAMPLES } from "@/constants/examples";

const ComingSoon = () => (
  <span className="text-gray-300 text-xs p-1 rounded-sm bg-gray-700 w-[120px] text-center">
    Coming soon
  </span>
);

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSearchByText = async (query_: string) => {
    setLoading(true);
    const results = (await searchByQuery(query_)) as WeaviateReturn<undefined>;
    setResults(
      results.objects.map((res) => {
        const properties = res?.properties as any;
        return {
          id: res.uuid,
          title: properties?.title,
          description: properties?.description,
          image: properties?.url,
        };
      })
    );

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="z-10 w-full max-w-5xl justify-between font-mono text-sm lg:flex flex-col gap-8">
        <h1 className="text-center pb-4">¿WhichMovie?</h1>
        <p>
          Find the best movies and TV shows to watch on your favorite streaming
          based on your current need.
        </p>
        <p>
          <span>?:</span> Encountered a movie on Tiktok or Instagram and want to
          watch it but don&apos;t know the exact title, only a few details? We
          got you covered.
        </p>
        <div>
          <p>
            <span>?:</span> Do you have a screenshot took from a youtube short
            and want to know the title of the movie? You are in the right place.{" "}
            <ComingSoon />
          </p>
        </div>
      </section>

      <section className="my-8">
        <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
          <div className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-between w-full max-w-5xl p-8 border-2 border-gray-500 space-y-8 rounded-lg shadow-lg lg:space-y-0 lg:flex-row lg:items-start lg:justify-between gap-8">
          <form
            onSubmitCapture={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-between w-full space-y-4 lg:w-1/2 lg:items-start lg:space-y-8"
          >
            <h3>Search by text</h3>
            <p className="text-gray-400 text-sm">
              Write a few words about the movie or TV show and we will find it
              for you.
            </p>
            <div className="flex w-full gap-2">
              <input
                type="text"
                placeholder="Enter text here"
                className="p-2 text-black border-2 rounded-lg w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg"
                onClick={() => handleSearchByText(query)}
                disabled={!query.length || loading}
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-lg"
                onClick={() => {
                  setQuery("");
                  setResults([]);
                }}
                disabled={!query.length || loading}
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>
            <div>
              <p>Try these:</p>
              {QUERY_EXAMPLES.map((example) => (
                <div
                  key={example.id}
                  onClick={() => {
                    setQuery(example.query);
                    handleSearchByText(example.query);
                  }}
                >
                  <span className="text-blue-500 cursor-pointer">
                    {example.query}
                  </span>
                </div>
              ))}
            </div>
          </form>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-between w-full space-y-4 lg:w-1/2 lg:items-start lg:space-y-8"
          >
            <h3>
              Search by image <ComingSoon />
            </h3>
            <p className="text-gray-400 text-sm">
              Upload an image or paste the URL of the image and we will find the
              movie or TV show for you.
            </p>
            <div className="flex w-full gap-2">
              <input type="file" onChange={handleFileSelection} />
              {file && (
                <p className="text-gray-400 text-sm">
                  Image selected: {file.name} ({file.size} bytes)
                </p>
              )}
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg"
                disabled
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="z-10 w-full max-w-5xl justify-between font-mono text-sm flex flex-col gap-8">
        <h2>Matching results</h2>
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 justify-items-center w-full">
            {results.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        )}
        {loading && <SkeletonGrid />}
      </section>

      <section className="z-10 w-full max-w-5xl justify-between font-mono text-sm flex flex-col gap-8 my-8">
        <h2>How it works?</h2>
        <p>
          <span>{">"}</span> We use the power of <span>Weaviate</span>&apos;s
          vector database to find the best match for the text query you provide.
        </p>
        <p>
          <span>{">"}</span> We use the power of AI to find the best match for
          the image or text you provide.
          <ComingSoon />
        </p>
      </section>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
