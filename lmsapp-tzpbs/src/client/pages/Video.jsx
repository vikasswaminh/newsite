import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getVideo from '@wasp/queries/getVideo';
import deleteVideo from '@wasp/actions/deleteVideo';

export function VideoPage() {
  const { videoId } = useParams();
  const { data: video, isLoading, error } = useQuery(getVideo, { id: parseInt(videoId) });
  const deleteVideoFn = useAction(deleteVideo);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleDeleteVideo = () => {
    deleteVideoFn({ id: parseInt(videoId) });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{video.title}</h1>
      <p className='mb-4'>{video.description}</p>
      <video
        src={video.url}
        controls
        className='mb-4'
      ></video>
      <button
        onClick={handleDeleteVideo}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
      >
        Delete Video
      </button>
      <Link to='/' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>Go Back</Link>
    </div>
  );
}