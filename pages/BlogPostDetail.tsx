import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Calendar, User, ArrowLeft } from 'lucide-react';

export const BlogPostDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (id) {
                    const data = await api.getBlogPost(Number(id));
                    setPost(data);
                }
            } catch (error) {
                console.error('Failed to fetch post');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
    if (!post) return <div className="min-h-screen flex items-center justify-center">Yazı bulunamadı.</div>;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={20} /> Blog'a Dön
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
                    <div className="flex items-center gap-6 text-slate-400">
                        <span className="flex items-center gap-2"><User size={18} /> {post.user?.name || post.author}</span>
                        <span className="flex items-center gap-2"><Calendar size={18} /> {new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
                    {post.image && (
                        <img src={post.image} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8" />
                    )}
                    <div className="prose prose-lg max-w-none text-slate-700 whitespace-pre-wrap">
                        {post.content}
                    </div>
                </div>
            </div>
        </div>
    );
};
