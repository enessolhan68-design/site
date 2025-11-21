import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Calendar, Clock, Phone, Mail, User } from 'lucide-react';

export const AdminAppointments = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await api.getAppointments();
                setAppointments(data);
            } catch (error) {
                console.error('Failed to fetch appointments');
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Randevular</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="p-4 font-semibold text-slate-700">Müşteri</th>
                                <th className="p-4 font-semibold text-slate-700">İletişim</th>
                                <th className="p-4 font-semibold text-slate-700">Tarih & Saat</th>
                                <th className="p-4 font-semibold text-slate-700">Mesaj</th>
                                <th className="p-4 font-semibold text-slate-700">Durum</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {appointments.map((apt) => (
                                <tr key={apt.id} className="hover:bg-slate-50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-slate-100 p-2 rounded-full">
                                                <User size={20} className="text-slate-500" />
                                            </div>
                                            <span className="font-medium text-slate-900">{apt.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Mail size={14} /> {apt.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Phone size={14} /> {apt.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar size={14} /> {new Date(apt.date).toLocaleDateString('tr-TR')}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Clock size={14} /> {new Date(apt.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm text-slate-600 max-w-xs truncate" title={apt.message}>
                                            {apt.message || '-'}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                                            Bekliyor
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {appointments.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">
                                        Henüz randevu bulunmuyor.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
