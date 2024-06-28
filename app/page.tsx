"use client";

import { ChangeEvent, useState } from "react";
import "atropos/css";
import { dummyMovies } from "@/utils";
import { MovieCard } from "@/components";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSearchByText = () => {};

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
        <p>
          <span>?:</span> Do you have a screenshot took from a youtube short and
          want to know the title of the movie? You are in the right place.
        </p>
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
              />

              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg"
                onClick={handleSearchByText}
              >
                Search
              </button>
            </div>
          </form>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-between w-full space-y-4 lg:w-1/2 lg:items-start lg:space-y-8"
          >
            <h3>Search by image</h3>
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
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="z-10 w-full max-w-5xl justify-between font-mono text-sm flex flex-col gap-8">
        <h2>Matching results</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {dummyMovies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </section>

      <section className="z-10 w-full max-w-5xl justify-between font-mono text-sm flex flex-col gap-8 my-8">
        <h2>How it works?</h2>
        <p>
          <span>{">"}</span> We use the power of <span>Weaviate</span>&apos;s
          vector database to find the best match for the image or text you
          provide.
        </p>
        <p>
          <span>{">"}</span> We use the power of AI to find the best match for
          the image or text you provide.
        </p>
      </section>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
