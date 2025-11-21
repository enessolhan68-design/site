import React, { useEffect, useState } from 'react';
import { Calendar, MessageSquare, FileText } from 'lucide-react';
import { api } from '../services/api';

export const AdminDashboard = () => {
    const [stats, setStats] = useState({
        appointments: 0,
        messages: 0,
        posts: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [appointments, messages, posts] = await Promise.all([
                    api.getAppointments(),
                    api.getMessages(),
                    api.getBlogPosts()
                ]);
                setStats({
                    appointments: appointments.length,
                    messages: messages.length,
                    posts: posts.length
                });
            } catch (error) {
                console.error('Failed to fetch stats');
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Genel Bakış</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Calendar className="text-blue-600" size={24} />
                        </div>
                        <span className="text-3xl font-bold text-slate-900">{stats.appointments}</span>
                    </div>
                    <h3 className="text-slate-600 font-medium">Toplam Randevu</h3>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <MessageSquare className="text-green-600" size={24} />
                        </div>
                        <span className="text-3xl font-bold text-slate-900">{stats.messages}</span>
                    </div>
                    <h3 className="text-slate-600 font-medium">Okunmamış Mesajlar</h3>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <FileText className="text-purple-600" size={24} />
                        </div>
                        <span className="text-3xl font-bold text-slate-900">{stats.posts}</span>
                    </div>
                    <h3 className="text-slate-600 font-medium">Blog Yazıları</h3>
                </div>
            </div>
        </div>
    );
};
