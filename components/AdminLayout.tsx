import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, MessageSquare, FileText, LogOut, Home, User, Users, Menu, X } from 'lucide-react';

export const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const currentUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

    const menuItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Genel Bakış' },
        { path: '/admin/appointments', icon: Calendar, label: 'Randevular' },
        { path: '/admin/messages', icon: MessageSquare, label: 'Mesajlar' },
        { path: '/admin/blog', icon: FileText, label: 'Blog Yönetimi' },
        { path: '/admin/team', icon: Users, label: 'Ekip Yönetimi' },
        ...(currentUser.role === 'ADMIN' ? [{ path: '/admin/users', icon: User, label: 'Kullanıcılar' }] : []),
    ];

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar (Desktop) */}
            <aside className="w-64 bg-slate-900 text-white fixed h-full z-30 hidden md:block">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold">Admin Panel</h2>
                </div>
                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}

                    <div className="pt-8 mt-8 border-t border-slate-800">
                        <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                            <Home size={20} />
                            <span>Siteye Dön</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors text-left"
                        >
                            <LogOut size={20} />
                            <span>Çıkış Yap</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-blue-900 text-white p-4 z-50 flex justify-between items-center shadow-md">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white p-1 hover:bg-slate-800 rounded border border-slate-700"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <h2 className="font-bold text-lg">Admin Panel</h2>
                </div>
                <button onClick={handleLogout} className="text-red-400 p-1"><LogOut size={20} /></button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-40 transform transition-transform duration-300 ease-in-out md:hidden pt-16
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}

                    <div className="pt-8 mt-8 border-t border-slate-800">
                        <Link
                            to="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                        >
                            <Home size={20} />
                            <span>Siteye Dön</span>
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};
