'use client';

import { useDesign } from '@/context/DesignContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const InteractiveGallery = ({ images }: { images: string[] }) => {
  const design = useDesign();

  // Generator dynamically chooses how the gallery renders
  if (design.layouts.gallery === 'polaroid') {
    return <PolaroidGallery images={images} />;
  }
  
  if (design.layouts.gallery === 'editorial-grid') {
    return <EditorialGrid images={images} />;
  }

  // Default Fallback
  return <MasonryGallery images={images} />;
};

const EditorialGrid = ({ images }: { images: string[] }) => {
  return (
    <section className="py-32 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {images.map((src, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: idx * 0.1 }}
            // Asymmetrical editorial sizing
            className={`relative overflow-hidden ${idx % 3 === 0 ? 'md:col-span-8 h-[60vh]' : 'md:col-span-4 h-[40vh]'}`}
          >
            <Image src={src} alt="Memory" fill className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Other gallery sub-components (Polaroid, Masonry) would be defined here...
