import { useEffect, useState } from 'react';
import BlogForm from '../../components/BlogForm';

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { id } = useRouter().query;

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div className="container mx-auto">
      {post && <BlogForm post={post} />}
    </div>
  );
};

export default EditPost;
