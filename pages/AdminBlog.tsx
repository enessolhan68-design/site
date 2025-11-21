import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Trash2, FileText, Edit2, Eye } from 'lucide-react';

export const AdminBlog = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        authorId: '',
        image: ''
    });

    const currentUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

    const fetchPosts = async () => {
        try {
            const data = await api.getBlogPosts();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts');
        }
    };

    const fetchUsers = async () => {
        if (currentUser.role === 'ADMIN') {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await fetch('http://localhost:3001/api/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error('Failed to fetch users');
            }
        }
    };

    useEffect(() => {
        Promise.all([fetchPosts(), fetchUsers()]).finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
            try {
                await api.deleteBlogPost(id);
                fetchPosts();
            } catch (error) {
                alert('Silme işlemi başarısız oldu. Yetkiniz olmayabilir.');
            }
        }
    };

    const handleEdit = (post: any) => {
        setFormData({
            title: post.title,
            content: post.content,
            authorId: post.authorId || '',
            image: post.image || ''
        });
        setEditingId(post.id);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.updateBlogPost(editingId, formData);
            } else {
                await api.createBlogPost(formData);
            }
            setShowForm(false);
            setFormData({ title: '', content: '', authorId: '', image: '' });
            setEditingId(null);
            fetchPosts();
        } catch (error) {
            alert('İşlem başarısız oldu.');
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setFormData({ title: '', content: '', authorId: '', image: '' });
        setEditingId(null);
    };

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Blog Yönetimi</h1>
                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData({ title: '', content: '', authorId: '', image: '' });
                        setShowForm(!showForm);
                    }}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary-dark transition-colors"
                >
                    <Plus size={20} />
                    Yeni Yazı Ekle
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-8 animate-in slide-in-from-top-4">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">{editingId ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Başlık</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>

                        {currentUser.role === 'ADMIN' ? (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Yazar</label>
                                <select
                                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    value={formData.authorId}
                                    onChange={e => setFormData({ ...formData, authorId: e.target.value })}
                                >
                                    <option value="">Kendim ({currentUser.name})</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>{user.name} ({user.username})</option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Yazar</label>
                                <input
                                    type="text"
                                    disabled
                                    value={currentUser.name}
                                    className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Görsel URL</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">İçerik</label>
                            <textarea
                                required
                                rows={6}
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark"
                            >
                                {editingId ? 'Güncelle' : 'Yayınla'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between items-start group">
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-1">{post.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                <span>{post.user?.name || post.author}</span>
                                <span>•</span>
                                <span>{new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
                            </div>
                            <p className="text-slate-600 line-clamp-2 max-w-2xl">{post.content}</p>
                        </div>

                        <div className="flex gap-2">
                            <a
                                href={`#/blog/${post.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-green-500 p-2 rounded-full hover:bg-green-50 transition-colors"
                                title="Görüntüle"
                            >
                                <Eye size={20} />
                            </a>
                            {(currentUser.role === 'ADMIN' || post.authorId === currentUser.id) && (
                                <button
                                    onClick={() => handleEdit(post)}
                                    className="text-slate-400 hover:text-blue-500 p-2 rounded-full hover:bg-blue-50 transition-colors"
                                    title="Düzenle"
                                >
                                    <Edit2 size={20} />
                                </button>
                            )}
                            {(currentUser.role === 'ADMIN' || post.authorId === currentUser.id) && (
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                                    title="Sil"
                                >
                                    <Trash2 size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {posts.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                        <FileText className="mx-auto text-slate-300 mb-4" size={48} />
                        <p className="text-slate-500">Henüz blog yazısı bulunmuyor.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
