"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { add, remove } from "@/lib/features/favouriteSlice";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";

export interface RepoProps {
  name: string,
  description: string,
  owner: string,
  url: string,
  language: string,
  stars: number,
  id: number
}

const RepoTile: React.FC<RepoProps> = ({name, description, owner, url, language, stars, id}) => {
  const { favourites } = useAppSelector((state) => state.favourite);

  useEffect(() => {
    setFavourited(!!favourites.find(repo => repo.id === id));
  }, [favourites, id]);
  
  const dispatch = useAppDispatch();
  const [favourited, setFavourited] = useState<boolean>(!!favourites.find(repo => repo.id === id));

  const handleFavourite = () => {
    setFavourited(!favourited);
    const action = favourited ? remove : add;
    dispatch(action({name, description, owner, url, language, stars, id}));
  };

  return (
    <li>
      <article
        className="rounded-xl bg-white p-4 shadow-sm transform transition duration-250 hover:scale-105 h-full flex flex-col"
      >
          <div className="flex flex-row">
            <a
              className="cursor-pointer"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="font-bold text-left text-lg">{name}</h3>
            </a>
            <div className="flex-grow"/>
            
            <button
              onClick={handleFavourite}
              className="inline-block"
              data-testid="favourite"
            >
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src={favourited ? "/starFilled.svg" : "/starOutline.svg"}
                alt="Not favorited"
                width={25}
                height={25}
              />
            </button>
          </div>

          <div className="text-left text-sm mt-2">
            <span role="presentation">👤</span>
            <span className="italic">{owner}</span>
          </div>

          <summary className="text-left text-base mt-4 flex-grow">{description}</summary>

          <div className="flex flex-row">
            <div className="inline-block text-xs text-white bg-gradient-to-br from-orange-700 to-orange-500 rounded-lg px-2 py-2 text-center mt-2">
              <span role="presentation" className="mr-1">⭐</span>
              {stars}
            </div>
            <div className="flex-grow"/>
            { language && <div className="inline-block text-xs text-white bg-gradient-to-br from-purple-700 to-purple-500 rounded-lg px-2 py-2 text-center mt-2">{language}</div>} 
          </div>
      </article>
    </li>
  );
};

export default RepoTile;