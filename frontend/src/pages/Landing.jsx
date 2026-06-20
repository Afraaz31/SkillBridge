import { Link } from "react-router-dom";
import { Target, FolderGit2, Gauge, Search } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Skill Tracking",
    desc: "Add skills with category, level and status — from Not Started to Completed.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: FolderGit2,
    title: "Project Portfolio",
    desc: "Showcase projects with tech stack, completion %, GitHub and live links.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Gauge,
    title: "Readiness Score",
    desc: "Get a 0–100% score measuring how job-ready you are for your target role.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Search,
    title: "Gap Analysis",
    desc: "See exactly which skills you're missing and what to do next.",
    color: "bg-orange-50 text-orange-600",
  },
];

const steps = [
  { num: "1", title: "Pick your target role", desc: "Frontend, Backend, Full Stack, MERN or Java Developer." },
  { num: "2", title: "Track skills and projects", desc: "Log what you're learning and building, with proof links." },
  { num: "3", title: "Get your readiness score", desc: "See your score, find the gaps, and close them step by step." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">SkillBridge</span>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero — gradient bg, text + product screenshot side by side */}
      <section className="bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid md:grid-cols-2 gap-10 items-center">
          {/* Left: text */}
          <div className="text-center md:text-left">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
              Career readiness, measured
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Know exactly how <span className="text-blue-600">job-ready</span> you are
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Track your skills, build your project portfolio, and measure your readiness for a
              target tech role with a clear 0–100% score.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/register"
                className="px-7 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="px-7 py-3 text-base font-semibold text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right: product screenshot */}
          <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
            <img
              src="/dashboard-preview.png"
              alt="SkillBridge dashboard preview"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Everything you need to become job-ready
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  <div className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${f.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{f.title}</h3>
                    <p className="text-gray-600 text-sm">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-600 text-white text-lg font-bold flex items-center justify-center mb-4">
                  {s.num}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-600 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Start building your career readiness today
          </h2>
          <p className="text-blue-100 mb-7">
            Join SkillBridge and turn your learning into a measurable, proof-backed portfolio.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3.5 text-base font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-100 shadow-sm transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-lg font-bold text-white mb-1">SkillBridge</p>
          <p className="text-sm mb-3">Turning vague learning into measurable employability.</p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} SkillBridge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
