import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingText = [
  "Initializing system...",
  "Loading developer profile...",
  "Compiling mission data...",
  "Launching interface...",
];

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2600;
    const intervalMs = 45;
    const totalSteps = duration / intervalMs;
    const increment = 100 / totalSteps;

    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          return 100;
        }

        const next = current + increment + Math.random() * 1.4;
        return Math.min(100, next);
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 100) {
      return;
    }

    const doneTimer = window.setTimeout(onComplete, 260);
    return () => window.clearTimeout(doneTimer);
  }, [onComplete, progress]);

  const activeText = useMemo(() => {
    const index = Math.min(
      loadingText.length - 1,
      Math.floor((progress / 100) * loadingText.length),
    );
    return loadingText[index];
  }, [progress]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      <div className="loading-panel">
        <h1 className="loading-title">NHD.PORTFOLIO</h1>
        <p className="loading-text">{activeText}</p>

        <div className="loading-track">
          <motion.div
            className="loading-bar"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>

        <p className="loading-percent">{Math.round(progress)}%</p>
      </div>
    </motion.div>
  );
};
