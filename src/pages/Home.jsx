import React, { useState, useEffect } from 'react';
import { Container } from '../components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
    const authStatus = useSelector((state) => state.auth.status); // Check if the user is logged in
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen">
            {/* Main Content */}
            <div className="flex-grow">
                <div className="w-full py-8">
                    <Container>
                        {/* Welcome Section */}
                        <div className="p-8 mb-8 text-center bg-white rounded-lg shadow-lg">
                            <h2 className="mb-4 text-3xl font-semibold">
                                Welcome to Our Community!
                            </h2>
                            <p className="mb-6 text-xl text-gray-700">
                                Join us and be a part of a growing community of creators and innovators. Share your ideas, stories, and experiences.
                            </p>
                            {!authStatus ? (
                                <div>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="px-6 py-3 mb-4 text-lg font-semibold text-white duration-200 bg-blue-500 rounded-full hover:bg-blue-600"
                                    >
                                        Login to Get Started
                                    </button>
                                    <br />
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="px-6 py-3 text-lg font-semibold text-blue-500 duration-200 bg-transparent border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-white"
                                    >
                                        Sign Up Now
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button 
                                        onClick={() => navigate('/add-post')}
                                        className="px-6 py-3 text-lg font-semibold text-white duration-200 bg-blue-500 rounded-full hover:bg-blue-600"
                                    >
                                        Add New Post
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* How It Works Section */}
                        <div className="p-8 mb-8 bg-gray-100 rounded-lg">
                            <h2 className="mb-6 text-3xl font-semibold text-center">How It Works</h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                                <div className="p-6 text-center bg-white rounded-lg shadow-lg">
                                    <h3 className="mb-4 text-xl font-semibold">1. Create an Account</h3>
                                    <p className="text-gray-600">Sign up for free and start creating content.</p>
                                </div>
                                <div className="p-6 text-center bg-white rounded-lg shadow-lg">
                                    <h3 className="mb-4 text-xl font-semibold">2. Share Your Ideas</h3>
                                    <p className="text-gray-600">Publish articles and share your thoughts with the world.</p>
                                </div>
                                <div className="p-6 text-center bg-white rounded-lg shadow-lg">
                                    <h3 className="mb-4 text-xl font-semibold">3. Connect with Others</h3>
                                    <p className="text-gray-600">Engage with others, comment, and join the conversation.</p>
                                </div>
                            </div>
                        </div>

                        {/* Featured Content Section */}
                        <div className="p-8 bg-white rounded-lg shadow-lg">
                            <h2 className="mb-6 text-3xl font-semibold text-center">Featured Content</h2>
                            <div className="flex items-center justify-center text-center">
                                <p className="text-xl text-gray-700">This is a place where you can explore trending articles, new ideas, and exciting content from our community. Log in to start publishing your own posts.</p>
                            </div>
                            <div className="mt-6 text-center">
                                {!authStatus && (
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="px-6 py-3 text-lg font-semibold text-white duration-200 bg-blue-500 rounded-full hover:bg-blue-600"
                                    >
                                        Login to Publish Your Article
                                    </button>
                                )}
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            
        </div>
    );
}

export default Home;
