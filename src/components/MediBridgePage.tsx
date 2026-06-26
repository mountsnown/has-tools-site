'use client';

import { useState } from 'react';
import translations, { languages, type Lang, type TranslationDict } from '@/lib/medicine/translations';

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500 shrink-0 mt-0.5">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600 shrink-0 mt-0.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export default function MediBridgePage({ lang, t }: { lang: Lang; t: TranslationDict }) {
  const [langOpen, setLangOpen] = useState(false);

  const currentLang = languages.find(l => l.code === lang)!;

  const sectionClass = "py-16 px-4";
  const containerClass = "max-w-5xl mx-auto";

  return (
    <div dir={currentLang.dir} className="bg-white text-gray-900">
      {/* ===== HEADER / NAV ===== */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href={`/medicine/${lang}`} className="flex items-center gap-3 font-bold text-lg">
            <span className="w-9 h-9 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center text-white text-sm">+</span>
            <span className="text-gray-900">{t.brandName}</span>
          </a>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
              <a href="#services" className="hover:text-blue-600 transition-colors">{t.sectionServices}</a>
              <a href="#journey" className="hover:text-blue-600 transition-colors">{t.sectionJourney}</a>
              <a href="#refund" className="hover:text-blue-600 transition-colors">{t.sectionRefund}</a>
              <a href="#pricing" className="hover:text-blue-600 transition-colors">{t.sectionPricing}</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">{t.sectionContact}</a>
            </nav>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm hover:border-blue-400 transition-colors"
              >
                <span>{currentLang.nativeName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[160px]">
                    {languages.map(l => (
                      <a
                        key={l.code}
                        href={`/medicine/${l.code}`}
                        className={`block px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${l.code === lang ? 'text-blue-600 font-medium' : 'text-gray-600'}`}
                      >
                        {l.nativeName} <span className="text-gray-400 text-xs ml-1">({l.name})</span>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzAtNC40LTMuNi04LTgtOHMtOCAzLjYtOCA4IDMuNiA4IDggOCA4LTMuNiA4LTh6TTI4IDE4YzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-blue-200 mb-6">
              <ShieldIcon />
              <span>{t.statComplianceValue} {t.sectionDisclaimer}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{t.tagline}</h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">{t.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#services" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors">
                {t.ctaButton}
              </a>
              <a href="#contact" className="inline-flex items-center px-6 py-3 border border-white/30 hover:border-white/60 text-white font-medium rounded-xl transition-colors">
                {t.contactButton}
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative max-w-5xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-xl">
            {[
              { label: t.statYears, value: t.statYearsValue },
              { label: t.statModules, value: t.statModulesValue },
              { label: t.statCompliance, value: t.statComplianceValue },
            ].map(s => (
              <div key={s.label} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className={`${sectionClass} bg-white`}>
        <div className={containerClass}>
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">{t.sectionServices}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.sectionServices}</h2>
          </div>

          {/* Module cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Module 1 - Translation */}
            <ServiceCard
              number="01"
              title={t.module1Title}
              desc={t.module1Desc}
              items={[t.module1Item1, t.module1Item2, t.module1Item3]}
              color="blue"
            />

            {/* Module 2 - Escort */}
            <ServiceCard
              number="02"
              title={t.module2Title}
              desc={t.module2Desc}
              items={[t.module2Item1, t.module2Item2, t.module2Item3, t.module2Item4, t.module2Covers]}
              color="emerald"
            />

            {/* Module 3 - Booking (full width, important) */}
            <div className="md:col-span-2 p-6 md:p-8 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl border border-blue-100">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-2xl font-bold text-blue-600 bg-white rounded-xl px-3 py-1 shadow-sm shrink-0">03</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{t.module3Title}</h3>
                  <p className="text-gray-600 mb-4">{t.module3Desc}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm font-semibold text-blue-700 mb-2">Product A</div>
                  <p className="text-sm text-gray-700">{t.module3ProductA}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm font-semibold text-emerald-700 mb-2">Product B</div>
                  <p className="text-sm text-gray-700">{t.module3ProductB}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">{t.module3Compliance}</p>
              <p className="text-sm font-medium text-red-600 bg-red-50 inline-block px-3 py-1.5 rounded-lg">{t.module3RiskNote}</p>
            </div>

            {/* Module 4 - Consultation */}
            <ServiceCard
              number="04"
              title={t.module4Title}
              desc={t.module4Desc}
              items={[t.module4Item1, t.module4Item2, t.module4Item3, t.module4Excludes]}
              color="violet"
            />

            {/* Module 5 - Third-party */}
            <div className="p-6 md:p-8 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col justify-center">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-gray-400 bg-white rounded-xl px-3 py-1 shadow-sm shrink-0">05</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.module5Title}</h3>
                  <p className="text-gray-600 leading-relaxed">{t.module5Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPLIANCE BAR ===== */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <h3 className="text-center text-lg font-semibold mb-6 text-gray-300">{t.complianceTitle}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {t.complianceItems.slice(0, 4).map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mt-3">
            {t.complianceItems.slice(4).map((item, i) => (
              <div key={i + 4} className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CUSTOMER JOURNEY ===== */}
      <section id="journey" className={`${sectionClass} bg-gray-50`}>
        <div className={containerClass}>
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">{t.sectionJourney}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.sectionJourney}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <JourneyCard title={t.journeyTitle1} steps={t.journeySteps1} color="blue" labels={t} />
            <JourneyCard title={t.journeyTitle2} steps={t.journeySteps2} color="emerald" labels={t} />
            <JourneyCard title={t.journeyTitle3} steps={t.journeySteps3} color="violet" labels={t} />
            <JourneyCard title={t.journeyTitle4} steps={t.journeySteps4} color="amber" labels={t} />
          </div>
        </div>
      </section>

      {/* ===== REFUND POLICY ===== */}
      <section id="refund" className={`${sectionClass} bg-white`}>
        <div className={containerClass}>
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">{t.sectionRefund}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.refundTitle}</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">{t.refundNote}</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-5 py-3 font-semibold text-gray-700">{t.refundHeader1}</th>
                    <th className="text-center px-5 py-3 font-semibold text-gray-700 w-24">{t.refundHeader2}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [t.refundRow1Label, t.refundRow1Value],
                    [t.refundRow2Label, t.refundRow2Value],
                    [t.refundRow3Label, t.refundRow3Value],
                    [t.refundRow4Label, t.refundRow4Value],
                    [t.refundRow5Label, t.refundRow5Value],
                  ].map(([label, value], i) => (
                    <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-gray-700">{label}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`font-bold ${value === '100%' ? 'text-emerald-600' : value === '0%' ? 'text-red-500' : 'text-blue-600'}`}>
                          {value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING & DISCOUNTS ===== */}
      <section id="pricing" className={`${sectionClass} bg-gray-50`}>
        <div className={containerClass}>
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">{t.sectionPricing}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.pricingTitle}</h2>
          </div>

          {/* Discount cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {[
              { text: t.pricingDiscount1, highlight: '10%' },
              { text: t.pricingDiscount2, highlight: '15%' },
              { text: t.pricingDiscount3, highlight: '$89' },
            ].map((d, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">{d.highlight}</div>
                <p className="text-sm text-gray-600">{d.text}</p>
              </div>
            ))}
          </div>

          {/* Regional recommendations */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">{t.pricingRegionTitle}</h3>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-5 py-3 font-semibold text-gray-700">{t.pricingRegionHeader1}</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-700">{t.pricingRegionHeader2}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [t.pricingRegionRow1Label, t.pricingRegionRow1Value],
                    [t.pricingRegionRow2Label, t.pricingRegionRow2Value],
                    [t.pricingRegionRow3Label, t.pricingRegionRow3Value],
                  ].map(([label, value], i) => (
                    <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-800">{label}</td>
                      <td className="px-5 py-3 text-gray-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className={`${sectionClass} bg-gradient-to-br from-blue-600 to-emerald-600 text-white`}>
        <div className={`${containerClass} text-center`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contactTitle}</h2>
          <p className="text-lg text-blue-100 mb-6 max-w-lg mx-auto">{t.contactDesc}</p>
          <a
            href={`mailto:${t.contactEmail}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-lg shadow-lg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
            {t.contactEmail}
          </a>
          <p className="text-sm text-blue-200 mt-4">{t.copyright}</p>
        </div>
      </section>

      {/* ===== DISCLAIMER FOOTER ===== */}
      <footer className="bg-slate-900 text-gray-400 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-6 bg-gradient-to-br from-blue-600 to-emerald-500 rounded flex items-center justify-center text-white text-xs">+</span>
            <span className="font-semibold text-white">{t.brandName}</span>
          </div>
          <p className="text-sm max-w-2xl mx-auto mb-4">{t.disclaimer}</p>
          <p className="text-xs">{t.copyright}</p>
        </div>
      </footer>
    </div>
  );
}

/* ===== Sub-components ===== */

function ServiceCard({ number, title, desc, items, color }: {
  number: string;
  title: string;
  desc: string;
  items: string[];
  color: 'blue' | 'emerald' | 'violet';
}) {
  const borders: Record<string, string> = {
    blue: 'border-l-blue-500',
    emerald: 'border-l-emerald-500',
    violet: 'border-l-violet-500',
  };
  const nums: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-50',
    emerald: 'text-emerald-600 bg-emerald-50',
    violet: 'text-violet-600 bg-violet-50',
  };

  return (
    <div className={`p-6 bg-white rounded-2xl border border-gray-200 border-l-4 ${borders[color]} hover:shadow-md transition-shadow`}>
      <div className="flex items-start gap-4 mb-3">
        <span className={`text-lg font-bold rounded-lg px-2.5 py-1 shrink-0 ${nums[color]}`}>{number}</span>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-3">{desc}</p>
        </div>
      </div>
      <ul className="space-y-1.5 ml-14">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-gray-300 mt-0.5 shrink-0">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function JourneyCard({ title, steps, color, labels }: {
  title: string;
  steps: string[];
  color: 'blue' | 'emerald' | 'violet' | 'amber';
  labels: TranslationDict;
}) {
  const borders: Record<string, string> = {
    blue: 'border-blue-200',
    emerald: 'border-emerald-200',
    violet: 'border-violet-200',
    amber: 'border-amber-200',
  };

  return (
    <div className={`bg-white rounded-2xl border ${borders[color]} p-5`}>
      <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
      <ol className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm text-gray-600">
            <span className="font-bold text-gray-300 shrink-0 w-5 text-right">{i + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
