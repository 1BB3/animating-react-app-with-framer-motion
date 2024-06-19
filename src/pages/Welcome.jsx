import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import bgImage from "../assets/welcome-page-bg.jpg";

export default function WelcomePage() {
  const { scrollY } = useScroll();

  const opacityCity = useTransform(
    scrollY,
    [0, 200, 300, 500],
    [1, 0.5, 0.5, 0]
  );
  const yCity = useTransform(scrollY, [0, 200], [0, -100]);
  const scaleText = useTransform(scrollY, [0, 300], [1, 1.5]);
  const yText = useTransform(scrollY, [0, 200, 300, 500], [0, 50, 50, 300]);

  return (
    <>
      <header id="welcome-header">
        <motion.div
          id="welcome-header-content"
          style={{ scale: scaleText, y: yText }}
        >
          <h1>Ready for a challenge?</h1>
          <Link id="cta-link" to="/challenges">
            Get Started
          </Link>
        </motion.div>
        <motion.img
          style={{ opacity: opacityCity, y: yCity }}
          src={bgImage}
          alt="A city skyline touched by sunlight"
          id="welcome-page-bg"
        />
      </header>
      <main id="welcome-content"></main>
    </>
  );
}
