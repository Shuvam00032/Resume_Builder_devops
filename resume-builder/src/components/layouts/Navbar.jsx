import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link, useLocation } from "react-router-dom";
import { FileText } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const onDashboard = location.pathname === "/dashboard";

  return (
    <div className="h-16 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <div className="flex items-center gap-4 md:gap-6 min-w-0">
          <Link
            to="/"
            title="Home"
            aria-label="Go to home page"
            className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
          >
            <h2 className="text-lg md:text-xl font-medium text-black leading-5 flex items-center gap-2 hover:text-purple-700 transition-colors">
              <FileText className="w-5 h-5 text-blue-600 shrink-0" />
              Resume Builder
            </h2>
          </Link>

          <nav className="flex items-center gap-2 border-l border-gray-200 pl-4 md:pl-6" aria-label="Main">
            <Link
              to="/dashboard"
              className={`text-sm font-medium whitespace-nowrap rounded outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
                onDashboard
                  ? "text-purple-600 cursor-default"
                  : "text-gray-600 hover:text-purple-600"
              }`}
              aria-current={onDashboard ? "page" : undefined}
            >
              Dashboard
            </Link>
          </nav>
        </div>

        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
