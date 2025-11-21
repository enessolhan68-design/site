import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Mail, User, Calendar } from 'lucide-react';

export const AdminMessages = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await api.getMessages();
                setMessages(data);
            } catch (error) {
                console.error('Failed to fetch messages');
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Gelen Mesajlar</h1>

            <div className="grid gap-4">
                {messages.map((msg) => (
                    <div key={msg.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-50 p-2 rounded-full">
                                    <User size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{msg.name}</h3>
                                    <p className="text-sm text-slate-500">{msg.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Calendar size={14} />
                                {new Date(msg.createdAt).toLocaleDateString('tr-TR')}
                            </div>
                        </div>

                        <div className="mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Konu:</span>
                            <span className="ml-2 font-medium text-slate-900">{msg.subject}</span>
                        </div>

                        <p className="text-slate-600 bg-slate-50 p-4 rounded-lg text-sm">
                            {msg.message}
                        </p>
                    </div>
                ))}

                {messages.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                        <Mail className="mx-auto text-slate-300 mb-4" size={48} />
                        <p className="text-slate-500">Henüz mesaj bulunmuyor.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
