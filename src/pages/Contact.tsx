import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { FranchiseForm } from '../components/FranchiseForm';

export default function Contact() {
  return (
    <div className="w-full bg-gray-50 pb-24">
      {/* Hero */}
      <section className="bg-sb-blue py-20 lg:py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[3px] bg-sb-yellow"></span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sb-yellow uppercase">
                GET IN TOUCH &amp; PARTNER
              </span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-5xl font-black tracking-tight md:text-6xl"
            >
              Let's connect
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl font-normal text-blue-100 leading-relaxed"
            >
              Have a question, want to know more about SB GO, or interested in opening a franchise store? We'd love to hear from you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left card: Contact details (5 cols, sticky on desktop) */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 shadow-sm border border-gray-200 flex flex-col lg:sticky lg:top-24">
            <h2 className="mb-2 text-2xl sm:text-3xl font-black text-black">
              Contact details
            </h2>
            <p className="mb-8 text-gray-600 font-medium">
              For franchise queries, store format information, and general business correspondence.
            </p>

            <div className="space-y-6 text-gray-900">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white border border-gray-200 shadow-xs text-sb-blue">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">Phone</div>
                  <a href="tel:+919328890356" className="text-base sm:text-lg font-bold hover:text-sb-blue">
                    +91 93288 90356
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white border border-gray-200 shadow-xs text-sb-blue">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">Email</div>
                  <a href="mailto:franchise@sbgo.in" className="text-base sm:text-lg font-bold hover:text-sb-blue">
                    franchise@sbgo.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white border border-gray-200 shadow-xs text-sb-blue">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">Address</div>
                  <p className="text-sm sm:text-base font-medium text-gray-700 leading-relaxed">
                    SF-22, Abhishree Complex, Opp. Star Bazaar, Satellite, Ahmedabad, Gujarat 380015
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <Clock size={15} className="text-sb-blue" />
                <span>Response window: Within 24-48 business hours</span>
              </div>
              <p>Shortlisted applicants will receive direct correspondence via email and WhatsApp from our core expansion team.</p>
            </div>
          </div>

          {/* Right column: Multi-Step Interactive Franchise Form (7 cols) */}
          <div className="lg:col-span-7">
            <FranchiseForm />
          </div>
        </div>
      </div>
    </div>
  );
}
