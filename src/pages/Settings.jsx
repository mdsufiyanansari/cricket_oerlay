import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  FiSettings,
  FiToggleRight,
  FiToggleLeft,
  FiSave,
  FiArrowLeft,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

export default function Settings() {

  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    theme: "dark",
    animations: true,
    notifications: true,
    soundEffects: true,
    autoUpdateOverlay: true,
    obsCompatibilityMode: true,
    resolutionPreset: "1920x1080",
  });

  const [saved, setSaved] = useState(false);

  // TOGGLE SETTINGS
  const handleToggle = (key) => {

    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // SAVE SETTINGS
  const handleSave = () => {

    localStorage.setItem(
      "cricketLiveSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);

  };

  // SETTING CARD
  const SettingCard = ({
    icon: Icon,
    title,
    description,
    children,
  }) => (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-cyan-500/30"
    >

      <div className="flex items-start gap-3 mb-4">

        <Icon className="text-cyan-400 text-xl mt-1" />

        <div>

          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="text-sm text-gray-400">
            {description}
          </p>

        </div>

      </div>

      {children}

    </motion.div>

  );

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Settings
            </h1>

            <p className="text-gray-400">
              Customize your cricket overlay
            </p>

          </div>

          <button
            onClick={() => navigate("/")}
            className="p-3 hover:bg-slate-800 rounded-lg transition-all"
          >

            <FiArrowLeft size={24} />

          </button>

        </div>

        {/* DISPLAY */}
        <div className="space-y-6">

          <SettingCard
            icon={FiSettings}
            title="Theme"
            description="Choose your theme"
          >

            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="w-full bg-slate-700 p-3 rounded-lg"
            >

              <option value="dark">
                Dark Theme
              </option>

              <option value="light">
                Light Theme
              </option>

            </select>

          </SettingCard>

          <SettingCard
            icon={FiSettings}
            title="Resolution"
            description="OBS Resolution Preset"
          >

            <select
              name="resolutionPreset"
              value={settings.resolutionPreset}
              onChange={handleChange}
              className="w-full bg-slate-700 p-3 rounded-lg"
            >

              <option value="1280x720">
                720p
              </option>

              <option value="1920x1080">
                1080p
              </option>

              <option value="3840x2160">
                4K
              </option>

            </select>

          </SettingCard>

          {/* ANIMATIONS */}
          <SettingCard
            icon={FiSettings}
            title="Animations"
            description="Enable smooth transitions"
          >

            <button
              onClick={() => handleToggle("animations")}
              className="flex items-center gap-2"
            >

              {settings.animations ? (
                <FiToggleRight className="text-3xl text-green-500" />
              ) : (
                <FiToggleLeft className="text-3xl text-gray-500" />
              )}

              <span>
                {settings.animations ? "Enabled" : "Disabled"}
              </span>

            </button>

          </SettingCard>

          {/* OBS MODE */}
          <SettingCard
            icon={FiSettings}
            title="OBS Compatibility"
            description="Optimize for OBS streaming"
          >

            <button
              onClick={() => handleToggle("obsCompatibilityMode")}
              className="flex items-center gap-2"
            >

              {settings.obsCompatibilityMode ? (
                <FiToggleRight className="text-3xl text-green-500" />
              ) : (
                <FiToggleLeft className="text-3xl text-gray-500" />
              )}

              <span>
                {settings.obsCompatibilityMode
                  ? "Enabled"
                  : "Disabled"}
              </span>

            </button>

          </SettingCard>

        </div>

        {/* SAVE BUTTON */}
        <div className="mt-8 flex gap-4">

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-bold"
          >

            <FiSave />

            Save Settings

          </button>

          {saved && (

            <div className="px-4 py-3 bg-green-600 rounded-lg font-semibold">

              ✓ Settings Saved

            </div>

          )}

        </div>

      </div>

    </div>

  );
}