import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-40 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-accent-400 tracking-tight">
          House Rent
        </Link>

        <div className="flex items-center gap-6">
          {!user && (
            <>
              <Link to="/" className="text-slate-200 hover:text-accent-400 transition-colors">
                Home
              </Link>
              <Link to="/login" className="text-slate-200 hover:text-accent-400 transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-glow"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <span className="text-slate-300 hidden sm:inline">
                Hi, <span className="text-accent-400 font-semibold">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
