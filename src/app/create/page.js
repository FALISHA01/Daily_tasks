"use client";
import { motion } from 'framer-motion';
import BlogForm from '../../components/BlogForm';

const CreatePost = () => {
  return (
    <motion.div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black', // Set background to black
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '32rem',
          padding: '1.5rem',
          borderRadius: '0.375rem',
          background: 'linear-gradient(to right, #ff0080, #33001b)', // Galaxy-like gradient colors
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' // Shadow effect
        }}
      >
        <BlogForm />
      </div>
    </motion.div>
  );
};

export default CreatePost;
