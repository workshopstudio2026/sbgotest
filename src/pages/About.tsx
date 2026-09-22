import { motion } from 'motion/react';
import storeInteriorImg from '../assets/images/regenerated_image_1789991187584.png';
import {
  GraduationCap,
  Briefcase,
  Palette,
  PartyPopper,
  Clock,
  Layers,
  Tag,
  MapPin,
  TrendingUp,
  Store,
  Truck,
  Award,
  Sparkles
} from 'lucide-react';

export default function About() {
  return (
    <div className="w-full">
      {/* 1. Hero */}
      <section className="relative w-full overflow-hidden bg-sb-blue text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-[480px] xl:min-h-[540px]">
          {/* Left Part: Title and messaging */}
          <div className="flex flex-col justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-8 z-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[3px] bg-sb-yellow"></span>
                <span className="text-xs sm:text-sm font-bold tracking-widest text-sb-yellow uppercase">
                  ABOUT SB GO
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]"
              >
                A stationery store for every growing city.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg sm:text-xl font-normal text-blue-100 leading-relaxed max-w-xl"
              >
                SB GO brings stationery, art supplies, gifts, party essentials and everyday products together in one bright, easy-to-shop store, at prices that work for every family.
              </motion.p>
            </div>
          </div>

          {/* Right Part: Store interior photo filling entire right side */}
          <div className="relative w-full h-[380px] sm:h-[460px] lg:h-auto min-h-full overflow-hidden">
            <img
              src={storeInteriorImg}
              alt="Inside an SB GO stationery store"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 2. Our story */}
      <section className="bg-white py-20 lg:py-24 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[3px] bg-sb-yellow"></span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sb-blue uppercase">
                OUR STORY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black mb-8">
              Where SB GO comes from
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
              <p>
                SB GO is a venture of Skyblue Art Pvt. Ltd. Years in creative retail have taught us what customers reach for every week, what they save up for, and what brings them back.
              </p>
              <p>
                SB GO takes that experience to more cities. It's a compact, value-focused format built for everyday needs, so good stationery and creative supplies are never a long trip away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What you'll find */}
      <section className="bg-gray-50 py-20 lg:py-24 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[3px] bg-sb-yellow"></span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sb-blue uppercase">
                CURATED SELECTION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black mb-6">
              Everything under one roof
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-normal">
              School and office stationery, art and craft supplies, gifts and wrapping, party and festive décor, toys and games, bags and bottles, all arranged in clear, easy-to-browse sections.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Who we're for */}
      <section className="bg-white py-20 lg:py-24 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[3px] bg-sb-yellow"></span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sb-blue uppercase">
                SERVING EVERY NEED
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Who we're for
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Students & parents',
                desc: 'Everything for the school year, from the first notebook to the last-minute project.',
                icon: <GraduationCap size={28} className="text-sb-blue" />
              },
              {
                title: 'Working professionals',
                desc: 'Files, planners and desk essentials for the daily routine.',
                icon: <Briefcase size={28} className="text-sb-blue" />
              },
              {
                title: 'Artists & hobbyists',
                desc: 'Colours, canvases, craft kits and materials to make something new.',
                icon: <Palette size={28} className="text-sb-blue" />
              },
              {
                title: 'Occasions & celebrations',
                desc: 'Gifts, cards and party supplies for birthdays, festivals and everything in between.',
                icon: <PartyPopper size={28} className="text-sb-blue" />
              }
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 p-7 shadow-sm flex flex-col justify-start hover:border-sb-blue hover:shadow-md transition-all group"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center bg-white shadow-xs border border-gray-200">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-sb-blue transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our promise */}
      <section className="bg-gray-50 py-20 lg:py-24 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[3px] bg-sb-yellow"></span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sb-blue uppercase">
                OUR COMMITMENT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Our promise
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Convenience',
                desc: 'A store close to home, laid out so you find what you need in minutes.',
                icon: <Clock size={32} className="text-sb-blue" />
              },
              {
                title: 'Variety',
                desc: 'Hundreds of products across stationery, art, gifting and more, in one visit.',
                icon: <Layers size={32} className="text-sb-blue" />
              },
              {
                title: 'Value',
                desc: 'Everyday prices that fit a family budget, without cutting corners on quality.',
                icon: <Tag size={32} className="text-sb-blue" />
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 p-8 shadow-sm flex flex-col justify-start hover:border-sb-blue hover:shadow-md transition-all group"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center bg-white border border-gray-200 shadow-xs">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-sb-blue transition-colors">
                  {item.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our vision */}
      <section className="bg-sb-blue py-20 lg:py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[3px] bg-sb-yellow"></span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sb-yellow uppercase">
                LONG-TERM VISION
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
              500 stores. One SB GO.
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed font-normal">
              Through a growing network of franchise partners, we're working towards 500 SB GO stores across India by 2040, bringing quality stationery and everyday essentials to every growing city.
            </p>
          </div>
        </div>
      </section>

      {/* 7. The SB GO model (replaces "Compact. Curated.") */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[3px] bg-sb-yellow"></span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sb-blue uppercase">
                THE FOUNDATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black mb-3">
              What makes the SB GO model work
            </h2>
            <p className="text-lg text-gray-600">
              A proven format with the systems to support every store.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'A focused format',
                desc: 'Stationery, art, gifting and celebration retail in one compact store.',
                icon: <Sparkles size={28} className="text-sb-blue" />
              },
              {
                title: 'Built for growing cities',
                desc: 'Designed around the shoppers and locations of Tier 2 and Tier 3 markets.',
                icon: <MapPin size={28} className="text-sb-blue" />
              },
              {
                title: 'A range that sells',
                desc: 'An assortment curated around everyday demand.',
                icon: <TrendingUp size={28} className="text-sb-blue" />
              },
              {
                title: 'One identity, one playbook',
                desc: 'Standard store design and operating systems at every location.',
                icon: <Store size={28} className="text-sb-blue" />
              },
              {
                title: 'Central sourcing',
                desc: 'Procurement and inventory support from head office.',
                icon: <Truck size={28} className="text-sb-blue" />
              },
              {
                title: 'Proven retail experience',
                desc: 'Years of creative retail know-how behind every store.',
                icon: <Award size={28} className="text-sb-blue" />
              }
            ].map((pillar, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 p-8 shadow-sm flex flex-col justify-start hover:border-sb-blue hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 mb-6 bg-white flex items-center justify-center border border-gray-200 shadow-xs">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-sb-blue transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
