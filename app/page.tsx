"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { Form } from "@/components/form";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="bg-background min-h-screen selection:bg-primary/10">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div key="hero" className="w-full h-full">
            <Hero onJoin={() => setShowForm(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Form />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
