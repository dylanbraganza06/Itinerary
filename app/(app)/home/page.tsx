"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { tripInfo } from "@/data/trip";
import { MapPin, Users, Calendar, Flame, Download, ExternalLink } from "lucide-react";

function useCountdown(targetDate: string) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, started: false });
  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0, started: true });
        return;
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        started: false,
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

export default function HomePage() {
  const countdown = useCountdown(tripInfo.tripStartDate);

  // ✏️ Edit these stat cards here — change label/value/color as needed
  const stats = [
    { label: "Legends", value: tripInfo.friendsCount, icon: Flame,    color: "#f97316" },
    { label: "Days",    value: tripInfo.totalDays,    icon: Calendar,  color: "#818cf8" },
    { label: "Memories", value: "∞", icon: Users,     color: "#38bdf8" },
  ];

  return (
    <div className="min-h-screen">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[540px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={tripInfo.heroImage} alt="Goa" fill className="object-cover" priority />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #050a0f 0%, rgba(5,10,15,0.35) 55%, transparent 100%)",
            }}
          />
        </div>
        {/* Title — centred on mobile, left-aligned on desktop */}
        <div className="relative z-10 px-5 lg:px-8 flex flex-col items-center text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <MapPin size={13} style={{ color: "var(--primary)" }} />
              <span className="text-sm font-medium" style={{ color: "var(--primary)" }}>
                Goa, India
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-1.5">
              {tripInfo.title}
            </h1>
            <p className="text-xl opacity-60">{tripInfo.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Content — centred column ───────────────────────── */}
      <div className="px-5 lg:px-8 py-8 mx-auto max-w-3xl">

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 mb-5"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            {countdown.started ? "Trip Started 🎉" : "Countdown to Goa"}
          </p>

          {!countdown.started ? (
            <div className="grid grid-cols-4 gap-3">
              {[
                { v: countdown.days,    l: "Days"  },
                { v: countdown.hours,   l: "Hours" },
                { v: countdown.minutes, l: "Min"   },
                { v: countdown.seconds, l: "Sec"   },
              ].map(({ v, l }) => (
                <div
                  key={l}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-3xl font-bold gradient-text tabular-nums">
                    {String(v).padStart(2, "0")}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {l}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-2xl font-bold gradient-text">We&apos;re in Goa! 🎉</p>
          )}

          {/* ✏️ Change trip date display text here */}
          <p className="text-sm mt-4" style={{ color: "var(--text-muted)" }}>
            Jun 20–24, 2026 · Staying at {tripInfo.accommodation.name}
          </p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-3 mb-5"
        >
          {stats.map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="glass rounded-2xl p-4 flex flex-col gap-2"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `${color}20` }}
              >
                <Icon size={16} style={{ color }} />
              </div>
              <p className="text-2xl font-bold" style={{ color }}>
                {value}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Accommodation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass rounded-2xl overflow-hidden mb-5"
        >
          <div className="relative h-44">
            <Image
              src={tripInfo.accommodation.imageUrl}
              alt={tripInfo.accommodation.name}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(5,10,15,0.9), transparent)" }}
            />
            <div className="absolute bottom-4 left-4">
              <p className="text-xs mb-0.5" style={{ color: "var(--primary)" }}>
                Accommodation
              </p>
              <p className="text-xl font-bold">{tripInfo.accommodation.name}</p>
            </div>
          </div>
          <div className="p-4">
            <a
              href={tripInfo.accommodation.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--primary)" }}
            >
              <MapPin size={14} /> Open in Maps <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>

        {/* ── Tickets ─────────────────────────────────────────
            Rendered dynamically from tripInfo.tickets array.
            To add a new ticket: uncomment the return-ticket
            block in data/trip.ts and add the PDF to /public.
        ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-5"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            {tripInfo.tickets.length === 1 ? "Train Ticket" : "Train Tickets"}
          </p>

          <div className="flex flex-col gap-4">
            {tripInfo.tickets.map((ticket) => (
              <div key={ticket.id}>
                {/* Ticket info row */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: "rgba(56,189,248,0.1)" }}
                  >
                    {ticket.emoji}
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text-muted)" }}>
                      {ticket.label}
                    </p>
                    <p className="font-semibold">{ticket.route}</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {ticket.date}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <a
                    href={ticket.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium"
                    style={{ background: "rgba(56,189,248,0.15)", color: "var(--primary)" }}
                  >
                    <ExternalLink size={14} /> View PDF
                  </a>
                  <a
                    href={ticket.file}
                    download={ticket.downloadName}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium"
                    style={{ background: "rgba(249,115,22,0.15)", color: "var(--accent)" }}
                  >
                    <Download size={14} /> Download
                  </a>
                </div>

                {/* Divider between multiple tickets */}
                {tripInfo.tickets.indexOf(ticket) < tripInfo.tickets.length - 1 && (
                  <div className="mt-4 border-t" style={{ borderColor: "var(--border)" }} />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
