import React, { useState } from "react";

import { motion } from "framer-motion";

export default function NewBatsmanPopup({

  isOpen,
  onClose,
  onSelect,

}) {

  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {

    if (!name) return;

    onSelect(name);

    setName("");

    onClose();

  };

  return (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="bg-slate-900 p-6 rounded-xl border border-cyan-500 w-[350px]"
      >

        <h2 className="text-2xl font-bold text-cyan-400 mb-4">

          New Batsman

        </h2>

        <input
          type="text"
          placeholder="Enter batsman name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full bg-slate-800 p-3 rounded-lg text-white outline-none border border-slate-700"
        />

        <div className="flex gap-3 mt-5">

          <button
            onClick={handleSubmit}
            className="flex-1 bg-cyan-600 hover:bg-cyan-700 py-3 rounded-lg font-bold"
          >

            Add Batsman

          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold"
          >

            Cancel

          </button>

        </div>

      </motion.div>

    </div>

  );
}