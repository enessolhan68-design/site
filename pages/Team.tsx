import React, { useState, useEffect } from 'react';
import { Linkedin, Mail } from 'lucide-react';
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

const filters = ['Tümü', 'Ortaklar', 'Avukatlar', 'Danışmanlar'];

export const Team = () => {
  const [filter, setFilter] = useState('Tümü');
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await api.getTeam();
        setTeamData(data);
      } catch (error) {
        console.error('Failed to fetch team data');
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const filteredTeam = filter === 'Tümü'
    ? teamData
    : teamData.filter(person => person.category === filter);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f
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
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors shadow-lg">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="bg-white p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors shadow-lg">
                      <Mail size={16} />
                    </a>
                  )}
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