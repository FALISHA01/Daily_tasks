"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const PostCard = ({ post }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`);
      router.refresh();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <motion.div
      className="p-4 bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-700 text-white border rounded shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-bold">{post.title}</h3>
      <p>{post.description}</p>
      {post.image && <img src={post.image} alt={post.title} className="post-image" />}
      <div className="mt-4 flex justify-between">
        <button 
          onClick={() => router.push(`/put/${post._id}`)} 
          className="text-blue-300 hover:text-blue-500 transition duration-200"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete} 
          className="text-red-300 hover:text-red-500 transition duration-200"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default PostCard;
