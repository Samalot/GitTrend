"use client"

import { useAppSelector } from "@/lib/storeHooks";
import RepoTile from "@/components/RepoTile";
import { useEffect, useState } from "react";

export default function Home() {
  // Client check to prevent SSR Hydration issues
  const [isClient, setIsClient] = useState(false);
  const { favourites } = useAppSelector((state) => state.favourite);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const repos = isClient ? favourites : []

  return (
    <main className="mx-auto max-w-6xl">
      <h2 className="text-white font-bold text-lg text-center mb-4 mt-5">Saved Repos</h2>
      {
        repos.length > 0
          ? (
            <ul className="mt-5 grid grid-cols-1 gap-6 text-center md:grid-cols-2 lg:grid-cols-3" data-testid="tile-container">
              { repos.map((repo, index) => <RepoTile key={`repo-tile-${index}`} {...repo} />) }
            </ul>
          ) : <div className="text-white text-lg text-center mb-4 mt-5 w-full">You have not saved any repos</div>
      }
    </main>
  );
}
