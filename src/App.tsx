import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { CommentsSection } from "./components/CommentsSection";
import { ContactSection } from "./components/ContactSection";
import { CustomCursor } from "./components/CustomCursor";
import { HeroSection } from "./components/HeroSection";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsSection } from "./components/SkillsSection";
import { VisitorStatsSection } from "./components/VisitorStatsSection";
import { achievements, profile, projects, skills, socials } from "./data/portfolio";
import { fetchComments, fetchVisitorStats, registerVisit, submitComment } from "./services/api";
import type { PortfolioComment, VisitorStats } from "./types";
import "./App.css";

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [comments, setComments] = useState<PortfolioComment[]>([]);
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [apiNotice, setApiNotice] = useState<string | null>(null);
  const [eggProgress, setEggProgress] = useState(0);
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const [visitResult, commentsResult] = await Promise.all([
          registerVisit(),
          fetchComments(),
        ]);

        setStats(visitResult);
        setComments(commentsResult);
      } catch {
        setApiNotice(
          "Backend offline. Run `npm run dev` in root to enable live visitor analytics and comments.",
        );
      }
    };

    void bootstrap();
  }, []);

  const refreshStats = async () => {
    try {
      const latest = await fetchVisitorStats();
      setStats(latest);
      setApiNotice(null);
    } catch {
      setApiNotice("Could not refresh visitor statistics.");
    }
  };

  const handleSubmitComment = async (name: string, message: string) => {
    const newComment = await submitComment(name, message);
    setComments((current) => [newComment, ...current]);
    await refreshStats();
  };

  const handleAvatarClick = () => {
    setEggProgress((current) => {
      const next = current + 1;
      if (next >= 5) {
        setAchievementUnlocked(true);
        window.setTimeout(() => setAchievementUnlocked(false), 2300);
        return 0;
      }

      return next;
    });
  };

  const dynamicAchievements = useMemo(
    () =>
      achievements.map((item) =>
        item.title === "Completed Projects"
          ? { ...item, value: projects.length }
          : item,
      ),
    [],
  );

  return (
    <div className="app-shell">
      <BackgroundEffects />
      <CustomCursor />

      <AnimatePresence mode="wait">
        {showLoader ? <LoadingScreen onComplete={() => setShowLoader(false)} /> : null}
      </AnimatePresence>

      {!showLoader ? (
        <>
          <Navbar />

          <main className="content">
            {apiNotice ? <p className="api-notice panel">{apiNotice}</p> : null}

            <HeroSection
              name={profile.name}
              title={profile.title}
              intro={profile.intro}
              socials={socials}
              onAvatarClick={handleAvatarClick}
            />

            {eggProgress > 0 ? (
              <p className="egg-progress">Easter Egg Progress: {eggProgress}/5</p>
            ) : null}

            <AboutSection points={profile.about} />
            <SkillsSection groups={skills} />
            <ProjectsSection projects={projects} />
            <AchievementsSection items={dynamicAchievements} />
            <VisitorStatsSection stats={stats} />
            <CommentsSection comments={comments} onSubmit={handleSubmitComment} />
            <ContactSection />
          </main>
        </>
      ) : null}

      <AnimatePresence>
        {achievementUnlocked ? (
          <motion.aside
            className="achievement-toast"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35 }}
          >
            Achievement Unlocked: Hidden Avatar Sequence
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;
