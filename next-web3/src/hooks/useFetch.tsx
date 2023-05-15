import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC__GIPHY_API_KEY

const useFetch = ({keyword}: { keyword: string }) => {
    console.log(keyword)
    const [gifUrl, setGifUrl] = useState<string>('');

    const fetchGifs = async () => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
            const {data} = await response.json();
            console.log(data[0]?.images?.downsized_medium?.url);
            setGifUrl(data[0]?.images?.downsized_medium?.url);
        } catch (e) {
            setGifUrl('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284');
        }
    };
    useEffect(() => {
        if (keyword) fetchGifs();
    }, [keyword]);
    return gifUrl;
}

export default useFetch;

