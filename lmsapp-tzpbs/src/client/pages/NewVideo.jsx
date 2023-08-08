import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createVideo from '@wasp/actions/createVideo';

export function NewVideo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const createVideoFn = useAction(createVideo);

  const handleCreateVideo = () => {
    createVideoFn({
      title,
      description,
      url
    });
    setTitle('');
    setDescription('');
    setUrl('');
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Title"
        className="px-1 py-2 border rounded text-lg"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        className="px-1 py-2 border rounded text-lg"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL"
        className="px-1 py-2 border rounded text-lg"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleCreateVideo}
        className="bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded"
      >
        Create Video
      </button>
      <Link to="/">Go back</Link>
    </div>
  );
}