import React, { useEffect, useState } from 'react';
import { Calendar, MessageSquare, FileText, Users, Shield } from 'lucide-react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        appointments: 0,
        messages: 0,
        posts: 0,
        team: 0,
        users: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [appointments, messages, posts, team, users] = await Promise.all([
                    api.getAppointments(),
                    api.getMessages(),
                    api.getBlogPosts(),
                    api.getTeam(),
                    api.getUsers()
                ]);
                setStats({
                    appointments: appointments.length,
                    messages: messages.length,
                    posts: posts.length,
                    team: team.length,
                    users: users.length
                });
            } catch (error) {
                console.error('Failed to fetch stats');
            }
        };
        fetchData();
    }, []);

    const currentUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

    const cards = [
        {
            title: 'Randevular',
            count: stats.appointments,
            icon: Calendar,
            bgClass: 'bg-blue-100',
            textClass: 'text-blue-600',
            path: '/admin/appointments',
            desc: 'Bekleyen ve onaylanan randevular'
        },
        {
            title: 'Mesajlar',
            count: stats.messages,
            icon: MessageSquare,
            bgClass: 'bg-green-100',
            textClass: 'text-green-600',
            path: '/admin/messages',
            desc: 'İletişim formundan gelen mesajlar'
        },
        {
            title: 'Blog Yazıları',
            count: stats.posts,
            icon: FileText,
            bgClass: 'bg-purple-100',
            textClass: 'text-purple-600',
            path: '/admin/blog',
            desc: 'Yayınlanan ve taslak yazılar'
        },
        {
            title: 'Ekip Üyeleri',
            count: stats.team,
            icon: Users,
            bgClass: 'bg-orange-100',
            textClass: 'text-orange-600',
            path: '/admin/team',
            desc: 'Doktorlar ve personel listesi'
        },
        {
            title: 'Kullanıcılar',
            count: stats.users,
            icon: Shield,
            bgClass: 'bg-red-100',
            textClass: 'text-red-600',
            path: '/admin/users',
            desc: 'Admin ve editör hesapları',
            hidden: currentUser.role !== 'ADMIN'
        }
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Genel Bakış</h1>
                <p className="text-slate-500">Sistem durumunu ve istatistikleri buradan takip edebilirsiniz.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.filter(card => !card.hidden).map((card, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(card.path)}
                        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${card.bgClass} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                                <card.icon className={card.textClass} size={24} />
                            </div>
                            <span className="text-3xl font-bold text-slate-900">{card.count}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">{card.title}</h3>
                        <p className="text-sm text-slate-500">{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
