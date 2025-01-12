import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="w-full py-8">
          <Container>
            <h1 className="mb-6 text-2xl font-bold text-center">
            Select a post to learn more
            </h1>
            
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div key={post.$id} className="w-1/4 p-2">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default AllPosts;
