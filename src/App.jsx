import React, { useEffect, useMemo, useRef, useState } from "react";
import './App.css'
import
{
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import
{
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileUp,
  Home,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  PackageOpen,
  Phone,
  Search,
  Settings2,
  ShieldCheck,
  Star,
  TestTube2,
  Upload,
  User,
  BadgePercent,
  CheckCircle2,
  XCircle,
  MapPin,
  Sparkles,
} from "lucide-react";

/* =======================================================================================
   LabDeals — Complete UI Prototype (React + Tailwind)
   - Mobile-first patient app (max width 430px, centered on desktop in "phone frame")
   - Lab owner dashboard (responsive sidebar on tablet/desktop, top tabs on mobile)
   - No backend; static/mock data + local component state updates
======================================================================================= */

const COLORS = {
  teal: "#1D9E75",
  tealLight: "#E1F5EE",
  tealDark: "#085041",
  amber: "#BA7517",
  amberLight: "#FAEEDA",
  amberDark: "#412402",
  coral: "#D85A30",
  coralLight: "#FAECE7",
  success: "#3B6D11",
  bg: "#F8FAF9",
  surface: "#FFFFFF",
  border: "#E5E7EB",
  text: "#111827",
  text2: "#6B7280",
  muted: "#9CA3AF",
};

/* ----------------------------- MOCK DATA (as provided) ----------------------------- */
const LABS = [
  {
    id: 1,
    name: "SunLife Diagnostics",
    address: "Shop 12, Main Market, Dādri, UP 203207",
    distance: 1.2,
    rating: 4.3,
    reviews: 87,
    nabl: true,
    homeCollection: false,
    whatsappReports: true,
    openTime: "7:00 AM",
    closeTime: "8:00 PM",
    phone: "+91-9876543210",
    activeOffer: { title: "Summer Special", discount: 20, validUntil: "Jun 30, 2025" },
    tests: [
      { id: 101, name: "CBC (Complete Blood Count)", category: "Haematology", basePrice: 350, offeredPrice: 280, duration: "Same day", sampleType: "Blood" },
      { id: 102, name: "X-Ray Chest PA", category: "Radiology", basePrice: 400, offeredPrice: 320, duration: "1 hour", sampleType: "N/A" },
      { id: 103, name: "Thyroid Profile (T3/T4/TSH)", category: "Biochemistry", basePrice: 600, offeredPrice: 480, duration: "Next day", sampleType: "Blood" },
      { id: 104, name: "Vitamin D (25-OH)", category: "Biochemistry", basePrice: 900, offeredPrice: 720, duration: "Next day", sampleType: "Blood" },
      { id: 105, name: "Lipid Profile", category: "Biochemistry", basePrice: 500, offeredPrice: 400, duration: "Same day", sampleType: "Blood" },
      { id: 106, name: "Urine Routine & Microscopy", category: "Pathology", basePrice: 150, offeredPrice: 120, duration: "Same day", sampleType: "Urine" },
      { id: 107, name: "Blood Sugar (Fasting)", category: "Biochemistry", basePrice: 80, offeredPrice: 65, duration: "Same day", sampleType: "Blood" }
    ]
  },
  {
    id: 2,
    name: "Dādri Path Lab",
    address: "Near Bus Stand, GT Road, Dādri, UP",
    distance: 2.1,
    rating: 4.0,
    reviews: 52,
    nabl: false,
    homeCollection: false,
    whatsappReports: true,
    openTime: "8:00 AM",
    closeTime: "7:00 PM",
    phone: "+91-9823456789",
    activeOffer: null,
    tests: [
      { id: 201, name: "CBC (Complete Blood Count)", category: "Haematology", basePrice: 300, offeredPrice: 300, duration: "Same day", sampleType: "Blood" },
      { id: 202, name: "Thyroid Profile (T3/T4/TSH)", category: "Biochemistry", basePrice: 580, offeredPrice: 580, duration: "Next day", sampleType: "Blood" },
      { id: 203, name: "X-Ray Chest PA", category: "Radiology", basePrice: 380, offeredPrice: 380, duration: "1 hour", sampleType: "N/A" },
      { id: 204, name: "Lipid Profile", category: "Biochemistry", basePrice: 480, offeredPrice: 480, duration: "Same day", sampleType: "Blood" },
      { id: 205, name: "Blood Sugar (Fasting)", category: "Biochemistry", basePrice: 75, offeredPrice: 75, duration: "Same day", sampleType: "Blood" }
    ]
  },
  {
    id: 3,
    name: "MedPlus Diagnostics",
    address: "Sector 5, Near Civil Hospital, Dādri",
    distance: 3.4,
    rating: 4.5,
    reviews: 124,
    nabl: true,
    homeCollection: true,
    whatsappReports: true,
    openTime: "6:30 AM",
    closeTime: "9:00 PM",
    phone: "+91-9912345678",
    activeOffer: { title: "NABL Special", discount: 10, validUntil: "Jul 15, 2025" },
    tests: [
      { id: 301, name: "CBC (Complete Blood Count)", category: "Haematology", basePrice: 350, offeredPrice: 315, duration: "Same day", sampleType: "Blood" },
      { id: 302, name: "X-Ray Chest PA", category: "Radiology", basePrice: 450, offeredPrice: 405, duration: "1 hour", sampleType: "N/A" },
      { id: 303, name: "Thyroid Profile (T3/T4/TSH)", category: "Biochemistry", basePrice: 650, offeredPrice: 585, duration: "Next day", sampleType: "Blood" },
      { id: 304, name: "Vitamin D (25-OH)", category: "Biochemistry", basePrice: 950, offeredPrice: 855, duration: "Next day", sampleType: "Blood" },
      { id: 305, name: "Lipid Profile", category: "Biochemistry", basePrice: 550, offeredPrice: 495, duration: "Same day", sampleType: "Blood" }
    ]
  },
  {
    id: 4,
    name: "City Lab Centre",
    address: "Main Chowk, Dādri, UP 203207",
    distance: 4.8,
    rating: 3.8,
    reviews: 31,
    nabl: false,
    homeCollection: false,
    whatsappReports: false,
    openTime: "9:00 AM",
    closeTime: "6:00 PM",
    phone: "+91-9765432109",
    activeOffer: null,
    tests: [
      { id: 401, name: "CBC (Complete Blood Count)", category: "Haematology", basePrice: 380, offeredPrice: 380, duration: "Same day", sampleType: "Blood" },
      { id: 402, name: "Thyroid Profile (T3/T4/TSH)", category: "Biochemistry", basePrice: 550, offeredPrice: 550, duration: "Next day", sampleType: "Blood" },
      { id: 403, name: "Blood Sugar (Fasting)", category: "Biochemistry", basePrice: 70, offeredPrice: 70, duration: "Same day", sampleType: "Blood" }
    ]
  }
];

const INITIAL_BOOKINGS = [
  {
    id: "LBD-2025-0041",
    labName: "SunLife Diagnostics",
    testName: "CBC (Complete Blood Count)",
    date: "Wed, 5 Jun 2025",
    slot: "8:00 AM – 10:00 AM",
    amountPaid: 290,
    status: "confirmed",
    reportUrl: null
  },
  {
    id: "LBD-2025-0038",
    labName: "Dādri Path Lab",
    testName: "X-Ray Chest PA",
    date: "Mon, 3 Jun 2025",
    slot: "10:00 AM – 12:00 PM",
    amountPaid: 380,
    status: "report_ready",
    reportUrl: "#"
  },
  {
    id: "LBD-2025-0031",
    labName: "MedPlus Diagnostics",
    testName: "Thyroid Profile (T3/T4/TSH)",
    date: "Fri, 28 May 2025",
    slot: "7:00 AM – 9:00 AM",
    amountPaid: 585,
    status: "completed",
    reportUrl: "#"
  }
];

const USER_PROFILE = {
  name: "Rahul Sharma",
  phone: "+91 98765 43210",
  initials: "RS",
  location: "Dādri, UP"
};

const LAB_DASHBOARD_DATA = {
  labName: "SunLife Diagnostics",
  todayBookings: 12,
  weekRevenue: 8400,
  activeOffers: 2,
  rating: 4.3,
  pendingBookings: [
    { id: "LBD-2025-0042", patient: "Priya M.", test: "CBC", slot: "9:00 AM", status: "pending" },
    { id: "LBD-2025-0043", patient: "Amit K.", test: "X-Ray", slot: "10:00 AM", status: "collected" },
    { id: "LBD-2025-0044", patient: "Sunita D.", test: "Thyroid", slot: "11:00 AM", status: "pending" },
    { id: "LBD-2025-0045", patient: "Rakesh V.", test: "Lipid Profile", slot: "12:00 PM", status: "pending" }
  ]
};

/* ----------------------------- Helpers ----------------------------- */
const cn = (...classes) => classes.filter(Boolean).join(" ");

function formatINR(n)
{
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

function clamp(n, min, max)
{
  return Math.max(min, Math.min(max, n));
}

function getStatusPill(status)
{
  // Patient side statuses: confirmed, sample_collected?, report_ready, cancelled, completed
  // Dashboard statuses: pending, collected
  const map = {
    confirmed: { bg: "#DBEAFE", text: "#1E40AF", label: "Confirmed" },
    pending: { bg: "#FEF3C7", text: "#92400E", label: "Pending" },
    collected: { bg: "#FEF3C7", text: "#92400E", label: "Sample Collected" },
    sample_collected: { bg: "#FEF3C7", text: "#92400E", label: "Sample Collected" },
    report_ready: { bg: "#D1FAE5", text: "#065F46", label: "Report Ready" },
    completed: { bg: "#E5E7EB", text: "#374151", label: "Completed" },
    cancelled: { bg: "#FEE2E2", text: "#991B1B", label: "Cancelled" },
  };
  return map[status] || { bg: "#E5E7EB", text: "#374151", label: status };
}

function isLabOpenNow(lab)
{
  // Prototype: always "Open Now" to match spec
  return true;
}

function findTestLabelFromName(name)
{
  // Used for Search header (CBC — Complete Blood Count)
  const lc = name.toLowerCase();
  if (lc.includes("cbc")) return "CBC — Complete Blood Count";
  if (lc.includes("x-ray")) return "X-Ray Chest PA";
  if (lc.includes("thyroid")) return "Thyroid Profile (T3/T4/TSH)";
  if (lc.includes("vitamin d")) return "Vitamin D (25-OH)";
  if (lc.includes("lipid")) return "Lipid Profile";
  if (lc.includes("urine")) return "Urine Routine & Microscopy";
  if (lc.includes("sugar") || lc.includes("fasting")) return "Blood Sugar (Fasting)";
  return name;
}

/* =======================================================================================
   Root App with mode switcher
======================================================================================= */

export default function App()
{
  return (
    <>
      <GlobalStyles />
      <LabDealsShell />
    </>
  );
}

function LabDealsShell()
{
  const [mode, setMode] = useState("patient"); // "patient" | "lab"
  const location = useLocation();
  const navigate = useNavigate();

  // Keep routes consistent when switching modes (simple demo behavior)
  const switchMode = (next) =>
  {
    setMode(next);
    if (next === "patient") navigate("/");
    else navigate("/lab/overview");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <ModeSwitcher mode={mode} onChange={switchMode} />

      {mode === "patient" ? (
        <PhoneFrame>
          <PatientApp />
        </PhoneFrame>
      ) : (
        <LabOwnerDashboard />
      )}
    </div>
  );
}

/* =======================================================================================
   Global styles: colors + keyframe animations + font hint
======================================================================================= */
function GlobalStyles()
{
  return (
    <style>{`
      :root{
        --teal:${COLORS.teal};
        --tealLight:${COLORS.tealLight};
        --tealDark:${COLORS.tealDark};
        --amber:${COLORS.amber};
        --amberLight:${COLORS.amberLight};
        --amberDark:${COLORS.amberDark};
        --coral:${COLORS.coral};
        --coralLight:${COLORS.coralLight};
        --success:${COLORS.success};
        --bg:${COLORS.bg};
        --surface:${COLORS.surface};
        --border:${COLORS.border};
        --text:${COLORS.text};
        --text2:${COLORS.text2};
        --muted:${COLORS.muted};
      }
      @keyframes offerPulse { 0%{opacity:1} 50%{opacity:.72} 100%{opacity:1} }
      .offer-pulse { animation: offerPulse 1.8s ease-in-out infinite; }
      @keyframes popIn { 0%{transform:scale(.0); opacity:0} 70%{transform:scale(1.08); opacity:1} 100%{transform:scale(1); opacity:1} }
      .pop-in { animation: popIn 520ms cubic-bezier(.2,.9,.2,1) both; }
      @keyframes tabBounce { 0%{transform:scale(1)} 45%{transform:scale(1.12)} 100%{transform:scale(1)} }
      .tab-bounce { animation: tabBounce 280ms ease-out; }
      @keyframes smoothWidth { from{width:0%} to{width:100%} }
      .shadow-card { box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    `}</style>
  );
}

/* =======================================================================================
   Mode switcher (floating)
======================================================================================= */
function ModeSwitcher({ mode, onChange })
{
  return (
    <div className="fixed z-50 top-3 right-3">
      <div className="bg-white border border-[var(--border)] rounded-full shadow-card overflow-hidden flex">
        <button
          onClick={() => onChange("patient")}
          className={cn(
            "px-3 py-2 text-xs font-semibold flex items-center gap-2",
            mode === "patient" ? "bg-[var(--teal)] text-white" : "text-[var(--text2)] hover:bg-gray-50"
          )}
        >
          <User size={16} />
          Patient View
        </button>
        <button
          onClick={() => onChange("lab")}
          className={cn(
            "px-3 py-2 text-xs font-semibold flex items-center gap-2",
            mode === "lab" ? "bg-[var(--tealDark)] text-white" : "text-[var(--text2)] hover:bg-gray-50"
          )}
        >
          <LayoutDashboard size={16} />
          Lab Owner
        </button>
      </div>
    </div>
  );
}

/* =======================================================================================
   Phone frame container (patient app)
======================================================================================= */
function PhoneFrame({ children })
{
  return (
    <div className="w-full flex justify-center px-3 py-6">
      <div className="w-full max-w-[430px] bg-[var(--bg)] rounded-[24px] border border-[var(--border)] overflow-hidden shadow-card">
        {children}
      </div>
    </div>
  );
}

/* =======================================================================================
   Shared UI primitives
======================================================================================= */
function TopBar({ left, title, right, border = true })
{
  return (
    <div className={cn("h-[56px] bg-white flex items-center justify-between px-4", border && "border-b border-[var(--border)]")}>
      <div className="min-w-0 flex items-center gap-2">{left}</div>
      {title ? <div className="text-[15px] font-semibold truncate">{title}</div> : <div />}
      <div className="flex items-center gap-2">{right}</div>
    </div>
  );
}

function Pill({ children, bg, color, className })
{
  return (
    <span
      className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-[6px] text-xs font-semibold", className)}
      style={{ background: bg, color }}
    >
      {children}
    </span>
  );
}

function Chip({ active, children, onClick, className })
{
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition border",
        active
          ? "bg-[var(--teal)] text-white border-[var(--teal)]"
          : "bg-gray-100 text-[var(--text2)] border-transparent hover:border-gray-200",
        className
      )}
    >
      {children}
    </button>
  );
}

function Button({ variant = "primary", children, onClick, className, disabled })
{
  const base = "h-[52px] px-4 rounded-full font-semibold transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed";
  const styles = {
    primary: "bg-[var(--teal)] text-white hover:brightness-[0.98]",
    outline: "bg-white text-[var(--teal)] border border-[var(--teal)] hover:bg-[var(--tealLight)]",
    amberOutline: "bg-white text-[var(--amber)] border border-[var(--amber)] hover:bg-[var(--amberLight)]",
    ghost: "bg-transparent text-[var(--teal)] hover:bg-[var(--tealLight)]",
    dangerLink: "bg-transparent text-[#991B1B] hover:bg-[#FEE2E2] rounded-full h-auto px-2 py-2",
  };
  return (
    <button disabled={disabled} onClick={onClick} className={cn(base, styles[variant], className)}>
      {children}
    </button>
  );
}

function Input({ value, onChange, placeholder, leftIcon, className, autoFocus, type = "text" })
{
  return (
    <div className={cn("h-[48px] rounded-[8px] bg-gray-100 flex items-center px-3 gap-2", className)}>
      {leftIcon ? <span className="text-gray-500">{leftIcon}</span> : null}
      <input
        autoFocus={autoFocus}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-[15px] placeholder:text-[var(--muted)]"
      />
    </div>
  );
}

function Card({ children, className })
{
  return (
    <div className={cn("bg-white border border-[var(--border)] rounded-[12px] shadow-card", className)}>
      {children}
    </div>
  );
}

function Divider()
{
  return <div className="h-px bg-[var(--border)]" />;
}

/* =======================================================================================
   Patient App State Container
======================================================================================= */
function PatientApp()
{
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  // Quick helper to add a booking after "payment"
  const addBooking = (b) => setBookings((prev) => [b, ...prev]);

  return (
    <PatientContext.Provider value={{ bookings, setBookings, addBooking }}>
      <div className="min-h-[calc(100vh-48px)]">
        <Routes>
          <Route element={<PatientLayout />}>
            <Route path="/" element={<P1Home />} />
            <Route path="/search" element={<P2Search />} />
            <Route path="/bookings" element={<P5Bookings />} />
            <Route path="/profile" element={<P6Profile />} />
            <Route path="/lab/:labId" element={<P3LabDetail />} />
            <Route path="/book/:labId/:testId" element={<P4BookingFlow />} />
          </Route>
        </Routes>
      </div>
    </PatientContext.Provider>
  );
}

const PatientContext = React.createContext(null);
function usePatient()
{
  const ctx = React.useContext(PatientContext);
  if (!ctx) throw new Error("PatientContext missing");
  return ctx;
}

/* Patient layout with bottom tabs */
function PatientLayout()
{
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-[72px]">
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<P1Home />} />
          <Route path="/search" element={<P2Search />} />
          <Route path="/bookings" element={<P5Bookings />} />
          <Route path="/profile" element={<P6Profile />} />
          <Route path="/lab/:labId" element={<P3LabDetail />} />
          <Route path="/book/:labId/:testId" element={<P4BookingFlow />} />
        </Routes>
      </div>

      {/* Bottom Tab Bar: hidden on booking/lab detail (still accessible by back) */}
      <BottomTabs />
    </div>
  );
}

function BottomTabs()
{
  const location = useLocation();
  const hide = location.pathname.startsWith("/lab/") || location.pathname.startsWith("/book/");
  const [bounced, setBounced] = useState("");

  if (hide) return null;

  const tabs = [
    { to: "/", label: "Home", icon: Home },
    { to: "/search", label: "Search", icon: Search },
    { to: "/bookings", label: "Bookings", icon: Calendar },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center">
      <div className="w-full max-w-[430px] bg-white border-t border-[var(--border)] h-[64px] px-2 flex items-center justify-around">
        {tabs.map((t) =>
        {
          const active = location.pathname === t.to;
          const Icon = t.icon;
          return (
            <NavLink
              key={t.to}
              to={t.to}
              onClick={() =>
              {
                setBounced(t.to);
                setTimeout(() => setBounced(""), 320);
              }}
              className="flex flex-col items-center justify-center w-1/4"
            >
              <div className={cn("relative flex flex-col items-center", bounced === t.to ? "tab-bounce" : "")}>
                <Icon size={22} className={active ? "text-[var(--teal)]" : "text-gray-400"} />
                <div className={cn("text-[11px] mt-1 font-semibold", active ? "text-[var(--teal)]" : "text-gray-400")}>
                  {t.label}
                </div>
                {active ? <div className="absolute -bottom-2 w-1.5 h-1.5 bg-[var(--teal)] rounded-full" /> : null}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

/* =======================================================================================
   PATIENT SCREENS
======================================================================================= */

/* SCREEN P1: HOME */
function P1Home()
{
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const heroRef = useRef(null);

  const banners = [
    {
      bg: "bg-[var(--tealLight)]",
      leftBorder: "border-l-4 border-[var(--teal)]",
      tag: (
        <Pill bg="var(--amberLight)" color="var(--amberDark)" className="offer-pulse">
          🔥 Summer Special
        </Pill>
      ),
      title: "CBC + ESR only ₹450",
      subtitle: "SunLife Diagnostics · 1.2 km away",
      cta: { text: "Book Now →", color: "text-[var(--teal)]", onClick: () => navigate("/lab/1") },
    },
    {
      bg: "bg-[var(--amberLight)]",
      leftBorder: "border-l-4 border-[var(--amber)]",
      tag: <Pill bg="white" color="var(--amberDark)">NABL Lab</Pill>,
      title: "NABL Special — 10% off all tests",
      subtitle: "MedPlus Diagnostics · 3.4 km away",
      cta: { text: "Explore →", color: "text-[var(--amber)]", onClick: () => navigate("/lab/3") },
    },
  ];

  // auto-rotate every 4s
  useEffect(() =>
  {
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % banners.length), 4000);
    return () => clearInterval(id);
  }, []);

  // swipeable
  useEffect(() =>
  {
    const el = heroRef.current;
    if (!el) return;

    let startX = 0;
    let dragging = false;

    const onDown = (e) =>
    {
      dragging = true;
      startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    };
    const onUp = (e) =>
    {
      if (!dragging) return;
      dragging = false;
      const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
      const dx = endX - startX;
      if (Math.abs(dx) > 40)
      {
        setHeroIndex((i) => (dx < 0 ? (i + 1) % banners.length : (i - 1 + banners.length) % banners.length));
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchend", onUp);

    return () =>
    {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchend", onUp);
    };
  }, []);

  const chips = ["CBC", "X-Ray", "Thyroid", "Vitamin D", "Lipid Profile", "Urine", "Blood Sugar"];

  return (
    <div>
      <TopBar
        left={
          <button className="bg-[var(--teal)] text-white px-3 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <span>📍 {USER_PROFILE.location}</span>
            <ChevronRight size={16} className="-rotate-90 opacity-90" />
          </button>
        }
        right={
          <>
            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              <Bell size={18} className="text-gray-700" />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-[var(--tealLight)] text-[var(--tealDark)] font-bold flex items-center justify-center"
              onClick={() => (window.location.href = "/profile")}
              title="Profile"
            >
              {USER_PROFILE.initials}
            </button>
          </>
        }
      />

      <div className="px-4 pt-4">
        {/* HERO CAROUSEL */}
        <div ref={heroRef} className="select-none">
          <div className={cn("rounded-[12px] border border-[var(--border)] shadow-card p-4", banners[heroIndex].bg, banners[heroIndex].leftBorder)}>
            <div className="flex items-center justify-between">
              {banners[heroIndex].tag}
              <Pill bg="white" color="var(--text2)">
                <Sparkles size={14} /> ऑफर उपलब्ध
              </Pill>
            </div>
            <div className="mt-3 text-[18px] font-extrabold text-[var(--text)]">{banners[heroIndex].title}</div>
            <div className="mt-1 text-sm text-[var(--text2)]">{banners[heroIndex].subtitle}</div>
            <button onClick={banners[heroIndex].cta.onClick} className={cn("mt-3 text-sm font-bold", banners[heroIndex].cta.color)}>
              {banners[heroIndex].cta.text}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={cn("h-2 rounded-full transition-all", i === heroIndex ? "w-6 bg-[var(--teal)]" : "w-2 bg-gray-300")}
                aria-label={`Banner ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* QUICK SEARCH CHIPS */}
        <div className="mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {chips.map((c) => (
              <Chip
                key={c}
                active={false}
                onClick={() =>
                {
                  // navigate to search with query
                  window.location.href = `/search?q=${encodeURIComponent(c)}`;
                }}
              >
                {c}
              </Chip>
            ))}
          </div>
        </div>

        {/* SECTION HEADER */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-[15px] font-extrabold">आपके पास की लैब्स</div>
            <div className="text-xs text-[var(--text2)]">Compare price, distance & NABL</div>
          </div>
          <button
            className="text-sm font-bold text-[var(--teal)]"
            onClick={() => (window.location.href = "/search")}
          >
            See all →
          </button>
        </div>

        {/* LAB CARDS */}
        <div className="mt-3 space-y-3 pb-6">
          {LABS.slice(0, 3).map((lab) => (
            <LabCard key={lab.id} lab={lab} onView={() => navigate(`/lab/${lab.id}`)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LabCard({ lab, onView })
{
  const open = isLabOpenNow(lab);
  const samplePrices = pickSamplePrices(lab);

  return (
    <Card className="p-4 transition active:scale-[1.01]">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-extrabold text-[16px] truncate">{lab.name}</div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {lab.nabl ? (
              <Pill bg="#D1FAE5" color="#065F46">
                <ShieldCheck size={14} /> NABL ✓
              </Pill>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Pill bg="var(--tealLight)" color="var(--tealDark)">
          📍 {lab.distance} km
        </Pill>
        <div className="text-sm font-semibold text-[var(--text2)] flex items-center gap-1">
          <Star size={16} className="text-amber-500" />
          {lab.rating} <span className="text-[var(--muted)]">({lab.reviews})</span>
        </div>
        <div className="text-sm font-semibold text-[var(--text2)]">
          {open ? <span className="text-[var(--success)]">Open Now</span> : <span className="text-[#991B1B]">Closed</span>}
        </div>
      </div>

      <div className="mt-3 text-sm text-[var(--text2)]">
        {samplePrices.map((p, idx) => (
          <span key={p.label}>
            <span className="font-semibold text-[var(--text)]">{p.label}</span>{" "}
            <span className="font-extrabold text-[var(--teal)]">{formatINR(p.price)}</span>
            {idx < samplePrices.length - 1 ? <span className="mx-2 text-gray-300">·</span> : null}
          </span>
        ))}
      </div>

      {lab.activeOffer ? (
        <div className="mt-3">
          <Pill bg="var(--amberLight)" color="var(--amberDark)" className="offer-pulse">
            🏷 {lab.activeOffer.title} — {lab.activeOffer.discount}% OFF
          </Pill>
        </div>
      ) : null}

      <div className="mt-4">
        <Button variant="outline" className="w-full h-[48px]" onClick={onView}>
          View Lab →
        </Button>
      </div>
    </Card>
  );
}

function pickSamplePrices(lab)
{
  // Spec: "CBC ₹280 · X-Ray ₹320 · Thyroid ₹480"
  const wanted = ["CBC", "X-Ray", "Thyroid"];
  const out = [];
  for (const w of wanted)
  {
    const t = lab.tests.find((x) => x.name.toLowerCase().includes(w.toLowerCase().replace("-", "")) || x.name.toLowerCase().includes(w.toLowerCase()));
    if (t) out.push({ label: w, price: t.offeredPrice });
  }
  return out.slice(0, 3);
}

/* SCREEN P2: SEARCH & COMPARE */
function P2Search()
{
  const navigate = useNavigate();
  const location = useLocation();
  const initialQ = useMemo(() =>
  {
    const sp = new URLSearchParams(location.search);
    return sp.get("q") || "";
  }, [location.search]);

  const [q, setQ] = useState(initialQ);
  const [distance, setDistance] = useState("Any"); // "5 km" | "10 km" | "Any"
  const [offersOnly, setOffersOnly] = useState(false);
  const [nablOnly, setNablOnly] = useState(false);

  const normalized = q.trim().toLowerCase();

  const foundTests = useMemo(() =>
  {
    if (!normalized) return [];
    // match against any test across labs by substring
    const all = [];
    for (const lab of LABS)
    {
      for (const t of lab.tests)
      {
        if (t.name.toLowerCase().includes(normalized))
        {
          all.push({ lab, test: t });
        }
      }
    }

    // filters
    let filtered = all;
    if (distance !== "Any")
    {
      const max = distance === "5 km" ? 5 : 10;
      filtered = filtered.filter((x) => x.lab.distance <= max);
    }
    if (offersOnly) filtered = filtered.filter((x) => x.test.offeredPrice < x.test.basePrice);
    if (nablOnly) filtered = filtered.filter((x) => x.lab.nabl);

    // Sort cheapest first by offeredPrice
    filtered.sort((a, b) => a.test.offeredPrice - b.test.offeredPrice);

    return filtered;
  }, [normalized, distance, offersOnly, nablOnly]);

  const chosenTestName = foundTests[0]?.test?.name || (normalized ? findTestLabelFromName(q) : "");

  const showEmptyNoSearch = !normalized;
  const showNoResults = normalized && foundTests.length === 0;

  return (
    <div>
      <TopBar
        left={
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronLeft size={18} className="text-gray-700" />
          </button>
        }
        title="Find a Test"
        right={<div />}
      />

      <div className="px-4 py-4 space-y-3">
        <Input
          autoFocus
          value={q}
          onChange={setQ}
          placeholder="टेस्ट खोजें... (CBC, X-Ray)"
          leftIcon={<Search size={18} />}
        />

        {/* FILTER ROW */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["5 km", "10 km", "Any"].map((d) => (
            <Chip key={d} active={distance === d} onClick={() => setDistance(d)}>
              {d}
            </Chip>
          ))}
          <Chip active={offersOnly} onClick={() => setOffersOnly((v) => !v)}>
            Offers Only
          </Chip>
          <Chip active={nablOnly} onClick={() => setNablOnly((v) => !v)}>
            NABL Only
          </Chip>
        </div>

        {/* RESULTS */}
        {showEmptyNoSearch ? (
          <EmptyState
            icon="🧪"
            title="Search for a test to compare prices"
            subtitle="E.g. CBC, X-Ray, Thyroid, Vitamin D"
          />
        ) : showNoResults ? (
          <EmptyState
            icon="🔍"
            title={`No results for '${q}'`}
            subtitle="Try a different test name"
            footer={
              <button className="text-sm font-bold text-[var(--teal)]" onClick={() => setQ("")}>
                Clear search
              </button>
            }
          />
        ) : (
          <div>
            <div className="mt-2">
              <div className="text-[16px] font-extrabold">{chosenTestName}</div>
              <div className="text-sm text-[var(--text2)]">
                Found in {countDistinctLabs(foundTests)} labs near {USER_PROFILE.location.split(",")[0]}
              </div>
            </div>

            <div className="mt-3 space-y-3">
              {foundTests.map((row, idx) => (
                <CompareRow
                  key={`${row.lab.id}-${row.test.id}`}
                  row={row}
                  cheapest={idx === 0}
                  onBook={() => navigate(`/book/${row.lab.id}/${row.test.id}`)}
                  offerText={row.test.offeredPrice < row.test.basePrice && row.lab.activeOffer
                    ? `${row.lab.activeOffer.title} ${row.lab.activeOffer.discount}% off · ends ${row.lab.activeOffer.validUntil.replace(", 2025", "")}`
                    : null}
                />
              ))}

              {/* No labs within radius (empty state) */}
              {normalized && foundTests.length === 0 && distance !== "Any" ? (
                <EmptyState
                  icon="📍"
                  title={`No labs found within ${distance}`}
                  subtitle="Try expanding to 10 km"
                  footer={
                    <button className="text-sm font-bold text-[var(--teal)]" onClick={() => setDistance(distance === "5 km" ? "10 km" : "Any")}>
                      Expand radius →
                    </button>
                  }
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CompareRow({ row, cheapest, onBook, offerText })
{
  const { lab, test } = row;
  const hasOffer = test.offeredPrice < test.basePrice;
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-extrabold truncate">{lab.name}</div>
          <div className="mt-1 flex items-center gap-2 flex-wrap">
            <Pill bg="var(--tealLight)" color="var(--tealDark)">
              {lab.distance} km
            </Pill>
            {lab.nabl ? (
              <Pill bg="#D1FAE5" color="#065F46">
                <ShieldCheck size={14} /> NABL ✓
              </Pill>
            ) : null}
            {cheapest ? (
              <Pill bg="#D1FAE5" color="#065F46">
                Cheapest
              </Pill>
            ) : null}
          </div>
        </div>

        <div className="text-right">
          {hasOffer ? (
            <div>
              <div className="text-sm text-gray-400 line-through font-semibold">{formatINR(test.basePrice)}</div>
              <div className="text-[18px] font-extrabold text-[var(--amber)]">{formatINR(test.offeredPrice)}</div>
            </div>
          ) : (
            <div className="text-[18px] font-extrabold text-[var(--text)]">{formatINR(test.basePrice)}</div>
          )}

          <button onClick={onBook} className="mt-2 px-4 py-2 rounded-full bg-[var(--teal)] text-white font-semibold text-sm">
            Book
          </button>
        </div>
      </div>

      {offerText ? (
        <div className="mt-2 text-xs font-semibold text-[var(--amber)]">{offerText}</div>
      ) : null}
    </Card>
  );
}

function countDistinctLabs(rows)
{
  const s = new Set(rows.map((r) => r.lab.id));
  return s.size;
}

function EmptyState({ icon, title, subtitle, footer })
{
  return (
    <div className="mt-8 text-center px-6">
      <div className="text-5xl">{icon}</div>
      <div className="mt-3 text-[16px] font-extrabold">{title}</div>
      <div className="mt-1 text-sm text-[var(--text2)]">{subtitle}</div>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </div>
  );
}

/* SCREEN P3: LAB DETAIL PAGE */
function P3LabDetail()
{
  const navigate = useNavigate();
  const { labId } = useParams();
  const lab = LABS.find((l) => String(l.id) === String(labId));
  const [filter, setFilter] = useState("");

  if (!lab)
  {
    return (
      <div>
        <TopBar
          left={
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              <ChevronLeft size={18} />
            </button>
          }
          title="Lab"
        />
        <div className="p-4">
          <EmptyState icon="🏥" title="Lab not found" subtitle="Please go back and try again." />
        </div>
      </div>
    );
  }

  const tests = lab.tests.filter((t) => t.name.toLowerCase().includes(filter.trim().toLowerCase()));

  return (
    <div className="pb-[92px]">
      {/* HEADER IMAGE AREA */}
      <div className="relative h-[120px] bg-gradient-to-r from-[var(--teal)] to-[#0F6E56]">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/15 border border-white/20 text-white flex items-center justify-center"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="h-full flex items-center justify-center px-10 text-center">
          <div className="text-white text-[22px] font-extrabold leading-tight">{lab.name}</div>
        </div>

        <div className="absolute bottom-3 right-3">
          <Pill bg="rgba(255,255,255,0.18)" color="white">
            ★ {lab.rating}
          </Pill>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-3">
        {/* INFO STRIP */}
        <Card className="p-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin size={18} className="text-[var(--teal)] mt-0.5" />
              <div className="text-[var(--text2)]">{lab.address}</div>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[var(--teal)]" />
              <div className="text-[var(--text2)]">
                Open · {lab.openTime} – {lab.closeTime}
              </div>
            </div>
            <button className="flex items-center gap-2 text-left">
              <Phone size={18} className="text-[var(--teal)]" />
              <div className="font-semibold text-[var(--teal)]">{lab.phone}</div>
            </button>

            <div className="pt-2 flex flex-wrap gap-2">
              {lab.nabl ? (
                <Pill bg="#D1FAE5" color="#065F46">
                  <ShieldCheck size={14} /> NABL ✓
                </Pill>
              ) : null}
              {lab.whatsappReports ? (
                <Pill bg="#D1FAE5" color="#065F46">WhatsApp Reports ✓</Pill>
              ) : (
                <Pill bg="#E5E7EB" color="#374151">WhatsApp Reports ✕</Pill>
              )}
              {lab.homeCollection ? (
                <Pill bg="#FEF3C7" color="#92400E">Home Collection</Pill>
              ) : (
                <Pill bg="#E5E7EB" color="#374151">Home Collection ✕</Pill>
              )}
            </div>
          </div>
        </Card>

        {/* ACTIVE OFFERS SECTION */}
        <div>
          <div className="text-[15px] font-extrabold mb-2">Current Offers</div>
          {lab.activeOffer ? (
            <Card className="p-4 bg-[var(--amberLight)] border-[var(--amber)]/20">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-extrabold text-[var(--amberDark)]">{lab.activeOffer.title}</div>
                  <div className="text-sm text-[var(--amberDark)]/80 mt-1">
                    {lab.activeOffer.discount}% OFF · Valid until {lab.activeOffer.validUntil}
                  </div>
                </div>
                <Pill bg="white" color="var(--amberDark)" className="offer-pulse">
                  ऑफर उपलब्ध
                </Pill>
              </div>
            </Card>
          ) : (
            <div className="text-sm text-[var(--amber)]/70 font-semibold">
              No active offers right now. Check back soon!
            </div>
          )}
        </div>

        {/* TEST CATALOGUE */}
        <div>
          <div className="flex items-end justify-between gap-3">
            <div className="text-[15px] font-extrabold">All Tests</div>
            <div className="text-xs text-[var(--text2)]">{tests.length} items</div>
          </div>

          <div className="mt-2">
            <Input value={filter} onChange={setFilter} placeholder="Filter tests..." leftIcon={<Search size={18} />} />
          </div>

          <Card className="mt-3 overflow-hidden">
            {tests.map((t, idx) => (
              <div key={t.id}>
                <div className="px-4 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-bold text-[14px] truncate">{t.name}</div>
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      <Pill bg="#F3F4F6" color="#374151">{t.category}</Pill>
                      <span className="text-xs text-[var(--text2)] flex items-center gap-1">
                        <Clock size={14} /> {t.duration}
                      </span>
                      <span className="text-xs text-[var(--text2)]">• {t.sampleType}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {t.offeredPrice < t.basePrice ? (
                      <div>
                        <div className="text-xs text-gray-400 line-through font-semibold">{formatINR(t.basePrice)}</div>
                        <div className="font-extrabold text-[var(--amber)]">{formatINR(t.offeredPrice)}</div>
                      </div>
                    ) : (
                      <div className="font-extrabold text-[var(--teal)]">{formatINR(t.basePrice)}</div>
                    )}

                    <button
                      onClick={() => (window.location.href = `/book/${lab.id}/${t.id}`)}
                      className="mt-2 px-3 py-1.5 rounded-full bg-[var(--teal)] text-white text-xs font-bold"
                    >
                      Book
                    </button>
                  </div>
                </div>
                {idx < tests.length - 1 ? <Divider /> : null}
              </div>
            ))}
          </Card>
        </div>

        {/* REVIEWS */}
        <div className="pt-2">
          <div className="text-[15px] font-extrabold">Patient Reviews</div>
          <div className="text-sm text-[var(--text2)] mt-1">
            ★ {lab.rating} / 5 · {lab.reviews} reviews
          </div>

          <div className="mt-3 space-y-2">
            {[
              { name: "Anjali", rating: 5, text: "Fast reporting and polite staff. Good pricing too." },
              { name: "Rohit", rating: 4, text: "Clean lab. रिपोर्ट समय पर मिली।" },
              { name: "Seema", rating: 4, text: "Convenient location, easy booking from app." },
            ].map((r, i) => (
              <Card key={i} className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--tealLight)] text-[var(--tealDark)] font-extrabold flex items-center justify-center">
                    {r.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-bold">{r.name}</div>
                      <div className="text-xs text-amber-600 font-extrabold flex items-center gap-1">
                        <Star size={14} /> {r.rating}
                      </div>
                    </div>
                    <div className="text-sm text-[var(--text2)] mt-1">{r.text}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-t border-[var(--border)] p-3">
          <Button className="w-full h-[52px]" onClick={() => alert("Tip: Tap a specific test's Book button for the full flow.")}>
            Book a Test at {lab.name}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* SCREEN P4: BOOKING FLOW (3 steps) */
function P4BookingFlow()
{
  const navigate = useNavigate();
  const { labId, testId } = useParams();
  const { addBooking } = usePatient();

  const lab = LABS.find((l) => String(l.id) === String(labId));
  const test = lab?.tests.find((t) => String(t.id) === String(testId));

  const [step, setStep] = useState(1); // 1 select, 2 pay, 3 done
  const [selectedDay, setSelectedDay] = useState(0);
  const [slot, setSlot] = useState("8:00 AM – 10:00 AM");
  const [name, setName] = useState(USER_PROFILE.name);
  const [phone, setPhone] = useState(USER_PROFILE.phone);
  const [upi, setUpi] = useState("");

  // derive 7 days
  const days = useMemo(() =>
  {
    const now = new Date(2025, 5, 5); // fixed to match sample booking date vibe (Jun 2025)
    const arr = [];
    for (let i = 0; i < 7; i++)
    {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const day = d.toLocaleDateString("en-US", { weekday: "short" });
      const date = d.getDate();
      arr.push({ day, date, label: `${day} ${date}` });
    }
    return arr;
  }, []);

  const platformFee = 10;

  if (!lab || !test)
  {
    return (
      <div>
        <TopBar
          left={
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              <ChevronLeft size={18} />
            </button>
          }
          title="Booking"
        />
        <div className="p-4">
          <EmptyState icon="🧾" title="Booking item not found" subtitle="Please go back and select again." />
        </div>
      </div>
    );
  }

  const base = test.basePrice;
  const offered = test.offeredPrice;
  const discount = Math.max(0, base - offered);
  const total = offered + platformFee;

  const bookingId = "LBD-2025-0041"; // match sample

  const stepLabels = ["Select", "Pay", "Done"];

  return (
    <div>
      <TopBar
        left={
          <button onClick={() => (step === 1 ? navigate(-1) : setStep((s) => s - 1))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronLeft size={18} />
          </button>
        }
        title="Booking"
        right={<div className="text-xs font-bold text-[var(--text2)]">{stepLabels[step - 1]}</div>}
      />

      <div className="px-4 py-4">
        <BookingSteps step={step} />

        {step === 1 ? (
          <div className="mt-4 space-y-4">
            <Card className="p-4">
              <div className="font-extrabold">{test.name}</div>
              <div className="text-sm text-[var(--text2)] mt-1">{lab.name}</div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-[18px] font-extrabold text-[var(--teal)]">{formatINR(offered)}</div>
                {offered < base ? (
                  <div className="text-sm text-gray-400 line-through font-semibold">{formatINR(base)}</div>
                ) : null}
              </div>
            </Card>

            <div>
              <div className="text-sm font-extrabold mb-2">Select Date</div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {days.map((d, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDay(idx)}
                    className={cn(
                      "w-14 h-14 rounded-full flex flex-col items-center justify-center shrink-0 border transition",
                      idx === selectedDay ? "bg-[var(--teal)] text-white border-[var(--teal)]" : "bg-gray-100 text-[var(--text2)] border-transparent"
                    )}
                  >
                    <div className="text-xs font-bold">{d.day}</div>
                    <div className="text-sm font-extrabold">{d.date}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-extrabold mb-2">Select Time Slot</div>
              <div className="flex gap-2 flex-wrap">
                {["7:00 AM – 9:00 AM", "8:00 AM – 10:00 AM", "10:00 AM – 12:00 PM", "2:00 PM – 5:00 PM"].map((s) => (
                  <Chip key={s} active={slot === s} onClick={() => setSlot(s)}>
                    {s.replace(":00", "")}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm font-extrabold mb-2">Patient Name</div>
                <Input value={name} onChange={setName} placeholder="Patient Name" />
              </div>
              <div>
                <div className="text-sm font-extrabold mb-2">Phone Number</div>
                <Input value={phone} onChange={setPhone} placeholder="+91..." />
              </div>
            </div>

            <Button className="w-full" onClick={() => setStep(2)}>
              Continue to Payment
            </Button>
          </div>
        ) : step === 2 ? (
          <div className="mt-4 space-y-4">
            <Card className="p-4">
              <div className="font-extrabold">Order summary</div>
              <div className="mt-3 space-y-2 text-sm">
                <Row label="Lab" value={lab.name} />
                <Row label="Test" value={test.name.split(" (")[0]} />
                <Row label="Date/Slot" value={`${days[selectedDay].label} · ${slot.replace(":00", "")}`} />
                <Divider />
                <Row label="Base price" value={formatINR(base)} />
                <Row label="Discount" value={`- ${formatINR(discount)}`} valueClass="text-[var(--success)] font-extrabold" />
                <Row label="Platform fee" value={formatINR(platformFee)} />
                <Divider />
                <Row label="TOTAL" value={formatINR(total)} valueClass="font-extrabold" />
              </div>
            </Card>

            <div>
              <div className="text-sm font-extrabold mb-2">Pay with</div>
              <div className="flex gap-2">
                <Chip active={true}>UPI</Chip>
                <Chip active={false}>Card</Chip>
                <Chip active={false}>Net Banking</Chip>
              </div>
            </div>

            <div>
              <Input value={upi} onChange={setUpi} placeholder="Enter UPI ID or mobile number" leftIcon={<IndianRupee size={18} />} />
            </div>

            <Button
              className="w-full"
              onClick={() =>
              {
                // Simulate success and add booking
                const newBooking = {
                  id: bookingId,
                  labName: lab.name,
                  testName: test.name,
                  date: `Wed, 5 Jun 2025`,
                  slot,
                  amountPaid: total,
                  status: "confirmed",
                  reportUrl: null,
                };
                addBooking(newBooking);
                setStep(3);
              }}
            >
              Pay {formatINR(total)} Securely
            </Button>

            <div className="text-center text-xs text-[var(--text2)] flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-gray-400" />
              Powered by Razorpay
            </div>
          </div>
        ) : (
          <div className="mt-6 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-[var(--tealLight)] flex items-center justify-center pop-in">
              <CheckCircle2 size={44} className="text-[var(--teal)]" />
            </div>
            <div className="mt-4 text-[20px] font-extrabold">बुकिंग हो गई! ✓</div>
            <div className="mt-2">
              <Pill bg="#F3F4F6" color="#374151" className="font-mono">
                {bookingId}
              </Pill>
            </div>

            <Card className="mt-5 p-4 text-left">
              <Row label="Lab" value={lab.name} />
              <Row label="Test" value={test.name.split(" (")[0]} />
              <Row label="Slot" value={`Wed 5 Jun · ${slot.replace(":00", "")}`} />
              <Row label="Paid" value={formatINR(total)} valueClass="font-extrabold" />
            </Card>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-[48px]" onClick={() => alert("Calendar event added (demo).")}>
                Add to Calendar
              </Button>
              <button
                onClick={() => alert("Shared on WhatsApp (demo).")}
                className="h-[48px] rounded-full bg-[#22C55E] text-white font-semibold"
              >
                Share on WhatsApp
              </button>
            </div>

            <button className="mt-4 text-sm font-extrabold text-[var(--teal)]" onClick={() => navigate("/bookings")}>
              View My Bookings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function BookingSteps({ step })
{
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-bold text-[var(--text2)]">
        <span className={step === 1 ? "text-[var(--teal)]" : ""}>Select</span>
        <span className={step === 2 ? "text-[var(--teal)]" : ""}>Pay</span>
        <span className={step === 3 ? "text-[var(--teal)]" : ""}>Done</span>
      </div>
      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--teal)] transition-all duration-500"
          style={{ width: `${step === 1 ? 33 : step === 2 ? 66 : 100}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-center gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className={cn("w-2.5 h-2.5 rounded-full", i <= step ? "bg-[var(--teal)]" : "bg-gray-300")} />
        ))}
      </div>
    </div>
  );
}

function Row({ label, value, valueClass })
{
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-[var(--text2)] font-semibold">{label}</div>
      <div className={cn("text-right font-semibold text-[var(--text)]", valueClass)}>{value}</div>
    </div>
  );
}

/* SCREEN P5: MY BOOKINGS */
function P5Bookings()
{
  const { bookings, setBookings } = usePatient();
  const [tab, setTab] = useState("Upcoming"); // Upcoming | Completed | Cancelled

  const filtered = useMemo(() =>
  {
    if (tab === "Upcoming") return bookings.filter((b) => ["confirmed", "sample_collected"].includes(b.status));
    if (tab === "Completed") return bookings.filter((b) => ["completed", "report_ready"].includes(b.status));
    return bookings.filter((b) => b.status === "cancelled");
  }, [bookings, tab]);

  return (
    <div>
      <TopBar title="My Bookings" />

      <div className="px-4 pt-3">
        <div className="flex gap-5 border-b border-[var(--border)]">
          {["Upcoming", "Completed", "Cancelled"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "pb-3 text-sm font-extrabold",
                tab === t ? "text-[var(--teal)] border-b-2 border-[var(--teal)]" : "text-[var(--text2)]"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="py-4 space-y-3">
          {tab === "Cancelled" && filtered.length === 0 ? (
            <EmptyState icon="📅" title="No cancelled bookings" subtitle="You’re all set." />
          ) : tab === "Upcoming" && filtered.length === 0 ? (
            <EmptyState
              icon="🗓️"
              title="No upcoming bookings"
              subtitle="Find a test near you →"
              footer={
                <Button className="w-full" onClick={() => (window.location.href = "/search")}>
                  Find a test near you →
                </Button>
              }
            />
          ) : (
            filtered.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                onCancel={() =>
                {
                  setBookings((prev) =>
                    prev.map((x) => (x.id === b.id ? { ...x, status: "cancelled" } : x))
                  );
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function BookingCard({ booking, onCancel })
{
  const pill = getStatusPill(booking.status);

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-extrabold truncate">{booking.labName}</div>
          <div className="text-sm text-[var(--text2)] mt-1">{booking.testName}</div>
        </div>

        <Pill bg={pill.bg} color={pill.text}>
          {booking.status === "report_ready" ? "रिपोर्ट तैयार है" : pill.label}
        </Pill>
      </div>

      <div className="mt-3 text-sm text-[var(--text2)] flex flex-wrap gap-2">
        <span className="font-semibold text-[var(--text)]">{booking.date}</span>
        <span className="text-gray-300">•</span>
        <span>{booking.slot}</span>
        <span className="text-gray-300">•</span>
        <span className="font-extrabold text-[var(--text)]">{formatINR(booking.amountPaid)}</span>
      </div>

      {booking.status === "report_ready" ? (
        <div className="mt-3">
          <Button
            variant="outline"
            className="w-full h-[48px]"
            onClick={() => alert("Downloading report (demo).")}
          >
            📄 Download Report PDF
          </Button>
        </div>
      ) : booking.status === "confirmed" ? (
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-[var(--text2)]">
            Your report is being processed. We'll notify you on WhatsApp when it's ready.
          </div>
          <button onClick={onCancel} className="text-sm font-extrabold text-[#991B1B]">
            Cancel Booking
          </button>
        </div>
      ) : null}
    </Card>
  );
}

/* SCREEN P6: PROFILE */
function P6Profile()
{
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-[var(--teal)] px-4 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white text-[var(--teal)] font-extrabold flex items-center justify-center text-lg">
            {USER_PROFILE.initials}
          </div>
          <div className="min-w-0">
            <div className="text-white text-[18px] font-extrabold">{USER_PROFILE.name}</div>
            <div className="text-white/80 text-sm font-semibold mt-0.5">{USER_PROFILE.phone}</div>
          </div>
          <div className="ml-auto">
            <button className="px-3 py-2 rounded-full border border-white/30 text-white text-xs font-bold">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-2">
        {[
          { label: "📋 My Bookings", onClick: () => navigate("/bookings") },
          { label: "🔔 Notifications", onClick: () => alert("Notifications (demo)") },
          { label: "📍 Saved Labs", onClick: () => alert("Saved Labs (demo)") },
          { label: "🌐 Language", badge: "English | हिंदी", onClick: () => alert("Language (demo)") },
          { label: "❓ Help & Support", onClick: () => alert("Support (demo)") },
          { label: "📄 Terms & Privacy", onClick: () => alert("Terms (demo)") },
        ].map((item, idx) => (
          <Card key={idx} className="px-4 py-3">
            <button onClick={item.onClick} className="w-full flex items-center justify-between">
              <div className="font-extrabold text-[14px] text-left">{item.label}</div>
              <div className="flex items-center gap-2">
                {item.badge ? (
                  <Pill bg="#F3F4F6" color="#374151">{item.badge}</Pill>
                ) : null}
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </button>
          </Card>
        ))}

        <Card className="px-4 py-3">
          <button
            onClick={() => alert("Logged out (demo)")}
            className="w-full flex items-center justify-between"
          >
            <div className="font-extrabold text-[14px] text-[#D85A30]">🚪 Logout</div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </Card>
      </div>
    </div>
  );
}

/* =======================================================================================
   LAB OWNER DASHBOARD (Mode B)
======================================================================================= */
function LabOwnerDashboard()
{
  const location = useLocation();
  const navigate = useNavigate();

  // Dashboard states
  const [pending, setPending] = useState(LAB_DASHBOARD_DATA.pendingBookings);
  const [offers, setOffers] = useState([
    {
      id: "OFF-1",
      title: "Summer Special",
      appliesTo: ["CBC", "X-Ray", "Thyroid", "+4 more"],
      discountType: "percent",
      discountValue: 20,
      validFrom: "Jun 1, 2025",
      validUntil: "Jun 30, 2025",
      active: true,
    },
    {
      id: "OFF-2",
      title: "NABL Loyalty Pack",
      appliesTo: ["All tests"],
      discountType: "percent",
      discountValue: 10,
      validFrom: "Jul 1, 2025",
      validUntil: "Jul 31, 2025",
      active: true,
    },
  ]);

  const [tests, setTests] = useState(() =>
  {
    const sunlife = LABS.find((l) => l.name === "SunLife Diagnostics");
    return (sunlife?.tests || []).map((t) => ({
      ...t,
      yourPrice: t.offeredPrice,
      available: true,
    }));
  });

  const tabs = [
    { to: "/lab/overview", label: "Overview", icon: LayoutDashboard },
    { to: "/lab/offers", label: "Manage Offers", icon: BadgePercent },
    { to: "/lab/catalogue", label: "Test Catalogue", icon: TestTube2 },
    { to: "/lab/reports", label: "Upload Reports", icon: Upload },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header bar */}
      <div className="h-[56px] bg-[var(--tealDark)] text-white flex items-center px-4 justify-between">
        <div className="flex items-center gap-2 font-extrabold">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <TestTube2 size={18} />
          </div>
          <div>
            <div className="leading-none">LabDeals</div>
            <div className="text-[11px] text-white/70 font-semibold leading-none mt-1">
              {LAB_DASHBOARD_DATA.labName}
            </div>
          </div>
        </div>
        <button className="text-xs font-bold px-3 py-2 rounded-full bg-white/10 border border-white/15">
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="md:flex">
          {/* Sidebar (tablet/desktop) */}
          <div className="hidden md:block md:w-[260px] p-4">
            <Card className="p-2">
              {tabs.map((t) =>
              {
                const active = location.pathname === t.to;
                const Icon = t.icon;
                return (
                  <button
                    key={t.to}
                    onClick={() => navigate(t.to)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-[10px] font-extrabold text-sm",
                      active ? "bg-[var(--teal)] text-white" : "text-[var(--text2)] hover:bg-gray-50"
                    )}
                  >
                    <Icon size={18} />
                    {t.label}
                  </button>
                );
              })}
            </Card>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            {/* Mobile top tabs */}
            <div className="md:hidden mb-3">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {tabs.map((t) => (
                  <Chip key={t.to} active={location.pathname === t.to} onClick={() => navigate(t.to)}>
                    {t.label}
                  </Chip>
                ))}
              </div>
            </div>

            <Routes>
              <Route
                path="/lab/overview"
                element={<L1Overview pending={pending} setPending={setPending} />}
              />
              <Route
                path="/lab/offers"
                element={<L2Offers offers={offers} setOffers={setOffers} tests={tests} />}
              />
              <Route
                path="/lab/catalogue"
                element={<L3Catalogue tests={tests} setTests={setTests} />}
              />
              <Route
                path="/lab/reports"
                element={<L4Reports pending={pending} setPending={setPending} />}
              />
              <Route path="*" element={<L1Overview pending={pending} setPending={setPending} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

/* L1: Overview */
function L1Overview({ pending, setPending })
{
  const metrics = [
    { label: "Today's Bookings", value: LAB_DASHBOARD_DATA.todayBookings, tone: "bg-[#DBEAFE] text-[#1E40AF]" },
    { label: "This Week Revenue", value: formatINR(LAB_DASHBOARD_DATA.weekRevenue), tone: "bg-[var(--tealLight)] text-[var(--tealDark)]" },
    { label: "Active Offers", value: LAB_DASHBOARD_DATA.activeOffers, tone: "bg-[var(--amberLight)] text-[var(--amberDark)]" },
    { label: "Average Rating", value: `★ ${LAB_DASHBOARD_DATA.rating}`, tone: "bg-[#FEF3C7] text-[#92400E]" },
  ];

  const week = [
    { d: "Mon", v: 30 },
    { d: "Tue", v: 45 },
    { d: "Wed", v: 60 },
    { d: "Thu", v: 50 },
    { d: "Fri", v: 70 },
    { d: "Sat", v: 40 },
    { d: "Sun", v: 55 },
  ];
  const todayIndex = 4;

  return (
    <div className="space-y-4">
      <div className="text-[18px] font-extrabold">Dashboard Overview</div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <Card key={m.label} className="p-4">
            <div className={cn("inline-flex px-2 py-1 rounded-[8px] text-xs font-extrabold", m.tone)}>
              {m.label}
            </div>
            <div className="mt-3 text-[22px] font-extrabold">{m.value}</div>
          </Card>
        ))}
      </div>

      {/* Today's bookings table */}
      <Card className="p-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[16px] font-extrabold">Today's Bookings</div>
            <div className="text-sm text-[var(--text2)]">Wed, 5 Jun 2025</div>
          </div>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--text2)]">
                <th className="py-2">Patient</th>
                <th className="py-2">Test</th>
                <th className="py-2">Slot</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((r) =>
              {
                const pill = getStatusPill(r.status);
                return (
                  <tr key={r.id} className="border-t border-[var(--border)]">
                    <td className="py-3 font-semibold">{r.patient}</td>
                    <td className="py-3">{r.test}</td>
                    <td className="py-3">{r.slot}</td>
                    <td className="py-3">
                      <Pill bg={pill.bg} color={pill.text}>
                        {pill.label}
                      </Pill>
                    </td>
                    <td className="py-3">
                      {r.status === "pending" ? (
                        <Button
                          variant="outline"
                          className="h-[36px] px-3 text-xs"
                          onClick={() =>
                            setPending((prev) =>
                              prev.map((x) => (x.id === r.id ? { ...x, status: "collected" } : x))
                            )
                          }
                        >
                          Mark Collected
                        </Button>
                      ) : (
                        <Button
                          variant="amberOutline"
                          className="h-[36px] px-3 text-xs"
                          onClick={() => alert("Go to Upload Reports tab to upload PDF (demo).")}
                        >
                          Upload Report
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Revenue bar chart */}
      <Card className="p-4">
        <div className="text-[16px] font-extrabold">Revenue This Week</div>
        <div className="text-sm text-[var(--text2)] mt-1">Simple CSS chart (demo)</div>

        <div className="mt-4 grid grid-cols-7 gap-2 items-end h-[140px]">
          {week.map((x, i) => (
            <div key={x.d} className="flex flex-col items-center gap-2">
              <div
                className={cn("w-full rounded-[8px] transition-all", i === todayIndex ? "bg-[var(--teal)]" : "bg-[var(--teal)]/50")}
                style={{ height: `${clamp(x.v, 10, 100)}%` }}
                title={`${x.d}: ${x.v}`}
              />
              <div className="text-xs font-bold text-[var(--text2)]">{x.d}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* L2: Manage Offers */
function L2Offers({ offers, setOffers, tests })
{
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    testNames: [],
    discountType: "percent",
    discountValue: 20,
    validFrom: "2025-06-01",
    validUntil: "2025-06-30",
    active: true,
  });

  const allTestNames = tests.map((t) => t.name);

  const preview = useMemo(() =>
  {
    const example = tests[0];
    if (!example) return null;
    const base = example.yourPrice;
    let final = base;
    if (form.discountType === "percent") final = Math.round(base * (1 - form.discountValue / 100));
    else final = Math.max(0, base - form.discountValue);
    return { base, final };
  }, [form.discountType, form.discountValue, tests]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[18px] font-extrabold">Active Offers</div>
          <div className="text-sm text-[var(--text2)]">Create, edit and control visibility</div>
        </div>
        <Button className="h-[44px]" onClick={() => setOpen(true)}>
          + Create New Offer
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {offers.map((o) => (
          <Card key={o.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-extrabold text-[16px]">{o.title}</div>
                <div className="text-sm text-[var(--text2)] mt-1">
                  Applies to: <span className="font-semibold">{o.appliesTo.join(", ")}</span>
                </div>
              </div>
              <Pill bg={o.active ? "#D1FAE5" : "#E5E7EB"} color={o.active ? "#065F46" : "#374151"}>
                {o.active ? "Active" : "Inactive"}
              </Pill>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <Pill bg="var(--amberLight)" color="var(--amberDark)">
                {o.discountType === "percent" ? `${o.discountValue}% OFF` : `${formatINR(o.discountValue)} OFF`}
              </Pill>
              <div className="text-[var(--text2)] font-semibold">
                {o.validFrom} – {o.validUntil}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                className="h-[40px] px-4 text-sm"
                onClick={() => alert("Edit (demo): open Create modal and adjust fields.")}
              >
                Edit
              </Button>
              <Button
                variant="amberOutline"
                className="h-[40px] px-4 text-sm"
                onClick={() => setOffers((prev) => prev.map((x) => (x.id === o.id ? { ...x, active: !x.active } : x)))}
              >
                {o.active ? "Deactivate" : "Activate"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create offer modal */}
      {open ? (
        <Modal title="Create Offer" onClose={() => setOpen(false)}>
          <div className="space-y-3">
            <div>
              <div className="text-sm font-extrabold mb-2">Offer Title</div>
              <Input value={form.title} onChange={(v) => setForm((p) => ({ ...p, title: v }))} placeholder="e.g. Summer Special" />
            </div>

            <div>
              <div className="text-sm font-extrabold mb-2">Select Test(s)</div>
              <div className="max-h-40 overflow-auto border border-[var(--border)] rounded-[12px] p-2 bg-white">
                {allTestNames.map((n) =>
                {
                  const checked = form.testNames.includes(n);
                  return (
                    <label key={n} className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                        {
                          setForm((p) => ({
                            ...p,
                            testNames: e.target.checked ? [...p.testNames, n] : p.testNames.filter((x) => x !== n),
                          }));
                        }}
                      />
                      <span className="text-sm font-semibold">{n}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-sm font-extrabold mb-2">Discount Type</div>
              <div className="flex gap-2">
                <Chip active={form.discountType === "percent"} onClick={() => setForm((p) => ({ ...p, discountType: "percent" }))}>
                  % Percentage
                </Chip>
                <Chip active={form.discountType === "flat"} onClick={() => setForm((p) => ({ ...p, discountType: "flat" }))}>
                  ₹ Flat Price
                </Chip>
              </div>
            </div>

            <div>
              <div className="text-sm font-extrabold mb-2">Discount Value</div>
              <Input
                type="number"
                value={String(form.discountValue)}
                onChange={(v) => setForm((p) => ({ ...p, discountValue: Number(v || 0) }))}
                placeholder={form.discountType === "percent" ? "e.g. 20 for 20%" : "e.g. 50 for ₹50 off"}
              />
            </div>

            {preview ? (
              <Card className="p-3 bg-[var(--amberLight)] border-[var(--amber)]/20">
                <div className="text-sm font-extrabold text-[var(--amberDark)]">Final Price Preview</div>
                <div className="text-sm text-[var(--amberDark)]/80 mt-1 font-semibold">
                  Patients will pay <span className="font-extrabold">{formatINR(preview.final)}</span> instead of{" "}
                  <span className="line-through">{formatINR(preview.base)}</span>
                </div>
              </Card>
            ) : null}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-sm font-extrabold mb-2">Valid From</div>
                <Input value={form.validFrom} onChange={(v) => setForm((p) => ({ ...p, validFrom: v }))} placeholder="YYYY-MM-DD" />
              </div>
              <div>
                <div className="text-sm font-extrabold mb-2">Valid Until</div>
                <Input value={form.validUntil} onChange={(v) => setForm((p) => ({ ...p, validUntil: v }))} placeholder="YYYY-MM-DD" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm font-extrabold">Status</div>
              <button
                onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
                className={cn(
                  "px-3 py-2 rounded-full text-xs font-extrabold border",
                  form.active ? "bg-[#D1FAE5] text-[#065F46] border-[#D1FAE5]" : "bg-[#E5E7EB] text-[#374151] border-[#E5E7EB]"
                )}
              >
                {form.active ? "Active" : "Inactive"}
              </button>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="w-1/2 h-[44px]" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                className="w-1/2 h-[44px]"
                onClick={() =>
                {
                  const newOffer = {
                    id: `OFF-${offers.length + 1}`,
                    title: form.title || "New Offer",
                    appliesTo: form.testNames.length ? compressAppliesTo(form.testNames) : ["All tests"],
                    discountType: form.discountType,
                    discountValue: form.discountValue,
                    validFrom: form.validFrom,
                    validUntil: form.validUntil,
                    active: form.active,
                  };
                  setOffers((prev) => [newOffer, ...prev]);
                  setOpen(false);
                }}
              >
                Save Offer
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

function compressAppliesTo(names)
{
  if (names.length <= 4) return names;
  return [...names.slice(0, 3), `+${names.length - 3} more`];
}

/* L3: Test Catalogue & Pricing */
function L3Catalogue({ tests, setTests })
{
  const [addOpen, setAddOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newTest, setNewTest] = useState({
    name: "CRP (C-Reactive Protein)",
    category: "Biochemistry",
    yourPrice: 450,
    sampleType: "Blood",
    duration: "Next day",
    available: true,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[18px] font-extrabold">My Test Catalogue</div>
          <div className="text-sm text-[var(--text2)]">Inline pricing & availability</div>
        </div>
        <Button className="h-[44px]" onClick={() => setAddOpen(true)}>
          + Add New Test
        </Button>
      </div>

      <Card className="p-4 overflow-x-auto">
        <table className="w-full text-sm min-w-[760px]">
          <thead>
            <tr className="text-left text-[var(--text2)]">
              <th className="py-2">Test Name</th>
              <th className="py-2">Category</th>
              <th className="py-2">Your Price</th>
              <th className="py-2">Available</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((t) => (
              <tr key={t.id} className="border-t border-[var(--border)]">
                <td className="py-3 font-semibold">{t.name}</td>
                <td className="py-3">
                  <Pill bg="#F3F4F6" color="#374151">{t.category}</Pill>
                </td>
                <td className="py-3">
                  {editingId === t.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        className="h-9 w-28 rounded-[8px] bg-gray-100 px-2 outline-none font-semibold"
                        value={t.yourPrice}
                        onChange={(e) =>
                          setTests((prev) =>
                            prev.map((x) => (x.id === t.id ? { ...x, yourPrice: Number(e.target.value || 0) } : x))
                          )
                        }
                      />
                      <button
                        className="text-xs font-extrabold text-[var(--teal)]"
                        onClick={() => setEditingId(null)}
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingId(t.id)}
                      className="font-extrabold text-[var(--teal)] hover:underline"
                      title="Click to edit"
                    >
                      {formatINR(t.yourPrice)}
                    </button>
                  )}
                </td>
                <td className="py-3">
                  <button
                    onClick={() => setTests((prev) => prev.map((x) => (x.id === t.id ? { ...x, available: !x.available } : x)))}
                    className={cn(
                      "px-3 py-2 rounded-full text-xs font-extrabold border",
                      t.available ? "bg-[#D1FAE5] text-[#065F46] border-[#D1FAE5]" : "bg-[#FEE2E2] text-[#991B1B] border-[#FEE2E2]"
                    )}
                  >
                    {t.available ? "Available" : "Unavailable"}
                  </button>
                </td>
                <td className="py-3">
                  <button className="inline-flex items-center gap-2 text-xs font-extrabold text-[var(--text2)] hover:text-[var(--text)]">
                    <Settings2 size={16} />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {addOpen ? (
        <Modal title="Add New Test" onClose={() => setAddOpen(false)}>
          <div className="space-y-3">
            <div>
              <div className="text-sm font-extrabold mb-2">Test Name</div>
              <Input value={newTest.name} onChange={(v) => setNewTest((p) => ({ ...p, name: v }))} placeholder="Search standard tests..." />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-sm font-extrabold mb-2">Your Price</div>
                <Input type="number" value={String(newTest.yourPrice)} onChange={(v) => setNewTest((p) => ({ ...p, yourPrice: Number(v || 0) }))} />
              </div>
              <div>
                <div className="text-sm font-extrabold mb-2">Sample Type</div>
                <Input value={newTest.sampleType} onChange={(v) => setNewTest((p) => ({ ...p, sampleType: v }))} placeholder="Blood / Urine / Stool / N/A" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-sm font-extrabold mb-2">Turnaround Time</div>
                <Input value={newTest.duration} onChange={(v) => setNewTest((p) => ({ ...p, duration: v }))} placeholder="Same day / Next day..." />
              </div>
              <div>
                <div className="text-sm font-extrabold mb-2">Available</div>
                <button
                  onClick={() => setNewTest((p) => ({ ...p, available: !p.available }))}
                  className={cn(
                    "w-full h-[48px] rounded-[12px] border font-extrabold",
                    newTest.available ? "bg-[#D1FAE5] text-[#065F46] border-[#D1FAE5]" : "bg-[#FEE2E2] text-[#991B1B] border-[#FEE2E2]"
                  )}
                >
                  {newTest.available ? "Available" : "Unavailable"}
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="w-1/2 h-[44px]" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button
                className="w-1/2 h-[44px]"
                onClick={() =>
                {
                  const id = Math.max(...tests.map((t) => t.id)) + 1;
                  setTests((prev) => [
                    { id, category: newTest.category, basePrice: newTest.yourPrice, offeredPrice: newTest.yourPrice, ...newTest },
                    ...prev,
                  ]);
                  setAddOpen(false);
                }}
              >
                Add Test
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

/* L4: Upload Reports */
function L4Reports({ pending, setPending })
{
  const [uploaded, setUploaded] = useState([]);

  const toUpload = pending.filter((p) => p.status === "collected" && !uploaded.find((u) => u.id === p.id));

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[18px] font-extrabold">Pending Reports</div>
        <div className="text-sm text-[var(--text2)]">Upload PDF reports for collected samples</div>
      </div>

      {toUpload.length === 0 ? (
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={20} className="text-[var(--teal)] mt-0.5" />
            <div>
              <div className="font-extrabold">No pending uploads</div>
              <div className="text-sm text-[var(--text2)] mt-1">All collected samples are up to date.</div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {toUpload.map((b) => (
            <Card key={b.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-extrabold">{b.patient} · {b.id}</div>
                  <div className="text-sm text-[var(--text2)] mt-1">{b.test} · Collected today</div>
                </div>
                <Pill bg="#FEF3C7" color="#92400E">
                  Sample Collected
                </Pill>
              </div>

              <div className="mt-3">
                <label className="inline-flex">
                  <span className="sr-only">Upload Report PDF</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) =>
                    {
                      if (!e.target.files?.[0]) return;
                      setUploaded((prev) => [{ id: b.id, when: "Jun 3", notified: true }, ...prev]);
                      alert("Report uploaded ✓  Patient notified via WhatsApp");
                    }}
                  />
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--teal)] text-white font-semibold cursor-pointer">
                    <FileUp size={16} /> Upload Report PDF
                  </span>
                </label>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="pt-2">
        <div className="text-[16px] font-extrabold">Completed</div>
        <div className="text-sm text-[var(--text2)] mt-1">Uploaded reports</div>

        <div className="mt-3 space-y-2">
          {uploaded.length === 0 ? (
            <div className="text-sm text-[var(--text2)]">No uploads yet.</div>
          ) : (
            uploaded.map((u) => (
              <Card key={u.id} className="p-4 opacity-70">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold">{u.id}</div>
                  <Pill bg="#E5E7EB" color="#374151">
                    Uploaded {u.when} · Notified
                  </Pill>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* Simple Modal */
function Modal({ title, children, onClose })
{
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-end md:items-center justify-center p-3">
      <div className="w-full max-w-xl bg-white rounded-[16px] border border-[var(--border)] shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
          <div className="font-extrabold">{title}</div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <XCircle size={18} className="text-gray-600" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
