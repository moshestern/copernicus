import { useState, useEffect } from "react";
import { Images } from "../components/Images";
import { useGetSentinelData } from '../services/getSentinelData';
import { getRandomNumber } from '../services/getRandomNumber';

export const Main = () => {
    const [fetchStartPoint, setFetchStartPoint] = useState<number>(getRandomNumber());
    const [filter, setFilter] = useState<number>(1);
    const {sentinelData, isLoading} = useGetSentinelData(fetchStartPoint);
    const [imagesSrc, setImagesSrc] = useState<string[]>([]);
        
    useEffect(() => {
        setImagesSrc([]);
        if (sentinelData) {
          const iconsLinks = sentinelData.querySelectorAll('link[rel=icon]');
          for (let i = 0; i < iconsLinks.length; i++) {
            setImagesSrc(prevImages => [...prevImages, iconsLinks[i].getAttribute('href')!]);
          }
        }
      }, [sentinelData]);

      const handleReplace = () => {
        setFetchStartPoint(getRandomNumber());
      };

      const handleBrighten = () => {
        setFilter(prevFilter => prevFilter + 0.1);
      };

      const handleReset = () => {
        setFilter(1);
      };

    return (
        <main>
            {isLoading && <div className="loader">loading...</div>}
            <button onClick={handleReplace}>Replace</button>
            <button onClick={handleBrighten}>Brighten</button>
            <button onClick={handleReset}>Reset brightness</button>
            <Images imagesSrc={imagesSrc} filter={filter} />
        </main>
    )
};
