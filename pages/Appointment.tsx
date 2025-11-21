import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, User, FileText, Clock } from 'lucide-react';
import { api } from '../services/api';

export const Appointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: 'Ticaret Hukuku',
    name: '',
    email: '',
    phone: '',
    notes: '',
    date: 15,
    time: '14:00'
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">Randevu Alın</h1>
          <p className="mt-4 text-lg text-slate-600">
            Hukuki danışmanlık hizmetlerimizden faydalanmak için aşağıdaki adımları takip edin.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-8">

            {/* Step 1: Service Selection */}
            <div className={`bg-white p-8 rounded-xl shadow-sm border border-slate-100 transition-all ${step === 1 ? 'ring-2 ring-primary ring-offset-2' : 'opacity-60'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
                <h2 className="text-xl font-bold text-slate-900">Hizmet Seçimi</h2>
              </div>

              {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in">
                  {['Aile Hukuku', 'Ceza Hukuku', 'Ticaret Hukuku', 'Miras Hukuku', 'İş Hukuku', 'Diğer'].map((svc) => (
                    <label key={svc} className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${formData.service === svc ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/50'}`}>
                      <input
                        type="radio"
                        name="service"
                        checked={formData.service === svc}
                        onChange={() => handleInputChange('service', svc)}
                        className="w-5 h-5 text-primary focus:ring-primary"
                      />
                      <span className="font-medium text-slate-900">{svc}</span>
                    </label>
                  ))}
                  <button onClick={() => setStep(2)} className="col-span-full mt-4 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">
                    Devam Et
                  </button>
                </div>
              )}
              {step > 1 && <div className="pl-14 text-slate-600 font-medium">Seçilen: <span className="text-primary">{formData.service}</span></div>}
            </div>

            {/* Step 2: Personal Info */}
            <div className={`bg-white p-8 rounded-xl shadow-sm border border-slate-100 transition-all ${step === 2 ? 'ring-2 ring-primary ring-offset-2' : 'opacity-60'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
                <h2 className="text-xl font-bold text-slate-900">Kişisel Bilgiler</h2>
              </div>

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Ad Soyad</label>
                      <input type="text" className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-primary focus:border-primary" placeholder="Adınız" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Telefon</label>
                      <input type="tel" className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-primary focus:border-primary" placeholder="0555..." value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">E-posta</label>
                    <input type="email" className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-primary focus:border-primary" placeholder="email@ornek.com" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Notlar (İsteğe bağlı)</label>
                    <textarea rows={3} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-primary focus:border-primary" placeholder="Kısaca konu hakkında bilgi..." value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)}></textarea>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep(1)} className="px-6 py-3 rounded-lg font-bold border border-slate-300 hover:bg-slate-50 text-slate-700">Geri</button>
                    <button onClick={() => setStep(3)} className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">Devam Et</button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Confirmation/Date Placeholder for Flow */}
            <div className={`bg-white p-8 rounded-xl shadow-sm border border-slate-100 transition-all ${step === 3 ? 'ring-2 ring-primary ring-offset-2' : 'opacity-60'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
                <h2 className="text-xl font-bold text-slate-900">Onay ve Gönder</h2>
              </div>
              {step === 3 && (
                <div className="animate-in fade-in">
                  <p className="text-slate-600 mb-6">
                    Lütfen sağ taraftan (mobil için aşağıdan) uygun tarih ve saati seçtiğinizden emin olun. Randevu talebiniz bize ulaştıktan sonra tarafınıza dönüş yapılacaktır.
                  </p>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="px-6 py-3 rounded-lg font-bold border border-slate-300 hover:bg-slate-50 text-slate-700">Geri</button>
                    <button
                      onClick={async () => {
                        try {
                          // Construct date object (assuming October 2024 as per mock)
                          const dateStr = `2024-10-${formData.date.toString().padStart(2, '0')}T${formData.time}:00`;
                          await api.createAppointment({
                            ...formData,
                            date: dateStr
                          });
                          alert('Randevunuz başarıyla oluşturuldu!');
                          setStep(1);
                          setFormData({
                            service: 'Ticaret Hukuku',
                            name: '',
                            email: '',
                            phone: '',
                            notes: '',
                            date: 15,
                            time: '14:00'
                          });
                        } catch (error) {
                          alert('Randevu oluşturulurken bir hata oluştu.');
                        }
                      }}
                      className="flex-1 bg-accent text-slate-900 py-3 rounded-lg font-bold hover:bg-accent-light transition-colors shadow-lg"
                    >
                      Randevuyu Oluştur
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Sidebar: Date & Summary */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 sticky top-24">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CalendarIcon size={20} className="text-primary" /> Tarih Seçimi
              </h3>

              {/* Mock Calendar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={20} /></button>
                  <span className="font-bold text-slate-900">Ekim 2024</span>
                  <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight size={20} /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
                  <div>Pt</div><div>Sa</div><div>Ça</div><div>Pe</div><div>Cu</div><div>Ct</div><div>Pa</div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const isSelected = formData.date === day;
                    const isPast = day < 15; // Mock disabled past dates
                    return (
                      <button
                        key={i}
                        disabled={isPast}
                        onClick={() => handleInputChange('date', day)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                          ${isSelected ? 'bg-primary text-white shadow-md scale-110' : ''}
                          ${isPast ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-slate-100 text-slate-700'}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-700 mb-3">Müsait Saatler</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
                    <button
                      key={time}
                      onClick={() => handleInputChange('time', time)}
                      className={`text-xs py-2 px-1 rounded border transition-colors ${formData.time === time
                        ? 'bg-primary text-white border-primary'
                        : 'border-slate-200 hover:border-primary text-slate-600'
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="border-t border-slate-100 pt-4">
                <h4 className="font-bold text-sm text-slate-900 mb-3">Özet</h4>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-primary" />
                    <span>{formData.service}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-primary" />
                    <span>{formData.date} Ekim, {formData.time}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};