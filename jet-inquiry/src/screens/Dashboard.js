import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";
import Games from "../components/Games";
import MenuBar from "../components/MenuBar";

export default function Dashboard() {
  const location = useLocation();
  const isGuest = location.state?.guest || false;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDashboard = async () => {
      setLoading(false);
    };

    initDashboard();
  }, [isGuest]);

  if (loading) return <Loading />;

  return (
    <div className="Dashboard">
      <div className="Dashboard_Content">
        <Games />
        <MenuBar />

      </div>
      <Navbar />
    </div>
  );
}
