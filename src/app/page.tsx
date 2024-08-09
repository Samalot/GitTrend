"use client"

import { useEffect, useMemo, useState } from "react";
import filterLanguages from "../data/languages.json";
import RepoTile from "@/components/RepoTile";
import Error from "@/components/Error";
import Spinner from "@/components/Spinner";
import { RepoProps } from "@/components/RepoTile";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [repositories, setRepositories] = useState<RepoProps[]>([]);
  
  const languages = useMemo(() => ["All", ...filterLanguages.sort()], []);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");

  useEffect(() => {
    getRepos();
  }, [selectedLanguage]);

  const getRepos = async () => {
    setLoading(true);
    const response = await fetch('/api/repo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({language: selectedLanguage})
    });

    if (response.ok) {
      const repos = await response.json(); 
      setRepositories(repos);
    }
    else {
      const error = await response.json(); 
      setError(error.message);
    }

    setLoading(false);
  };

  const retry = () => {
    setError(undefined);
    getRepos();
  };

  if (error) {
    return <Error message={error} retry={retry}/>
  }

  return (
    <main className="mx-auto max-w-6xl">
        <h2 className="text-white font-bold text-lg text-center mb-4 mt-5">
          Repos Created in the last <u>7 Days</u>, by Stars
        </h2>

        <div className="my-1 py-2  border-solid border-t border-b border-white flex flex-row items-center">
          <label className="text-white mr-2" htmlFor="languages">Language: </label>
          <select
            id="languages"
            data-testid="language-select"
            className="border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-1.5"
            onChange={(e) => setSelectedLanguage(e.currentTarget.value)}
          >
            { languages.map((l, index) => <option value={l} key={`filter-language-${l}`}>{l}</option>) }
          </select>
        </div>

        {
          loading ? <Spinner /> : (
            <ul className="mt-5 grid grid-cols-1 gap-6 text-center md:grid-cols-2 lg:grid-cols-3" data-testid="tile-container">
              {
                repositories.map((repo, index) => <RepoTile key={`repo-tile-${index}`} {...repo} />)
              }
            </ul>
          )
        }
    </main>
  );
}

export default Page;
