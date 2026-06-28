import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import hero from "@/assets/hero.jpg.asset.json";
import ring from "@/assets/ring.jpg.asset.json";
import sunset from "@/assets/sunset.jpg.asset.json";
import boat from "@/assets/boat.jpg.asset.json";
import baikal from "@/assets/baikal.jpg.asset.json";
import scooter from "@/assets/scooter.jpg.asset.json";
import hotelBeach from "@/assets/hotel-beach.webp.asset.json";
import hotelTent from "@/assets/hotel-tent.jpg.asset.json";
import hotelPier from "@/assets/hotel-pier.webp.asset.json";
import hotelCabin from "@/assets/hotel-cabin.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Анастасия и Иван — 21.08.2026" },
      { name: "description", content: "Приглашаем вас на нашу свадьбу 21 августа 2026 года на базе отдыха «Акватория»." },
      { property: "og:title", content: "Анастасия и Иван — 21.08.2026" },
      { property: "og:description", content: "Приглашаем вас на нашу свадьбу 21 августа 2026 года." },
      { property: "og:image", content: sunset.url },
    ],
  }),
  component: Index,
});

const schedule = [
  { time: "17:30", title: "Сбор гостей и фуршет", note: "Встречаемся на площадке, знакомимся, бокал игристого и лёгкие закуски" },
  { time: "18:00", title: "Банкет открывается", note: "Салаты, закуски и начало праздничного ужина" },
  { time: "19:00", title: "Горячие закуски", note: "и поздравления — тёплые слова от близких" },
  { time: "20:00", title: "Горячее", note: "и жаркие танцы — первый большой танцевальный блок" },
  { time: "21:00", title: "Десерт", note: "Сладкая пауза, чай и время для красивых вечерних фото" },
  { time: "21:30", title: "Вечеринка", note: "Музыка, танцы и свободное общение у воды" },
];

const faqs = [
  {
    q: "Какой дресс-код?",
    a: "Dress to impress! Не надевайте белое, не надевайте неудобное, не надевайте цвета, которые вас не красят.",
  },
  {
    q: "Во сколько мне приезжать?",
    a: "Мы начинаем наш праздник в 17:30. Если вы опоздаете — скорее всего, пропустите начало.",
  },
  {
    q: "А что, если будет дождь и холодно?",
    a: "У нас будет закрытый шатёр на берегу моря, при необходимости добавим обогреватели. Не переживайте — будет тепло и уютно.",
  },
  {
    q: "Как добраться до места?",
    a: "Если вам нужен трансфер — дайте знать, пожалуйста. Можем организовать трансфер от Балахны или Нижнего Новгорода до «Акватории» и обратно. Также можно добраться своим ходом.",
  },
  {
    q: "Включено ли проживание?",
    a: "Да, мы приглашаем вас не только на банкет, но и остаться в «Акватории» на ночь. Все заботы по бронированию номеров берём на себя :)",
  },
  {
    q: "Включено ли питание?",
    a: "Да, 22 августа у вас будет завтрак и обед. Мы не планируем каких-то дополнительных интерактивов — вы можете спокойно провести время, погулять по лесу или берегу моря. Время выезда в 15:00.",
  },
];

function Monogram() {
  return (
    <span className="font-script text-deep text-4xl leading-none select-none">A&nbsp;&amp;&nbsp;I</span>
  );
}

function Polaroid({ src, alt, rotate = "-rotate-3" }: { src: string; alt: string; rotate?: string }) {
  return (
    <div className={`bg-cream p-2 pb-8 shadow-xl ${rotate}`}>
      <img src={src} alt={alt} className="block w-full h-32 sm:h-36 object-cover" />
    </div>
  );
}

const weddingDate = new Date("2026-08-21T17:30:00+03:00");
const yandexMapLink = "https://yandex.com/maps/-/CTQwjQ3q";

function getDaysUntilWedding() {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const weddingDay = new Date(weddingDate.getFullYear(), weddingDate.getMonth(), weddingDate.getDate()).getTime();
  return Math.max(0, Math.ceil((weddingDay - startOfToday) / (1000 * 60 * 60 * 24)));
}

function getDayWord(days: number) {
  const mod10 = days % 10;
  const mod100 = days % 100;

  if (mod10 === 1 && mod100 !== 11) return "день";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "дня";
  return "дней";
}

function downloadInvitation() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Anastasia Ivan Wedding//RU",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:anastasia-ivan-wedding-20260821@lovable.app",
    "DTSTAMP:20260627T090000Z",
    "DTSTART:20260821T143000Z",
    "DTEND:20260821T210000Z",
    "SUMMARY:Свадьба Анастасии и Ивана",
    "LOCATION:База отдыха Акватория, Нижегородская область, Городецкий район, п. Турбазы",
    "GEO:56.780662;43.360892",
    `DESCRIPTION:Ждём вас 21 августа 2026 года в 17:30. Карта: ${yandexMapLink}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "priglashenie-anastasia-ivan.ics";
  link.click();
  URL.revokeObjectURL(url);
}

function buildInvitationHtml() {
  const scheduleHtml = schedule
    .map(
      (s) =>
        `<div style="display:flex;gap:24px;padding:10px 0;border-bottom:1px solid rgba(26,42,68,.2);"><div style="width:90px;color:#b07a4a;font-size:22px;font-family:'Allura',cursive;">${s.time}</div><div><div style="font-size:18px;">${s.title}</div>${s.note ? `<div style="font-size:13px;color:rgba(26,42,68,.7);font-style:italic;">${s.note}</div>` : ""}</div></div>`,
    )
    .join("");
  const faqHtml = faqs
    .map(
      (f) =>
        `<div style="padding:12px 0;border-bottom:1px solid rgba(26,42,68,.2);"><div style="font-family:'Allura',cursive;font-size:26px;color:#1a2a44;">${f.q}</div><div style="font-size:14px;margin-top:6px;">${f.a}</div></div>`,
    )
    .join("");
  return `
  <div id="pdf-root" style="width:800px;padding:48px;background:#f8f1e7;color:#1a2a44;font-family:'Cormorant Garamond',Georgia,serif;line-height:1.5;box-sizing:border-box;">
    <div style="text-align:center;border-bottom:1px solid rgba(26,42,68,.3);padding-bottom:24px;margin-bottom:24px;">
      <div style="font-family:'Allura',cursive;font-size:56px;color:#1a2a44;line-height:1;">Анастасия &amp; Иван</div>
      <div style="font-style:italic;margin-top:10px;">приглашают вас на свою свадьбу</div>
      <div style="font-family:'Allura',cursive;font-size:48px;color:#b07a4a;margin-top:8px;">21.08.2026</div>
      <div style="letter-spacing:.3em;font-size:11px;text-transform:uppercase;margin-top:6px;">База отдыха «Акватория»</div>
    </div>
    <div style="margin-bottom:24px;">
      <div style="text-align:center;letter-spacing:.3em;font-size:11px;text-transform:uppercase;color:#b07a4a;">Место проведения</div>
      <div style="text-align:center;margin-top:8px;font-size:15px;">Нижегородская область, Городецкий район, п. Турбазы</div>
      <div style="text-align:center;font-size:13px;color:rgba(26,42,68,.7);">Координаты: 56.780662, 43.360892</div>
      <div style="text-align:center;font-size:12px;margin-top:4px;">${yandexMapLink}</div>
    </div>
    <div style="margin-bottom:24px;">
      <div style="text-align:center;font-family:'Allura',cursive;font-size:36px;color:#1a2a44;">Расписание</div>
      ${scheduleHtml}
    </div>
    <div>
      <div style="text-align:center;font-family:'Allura',cursive;font-size:36px;color:#1a2a44;">Вопросы и ответы</div>
      ${faqHtml}
    </div>
    <div style="text-align:center;margin-top:28px;font-style:italic;color:rgba(26,42,68,.7);">До встречи 21 августа 2026 года</div>
  </div>
  `;
}

const pdfIframeSrcDoc = `<!doctype html><html><head><meta charset="utf-8"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Allura&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet"><style>html,body{margin:0;padding:0;background:#e9dcc6;}body{display:flex;justify-content:center;padding:20px 0;}</style></head><body>__BODY__</body></html>`;

async function generatePdfFromIframe(iframe: HTMLIFrameElement) {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import("jspdf"),
    import("html2canvas"),
  ]);
  const doc = iframe.contentDocument!;
  const target = doc.getElementById("pdf-root") as HTMLElement;
  const canvas = await html2canvas(target, { scale: 2, backgroundColor: "#f8f1e7", windowWidth: 800 });
  const imgData = canvas.toDataURL("image/jpeg", 0.92);
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgW = pageW;
  const imgH = (canvas.height * imgW) / canvas.width;
  let heightLeft = imgH;
  let position = 0;
  pdf.addImage(imgData, "JPEG", 0, position, imgW, imgH);
  heightLeft -= pageH;
  while (heightLeft > 0) {
    position = heightLeft - imgH;
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, position, imgW, imgH);
    heightLeft -= pageH;
  }
  pdf.save("priglashenie-anastasia-ivan.pdf");
}

function Index() {
  const [daysLeft, setDaysLeft] = useState(getDaysUntilWedding);
  const dayWord = useMemo(() => getDayWord(daysLeft), [daysLeft]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewSrcDoc = useMemo(
    () => pdfIframeSrcDoc.replace("__BODY__", buildInvitationHtml()),
    [],
  );

  const handleSavePdf = async () => {
    if (!iframeRef.current) return;
    setSaving(true);
    try {
      await generatePdfFromIframe(iframeRef.current);
      setPreviewOpen(false);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const timer = window.setInterval(() => setDaysLeft(getDaysUntilWedding()), 60 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-serif overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-3 sm:px-8 lg:px-12 py-4 sm:py-6">
        <div className="border border-deep/40 px-3 sm:px-8 lg:px-14 py-6 sm:py-12">
          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-3 text-deep">
            <a href="#schedule" className="font-sans text-[11px] tracking-[0.25em] uppercase hover:text-caramel transition">Расписание</a>
            <span className="px-2"><Monogram /></span>
            <a href="#place" className="font-sans text-[11px] tracking-[0.25em] uppercase hover:text-caramel transition">Место</a>
            <a href="#faq" className="font-sans text-[11px] tracking-[0.25em] uppercase hover:text-caramel transition">FAQ</a>
          </nav>

          {/* Banner */}
          <section className="mt-8 sm:mt-10 rounded-sm bg-deep text-cream px-4 sm:px-10 py-6 sm:py-8 flex items-center justify-between gap-4 sm:gap-6">
            <div className="hidden sm:block w-32 shrink-0">
              <Polaroid src={boat.url} alt="Настя и Иван" rotate="-rotate-6" />
            </div>
            <div className="text-center flex-1 min-w-0">
              <p className="italic text-cream/90">Мы будем рады видеть вас на нашей свадьбе</p>
              <p className="mt-3 font-script text-4xl sm:text-6xl">21.08.2026</p>
              <p className="mt-2 font-sans tracking-[0.35em] text-xs uppercase text-cream/80">База отдыха «Акватория»</p>
            </div>
            <div className="hidden sm:block w-32 shrink-0">
              <Polaroid src={baikal.url} alt="Настя и Иван" rotate="rotate-6" />
            </div>
          </section>

          {/* Names */}
          <section className="mt-14 sm:mt-20 text-center">
            <h1 className="font-script text-deep text-6xl sm:text-8xl lg:text-9xl leading-none break-words">
              Анастасия <span className="text-caramel">&amp;</span> Иван
            </h1>
            <p className="mt-6 italic text-lg sm:text-2xl text-ink/80">…женятся</p>
            <p className="italic text-lg sm:text-2xl text-ink/80">21 августа 2026 года</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="border border-deep/30 bg-cream px-8 py-5 min-w-56">
                <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-caramel">До свадьбы</p>
                <p className="mt-2 font-script text-6xl text-deep leading-none">{daysLeft}</p>
                <p className="font-sans text-xs tracking-[0.25em] uppercase text-ink/70">{dayWord}</p>
              </div>
              <button
                type="button"
                onClick={downloadInvitation}
                className="font-sans text-[11px] tracking-[0.3em] uppercase text-cream bg-deep hover:bg-caramel transition px-6 py-4"
              >
                Скачать приглашение
              </button>
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="font-sans text-[11px] tracking-[0.3em] uppercase text-deep border border-deep hover:bg-deep hover:text-cream transition px-6 py-4"
              >
                Предпросмотр PDF
              </button>
            </div>
          </section>

          {/* Hero photo */}
          <section id="story" className="mt-16">
            <div className="overflow-hidden">
              <img src={sunset.url} alt="Настя и Иван на закате" className="w-full h-[50vh] sm:h-[70vh] object-cover" />
            </div>
          </section>

          {/* Schedule */}
          <section id="schedule" className="mt-24">
            <div className="text-center">
              <p className="font-sans tracking-[0.4em] text-xs uppercase text-caramel">Программа дня</p>
              <h2 className="mt-3 font-script text-deep text-5xl sm:text-7xl">Расписание</h2>
            </div>
            <ol className="mt-12 max-w-2xl mx-auto">
              {schedule.map((s, i) => (
                <li
                  key={s.time}
                  className={`grid grid-cols-[72px_minmax(0,1fr)] sm:grid-cols-[140px_minmax(0,1fr)] gap-4 sm:gap-6 py-4 sm:py-5 ${i !== 0 ? "border-t border-deep/20" : ""}`}
                >
                  <div className="font-script text-2xl sm:text-4xl text-caramel leading-none">{s.time}</div>
                  <div className="min-w-0">
                    <div className="text-lg sm:text-2xl text-deep">{s.title}</div>
                    {s.note && <div className="mt-1 text-sm text-ink/70 italic">{s.note}</div>}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Photo strip */}
          <section className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <img src={hero.url} alt="Настя и Иван" className="w-full aspect-[4/5] sm:aspect-[3/4] object-cover object-center" loading="lazy" />
            <img src={scooter.url} alt="Настя и Иван в путешествии" className="w-full aspect-[4/5] sm:aspect-[3/4] object-cover object-center" loading="lazy" />
            <img src={ring.url} alt="Кольцо" className="w-full aspect-[4/5] sm:aspect-[3/4] object-cover object-center" loading="lazy" />
          </section>

          {/* Place */}
          <section id="place" className="mt-24">
            <div className="text-center">
              <p className="font-sans tracking-[0.4em] text-xs uppercase text-caramel">Место проведения</p>
              <h2 className="mt-3 font-script text-deep text-4xl sm:text-7xl break-words">База отдыха «Акватория»</h2>
              <p className="mt-6 italic text-lg text-ink/80 max-w-xl mx-auto">
                Нижегородская область, Городецкий район, п. Турбазы
              </p>
              <p className="mt-1 font-sans text-sm text-ink/60">
                Координаты для навигатора: 56.780662, 43.360892
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { src: hotelTent.url, alt: "Шатёр на берегу" },
                { src: hotelBeach.url, alt: "Пляж на закате" },
                { src: hotelPier.url, alt: "Беседка у воды" },
                { src: hotelCabin.url, alt: "Домик в лесу" },
              ].map((p) => (
                <div key={p.src} className="bg-cream p-2 shadow-md">
                  <img src={p.src} alt={p.alt} className="block w-full aspect-[4/5] object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="relative mt-10 border border-deep/30 p-2 bg-cream shadow-lg">
              <iframe
                title="Карта — База отдыха Акватория"
                src="https://yandex.com/map-widget/v1/?ll=43.360892%2C56.780662&z=15&pt=43.360892,56.780662,pm2rdm&l=map"
                className="w-full h-[360px] sm:h-[420px] block border-0"
                loading="lazy"
              />
              <a
                href={yandexMapLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Открыть точку на Яндекс Картах"
                className="absolute inset-2 flex items-end justify-center bg-transparent"
              >
                <span className="mb-5 inline-block font-sans text-[11px] tracking-[0.3em] uppercase text-cream bg-deep/95 hover:bg-caramel transition px-6 py-3 shadow-lg">
                  Открыть точку на карте
                </span>
              </a>
            </div>
            <div className="mt-6 text-center">
              <a
                href={yandexMapLink}
              target="_blank"
              rel="noreferrer"
                className="inline-block font-sans text-[11px] tracking-[0.3em] uppercase text-cream bg-deep hover:bg-caramel transition px-6 py-3"
              >
                Открыть в навигаторе
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mt-24">
            <div className="text-center">
              <p className="font-sans tracking-[0.4em] text-xs uppercase text-caramel">Вопросы и ответы</p>
              <h2 className="mt-3 font-script text-deep text-5xl sm:text-7xl">FAQ</h2>
            </div>
            <div className="mt-12 max-w-2xl mx-auto space-y-8">
              {faqs.map((f) => (
                <div key={f.q} className="border-b border-deep/20 pb-6">
                  <h3 className="font-script text-2xl sm:text-3xl text-deep">{f.q}</h3>
                  <p className="mt-3 text-base sm:text-lg text-ink/80 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-24 pt-10 border-t border-deep/20 text-center">
            <Monogram />
            <p className="mt-4 italic text-ink/70">До встречи 21 августа 2026 года</p>
            <p className="mt-2 font-sans text-xs tracking-[0.3em] uppercase text-caramel">с любовью, Настя и Ваня</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
