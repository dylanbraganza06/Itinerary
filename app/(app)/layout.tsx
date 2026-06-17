"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { itinerary } from "@/data/itinerary";
import { tripInfo } from "@/data/trip";
import {
  Home,
  Calendar,
  Film,
  Image as ImageIcon,
  DollarSign,
  LogOut,
  ChevronUp,
  X,
  User,
} from "lucide-react";

// ─── Derived data ────────────────────────────────────────────────────────────

const days = Object.keys(itinerary).map((key) => {
  const num = key.replace("day", "");
  const date = new Date(tripInfo.tripStartDate);
date.setDate(date.getDate() + parseInt(num)); // +num not +num-1, because Day 1 = June 21 (day after departure)
  return {
    key,
    num,
    label: `Day ${num}`,
    href: `/day/${num}`,
    shortDate: date.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    longDate: date.toLocaleDateString("en-IN", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
  };
});

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Mobile overlay states
  const [daysOpen, setDaysOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Close overlays on route change
  useEffect(() => {
    setDaysOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#050a0f" }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  const onAnyDay = pathname.startsWith("/day/");

  // The 5 primary bottom-nav items — Days is a special trigger, not a link
  const primaryNav = [
    { id: "home",     label: "Home",     href: "/home",     icon: Home,       isLink: true  },
    { id: "days",     label: "Days",     href: "",          icon: Calendar,   isLink: false },
    { id: "reels",    label: "Reels",    href: "/reels",    icon: Film,       isLink: true  },
    { id: "pictures", label: "Pics",     href: "/pictures", icon: ImageIcon,  isLink: true  },
    { id: "expenses", label: "Expenses", href: "/expenses", icon: DollarSign, isLink: true  },
  ] as const;

  return (
    <div className="flex min-h-screen">

      {/* ── Desktop Sidebar (unchanged) ─────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col w-64 border-r sticky top-0 h-screen overflow-y-auto py-6 px-4"
        style={{
          background: "rgba(5,10,15,0.95)",
          borderColor: "var(--border)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{ background: "linear-gradient(135deg, var(--primary), #818cf8)" }}
          >
            🌊
          </div>
          <div>
            <p className="font-bold text-sm tracking-tight">{tripInfo.title}</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {tripInfo.subtitle}
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <SidebarLink href="/home"     label="Home"     icon={Home}       active={pathname === "/home"} />

          <div className="mt-4 mb-1 px-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Itinerary
            </span>
          </div>
          {days.map((d) => (
            <SidebarLink
              key={d.key}
              href={d.href}
              label={d.label}
              icon={Calendar}
              sublabel={d.shortDate}
              active={pathname === d.href}
            />
          ))}

          <div className="mt-4 mb-1 px-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              More
            </span>
          </div>
          <SidebarLink href="/reels"    label="Reels"    icon={Film}       active={pathname === "/reels"}    />
          <SidebarLink href="/pictures" label="Pictures" icon={ImageIcon}  active={pathname === "/pictures"} />
          <SidebarLink href="/expenses" label="Expenses" icon={DollarSign} active={pathname === "/expenses"} />
        </nav>

        {/* Desktop user card */}
        <div className="mt-auto pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          <div
            className="flex items-center gap-3 p-2 rounded-xl"
            style={{ background: "var(--surface)" }}
          >
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName || ""}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: "var(--primary)", color: "#000" }}
              >
                {user.displayName?.[0]}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.displayName}</p>
              <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                {user.email}
              </p>
            </div>
            <button
              onClick={signOut}
              className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
              title="Sign out"
            >
              <LogOut size={14} style={{ color: "var(--text-muted)" }} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      {/*
        pb-nav = calc(72px + env(safe-area-inset-bottom))
        This ensures page content is never hidden behind the bottom nav on any iPhone.
      */}
      <main className="flex-1 pb-nav lg:pb-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE BOTTOM NAV
          Design decisions:
          • 5 fixed tabs — Home, Days (trigger), Reels, Pics, Expenses
          • "Days" opens a bottom-sheet drawer instead of navigating directly,
            eliminating 4 cramped day tabs from the bar
          • Tap targets: each item is 44px+ tall (Apple HIG minimum)
          • Avatar in top-right corner for profile/logout — always reachable
          • Safe-area inset applied so the bar floats above iPhone home indicator
      ════════════════════════════════════════════════════════════════════ */}

      {/* Bottom nav bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center"
        style={{
          background: "rgba(5,10,15,0.92)",
          borderTop: "1px solid var(--border)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {primaryNav.map((item) => {
          // Active state logic
          const isActive =
            item.id === "days"
              ? onAnyDay
              : item.href === "/home"
              ? pathname === "/home"
              : pathname.startsWith(item.href);

          if (!item.isLink) {
            // "Days" tab — opens drawer
            return (
              <button
                key={item.id}
                onClick={() => setDaysOpen(true)}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-3"
                style={{ minHeight: 56 }}
                aria-label="View itinerary days"
              >
                <div
                  className="flex items-center justify-center rounded-xl transition-all"
                  style={{
                    width: 36,
                    height: 36,
                    background: isActive ? "rgba(56,189,248,0.18)" : "transparent",
                  }}
                >
                  <item.icon
                    size={20}
                    style={{ color: isActive ? "var(--primary)" : "rgba(240,244,248,0.45)" }}
                  />
                </div>
                <span
                  className="text-[10px] font-semibold"
                  style={{ color: isActive ? "var(--primary)" : "rgba(240,244,248,0.45)" }}
                >
                  {item.label}
                  {isActive && (
                    <span style={{ color: "var(--primary)" }}>
                      {" "}
                      {pathname.replace("/day/", "")}
                    </span>
                  )}
                </span>
              </button>
            );
          }

          // Regular link tab
          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3"
              style={{ minHeight: 56 }}
            >
              <div
                className="flex items-center justify-center rounded-xl transition-all"
                style={{
                  width: 36,
                  height: 36,
                  background: isActive ? "rgba(56,189,248,0.18)" : "transparent",
                }}
              >
                <item.icon
                  size={20}
                  style={{ color: isActive ? "var(--primary)" : "rgba(240,244,248,0.45)" }}
                />
              </div>
              <span
                className="text-[10px] font-semibold"
                style={{ color: isActive ? "var(--primary)" : "rgba(240,244,248,0.45)" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Avatar tab — opens profile sheet */}
        <button
          onClick={() => setProfileOpen(true)}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3"
          style={{ minHeight: 56 }}
          aria-label="Profile menu"
        >
          <div
            className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{
              border: `2px solid ${profileOpen ? "var(--primary)" : "rgba(255,255,255,0.15)"}`,
            }}
          >
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName || ""}
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-xs font-bold"
                style={{ background: "var(--primary)", color: "#000" }}
              >
                {user.displayName?.[0]}
              </div>
            )}
          </div>
          <span
            className="text-[10px] font-semibold"
            style={{ color: profileOpen ? "var(--primary)" : "rgba(240,244,248,0.45)" }}
          >
            Me
          </span>
        </button>
      </nav>

      {/* ── Days Drawer (bottom sheet) ───────────────────────────────────── */}
      <AnimatePresence>
        {daysOpen && (
          <>
            {/* Scrim */}
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/60"
              style={{ backdropFilter: "blur(4px)" }}
              onClick={() => setDaysOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              key="drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 340 }}
              className="lg:hidden fixed left-0 right-0 bottom-0 z-50 rounded-t-3xl overflow-hidden"
              style={{
                background: "#0d1117",
                border: "1px solid var(--border)",
                borderBottom: "none",
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="font-bold text-base">Itinerary</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {days.length} days planned
                  </p>
                </div>
                <button
                  onClick={() => setDaysOpen(false)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--surface)" }}
                >
                  <X size={15} style={{ color: "var(--text-muted)" }} />
                </button>
              </div>

              {/* Day list */}
              <div className="px-4 pb-4 flex flex-col gap-2">
                {days.map((d, i) => {
                  const active = pathname === d.href;
                  return (
                    <motion.div
                      key={d.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={d.href}
                        onClick={() => setDaysOpen(false)}
                        className="flex items-center gap-4 p-4 rounded-2xl transition-all"
                        style={{
                          background: active
                            ? "rgba(56,189,248,0.12)"
                            : "rgba(255,255,255,0.04)",
                          border: `1px solid ${
                            active ? "rgba(56,189,248,0.25)" : "rgba(255,255,255,0.06)"
                          }`,
                        }}
                      >
                        {/* Day number badge */}
                        <div
                          className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                          style={{
                            background: active
                              ? "var(--primary)"
                              : "rgba(255,255,255,0.08)",
                          }}
                        >
                          <span
                            className="text-xs font-semibold leading-none"
                            style={{ color: active ? "#000" : "var(--text-muted)" }}
                          >
                            DAY
                          </span>
                          <span
                            className="text-xl font-bold leading-tight"
                            style={{ color: active ? "#000" : "var(--text)" }}
                          >
                            {d.num}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className="font-semibold text-sm"
                            style={{ color: active ? "var(--primary)" : "var(--text)" }}
                          >
                            {d.label}
                          </p>
                          <p
                            className="text-xs mt-0.5 truncate"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {d.longDate}
                          </p>
                        </div>

                        <ChevronUp
                          size={16}
                          className="rotate-90 flex-shrink-0"
                          style={{
                            color: active ? "var(--primary)" : "rgba(255,255,255,0.2)",
                          }}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Profile / Logout bottom sheet ───────────────────────────────── */}
      <AnimatePresence>
        {profileOpen && (
          <>
            <motion.div
              key="profile-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/60"
              style={{ backdropFilter: "blur(4px)" }}
              onClick={() => setProfileOpen(false)}
            />

            <motion.div
              key="profile-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 340 }}
              className="lg:hidden fixed left-0 right-0 bottom-0 z-50 rounded-t-3xl overflow-hidden"
              style={{
                background: "#0d1117",
                border: "1px solid var(--border)",
                borderBottom: "none",
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                />
              </div>

              <div className="px-5 pt-3 pb-6">
                {/* User info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || ""}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-xl font-bold"
                        style={{ background: "var(--primary)", color: "#000" }}
                      >
                        {user.displayName?.[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base truncate">{user.displayName}</p>
                    <p
                      className="text-sm truncate mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Sign out button */}
                <button
                  onClick={() => { setProfileOpen(false); signOut(); }}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-sm transition-all active:scale-95"
                  style={{
                    background: "rgba(244,63,94,0.12)",
                    border: "1px solid rgba(244,63,94,0.2)",
                    color: "#f43f5e",
                  }}
                >
                  <LogOut size={18} />
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Desktop sidebar sub-components (unchanged) ──────────────────────────────

function SidebarLink({
  href,
  label,
  icon: Icon,
  active,
  sublabel,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  sublabel?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
      style={{
        background: active ? "rgba(56,189,248,0.12)" : "transparent",
        color: active ? "var(--primary)" : "var(--text-muted)",
      }}
    >
      <Icon size={16} />
      <span className="font-medium">{label}</span>
      {sublabel && (
        <span className="ml-auto text-xs opacity-50">{sublabel}</span>
      )}
    </Link>
  );
}
