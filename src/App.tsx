/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, ChevronDown, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Exam = 'HTML and CSS' | 'IC3 Digital Literacy GS5' | 'IC3 Digital Literacy GS6' | 'Microsoft Excel';
type Language = 'English' | 'Русский';
type Module = 'Level 1' | 'Level 2' | 'Level 3';
type Location = 'Buxoro / Бухара' | 'Namangan / Наманган' | 'Samarqand / Самарканд' | 'Toshkent / Ташкент' | 'Urganch / Ургенч';

export default function App() {
  const [selectedExam, setSelectedExam] = useState<Exam | ''>('');
  const [selectedLang, setSelectedLang] = useState<Language | ''>('');
  const [selectedModule, setSelectedModule] = useState<Module | ''>('');
  const [selectedLocation, setSelectedLocation] = useState<Location | ''>('');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Form options
  const exams: Exam[] = ['HTML and CSS', 'IC3 Digital Literacy GS5', 'IC3 Digital Literacy GS6', 'Microsoft Excel'];
  const languages: Language[] = ['English', 'Русский'];
  const modules: Module[] = ['Level 1', 'Level 2', 'Level 3'];
  const locations: Location[] = ['Buxoro / Бухара', 'Namangan / Наманган', 'Samarqand / Самарканд', 'Toshkent / Ташкент', 'Urganch / Ургенч'];

  // Calendar logic (simplified for April 2026 as per screenshot)
  const daysInMonth = 30;
  const startDay = 3; // Wednesday (0=Sun, 1=Mon, 2=Tue, 3=Wed)
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDay }, (_, i) => i);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b border-gray-100">
        <div className="flex flex-col">
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
          <button className="rounded bg-[#007ba7] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#00668a]">
            Registratsiya
          </button>
          <button className="p-1 text-gray-600">
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-lg px-6 py-12">
        <h1 className="mb-10 text-4xl font-bold leading-tight text-[#006699]">
          Ro'yxatdan o'tish
        </h1>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
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
                            const redDays = [9, 18, 19, 23, 25, 26, 28];
                            const greenDays = [12, 21, 30];
                            
                            const isRed = redDays.includes(day);
                            const isGreen = greenDays.includes(day);

                            return (
                              <button
                                key={day}
                                onClick={() => setSelectedDate(day)}
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all
                                  ${isSelected ? 'bg-[#007ba7] text-white' : 'text-gray-700 hover:bg-gray-100'}
                                  ${isRed && !isSelected ? 'bg-red-500 text-white' : ''}
                                  ${isGreen && !isSelected ? 'bg-[#90EE90] text-gray-800' : ''}
                                  ${day < 5 ? 'opacity-30 pointer-events-none' : ''} // Mimicking disabled days
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
