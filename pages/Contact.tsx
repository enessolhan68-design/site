import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { api } from '../services/api';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.sendContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Bize Ulaşın</h1>
          <p className="text-slate-600 text-lg">
            Sorularınız veya danışmanlık talepleriniz için aşağıdaki bilgileri kullanarak bizimle iletişime geçebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <MapPin className="text-primary shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Adres</h3>
                  <p className="text-slate-600 text-sm">Örnek Mah. Adalet Cad. No:1 D:2, Şişli/İstanbul</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <Phone className="text-primary shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Telefon</h3>
                  <p className="text-slate-600 text-sm">+90 212 123 45 67</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <Mail className="text-primary shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">E-posta</h3>
                  <p className="text-slate-600 text-sm">info@avukatlikofisi.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <Clock className="text-primary shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Çalışma Saatleri</h3>
                  <p className="text-slate-600 text-sm">Hafta İçi: 09:00 - 18:00</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-[300px] bg-slate-200 rounded-xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000"
                alt="Map Location"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10">
                <div className="bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
                  <MapPin className="text-red-500" fill="currentColor" />
                  <span className="font-bold text-slate-900">Ofis Konumu</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Mesaj Gönderin</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Ad Soyad</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">E-posta</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Konu</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Mesajınızın konusu"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Mesajınız</label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Bize iletmek istediğiniz mesaj..."
                ></textarea>
              </div>

              <p className="text-xs text-slate-500">
                Bu formu göndererek bir avukat-müvekkil ilişkisi oluşturulmaz. Lütfen bu form aracılığıyla gizli bilgi göndermeyin.
              </p>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send size={18} />
                {status === 'loading' ? 'Gönderiliyor...' : 'Mesajı Gönder'}
              </button>
              {status === 'success' && (
                <p className="text-green-600 text-center">Mesajınız başarıyla gönderildi!</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-center">Bir hata oluştu. Lütfen tekrar deneyin.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};