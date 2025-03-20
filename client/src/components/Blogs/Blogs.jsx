import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Paperclip, MapPin, Image, Share2, Smile, List, 
    Settings, Camera, Download, Maximize, Sparkles,
    Zap, ChevronRight, Moon, Sun, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';

const Blogs = () => {
    const [content, setContent] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [topics, setTopic] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState('read');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const fileInputRef = useRef(null);
    const emojiPickerRef = useRef(null);

    // Dummy data for blogs
    const [blog, setBlog] = useState([
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
    ]);

    // Handle clicking outside emoji picker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmoji(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit
                alert('File size too large. Please select an image under 5MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEmojiClick = (emojiObject) => {
        setContent(prevContent => prevContent + emojiObject.emoji);
        setShowEmoji(false);
    };

    const handlePublish = async () => {
        if (!title.trim() || !name.trim() || !content.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        const blogData = {
            id: blog.length + 1, // Generate a new ID
            title,
            author: name,
            keytopics: topics,
            content,
            image: selectedImage,
            created_at: new Date().toISOString()
        };

        try {
            setBlog(prevBlogs => [blogData, ...prevBlogs]);
            setActiveSection('read');
            
            // Reset form
            setTitle('');
            setName('');
            setTopic('');
            setContent('');
            setSelectedImage(null);
            
            alert('Blog published successfully!');
        } catch (error) {
            console.error('Error publishing blog:', error);
            alert('Failed to publish blog. Please try again.');
        }
    };

    const BlogCard = ({ post, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
        >
            <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {post.author[0]}
                </div>
                <div>
                    <h3 className="font-semibold">{post.author}</h3>
                    <p className="text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
            
            <h2 className="text-xl font-bold mb-3">{post.title}</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                {post.content.length > 150 
                    ? `${post.content.substring(0, 150)}...` 
                    : post.content}
            </p>
            <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
                    {post.keytopics}
                </span>
                <Link to={`/blog/${post.id}`}>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                        Read More
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );

    const BlogModal = ({ blog, onClose }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => onClose()}
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className={`relative max-w-3xl w-full rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                >
                    <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {blog.author[0]}
                    </div>
                    <div>
                        <h3 className="font-semibold">{blog.author}</h3>
                        <p className="text-sm text-gray-500">
                            {new Date(blog.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                {blog.image && (
                    <img 
                        src={blog.image} 
                        alt="Blog" 
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                )}
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} whitespace-pre-wrap`}>
                    {blog.content}
                </p>
                <div className="mt-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
                        {blog.keytopics}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
            {/* Header */}
            <motion.div 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
                <div className="relative z-10 px-6 py-12 text-center">
                    <motion.h1 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-6xl font-bold text-white mb-4"
                    >
                        Blog<span className="text-yellow-300">Space</span>
                    </motion.h1>
                    <p className="text-xl text-gray-200">Where ideas come to life</p>
                </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 my-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSection('read')}
                    className={`px-6 py-3 rounded-full ${
                        activeSection === 'read' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200'
                    }`}
                >
                    Read Blogs
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSection('write')}
                    className={`px-6 py-3 rounded-full ${
                        activeSection === 'write' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200'
                    }`}
                >
                    Write Blog
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-3 rounded-full bg-gray-200"
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>
            </div>

            <AnimatePresence mode="wait">
                {activeSection === 'read' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="px-6 py-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blog.map((post, index) => (
                                <BlogCard key={index} post={post} index={index} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeSection === 'write' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-4xl mx-auto px-6 py-4"
                    >
                        <div className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg mb-4 ${
                                    isDarkMode 
                                        ? 'bg-gray-700 text-black placeholder-gray-400' 
                                        : 'bg-gray-100 text-gray-900'
                                } focus:ring-2 focus:ring-blue-500`}
                            />
                            <input
                                type="text"
                                placeholder="Blog Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg mb-4 ${
                                    isDarkMode 
                                        ? 'bg-gray-700 text-black placeholder-gray-400' 
                                        : 'bg-gray-100 text-gray-900'
                                } focus:ring-2 focus:ring-blue-500`}
                            />
                            <input
                                type="text"
                                placeholder="Topics (comma-separated)"
                                value={topics}
                                onChange={(e) => setTopic(e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg mb-4 ${
                                    isDarkMode 
                                        ? 'bg-gray-700 text-black placeholder-gray-400' 
                                        : 'bg-gray-100 text-gray-900'
                                } focus:ring-2 focus:ring-blue-500`}
                            />
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => fileInputRef.current.click()}
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                                >
                                    <Image className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowEmoji(!showEmoji)}
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                                >
                                    <Smile className="w-5 h-5" />
                                </motion.button>
                            </div>

                            {selectedImage && (
                                <div className="relative mb-4">
                                    <img 
                                        src={selectedImage} 
                                        alt="Selected" 
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            <div className="relative">
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your story..."
                                    className={`w-full h-64 p-4 rounded-lg ${
                                        isDarkMode 
                                            ? 'bg-gray-700 text-black placeholder-gray-400' 
                                            : 'bg-gray-100 text-gray-900'
                                    } focus:ring-2 focus:ring-blue-500 resize-none`}
                                />
                                
                                {showEmoji && (
                                    <div ref={emojiPickerRef} className="absolute bottom-full right-0 mb-2 z-50">
                                        <EmojiPicker 
                                            onEmojiClick={handleEmojiClick}
                                            theme={isDarkMode ? 'dark' : 'light'}
                                        />
                                    </div>
                                )}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handlePublish}
                                className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold flex items-center gap-2 cursor-pointer"
                            >
                                <Sparkles className="w-5 h-5" />
                                Publish
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedBlog && (
                    <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Blogs;