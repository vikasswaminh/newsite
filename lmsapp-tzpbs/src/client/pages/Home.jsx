import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserVideos from '@wasp/queries/getUserVideos';
import deleteVideo from '@wasp/actions/deleteVideo';

export function HomePage() {
  const { data: videos, isLoading, error } = useQuery(getUserVideos);
  const deleteVideoFn = useAction(deleteVideo);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {videos.map((video) => (
        <div
          key={video.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{video.title}</div>
          <div>{video.description}</div>
          <div>
            <button
              onClick={() => deleteVideoFn({ id: video.id })}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
            <Link
              to={`/video/${video.id}`}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
      <div>
        <Link to='/new-video' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
          Add New Video
        </Link>
      </div>
    </div>
  );
}