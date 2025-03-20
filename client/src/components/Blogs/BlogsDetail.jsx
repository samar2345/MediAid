import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Heart, MessageCircle, Share2, Bookmark,
    Clock, Tag, User, Calendar
} from 'lucide-react';

const BlogsDetail = () => {
    const {id} = useParams();

    // Dummy data for blog details
    const dummyBlogs = [
        {
            id: 1,
            title: 'First Blog',
            author: 'John Doe',
            keytopics: 'Technology, AI',
            content: 'This is the content of the first blog post. It covers various topics related to technology and AI.',
            image: 'https://via.placeholder.com/600x400',
            created_at: new Date().toISOString()
        },
        {
            id: 2,
            title: 'Second Blog',
            author: 'Jane Smith',
            keytopics: 'Health, Fitness',
            content: 'This is the content of the second blog post. It discusses health and fitness tips.',
            image: 'https://via.placeholder.com/600x400',
            created_at: new Date().toISOString()
        },
        {
            id: 3,
            title: 'Third Blog',
            author: 'Alice Johnson',
            keytopics: 'Travel, Adventure',
            content: 'This is the content of the third blog post. It shares travel experiences and adventure stories.',
            image: 'https://via.placeholder.com/600x400',
            created_at: new Date().toISOString()
        },
        {
            id: 4,
            title: 'Fourth Blog',
            author: 'Bob Brown',
            keytopics: 'Finance, Investment',
            content: 'This is the content of the fourth blog post. It provides insights into finance and investment strategies.',
            image: 'https://via.placeholder.com/600x400',
            created_at: new Date().toISOString()
        },
        {
            id: 5,
            title: 'Fifth Blog',
            author: 'Charlie Davis',
            keytopics: 'Education, Learning',
            content: 'This is the content of the fifth blog post. It focuses on education and lifelong learning.',
            image: 'https://via.placeholder.com/600x400',
            created_at: new Date().toISOString()
        }
    ];

    // Find the blog with the matching ID
    const blog = dummyBlogs.find(blog => blog.id === parseInt(id));

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Blog not found!</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative h-66"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
                <div className="absolute top-4 left-4">
                    <Link to="/blogs">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-full bg-white text-gray-800 flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </motion.button>
                    </Link>
                </div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
                    <motion.h1
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        {blog.title}
                    </motion.h1>
                    <div className="flex items-center gap-4 text-white">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            <span>{blog.keytopics}</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto px-6 py-12"
            >
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="prose prose-lg max-w-none">
                        {blog.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Interaction Bar */}
                    <div className="mt-12 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex items-center gap-2 text-gray-600 hover:text-red-500"
                                >
                                    <Heart className="w-5 h-5" />
                                    <span>Like</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Comment</span>
                                </motion.button>
                            </div>
                            <div className="flex items-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-gray-600 hover:text-blue-500"
                                >
                                    <Share2 className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-gray-600 hover:text-yellow-500"
                                >
                                    <Bookmark className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogsDetail;