import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiPlayCircle,
  FiActivity,
  FiMonitor,
} from "react-icons/fi";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)" },
  };

  const navItems = [
    { icon: FiHome, label: "Dashboard", path: "/", color: "text-cyan-400" },
    { icon: FiPlayCircle, label: "Match Setup", path: "/match", color: "text-green-400" },
    { icon: FiActivity, label: "Admin Panel", path: "/admin", color: "text-blue-400" },
    { icon: FiMonitor, label: "OBS Overlay", path: "/overlay", color: "text-red-400" },
    { icon: FiSettings, label: "Settings", path: "/settings", color: "text-yellow-400" },
    {
  icon: FiActivity,
  label: "Players",
  path: "/players",
  color: "text-purple-400"
},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex">
      {/* Sidebar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: sidebarOpen ? 280 : 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-b from-slate-900 to-slate-950 border-r border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/20"
      >
        <div className="p-6 space-y-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <FiMonitor className="text-white text-lg" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              CricketLive
            </h1>
          </motion.div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item, idx) => (
              <Link key={idx} to={item.path}>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-all duration-200 group cursor-pointer"
                >
                  <item.icon className={`${item.color} text-lg group-hover:scale-110 transition-transform`} />
                  <span className="font-semibold text-sm">{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-700 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 font-semibold transition-all"
            >
              <FiLogOut />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-b border-cyan-500/20 backdrop-blur-md p-6 flex items-center justify-between sticky top-0 z-40">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4"
          >
            <div className="text-right">
              <p className="text-sm font-semibold">Welcome Back</p>
              <p className="text-xs text-gray-400">Cricket Admin</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Cricket Live Overlay
            </h2>
            <p className="text-gray-400 text-lg">Professional IPL-style scoring system</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: "Active Matches", value: "0", color: "from-cyan-600 to-blue-600" },
              { label: "Matches Today", value: "2", color: "from-green-600 to-emerald-600" },
              { label: "Total Players", value: "0", color: "from-purple-600 to-pink-600" },
              { label: "Teams", value: "0", color: "from-yellow-600 to-orange-600" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-white/10`}
              >
                <p className="text-white/80 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Link to="/match">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-8 rounded-2xl border-2 border-green-500/50 shadow-lg cursor-pointer hover:border-green-400 transition-all backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <FiPlayCircle className="text-green-400 text-3xl" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-2 border-green-400/30 border-t-green-400 rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-green-300 mb-2">New Match</h3>
                <p className="text-gray-300 text-sm">Create and setup a new cricket match with teams and players</p>
              </motion.div>
            </Link>

            <Link to="/admin">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-8 rounded-2xl border-2 border-blue-500/50 shadow-lg cursor-pointer hover:border-blue-400 transition-all backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <FiActivity className="text-blue-400 text-3xl" />
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 border-2 border-blue-400 rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-blue-300 mb-2">Admin Panel</h3>
                <p className="text-gray-300 text-sm">Live ball-by-ball scoring and match management</p>
              </motion.div>
            </Link>

            <Link to="/overlay">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-gradient-to-br from-red-900/40 to-pink-900/40 p-8 rounded-2xl border-2 border-red-500/50 shadow-lg cursor-pointer hover:border-red-400 transition-all backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <FiMonitor className="text-red-400 text-3xl" />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-12 h-12 border-2 border-red-400 rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-red-300 mb-2">OBS Overlay</h3>
                <p className="text-gray-300 text-sm">View and manage the professional streaming overlay</p>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
