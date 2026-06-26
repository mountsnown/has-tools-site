'use client';

import { useEffect } from 'react';
import { languages } from '@/lib/medicine/translations';

export default function MedicineRedirect() {
  useEffect(() => {
    // Detect browser language and redirect
    const browserLang = (navigator.language || 'en').split('-')[0].toLowerCase();
    const supported = languages.map(l => l.code);
    const lang = supported.includes(browserLang as any) ? browserLang : 'en';
    window.location.replace(`/medicine/${lang}`);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading MediBridge China...</p>
      </div>
    </div>
  );
}
