"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, query, orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import toast from "react-hot-toast";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { Plus, Trash2, Edit3, X, Check, IndianRupee, TrendingUp, Layers } from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const CATEGORIES = ["Food", "Transport", "Stay", "Activities", "Shopping", "Drinks", "Other"];
const CAT_COLORS: Record<string, string> = {
  Food: "#4ade80", Transport: "#38bdf8", Stay: "#818cf8",
  Activities: "#f97316", Shopping: "#fbbf24", Drinks: "#f43f5e", Other: "#94a3b8",
};

const blankForm = () => ({
  description: "",
  amount: "",
  category: "Food",
  date: new Date().toISOString().split("T")[0],
});

export default function ExpensesPage() {
  const { user } = useAuth();
  const [expenses, setExpenses]   = useState<Expense[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm]           = useState(blankForm());

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, `users/${user.uid}/expenses`),
      orderBy("date", "desc"),
    );
    const unsub = onSnapshot(q, (snap) => {
      setExpenses(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Expense)));
      setLoading(false);
    });
    return unsub;
  }, [user]);

  const openAdd = () => {
    setEditingId(null);
    setForm(blankForm());
    setShowForm(true);
  };

  const openEdit = (exp: Expense) => {
    setForm({
      description: exp.description,
      amount: String(exp.amount),
      category: exp.category,
      date: exp.date,
    });
    setEditingId(exp.id);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!user || !form.description || !form.amount) return;
    const data = {
      description: form.description,
      amount: parseFloat(form.amount),
      category: form.category,
      date: form.date,
    };
    try {
      if (editingId) {
        await updateDoc(doc(db, `users/${user.uid}/expenses`, editingId), data);
        toast.success("Expense updated");
        setEditingId(null);
      } else {
        await addDoc(collection(db, `users/${user.uid}/expenses`), data);
        toast.success("Expense added");
      }
      setForm(blankForm());
      setShowForm(false);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, `users/${user.uid}/expenses`, id));
    toast.success("Deleted");
  };

  // ── Analytics ─────────────────────────────────────────────────────────────
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const avg   = expenses.length ? total / expenses.length : 0;

  const byCat = CATEGORIES.map((cat) => ({
    name: cat,
    value: expenses
      .filter((e) => e.category === cat)
      .reduce((s, e) => s + e.amount, 0),
  })).filter((c) => c.value > 0);

  const byDate = Object.entries(
    expenses.reduce((acc, e) => {
      acc[e.date] = (acc[e.date] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>),
  )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, t]) => ({ date: date.slice(5), total: t }));

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/*
        Main scrollable content.
        On mobile: pb-nav (72px + safe-area) keeps content clear of the fixed
        bottom nav from layout.tsx.
        On desktop: pb-8 is enough since there is no bottom nav.
      */}
      <div className="min-h-screen px-5 lg:px-8 pt-8 pb-nav lg:pb-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>

          {/* Header — "Add" button only shown on desktop here;
              on mobile the FAB below handles it */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Expenses</h1>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Track your spending
              </p>
            </div>
            {/* Desktop add button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAdd}
              className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
              style={{ background: "var(--primary)", color: "#000" }}
            >
              <Plus size={16} /> Add
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Total Spent",  value: `₹${total.toLocaleString("en-IN")}`, icon: IndianRupee, color: "#38bdf8" },
              { label: "Avg Expense",  value: `₹${avg.toFixed(0)}`,                icon: TrendingUp,  color: "#818cf8" },
              { label: "Transactions", value: expenses.length,                     icon: Layers,      color: "#f97316" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="glass rounded-2xl p-4">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center mb-2"
                  style={{ background: `${color}20` }}
                >
                  <Icon size={15} style={{ color }} />
                </div>
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Charts */}
          {expenses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="glass rounded-2xl p-5">
                <p className="text-sm font-semibold mb-4">By Category</p>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={byCat}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {byCat.map((entry) => (
                        <Cell key={entry.name} fill={CAT_COLORS[entry.name] || "#94a3b8"} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: unknown) => [`₹${Number(v).toLocaleString("en-IN")}`, ""]}
                      contentStyle={{
                        background: "#0d1117",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        color: "#f0f4f8",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  {byCat.map((c) => (
                    <div key={c.name} className="flex items-center gap-2 text-xs">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: CAT_COLORS[c.name] }}
                      />
                      <span style={{ color: "var(--text-muted)" }}>{c.name}</span>
                      <span className="ml-auto font-medium">
                        ₹{c.value.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-5">
                <p className="text-sm font-semibold mb-4">Spending Trend</p>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={byDate}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10, fill: "rgba(240,244,248,0.4)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "rgba(240,244,248,0.4)" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `₹${v}`}
                    />
                    <Tooltip
                      formatter={(v: unknown) => [`₹${Number(v).toLocaleString("en-IN")}`, "Spent"]}
                      contentStyle={{
                        background: "#0d1117",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        color: "#f0f4f8",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      dot={{ fill: "var(--primary)", r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Expense list */}
          <div className="flex flex-col gap-2">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="glass rounded-2xl h-16 shimmer" />
              ))
            ) : expenses.length === 0 ? (
              <div
                className="text-center py-16"
                style={{ color: "var(--text-muted)" }}
              >
                <IndianRupee size={32} className="mx-auto mb-3 opacity-30" />
                <p>No expenses yet. Tap + to add your first one!</p>
              </div>
            ) : (
              expenses.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="glass rounded-2xl flex items-center gap-4 p-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-base font-bold"
                    style={{
                      background: `${CAT_COLORS[exp.category] || "#94a3b8"}20`,
                      color: CAT_COLORS[exp.category] || "#94a3b8",
                    }}
                  >
                    {exp.category[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{exp.description}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {exp.category} · {exp.date}
                    </p>
                  </div>
                  <p className="font-bold text-sm flex-shrink-0">
                    ₹{exp.amount.toLocaleString("en-IN")}
                  </p>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => openEdit(exp)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/10"
                    >
                      <Edit3 size={14} style={{ color: "var(--text-muted)" }} />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-red-500/20"
                    >
                      <Trash2 size={14} style={{ color: "#f43f5e" }} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/*
        ── Mobile FAB (Floating Add Button) ──────────────────────────────────
        Positioned above the bottom nav using bottom offset:
          calc(72px [nav height] + env(safe-area-inset-bottom) + 16px [gap])
        This guarantees it never overlaps the nav bar on any iPhone model.
        Hidden on desktop (lg:hidden) because the header button handles it there.
      */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={openAdd}
        className="lg:hidden fixed right-5 z-40 flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm shadow-lg"
        style={{
          bottom: "calc(72px + env(safe-area-inset-bottom) + 12px)",
          background: "var(--primary)",
          color: "#000",
          boxShadow: "0 8px 32px rgba(56,189,248,0.35)",
        }}
        aria-label="Add expense"
      >
        <Plus size={18} />
        Add Expense
      </motion.button>

      {/* ── Add / Edit Form Sheet ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />

            {/*
              Sheet:
              Mobile  — slides up from bottom, respects safe-area at the bottom
              Desktop — centred modal (lg:inset-auto + translate)
            */}
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 48 }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl
                         lg:inset-auto lg:top-1/2 lg:left-1/2
                         lg:-translate-x-1/2 lg:-translate-y-1/2
                         lg:w-96 lg:rounded-3xl"
              style={{
                background: "#0d1117",
                border: "1px solid var(--border)",
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
            >
              {/* Handle (mobile only visual cue) */}
              <div className="flex justify-center pt-3 pb-1 lg:hidden">
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                />
              </div>

              <div className="px-5 pt-4 pb-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg">
                    {editingId ? "Edit Expense" : "Add Expense"}
                  </h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <input
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                    }}
                  />
                  <div className="flex gap-2 flex-wrap">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setForm({ ...form, category: cat })}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                        style={{
                          background:
                            form.category === cat
                              ? `${CAT_COLORS[cat]}30`
                              : "var(--surface)",
                          color:
                            form.category === cat
                              ? CAT_COLORS[cat]
                              : "var(--text-muted)",
                          border: `1px solid ${
                            form.category === cat
                              ? CAT_COLORS[cat] + "50"
                              : "var(--border)"
                          }`,
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      colorScheme: "dark",
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm mt-1"
                    style={{ background: "var(--primary)", color: "#000" }}
                  >
                    <Check size={16} /> {editingId ? "Update Expense" : "Add Expense"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
