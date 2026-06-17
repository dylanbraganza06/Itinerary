"use client";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { use } from "react";
import { itinerary, Activity } from "@/data/itinerary";
import { tripInfo } from "@/data/trip";
import { MapPin, ExternalLink } from "lucide-react";

export default function DayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day } = use(params);
  const dayKey = `day${day}`;
  const activities = itinerary[dayKey];

  if (!activities) return notFound();

  const date = new Date(tripInfo.tripStartDate);
  date.setDate(date.getDate() + parseInt(day)); // Day 1 = June 21, Day 2 = June 22, etc.
  const dateStr = date.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen px-5 lg:px-8 py-8 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <p className="text-sm mb-1" style={{ color: "var(--primary)" }}>Day {day}</p>
          <h1 className="text-3xl font-bold tracking-tight">{dateStr}</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{activities.length} activities planned</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-3 bottom-3 w-px" style={{ background: "linear-gradient(to bottom, var(--primary), transparent)" }} />

          <div className="flex flex-col gap-4">
            {activities.map((activity, i) => (
              <ActivityCard key={i} activity={activity} index={i} isLast={i === activities.length - 1} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ActivityCard({ activity, index, isLast }: { activity: Activity; index: number; isLast: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="flex gap-4"
    >
      {/* Timeline dot */}
      <div className="relative flex-shrink-0 flex flex-col items-center">
        <div className="relative w-11 h-11 rounded-full flex items-center justify-center z-10 text-xs font-bold" style={{ background: "linear-gradient(135deg, var(--primary), #818cf8)", color: "#000" }}>
          {index + 1}
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 glass rounded-2xl overflow-hidden mb-2 hover:bg-white/[0.07] transition-all">
        {activity.imageUrl && (
          <div className="relative h-48 w-full">
            <Image
              src={activity.imageUrl}
              alt={activity.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,10,15,0.7), transparent 50%)" }} />
            {activity.alternateImageUrl && (
              <div className="absolute top-3 right-3">
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: "rgba(249,115,22,0.9)", color: "white" }}>
                  Alt option available
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--primary)" }}>{activity.time}</p>
              <h3 className="font-semibold text-base leading-tight mt-0.5">{activity.title}</h3>
            </div>
          </div>

          {/* Alternate option */}
          {activity.alternateTitle && (
            <div className="mt-3 p-3 rounded-xl text-sm" style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}>
              <p className="text-xs mb-1" style={{ color: "var(--accent)" }}>Alternative</p>
              <p className="font-medium">{activity.alternateTitle}</p>
            </div>
          )}

          {/* Maps buttons */}
          {(activity.mapsUrl || activity.alternateMapsUrl) && (
            <div className="flex gap-2 mt-3">
              {activity.mapsUrl && (
                <a
                  href={activity.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors"
                  style={{ background: "rgba(56,189,248,0.12)", color: "var(--primary)" }}
                >
                  <MapPin size={12} /> Maps <ExternalLink size={10} />
                </a>
              )}
              {activity.alternateMapsUrl && (
                <a
                  href={activity.alternateMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors"
                  style={{ background: "rgba(249,115,22,0.12)", color: "var(--accent)" }}
                >
                  <MapPin size={12} /> Alt Maps <ExternalLink size={10} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
