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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-[220px] bg-white border-r border-gray-200 flex flex-col fixed h-screen">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">SkillBridge</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            // If pathname is "/skills" and link.path is "/skills" → isActive = true
            // If pathname is "/skills" and link.path is "/dashboard" → isActive = false
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
              // .map() loops through the array and creates a Link component for each item. 5 objects in array = 5 links on screen. If you add a 6th object to navLinks, a 6th link automatically appears. No extra HTML needed.
            );
          })}
          {/* // Normal HTML:
          // <a href="/skills">My Skills</a> ← reloads ENTIRE page

          // React:
         <Link to="/skills">My Skills</Link> ← changes URL without reloading */}
        </nav>


        <div className="p-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-800 truncate">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-gray-500 truncate mb-3">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="w-full text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition text-left"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-[220px] p-8">
        <Outlet />  
      </main>
    </div>
// explanation
//  <main>
//   <Outlet /> ← React Router puts the matching page here
// </main>

// // URL is /dashboard → Outlet becomes <Dashboard />
// // URL is /skills → Outlet becomes <Skills />
// // URL is /projects → Outlet becomes <Projects />
  );
};

export default AppLayout;
