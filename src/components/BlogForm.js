"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import axios from 'axios';

const BlogForm = ({ post }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setImageUrl(post.image || '');
    }
  }, [post]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Convert the image to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result); // Set Base64 image
    };
    if (file) {
      reader.readAsDataURL(file); // Read file as Data URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = post ?  `http://localhost:5000/api/posts/${post._id}` : 'http://localhost:5000/api/posts';

    try {
      const postData = { title, description, image: imageUrl || post.image };
      if (post) {
        await axios.put(endpoint, postData);
      } else {
        await axios.post(endpoint, postData);
      }
      router.push('/'); // Redirect to home after submission
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-purple-900 via-indigo-800 to-black shadow-lg rounded-lg px-8 pt-6 pb-8 text-white animate-gradient-bg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl mb-6 text-center font-extrabold">Create a New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="shadow-lg appearance-none border border-gray-500 rounded w-full py-2 px-4 mb-4 focus:outline-none focus:shadow-outline bg-gray-900 text-white"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="shadow-lg appearance-none border border-gray-500 rounded w-full py-2 px-4 mb-4 focus:outline-none focus:shadow-outline bg-gray-900 text-white"
      />
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="shadow-lg appearance-none border border-gray-500 rounded w-full py-2 px-4 focus:outline-none focus:shadow-outline bg-gray-900 text-white"
        />
      </div>

      {imageUrl && (
        <img src={imageUrl} alt="Uploaded preview" className="mt-4 w-full h-auto object-cover rounded-lg shadow-lg" />
      )}

      <button type="submit" className="w-full bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
        {post ? 'Update Post' : 'Create Post'}
      </button>
    </motion.form>
  );
};

export default BlogForm;
