import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default PublicLayout;