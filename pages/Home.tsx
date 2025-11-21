import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Users, Briefcase, ArrowRight, Gavel, Shield, Building2, FileText, Star } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" 
            alt="Modern Office" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/70"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-white space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Hukuki İhtiyaçlarınız İçin <span className="text-accent">Güvenilir Çözümler</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Alanında uzman ekibimizle, haklarınızı korumak ve en iyi sonuçları elde etmek için yanınızdayız. Profesyonel yaklaşım, şeffaf iletişim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => navigate('/contact')}
                className="bg-accent hover:bg-accent-light text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                Bizimle İletişime Geçin
              </button>
              <button 
                onClick={() => navigate('/services')}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
              >
                Hizmetlerimiz
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Uzmanlık Alanlarımız</h2>
            <p className="text-slate-600 text-lg">Hukukun farklı dallarında müvekkillerimize kapsamlı danışmanlık ve avukatlık hizmetleri sunuyoruz.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Gavel, title: 'Ceza Hukuku', desc: 'Soruşturma ve kovuşturma aşamalarında profesyonel savunma hizmetleri.' },
              { icon: Users, title: 'Aile Hukuku', desc: 'Boşanma, velayet, nafaka ve mal paylaşımı gibi hassas süreçlerin yönetimi.' },
              { icon: Building2, title: 'Ticaret Hukuku', desc: 'Şirketler için hukuki danışmanlık, sözleşmeler ve ticari uyuşmazlık çözümleri.' },
            ].map((service, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow group cursor-pointer" onClick={() => navigate('/services')}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{service.desc}</p>
                <span className="text-primary font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Detaylı Bilgi <ArrowRight size={16} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Neden Biz?</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Ofisimiz, müvekkillerimize en yüksek kalitede hukuki hizmet sunma misyonuyla kurulmuştur. Deneyimimiz, şeffaf iletişim anlayışımız ve müvekkil odaklı yaklaşımımızla fark yaratıyoruz.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  { title: 'Uzman Kadro', desc: 'Alanında yetkin ve tecrübeli avukatlar.' },
                  { title: 'Stratejik Yaklaşım', desc: 'Her dava için özel hukuki strateji.' },
                  { title: 'Ulaşılabilirlik', desc: 'Sürecin her aşamasında bilgilendirme.' },
                  { title: 'Gizlilik', desc: 'Kişisel verileriniz ve sırlar bizimle güvende.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="shrink-0 mt-1">
                      <Shield className="text-accent" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/team')}
                className="mt-8 bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors"
              >
                Ekibimizle Tanışın
              </button>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/40 rounded-full blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000" 
                alt="Lawyers Meeting" 
                className="relative rounded-2xl shadow-2xl border border-slate-700 w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Müvekkil Yorumları</h2>
            <p className="text-slate-600">Başarımızın en büyük göstergesi, memnun müvekkillerimizdir.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Tüm süreç boyunca gösterdikleri profesyonellik ve ilgi için minnettarım. Davamı başarıyla sonuçlandırdılar.", name: "A. K.", role: "CEO, Teknoloji A.Ş." },
              { text: "Karmaşık ticari anlaşmazlığımızı hızlı ve etkili bir şekilde çözüme kavuşturdular. Kesinlikle tavsiye ederim.", name: "M. Y.", role: "Genel Müdür" },
              { text: "Aile hukuku davamda bana verdikleri destek ve gösterdikleri hassasiyet için ne kadar teşekkür etsem az.", name: "S. B.", role: "Bireysel Müvekkil" },
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <div className="flex gap-1 text-accent mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 italic mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Hukuki Danışmanlığa mı İhtiyacınız Var?</h2>
              <p className="text-primary-light text-lg mb-8">
                İlk adımı atın. Durumunuzu değerlendirmek ve size nasıl yardımcı olabileceğimizi görüşmek için bugün bize ulaşın.
              </p>
              <button 
                onClick={() => navigate('/appointment')}
                className="bg-accent hover:bg-accent-light text-slate-900 px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-black/20 transition-all hover:scale-105"
              >
                Ücretsiz Ön Görüşme Talep Edin
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};