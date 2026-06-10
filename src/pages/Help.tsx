import React from 'react';
import { HelpCircle, ChevronRight, MessageCircle, Mail, Phone, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

export default function Help() {
  const faqs = [
    {
      q: "How do I get a NIF?",
      a: "You can apply for a NIF (Tax Identification Number) at any Finanças office. If you're a non-EU resident, you'll need a fiscal representative."
    },
    {
      q: "When should I book my AIMA appointment?",
      a: "As soon as possible! Slots are limited and wait times can be several months. Check the AIMA portal daily."
    },
    {
      q: "Is the public healthcare system free?",
      a: "For most residents with an SNS number, appointments are either free or have a very small 'taxa moderadora' (nominal fee)."
    },
    {
      q: "Can I work as a student?",
      a: "Yes, in Portugal students can work up to 20 hours per week during the semester and full-time during holidays."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-12 pb-32">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-primary-light rounded-[2rem] flex items-center justify-center text-primary mx-auto mb-6 shadow-soft">
          <HelpCircle size={40} />
        </div>
        <h1 className="font-display text-3xl font-bold text-n-800">How can we help?</h1>
        <p className="text-lg text-text-muted max-w-lg mx-auto">
          Find answers to common questions or reach out to our support team.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-ink px-2">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 gap-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-[2rem] border border-teal-50 shadow-soft group hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-ink text-lg">{faq.q}</h4>
                  <p className="text-sm text-text-muted leading-relaxed">{faq.a}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  <ChevronRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-primary p-10 rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold text-white">Still have questions?</h2>
            <p className="text-white/80 max-w-md font-medium">
              Our community and support team are here to help you navigate your journey.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all">
              <MessageCircle size={20} />
              Chat Support
            </button>
            <button className="flex items-center gap-2 bg-primary-dark text-white font-bold px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition-all">
              <Mail size={20} />
              Email Us
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Phone, title: "Emergency", desc: "Dial 112 for any urgent emergency in Portugal." },
          { icon: BookOpen, title: "Guides", desc: "Read our deep-dive guides into local culture." },
          { icon: Mail, title: "Official", desc: "Contact government offices directly via our portal." }
        ].map((item, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-[2rem] text-center space-y-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary mx-auto shadow-sm">
              <item.icon size={22} />
            </div>
            <h4 className="font-bold text-ink">{item.title}</h4>
            <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
