import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Search, Tag, User, ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

const categories = ["Tümü", "Aile Hukuku", "Bilişim Hukuku", "İş Hukuku", "Ticaret Hukuku", "Gayrimenkul"];

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getBlogPosts();
        // Transform API data to match UI structure if needed, or use directly
        // Adding some mock fields for UI consistency if they don't exist in DB yet
        const formattedData = data.map((post: any) => ({
          ...post,
          date: new Date(post.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
          readTime: "5 dk", // Mock read time
          category: "Genel", // Default category if not in DB
          authorImg: "https://ui-avatars.com/api/?name=" + post.author, // Generate avatar
          image: post.image || "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800", // Default image
          excerpt: post.content.substring(0, 150) + "..." // Generate excerpt
        }));
        setArticles(formattedData);
      } catch (error) {
        console.error('Failed to fetch blog posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const featuredArticle = articles.length > 0 ? articles[0] : null;

  const filteredArticles = articles.filter(a => {
    const matchesCategory = selectedCategory === "Tümü" || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Hero / Header Section */}
      <div className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10 text-center">
          <span className="text-accent font-bold tracking-widest text-sm uppercase mb-4 block animate-in fade-in slide-in-from-bottom-4">
            Hukuki Görüşler & Makaleler
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-5 delay-100">
            Avukatlık Ofisi Blog
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 delay-200">
            Güncel hukuki gelişmeler, emsal kararlar ve uzman görüşleriyle bilgi bankamızdan faydalanın.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative animate-in fade-in slide-in-from-bottom-8 delay-300">
            <input
              type="text"
              placeholder="Makale, konu veya anahtar kelime ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-slate-800 transition-all"
            />
            <Search className="absolute left-4 top-4 text-slate-400" size={20} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        {/* Category Navigation */}
        <div className="flex overflow-x-auto pb-4 gap-2 md:justify-center mb-12 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${selectedCategory === cat
                ? 'bg-accent text-slate-900 shadow-accent/50 scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {featuredArticle && selectedCategory === "Tümü" && !searchQuery && (
          <div className="mb-16 animate-in fade-in duration-700">
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[500px]">
              <div className="relative overflow-hidden h-64 lg:h-full">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10"></div>
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 z-20">
                  <span className="bg-accent text-slate-900 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide shadow-lg">
                    Öne Çıkan
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center relative">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                  <span className="flex items-center gap-1.5"><Tag size={14} className="text-primary" /> {featuredArticle.category}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {featuredArticle.date}</span>
                </div>

                <Link to={`/blog/${featuredArticle.id}`} className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-primary transition-colors cursor-pointer block">
                  {featuredArticle.title}
                </Link>

                <p className="text-slate-600 text-lg mb-8 leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <img src={featuredArticle.authorImg} alt={featuredArticle.author} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{featuredArticle.author}</p>
                      <p className="text-xs text-slate-500">Yazar</p>
                    </div>
                  </div>
                  <Link to={`/blog/${featuredArticle.id}`} className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                    Okumaya Devam Et <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredArticles.map((article, idx) => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10"></div>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                </div>

                <Link to={`/blog/${article.id}`} className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-primary transition-colors block">
                  {article.title}
                </Link>

                <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                  <div className="flex items-center gap-2">
                    <img src={article.authorImg} alt={article.author} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-xs font-medium text-slate-700">{article.author}</span>
                  </div>
                  <Link to={`/blog/${article.id}`} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Sonuç Bulunamadı</h3>
            <p className="text-slate-500">
              "{searchQuery}" araması için herhangi bir makale bulunamadı.
            </p>
          </div>
        )}

        {/* Newsletter */}
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Hukuk Bültenimize Abone Olun</h2>
            <p className="text-white/80 mb-8">
              En güncel hukuki gelişmelerden ve makalelerimizden haberdar olmak için e-posta listemize katılın.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-accent text-slate-900 placeholder-slate-400 outline-none"
              />
              <button className="bg-accent text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-accent-light transition-colors shadow-lg">
                Abone Ol
              </button>
            </div>
            <p className="text-white/60 text-xs mt-4">
              *Kişisel verileriniz KVKK kapsamında korunmaktadır.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};