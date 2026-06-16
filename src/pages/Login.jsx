import React, { useState } from "react";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiTv,
} from "react-icons/fi";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // HANDLE LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    setTimeout(() => {

      if (email && password) {

        localStorage.setItem(
          "user",
          JSON.stringify({ email })
        );

        navigate("/");

      }

      setLoading(false);

    }, 1000);

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl w-full">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center space-y-6"
        >

          {/* LOGO */}
          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/40">

              <FiTv className="text-3xl text-white" />

            </div>

            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">

              CricketLive

            </h1>

          </div>

          {/* TITLE */}
          <div>

            <h2 className="text-3xl font-bold mb-4">

              Professional Cricket Overlay

            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">

              IPL-style live scoring system with
              professional overlays, realtime updates,
              Firebase integration and OBS support.

            </p>

          </div>

          {/* FEATURES */}
          <div className="space-y-3">

            {[
              "Realtime Ball-by-Ball Scoring",
              "Professional IPL Graphics",
              "OBS Browser Source Compatible",
              "Firebase Realtime Database",
              "Smooth Animations",
              "YouTube Live Ready",
            ].map((feature, index) => (

              <div
                key={index}
                className="flex items-center gap-3"
              >

                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold">

                  ✓

                </div>

                <span className="text-gray-300">

                  {feature}

                </span>

              </div>

            ))}

          </div>

        </motion.div>

        {/* LOGIN FORM */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-center"
        >

          <div className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">

            <h3 className="text-3xl font-bold text-center text-cyan-400 mb-8">

              Admin Login

            </h3>

            <form
              onSubmit={handleLogin}
              className="space-y-6"
            >

              {/* EMAIL */}
              <div>

                <label className="block mb-2 text-sm font-semibold">

                  Email Address

                </label>

                <div className="relative">

                  <FiMail className="absolute left-3 top-3 text-cyan-400" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="admin@example.com"
                    className="w-full bg-slate-700/50 border border-cyan-500/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    required
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block mb-2 text-sm font-semibold">

                  Password

                </label>

                <div className="relative">

                  <FiLock className="absolute left-3 top-3 text-cyan-400" />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="••••••••"
                    className="w-full bg-slate-700/50 border border-cyan-500/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    required
                  />

                </div>

              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-bold"
              >

                {loading ? (

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />

                ) : (

                  <>

                    Login

                    <FiArrowRight />

                  </>

                )}

              </motion.button>

            </form>

            {/* FOOTER */}
            <div className="mt-6 text-center text-sm text-gray-400">

              Demo:
              Use any email & password

            </div>

          </div>

        </motion.div>

      </div>

    </div>

  );
}