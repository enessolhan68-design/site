import React, { useState, useEffect } from 'react';
import { Plus, Trash2, User, Shield, Edit2, Save, X } from 'lucide-react';

interface AdminUser {
    id: number;
    username: string;
    name: string;
    role: string;
}

export const AdminUsers = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    // New User Form
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        name: '',
        role: 'EDITOR'
    });

    const currentUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:3001/api/users', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                setError('Failed to fetch users');
            }
        } catch (err) {
            setError('Error loading users');
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:3001/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                setShowAddModal(false);
                setNewUser({ username: '', password: '', name: '', role: 'EDITOR' });
                fetchUsers();
            } else {
                alert('Failed to create user');
            }
        } catch (err) {
            alert('Error creating user');
        }
    };

    const handleDeleteUser = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:3001/api/users/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                setUsers(users.filter(u => u.id !== id));
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete user');
            }
        } catch (err) {
            alert('Error deleting user');
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (currentUser.role !== 'ADMIN') return <div className="p-8 text-red-500">Unauthorized Access</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Kullanıcı Yönetimi</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800"
                >
                    <Plus size={20} />
                    Yeni Kullanıcı
                </button>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-semibold text-slate-600">Kullanıcı Adı</th>
                            <th className="p-4 font-semibold text-slate-600">İsim</th>
                            <th className="p-4 font-semibold text-slate-600">Rol</th>
                            <th className="p-4 font-semibold text-slate-600 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50">
                                <td className="p-4 font-medium text-slate-900">{user.username}</td>
                                <td className="p-4 text-slate-600">{user.name}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    {user.id !== currentUser.id && (
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                            title="Sil"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Yeni Kullanıcı Ekle</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">İsim Soyisim</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                    value={newUser.name}
                                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Kullanıcı Adı</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                    value={newUser.username}
                                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Şifre</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                    value={newUser.password}
                                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Rol</label>
                                <select
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                    value={newUser.role}
                                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="EDITOR">Editör</option>
                                    <option value="ADMIN">Yönetici</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 font-medium mt-4"
                            >
                                Kullanıcı Oluştur
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
