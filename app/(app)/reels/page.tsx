"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { reels } from "@/data/reels";
import { ExternalLink, Search, Clapperboard } from "lucide-react";

const categories = ["All", ...Array.from(new Set(reels.map((r) => r.category)))];

const categoryColors: Record<string, string> = {
  Funny: "#f97316",
  Beach: "#38bdf8",
  "Group Photos": "#818cf8",
  Food: "#4ade80",
  Edits: "#f43f5e",
  Transitions: "#fbbf24",
};

function getEmbedUrl(url: string) {
  const match = url.match(/instagram\.com\/(?:reel|p)\/([\w-]+)/);
  if (!match) return null;
  return `https://www.instagram.com/p/${match[1]}/embed/`;
}

export default function ReelsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = reels.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || r.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen px-5 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-1">Reels</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Inspiration for the trip</p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search reels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: activeCategory === cat ? (categoryColors[cat] || "var(--primary)") + "22" : "var(--surface)",
                color: activeCategory === cat ? (categoryColors[cat] || "var(--primary)") : "var(--text-muted)",
                border: `1px solid ${activeCategory === cat ? (categoryColors[cat] || "var(--primary)") + "44" : "var(--border)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((reel, i) => (
            <motion.div
              key={reel.url}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="glass rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Instagram embed */}
              <div className="relative bg-black" style={{ paddingBottom: "125%", overflow: "hidden" }}>
                <iframe
                  src={getEmbedUrl(reel.url) || ""}
                  className="absolute inset-0 w-full h-full"
                  style={{ border: "none", background: "transparent" }}
                  scrolling="no"
                  loading="lazy"
                  title={reel.title}
                />
              </div>

              <div className="p-4 flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium mr-2" style={{ background: (categoryColors[reel.category] || "#38bdf8") + "20", color: categoryColors[reel.category] || "#38bdf8" }}>
                    {reel.category}
                  </span>
                  <p className="font-medium text-sm mt-2 truncate">{reel.title}</p>
                </div>
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                  style={{ background: "rgba(249,115,22,0.15)", color: "var(--accent)" }}
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "var(--text-muted)" }}>
            <Clapperboard size={32} className="mx-auto mb-3 opacity-30" />
            <p>No reels found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
