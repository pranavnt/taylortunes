import Head from "next/head";
import { useState } from "react";
import Song from "../components/Song";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  return (
    <div>
      <Head>
        <title>TaylorTunes – A search engine for Taylor Swift Songs</title>
        <meta
          name="description"
          content="A search engine for Taylor Swift songs :)"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="font-bold text-4xl content-center text-gray-800 flex justify-center pt-[50px]">
          TaylorTunes
        </h1>
        <p className="flex justify-center pb-5 text-lg">
          Search lyrics from Taylor Swift songs
        </p>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search for a song"
            className="text-2xl border-2 border-gray-200 rounded-l-2xl pl-2 w-1/2 border-r-0"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r-2xl"
            type="button"
            onClick={() => {
              let url = "https://taylortunes.pranavnt.repl.co/search/" + query;
              fetch(url, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  setResults(data);
                });
            }}
          >
            Search
          </button>
        </div>
        <div className="pl-2 pr-2">
          {results.map((result) => {
            return (
              <Song
                title={result.title}
                album={result.album}
                matches={result.matches}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
