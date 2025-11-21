import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, Linkedin, Mail } from 'lucide-react';
import { api } from '../services/api';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    spec: string;
    image: string;
    category: string;
    linkedin?: string;
    email?: string;
}

export const AdminTeam = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        spec: '',
        image: '',
        category: 'Avukatlar',
        linkedin: '',
        email: ''
    });

    const categories = ['Ortaklar', 'Avukatlar', 'Danışmanlar'];

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        try {
            const data = await api.getTeam();
            setMembers(data);
        } catch (error) {
            console.error('Failed to fetch team');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.updateTeamMember(editingId, formData);
            } else {
                await api.createTeamMember(formData);
            }
            setShowForm(false);
            setFormData({ name: '', role: '', spec: '', image: '', category: 'Avukatlar', linkedin: '', email: '' });
            setEditingId(null);
            fetchTeam();
        } catch (error) {
            alert('İşlem başarısız oldu.');
        }
    };

    const handleEdit = (member: TeamMember) => {
        setFormData({
            name: member.name,
            role: member.role,
            spec: member.spec,
            image: member.image,
            category: member.category,
            linkedin: member.linkedin || '',
            email: member.email || ''
        });
        setEditingId(member.id);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Bu kişiyi silmek istediğinize emin misiniz?')) {
            try {
                await api.deleteTeamMember(id);
                fetchTeam();
            } catch (error) {
                alert('Silme işlemi başarısız oldu.');
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setFormData({ name: '', role: '', spec: '', image: '', category: 'Avukatlar', linkedin: '', email: '' });
        setEditingId(null);
    };

    if (loading) return <div className="p-8">Yükleniyor...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Ekip Yönetimi</h1>
                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData({ name: '', role: '', spec: '', image: '', category: 'Avukatlar', linkedin: '', email: '' });
                        setShowForm(true);
                    }}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800"
                >
                    <Plus size={20} />
                    Yeni Kişi Ekle
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{editingId ? 'Kişiyi Düzenle' : 'Yeni Kişi Ekle'}</h2>
                            <button onClick={handleCancel} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">İsim Soyisim</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Unvan / Rol</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Uzmanlık Alanları</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                    value={formData.spec}
                                    onChange={e => setFormData({ ...formData, spec: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                                <select
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Fotoğraf URL</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn (İsteğe bağlı)</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                    value={formData.linkedin}
                                    onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email (İsteğe bağlı)</label>
                                <input
                                    type="email"
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800"
                                >
                                    {editingId ? 'Güncelle' : 'Kaydet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex gap-4">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900">{member.name}</h3>
                            <p className="text-primary text-sm font-medium">{member.role}</p>
                            <p className="text-slate-500 text-xs mt-1">{member.spec}</p>
                            <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full mt-2">
                                {member.category}
                            </span>

                            <div className="flex gap-2 mt-3 justify-end">
                                <button
                                    onClick={() => handleEdit(member)}
                                    className="text-slate-400 hover:text-blue-500 p-1"
                                    title="Düzenle"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(member.id)}
                                    className="text-slate-400 hover:text-red-500 p-1"
                                    title="Sil"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
