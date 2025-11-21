import React, { useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';

const teamData = [
  {
    id: 1,
    name: "Av. Ahmet Yılmaz",
    role: "Kurucu Ortak",
    spec: "Ceza Hukuku, Ticaret Hukuku",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    category: "Ortaklar"
  },
  {
    id: 2,
    name: "Av. Elif Kaya",
    role: "Kurucu Ortak",
    spec: "Aile Hukuku, Miras Hukuku",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    category: "Ortaklar"
  },
  {
    id: 3,
    name: "Av. Can Demir",
    role: "Kıdemli Avukat",
    spec: "İcra ve İflas Hukuku",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    category: "Avukatlar"
  },
  {
    id: 4,
    name: "Av. Zeynep Aydın",
    role: "Avukat",
    spec: "İş Hukuku, Bilişim Hukuku",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
    category: "Avukatlar"
  },
  {
    id: 5,
    name: "Dr. Ömer Aslan",
    role: "Hukuk Danışmanı",
    spec: "Uluslararası Hukuk",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    category: "Danışmanlar"
  },
  {
    id: 6,
    name: "Av. Selin Gök",
    role: "Avukat",
    spec: "Gayrimenkul Hukuku",
    image: "https://images.unsplash.com/photo-1598550832236-8f30c567a1b1?auto=format&fit=crop&q=80&w=800",
    category: "Avukatlar"
  },
  {
    id: 7,
    name: "Av. Murat Efe",
    role: "Avukat",
    spec: "Vergi Hukuku",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    category: "Avukatlar"
  },
  {
    id: 8,
    name: "Av. İrem Su",
    role: "Stajyer Avukat",
    spec: "Ticaret Hukuku",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=800",
    category: "Danışmanlar"
  }
];

const filters = ['Tümü', 'Ortaklar', 'Avukatlar', 'Danışmanlar'];

export const Team = () => {
  const [filter, setFilter] = useState('Tümü');

  const filteredTeam = filter === 'Tümü' 
    ? teamData 
    : teamData.filter(person => person.category === filter);

  return (
    <div className="w-full min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Ekibimiz</h1>
            <p className="text-slate-600 text-lg">
              Müvekkillerimize en üst düzeyde hukuki danışmanlık ve temsil hizmeti sunmaya kendini adamış deneyimli ve uzman profesyonellerle tanışın.
            </p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f 
                    ? 'bg-primary text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredTeam.map((member) => (
            <div key={member.id} className="group">
              <div className="relative overflow-hidden rounded-xl aspect-[3/4] mb-4 shadow-sm">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors z-10"></div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay Icons */}
                <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <button className="bg-white p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors shadow-lg">
                    <Linkedin size={16} />
                  </button>
                  <button className="bg-white p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors shadow-lg">
                    <Mail size={16} />
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-primary text-sm font-semibold mb-1">{member.role}</p>
                <p className="text-slate-500 text-sm">{member.spec}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};