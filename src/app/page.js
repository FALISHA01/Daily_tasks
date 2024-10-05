'use client'; // This tells Next.js to treat this as a client component

import { useEffect, useState } from 'react';
import BlogList from '../components/BlogList.js'; // Include .js extension if necessary
import Link from 'next/link';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts'); // Replace with your backend URL
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative"
      style={{
        backgroundImage:
          'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 1px, transparent 1px), ' +
          'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '150px 150px, 200px 200px',
      }}
    >
      {/* Twinkling stars animation */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 w-full h-full animate-[stars_twinkle_15s_linear_infinite]"></div>
      </div>
  
      <div className="container mx-auto relative z-10">
        <h1 className="text-3xl font-bold text-center text-white my-5">
          My Blog
        </h1>
        <Link href="/create">
          <button className="mb-4 bg-pink-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-300">
            Create New Post
          </button>
        </Link>
        <BlogList posts={posts} />
      </div>
    </div>
  );
  
};

export default Home;
