import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Scale, Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Anasayfa', path: '/' },
    { name: 'Hakkımızda', path: '/#about' }, // Simplified anchor for demo
    { name: 'Hizmetlerimiz', path: '/services' },
    { name: 'Ekibimiz', path: '/team' },
    { name: 'Blog', path: '/blog' },
    { name: 'İletişim', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 hidden md:block border-b border-slate-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone size={14} /> +90 (212) 000 00 00</span>
            <span className="flex items-center gap-2"><Mail size={14} /> info@avukatlikofisi.com</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white"><Linkedin size={14} /></a>
            <a href="#" className="hover:text-white"><Twitter size={14} /></a>
            <a href="#" className="hover:text-white"><Facebook size={14} /></a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 text-primary group">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Scale size={32} className="text-primary" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold leading-none tracking-tight text-slate-900">AVUKATLIK</h1>
                <span className="text-sm font-medium text-slate-500 tracking-widest">OFİSİ</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors ${
                    isActive(link.path) ? 'text-primary' : 'text-slate-600 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                onClick={() => navigate('/appointment')}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50"
              >
                Randevu Al
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium py-2 border-b border-slate-50 ${
                  isActive(link.path) ? 'text-primary' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => {
                navigate('/appointment');
                setIsMobileMenuOpen(false);
              }}
              className="bg-primary text-white w-full py-3 rounded-lg font-bold mt-2"
            >
              Randevu Al
            </button>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-white">
                <Scale size={28} />
                <span className="text-lg font-bold">Avukatlık Ofisi</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Adalet ve hukukun üstünlüğü ilkesiyle, müvekkillerimize profesyonel, şeffaf ve etkili hukuki çözümler sunuyoruz.
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-slate-800 p-2 rounded hover:bg-primary transition-colors"><Linkedin size={18} /></a>
                <a href="#" className="bg-slate-800 p-2 rounded hover:bg-primary transition-colors"><Twitter size={18} /></a>
                <a href="#" className="bg-slate-800 p-2 rounded hover:bg-primary transition-colors"><Facebook size={18} /></a>
                <a href="#" className="bg-slate-800 p-2 rounded hover:bg-primary transition-colors"><Instagram size={18} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Hızlı Erişim</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" className="hover:text-accent transition-colors">Anasayfa</Link></li>
                <li><Link to="/services" className="hover:text-accent transition-colors">Hizmetlerimiz</Link></li>
                <li><Link to="/team" className="hover:text-accent transition-colors">Ekibimiz</Link></li>
                <li><Link to="/blog" className="hover:text-accent transition-colors">Hukuk Blogu</Link></li>
                <li><Link to="/appointment" className="hover:text-accent transition-colors">Randevu Al</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Çalışma Alanları</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/services" className="hover:text-accent transition-colors">Ceza Hukuku</Link></li>
                <li><Link to="/services" className="hover:text-accent transition-colors">Aile ve Boşanma</Link></li>
                <li><Link to="/services" className="hover:text-accent transition-colors">Şirketler Hukuku</Link></li>
                <li><Link to="/services" className="hover:text-accent transition-colors">Gayrimenkul Hukuku</Link></li>
                <li><Link to="/services" className="hover:text-accent transition-colors">İş Hukuku</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">İletişim</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="shrink-0 text-accent" size={20} />
                  <span>Adalet Mah. Hukuk Sk. No:1/2, Merkez/İstanbul</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="shrink-0 text-accent" size={20} />
                  <a href="tel:+902120000000" className="hover:text-white">+90 (212) 000 00 00</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="shrink-0 text-accent" size={20} />
                  <a href="mailto:info@avukatlikofisi.com" className="hover:text-white">info@avukatlikofisi.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2024 Avukatlık Ofisi. Tüm hakları saklıdır. Bu site yalnızca bilgilendirme amaçlıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};