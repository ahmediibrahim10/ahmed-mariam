'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { useDesign } from '@/context/DesignContext';

export const RSVPSection = () => {
  const design = useDesign();
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <section className="relative py-40 flex justify-center items-center bg-[var(--color-bg)]">
      <div className="absolute inset-0 backdrop-blur-md bg-white/5" /> {/* Glassmorphism base */}
      
      <motion.div 
        className="relative z-10 w-full max-w-2xl p-12 md:p-20 border border-black/5 shadow-2xl bg-[var(--color-bg)]"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-4xl mb-10 text-center">Répondez S'il Vous Plaît</h2>
        
        {!isSubmitted ? (
          <form className="flex flex-col space-y-8" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
            <div className="flex flex-col border-b border-gray-300 pb-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2">Guest Name(s)</label>
              <input type="text" required className="bg-transparent outline-none text-xl focus:text-[var(--color-secondary)] transition-colors" />
            </div>
            
            <div className="flex flex-col border-b border-gray-300 pb-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2">Attendance</label>
              <select className="bg-transparent outline-none text-xl appearance-none cursor-pointer">
                <option value="joyfully-accepts">Joyfully Accepts</option>
                <option value="regretfully-declines">Regretfully Declines</option>
              </select>
            </div>

            <button type="submit" className="mt-8 bg-[var(--color-text)] text-[var(--color-bg)] py-4 uppercase tracking-widest text-sm hover:bg-[var(--color-secondary)] transition-colors duration-300">
              Confirm Attendance
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <p className="text-2xl italic">Thank you. We look forward to celebrating with you.</p>
            {/* Dynamic QR Code matched to theme colors */}
            <div className="p-4 bg-white border border-gray-100 shadow-sm mt-8">
               <QRCode 
                 value="https://luxury-wedding-platform.com/rsvp/success" 
                 size={150} 
                 fgColor={design.colors.text} 
               />
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-500">Your Entry Pass</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
