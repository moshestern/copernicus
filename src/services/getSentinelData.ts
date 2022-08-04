import { useEffect, useState } from 'react';
import { secret } from '../utils/secret';
import { POLYGON } from '../utils/consts';

const { username, password } = secret;
const fetchOptions = {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`),
    },
};

const parser = new DOMParser();

type SentinelDataProps = {
    sentinelData: XMLDocument | null
    isLoading: boolean
}

export const useGetSentinelData = (startPoint: number, maxCloudCover:number = 30):SentinelDataProps => {
    const [sentinelData, setSentinelData] = useState<XMLDocument | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchSentinelData = () => {
            const url = `https://scihub.copernicus.eu/dhus/search?start=${startPoint}&rows=2&q=( footprint:"Intersects(POLYGON${POLYGON})") AND ( (platformname:Sentinel-2 AND cloudcoverpercentage:[0 TO ${maxCloudCover}]))`;
    
            fetch(url, fetchOptions)
                .then(response => response.text())
                .then(responseText => {
                    setSentinelData(parser.parseFromString(responseText, 'text/xml'));
                    setIsLoading(false);
                });
        };
        fetchSentinelData();
    }, [startPoint, maxCloudCover]);

    return {sentinelData, isLoading};
};