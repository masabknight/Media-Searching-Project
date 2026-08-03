import React, { useEffect } from 'react'
import { fetchPhotos, fetchVideos, fetchGif } from '../api/mediaApi'
import { setQuery, setLoading, setError, setResults } from '../redux/features/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import ResultCard from './ResultCard';


const ResultGrid = () => {

    const { query, activeTab, results, loading, error } = useSelector((store) => store.search);

    const dispatch = useDispatch();


    useEffect(() => {

        if(!query) return 

        const getData = async () => {

            try {

                dispatch(setLoading());

                let data = [];

                if (activeTab == 'photos') {
                    let response = await fetchPhotos(query);

                    data = response.results.map((item) => ({
                        id: item.id,
                        type: 'photo',
                        title: item.alt_description || 'Photo',
                        thumbnail: item.urls.small,
                        src: item.urls.full,
                    }))
                }
                if (activeTab == 'videos') {
                    let response = await fetchVideos(query);
                    data = response.videos.map((item) => ({
                        id: item.id,
                        type: 'video',
                        title: item.user.name || 'video',
                        thumbnail: item.image,
                        src: item.video_files[0].link,
                    }))
                }
                if (activeTab == 'gif') {
                    let response = await fetchGif(query);
                    data = response.data.map((item) => ({
                        id: item.id,
                        type: 'Gif',
                        title: item.title || "GIF",
                        thumbnail: item.images.downsized.url,
                        src: item.images.downsized.url,
                    }))
                }

                dispatch(setResults(data));

            } catch (err) {
                dispatch(setError(err.message));
            }

        }

        getData();
    }, [query, activeTab])

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading</h1>

    return (
        <div>
            {results.map((item, idx) => {
                return <div key={idx}>
                    <ResultCard item={item}/>
                </div>
            })}
        </div>
    )
}

export default ResultGrid
