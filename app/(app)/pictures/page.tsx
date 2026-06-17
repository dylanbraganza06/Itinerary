"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getPictureInspos } from "@/lib/pictures";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";

const images = getPictureInspos();

export default function PicturesPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <div className="min-h-screen px-5 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-1">Pictures</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Pose inspo for the trip · {images.length} photos</p>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer relative group"
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={src}
                alt={`Pose ${i + 1}`}
                width={400}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-2xl" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.95)" }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Controls */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center glass z-10"
            >
              <X size={18} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center glass z-10"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center glass z-10"
            >
              <ChevronRight size={18} />
            </button>

            <a
              href={images[lightboxIndex]}
              download
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium glass z-10"
              style={{ color: "var(--primary)" }}
            >
              <Download size={14} /> Download
            </a>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                alt={`Pose ${lightboxIndex + 1}`}
                width={800}
                height={1000}
                className="max-w-[90vw] max-h-[90vh] w-auto h-auto rounded-2xl object-contain"
                priority
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm glass px-3 py-1.5 rounded-full" style={{ color: "var(--text-muted)" }}>
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
