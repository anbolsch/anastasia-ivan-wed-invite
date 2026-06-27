import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import hero from "@/assets/hero.jpg.asset.json";
import ring from "@/assets/ring.jpg.asset.json";
import sunset from "@/assets/sunset.jpg.asset.json";
import boat from "@/assets/boat.jpg.asset.json";
import baikal from "@/assets/baikal.jpg.asset.json";
import scooter from "@/assets/scooter.jpg.asset.json";

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

function Index() {
  const [daysLeft, setDaysLeft] = useState(getDaysUntilWedding);
  const dayWord = useMemo(() => getDayWord(daysLeft), [daysLeft]);

  useEffect(() => {
    const timer = window.setInterval(() => setDaysLeft(getDaysUntilWedding()), 60 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-serif">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 py-6">
        <div className="border border-deep/40 px-4 sm:px-8 lg:px-14 py-8 sm:py-12">
          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-deep">
            <a href="#schedule" className="font-sans text-[11px] tracking-[0.25em] uppercase hover:text-caramel transition">Расписание</a>
            <span className="px-2"><Monogram /></span>
            <a href="#place" className="font-sans text-[11px] tracking-[0.25em] uppercase hover:text-caramel transition">Место</a>
            <a href="#faq" className="font-sans text-[11px] tracking-[0.25em] uppercase hover:text-caramel transition">FAQ</a>
          </nav>

          {/* Banner */}
          <section className="mt-10 rounded-sm bg-deep text-cream px-6 sm:px-10 py-8 flex items-center justify-between gap-6">
            <div className="hidden sm:block w-32 shrink-0">
              <Polaroid src={boat.url} alt="Настя и Иван" rotate="-rotate-6" />
            </div>
            <div className="text-center flex-1">
              <p className="italic text-cream/90">Мы будем рады видеть вас на нашей свадьбе</p>
              <p className="mt-3 font-script text-5xl sm:text-6xl">21.08.2026</p>
              <p className="mt-2 font-sans tracking-[0.35em] text-xs uppercase text-cream/80">База отдыха «Акватория»</p>
            </div>
            <div className="hidden sm:block w-32 shrink-0">
              <Polaroid src={baikal.url} alt="Настя и Иван" rotate="rotate-6" />
            </div>
          </section>

          {/* Names */}
          <section className="mt-20 text-center">
            <h1 className="font-script text-deep text-7xl sm:text-8xl lg:text-9xl leading-none">
              Анастасия <span className="text-caramel">&amp;</span> Иван
            </h1>
            <p className="mt-6 italic text-xl sm:text-2xl text-ink/80">…женятся</p>
            <p className="italic text-xl sm:text-2xl text-ink/80">21 августа 2026 года</p>
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
            </div>
          </section>

          {/* Hero photo */}
          <section id="story" className="mt-16">
            <div className="overflow-hidden">
              <img src={sunset.url} alt="Настя и Иван на закате" className="w-full h-[60vh] sm:h-[70vh] object-cover" />
            </div>
          </section>

          {/* Schedule */}
          <section id="schedule" className="mt-24">
            <div className="text-center">
              <p className="font-sans tracking-[0.4em] text-xs uppercase text-caramel">Программа дня</p>
              <h2 className="mt-3 font-script text-deep text-6xl sm:text-7xl">Расписание</h2>
            </div>
            <ol className="mt-12 max-w-2xl mx-auto">
              {schedule.map((s, i) => (
                <li
                  key={s.time}
                  className={`grid grid-cols-[90px_1fr] sm:grid-cols-[140px_1fr] gap-6 py-5 ${i !== 0 ? "border-t border-deep/20" : ""}`}
                >
                  <div className="font-script text-3xl sm:text-4xl text-caramel leading-none">{s.time}</div>
                  <div>
                    <div className="text-xl sm:text-2xl text-deep">{s.title}</div>
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
              <h2 className="mt-3 font-script text-deep text-6xl sm:text-7xl">База отдыха «Акватория»</h2>
              <p className="mt-6 italic text-lg text-ink/80 max-w-xl mx-auto">
                Нижегородская область, Городецкий район, п. Турбазы
              </p>
              <p className="mt-1 font-sans text-sm text-ink/60">
                Координаты для навигатора: 56.780662, 43.360892
              </p>
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
              <h2 className="mt-3 font-script text-deep text-6xl sm:text-7xl">FAQ</h2>
            </div>
            <div className="mt-12 max-w-2xl mx-auto space-y-8">
              {faqs.map((f) => (
                <div key={f.q} className="border-b border-deep/20 pb-6">
                  <h3 className="font-script text-3xl text-deep">{f.q}</h3>
                  <p className="mt-3 text-lg text-ink/80 leading-relaxed">{f.a}</p>
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
