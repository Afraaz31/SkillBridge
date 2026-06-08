import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "My Skills", path: "/skills" },
  { label: "My Projects", path: "/projects" },
  { label: "Gap Analysis", path: "/gap-analysis" },
  { label: "Profile", path: "/profile" },
];

const AppLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile top bar (visible only below lg) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-30">
        <h1 className="text-lg font-bold text-blue-600">SkillBridge</h1>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-600 hover:text-gray-900"
          aria-label="Open menu"
        >
          {/* Hamburger icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[220px] bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">SkillBridge</h1>
          {/* Close button (mobile only) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600 text-xl"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-800 truncate">{user?.name || "User"}</p>
          <p className="text-xs text-gray-500 truncate mb-3">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="w-full text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition text-left"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content — offset for sidebar on desktop, for top bar on mobile */}
      <main className="lg:ml-[220px] pt-14 lg:pt-0 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
