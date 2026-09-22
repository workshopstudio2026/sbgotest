import { motion } from 'motion/react';
import {
  BookOpen,
  Briefcase,
  Palette,
  Gift,
  PartyPopper,
  Gamepad2,
  Backpack,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';

export default function Home() {
  const scrollToCategories = () => {
    const el = document.getElementById('categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* 1. Hero Banner - 2-Part Split Layout (Single Layer Structure) */}
      <section className="relative w-full overflow-hidden bg-sb-blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-[580px] xl:min-h-[660px]">
          {/* Left Part: Brand messaging, CTA, aligned with navigation container */}
          <div className="flex flex-col justify-center py-12 sm:py-16 md:py-20 lg:py-24 text-white px-4 sm:px-6 lg:px-8 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-[3px] bg-sb-yellow"></span>
                <span className="text-xs sm:text-sm font-bold tracking-widest text-white uppercase">
                  YOUR NEIGHBOURHOOD STATIONERY STORE
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight">
                Your city.<br />
                <span className="text-sb-yellow">Your SB GO.</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/95 max-w-lg">
                Stationery, art supplies, gifts, party essentials and more, all under one roof at prices that make sense.
              </p>

              {/* Hero Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="https://forms.gle/p925jRAuBKBpQZ5o7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-sb-yellow px-7 py-4 text-base font-extrabold text-black transition-transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Own an SB GO store
                </a>
                <button
                  type="button"
                  onClick={scrollToCategories}
                  className="inline-flex items-center justify-center border-2 border-white/80 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-sb-blue cursor-pointer"
                >
                  Explore the range
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Part: SB GO Storefront Visual (Direct single container filling full right column) */}
          <div className="relative w-full h-[450px] sm:h-[550px] lg:h-auto min-h-full overflow-hidden">
            <img
              src="/mockup.png"
              alt="SB GO storefront"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Ticker strip */}
      <section className="bg-sb-yellow py-3.5 sm:py-4 px-4 font-bold text-xs sm:text-sm md:text-base tracking-[0.12em] sm:tracking-[0.18em] text-black uppercase select-none overflow-hidden" aria-label="SB GO product categories">
        <div className="mx-auto flex flex-wrap items-center justify-center text-center">
          STATIONERY <i className="not-italic text-black mx-2 sm:mx-3 md:mx-4">✦</i> ART & CRAFT <i className="not-italic text-black mx-2 sm:mx-3 md:mx-4">✦</i> GIFTS <i className="not-italic text-black mx-2 sm:mx-3 md:mx-4">✦</i> PARTY & FESTIVE <i className="not-italic text-black mx-2 sm:mx-3 md:mx-4">✦</i> TOYS <i className="not-italic text-black mx-2 sm:mx-3 md:mx-4">✦</i> BAGS & BOTTLES <i className="not-italic text-black mx-2 sm:mx-3 md:mx-4">✦</i> EVERYDAY VALUE
        </div>
      </section>

      {/* 2. About block - One stop for everyday creativity */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header row: Heading with eyebrow tag on left, description on right */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16 mb-16 lg:mb-20">
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[3px] bg-sb-yellow"></span>
                <span className="text-xs sm:text-sm font-bold tracking-widest text-sb-blue uppercase">
                  COMPACT. CURATED. CONVENIENT.
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black leading-[1.08]">
                One stop for everyday<br />creativity.
              </h2>
            </div>

            <div className="lg:max-w-xl lg:pt-4 space-y-4">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-normal">
                SB GO is a neighbourhood stationery store that brings school and office supplies, art and craft materials, gifts, party essentials, toys and daily-use products together under one roof, at prices that work for every family.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                Clear sections and a well-chosen range make it easy to find what you came for, whether it's a geometry box, a birthday banner or a last-minute gift.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                And we're growing. Through our franchise network, we're working towards 500 SB GO stores across India by 2040. We're looking for partners in cities like yours.
              </p>
            </div>
          </div>

          {/* 3 Cards */}
          <div className="border border-gray-200 bg-white grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Card 01 */}
            <div className="p-6 sm:p-8 flex flex-col justify-start">
              <div className="text-xs font-bold text-sb-blue tracking-widest mb-3">
                01
              </div>
              <h3 className="text-xl font-bold text-black tracking-tight mb-2">
                For students & parents
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                From the first notebook of the year to the last-minute school project.
              </p>
            </div>

            {/* Card 02 */}
            <div className="p-6 sm:p-8 flex flex-col justify-start">
              <div className="text-xs font-bold text-sb-blue tracking-widest mb-3">
                02
              </div>
              <h3 className="text-xl font-bold text-black tracking-tight mb-2">
                For work & home
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                Files, planners, desk essentials, bags and bottles for the daily routine.
              </p>
            </div>

            {/* Card 03 */}
            <div className="p-6 sm:p-8 flex flex-col justify-start">
              <div className="text-xs font-bold text-sb-blue tracking-widest mb-3">
                03
              </div>
              <h3 className="text-xl font-bold text-black tracking-tight mb-2">
                For creators & celebrations
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                Art supplies, craft kits, gifts and party décor for every occasion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Experience section */}
      <section className="relative w-full overflow-hidden bg-gray-900">
        <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] xl:h-[780px]">
          <img
            src="/sb_go_store_interior.jpg"
            alt="The SB GO store interior"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />

          {/* Yellow Card Overlay aligned with header logo guide */}
          <div className="absolute inset-0 pointer-events-none flex items-end pb-0 sm:pb-8 md:pb-12 lg:pb-16">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-auto">
              <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-[480px] xl:max-w-[540px]">
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-sb-yellow p-8 sm:p-10 md:p-12 lg:p-14 shadow-2xl"
                >
                  <div className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-black uppercase mb-5 sm:mb-6">
                    THE SB GO EXPERIENCE
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-[52px] font-black text-black leading-[1.08] tracking-tight mb-5 sm:mb-6">
                    Easy to find.<br />
                    Easy to afford.<br />
                    Easy to love.
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-black font-medium leading-relaxed">
                    Clearly marked sections, fair prices and a range that keeps changing make every visit quick, simple and full of small discoveries.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Categories - Everything under one roof */}
      <section id="categories" className="bg-gray-50 py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[3px] bg-sb-yellow"></span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sb-blue uppercase">
                EXPLORE OUR RANGE
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-black md:text-5xl">
              Everything under one roof
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              From the first day of school to the last-minute gift.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'School Stationery',
                desc: 'Pens, notebooks, geometry boxes, pencil cases',
                icon: <BookOpen size={28} className="text-sb-blue" />
              },
              {
                title: 'Office & Desk',
                desc: 'Files, staplers, sticky notes, planners, calculators',
                icon: <Briefcase size={28} className="text-sb-blue" />
              },
              {
                title: 'Art & Craft',
                desc: 'Colours, sketchbooks, canvases, clay, DIY kits',
                icon: <Palette size={28} className="text-sb-blue" />
              },
              {
                title: 'Gifts & Wrapping',
                desc: 'Gift sets, greeting cards, gift bags, wrapping paper',
                icon: <Gift size={28} className="text-sb-blue" />
              },
              {
                title: 'Party & Festive',
                desc: 'Balloons, banners, candles, décor, festive specials',
                icon: <PartyPopper size={28} className="text-sb-blue" />
              },
              {
                title: 'Toys & Games',
                desc: 'Board games, puzzles, educational toys',
                icon: <Gamepad2 size={28} className="text-sb-blue" />
              },
              {
                title: 'Bags & Bottles',
                desc: 'School bags, backpacks, water bottles, lunch boxes',
                icon: <Backpack size={28} className="text-sb-blue" />
              },
              {
                title: 'Accessories',
                desc: 'Wallets, card holders, hair accessories, sunglasses',
                icon: <Sparkles size={28} className="text-sb-blue" />
              }
            ].map((tile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-gray-200 p-7 shadow-sm flex flex-col justify-start hover:border-sb-blue hover:shadow-md transition-all group"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center bg-white border border-gray-200 shadow-xs">
                  {tile.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-black group-hover:text-sb-blue transition-colors">
                  {tile.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                  {tile.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why SB GO? */}
      <section className="bg-sb-blue py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[3px] bg-sb-yellow"></span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sb-yellow uppercase">
                THE SB GO ADVANTAGE
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Why SB GO?
            </h2>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Wide range',
                desc: 'From geometry boxes to gift wrap, get your whole list done in one trip.'
              },
              {
                title: 'Fair prices',
                desc: 'Quality products at prices that fit a family budget.'
              },
              {
                title: 'Quick and easy',
                desc: 'Clearly marked sections help you find what you need in minutes.'
              },
              {
                title: 'Always something new',
                desc: "Fresh arrivals every season, so there's always something worth a second look."
              }
            ].map((pt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center bg-sb-yellow text-xl font-black text-black">
                  {i + 1}
                </div>
                <h3 className="mb-3 text-2xl font-bold">{pt.title}</h3>
                <p className="text-blue-100 text-base sm:text-lg leading-relaxed">{pt.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Closing CTA */}
      <section className="bg-white py-20 lg:py-24 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 border border-gray-200 p-8 sm:p-12 lg:p-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[3px] bg-sb-yellow"></span>
                <span className="text-xs sm:text-sm font-bold tracking-widest text-sb-blue uppercase">
                  FRANCHISE OPPORTUNITY
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
                Bring SB GO to your city.
              </h2>
              <div className="mt-8">
                <a
                  href="https://forms.gle/p925jRAuBKBpQZ5o7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-sb-blue px-8 py-4 text-base sm:text-lg font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-md"
                >
                  Start your franchise enquiry
                  <ArrowRight className="ml-2.5 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
