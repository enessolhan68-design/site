import React, { useState } from 'react';
import { Gavel, Users, Building2, FileSignature, HeartHandshake, Briefcase, Scale, AlertCircle } from 'lucide-react';

const servicesData = [
  {
    id: 'family',
    title: 'Boşanma Davaları',
    description: 'Anlaşmalı ve çekişmeli boşanma süreçlerinde hukuki destek ve danışmanlık.',
    icon: Users,
    category: 'Aile Hukuku'
  },
  {
    id: 'corporate',
    title: 'Şirket Danışmanlığı',
    description: 'Şirketinizin hukuki altyapısını kuruyor ve ticari faaliyetlerinizde yanınızda oluyoruz.',
    icon: Building2,
    category: 'Şirketler Hukuku'
  },
  {
    id: 'inheritance',
    title: 'Miras Hukuku',
    description: 'Mirasın paylaşımı, vasiyetname düzenlemesi ve ilgili tüm hukuki süreçlerin yönetimi.',
    icon: Scale,
    category: 'Miras Hukuku'
  },
  {
    id: 'debt',
    title: 'İcra ve İflas',
    description: 'Alacak tahsili ve borç yapılandırma konularında etkin hukuki çözümler sunuyoruz.',
    icon: Gavel,
    category: 'İcra Hukuku'
  },
  {
    id: 'compensation',
    title: 'Tazminat Davaları',
    description: 'İş kazaları, trafik kazaları ve haksız fiillerden doğan maddi ve manevi tazminat talepleri.',
    icon: AlertCircle,
    category: 'Tazminat Hukuku'
  },
  {
    id: 'contract',
    title: 'Sözleşmeler',
    description: 'Ticari ve bireysel sözleşmelerin hazırlanması, incelenmesi ve uyuşmazlıkların çözümü.',
    icon: FileSignature,
    category: 'Borçlar Hukuku'
  },
];

const categories = ['Tümü', 'Şirketler Hukuku', 'Ceza Hukuku', 'Aile Hukuku', 'Miras Hukuku'];

export const Services = () => {
  const [activeTab, setActiveTab] = useState('Tümü');

  const filteredServices = activeTab === 'Tümü' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeTab || (activeTab === 'Ceza Hukuku' && s.category === 'İcra Hukuku')); // Simulating category mapping for demo

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-10 pb-20">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <span className="text-primary font-semibold tracking-wider text-sm uppercase">Uzmanlık Alanlarımız</span>
        <h1 className="text-4xl font-bold text-slate-900 mt-2 mb-6">Hukuki Hizmetlerimiz</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Müvekkillerimize geniş bir yelpazede, profesyonel ve etkili hukuki çözümler sunarak haklarını korumalarına yardımcı oluyoruz.
        </p>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-3 text-sm font-bold rounded-t-lg transition-colors ${
                activeTab === cat 
                  ? 'text-primary border-b-4 border-primary bg-primary/5' 
                  : 'text-slate-500 hover:text-primary hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors mb-6">
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
              <a href="#" className="inline-flex items-center text-primary font-bold text-sm hover:underline">
                Daha Fazla Bilgi Al
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="container mx-auto px-4 mt-20">
        <div className="bg-slate-900 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Özel bir durumunuz mu var?</h3>
            <p className="text-slate-400">Uzman avukatlarımız size yardımcı olmak için hazır.</p>
          </div>
          <button className="bg-white text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors shrink-0">
            İletişime Geçin
          </button>
        </div>
      </div>
    </div>
  );
};