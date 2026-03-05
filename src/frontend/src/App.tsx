import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Ember particle type
interface Ember {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

function generateEmbers(count: number): Ember[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 6,
  }));
}

function EmberParticle({ ember }: { ember: Ember }) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full pointer-events-none"
      style={{
        left: `${ember.x}%`,
        width: ember.size,
        height: ember.size,
        background: "oklch(0.68 0.19 35)",
        boxShadow: `0 0 ${ember.size * 2}px oklch(0.62 0.26 25)`,
      }}
      animate={{
        y: [0, -200, -350],
        x: [0, Math.random() * 40 - 20, Math.random() * 20 - 10],
        opacity: [0, 0.8, 0],
        scale: [1, 0.8, 0.2],
      }}
      transition={{
        duration: ember.duration,
        delay: ember.delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeOut",
      }}
    />
  );
}

const LORE_CARDS = [
  {
    id: "buried-deep",
    ocid: "lore.card.1" as const,
    icon: "⚰",
    title: "Buried Deep",
    text: "Six feet under. Cold stone above. The world moved on, unbothered by what it had discarded in the dark.",
    delay: 0,
  },
  {
    id: "chains-broken",
    ocid: "lore.card.2" as const,
    icon: "⛓",
    title: "Chains Broken",
    text: "Something stirred. Ancient. Furious. The chains they'd bound him with? Mere decoration for the beast beneath.",
    delay: 0.15,
  },
  {
    id: "eyes-of-fire",
    ocid: "lore.card.3" as const,
    icon: "👁",
    title: "Eyes of Fire",
    text: "He rose with fire in his eyes — not the fire of men, but the cold red fury of something that refused to stay dead.",
    delay: 0.3,
  },
];

export default function App() {
  const [embers] = useState(() => generateEmbers(20));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentYear = new Date().getFullYear();
  return (
    <div
      className="relative min-h-screen overflow-x-hidden select-none"
      style={{ background: "oklch(0.08 0.015 15)" }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Radial gradient atmosphere */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 40%, oklch(0.25 0.12 20 / 0.15) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 50% 60%, oklch(0.2 0.1 20 / 0.1) 0%, transparent 60%)
          `,
        }}
      />

      {/* Ember particles */}
      <div
        className="fixed bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden"
        style={{ zIndex: 5 }}
      >
        {embers.map((ember) => (
          <EmberParticle key={ember.id} ember={ember} />
        ))}
      </div>

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-5"
        style={{
          background: hasScrolled
            ? "oklch(0.08 0.015 15 / 0.95)"
            : "transparent",
          backdropFilter: hasScrolled ? "blur(12px)" : "none",
          borderBottom: hasScrolled
            ? "1px solid oklch(0.52 0.22 25 / 0.2)"
            : "none",
          transition: "all 0.4s ease",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-px h-6"
            style={{ background: "oklch(0.52 0.22 25 / 0.6)" }}
          />
          <span
            className="text-xs tracking-[0.4em] uppercase font-serif"
            style={{ color: "oklch(0.52 0.22 25)" }}
          >
            Bob's Revival
          </span>
          <div
            className="w-px h-6"
            style={{ background: "oklch(0.52 0.22 25 / 0.6)" }}
          />
        </div>
      </motion.header>

      {/* Main content */}
      <main>
        {/* Hero Section */}
        <section
          ref={sectionRef}
          data-ocid="hero.section"
          className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-24 pb-16"
        >
          {/* Tagline above */}
          <motion.p
            className="tagline-text text-xs md:text-sm mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Back from the Dead
          </motion.p>

          {/* Main Title */}
          <motion.div
            className="relative mb-10 md:mb-14 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1
              className="horror-title glitch-text text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none"
              data-text="BOB'S REVIVAL"
            >
              BOB'S REVIVAL
            </h1>
            {/* Decorative rule under title */}
            <motion.div
              className="flex items-center justify-center gap-4 mt-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              <div
                className="h-px flex-1 max-w-[120px]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, oklch(0.52 0.22 25))",
                }}
              />
              <div
                className="w-2 h-2 rotate-45"
                style={{ background: "oklch(0.52 0.22 25)" }}
              />
              <div
                className="h-px flex-1 max-w-[120px]"
                style={{
                  background:
                    "linear-gradient(to left, transparent, oklch(0.52 0.22 25))",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative float-anim"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{
              opacity: imageLoaded ? 1 : 0,
              scale: imageLoaded ? 1 : 0.92,
            }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            {/* Glow rings behind image */}
            <div
              className="absolute inset-0 rounded-sm image-glow"
              style={{
                transform: "scale(1.02)",
                background: "transparent",
                zIndex: 0,
              }}
            />
            <div
              className="absolute -inset-8 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.45 0.2 25 / 0.35) 0%, oklch(0.32 0.14 25 / 0.15) 40%, transparent 70%)",
                zIndex: 0,
              }}
            />

            {/* Image container */}
            <div
              data-ocid="hero.card"
              className="relative blood-border overflow-hidden"
              style={{
                maxWidth: "min(600px, 90vw)",
                boxShadow:
                  "0 0 50px oklch(0.52 0.22 25 / 0.5), 0 0 120px oklch(0.42 0.18 25 / 0.25), 0 0 220px oklch(0.32 0.14 25 / 0.12), inset 0 0 30px oklch(0.32 0.14 25 / 0.2)",
                zIndex: 1,
              }}
            >
              {/* Corner decorations */}
              <div
                className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 z-10"
                style={{ borderColor: "oklch(0.62 0.26 25)" }}
              />
              <div
                className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 z-10"
                style={{ borderColor: "oklch(0.62 0.26 25)" }}
              />
              <div
                className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 z-10"
                style={{ borderColor: "oklch(0.62 0.26 25)" }}
              />
              <div
                className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 z-10"
                style={{ borderColor: "oklch(0.62 0.26 25)" }}
              />

              <img
                src="/assets/uploads/9bbc7736-1032-42f4-bed6-bd211b1a1680-1.jpg"
                alt="Bob's Revival - Back from the Dead"
                className="block w-full h-auto"
                style={{
                  maxWidth: "600px",
                  filter: "contrast(1.1) saturate(1.2) brightness(0.95)",
                }}
                onLoad={() => setImageLoaded(true)}
              />

              {/* Vignette overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 50%, oklch(0.05 0.01 15 / 0.5) 100%)",
                }}
              />
            </div>
          </motion.div>

          {/* Flavor text */}
          <motion.p
            className="mt-12 md:mt-16 text-center max-w-md font-serif italic"
            style={{
              color: "oklch(0.55 0.02 60)",
              fontSize: "clamp(0.875rem, 2.5vw, 1.1rem)",
              lineHeight: "1.8",
              letterSpacing: "0.05em",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            He was gone.{" "}
            <span style={{ color: "oklch(0.70 0.15 30)" }}>Now he's back.</span>
            <br />
            And he's not happy.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "oklch(0.38 0.02 60)" }}
            >
              Scroll
            </span>
            <motion.div
              className="w-px h-8"
              style={{
                background:
                  "linear-gradient(to bottom, oklch(0.38 0.02 60), transparent)",
              }}
              animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </section>

        {/* Lore Section */}
        <section
          data-ocid="lore.section"
          className="relative py-24 px-4"
          style={{
            borderTop: "1px solid oklch(0.52 0.22 25 / 0.2)",
            borderBottom: "1px solid oklch(0.52 0.22 25 / 0.2)",
          }}
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 60% 80% at 0% 50%, oklch(0.18 0.06 20 / 0.4) 0%, transparent 60%),
                radial-gradient(ellipse 60% 80% at 100% 50%, oklch(0.18 0.06 20 / 0.4) 0%, transparent 60%)
              `,
            }}
          />

          <div className="relative max-w-4xl mx-auto">
            {/* Section heading */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9 }}
            >
              <p
                className="text-xs tracking-[0.5em] uppercase mb-3"
                style={{ color: "oklch(0.52 0.22 25)" }}
              >
                ✦ The Legend ✦
              </p>
              <h2
                className="text-3xl md:text-5xl font-serif font-black uppercase tracking-widest"
                style={{
                  color: "oklch(0.92 0.02 80)",
                  textShadow: "0 0 20px oklch(0.52 0.22 25 / 0.3)",
                }}
              >
                They Said He Was Gone
              </h2>
            </motion.div>

            {/* Story cards */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {LORE_CARDS.map((card) => (
                <motion.div
                  key={card.id}
                  data-ocid={card.ocid}
                  className="relative p-6 md:p-8 text-center"
                  style={{
                    background: "oklch(0.11 0.018 15)",
                    border: "1px solid oklch(0.52 0.22 25 / 0.25)",
                    boxShadow: "inset 0 0 20px oklch(0.32 0.14 25 / 0.1)",
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: card.delay }}
                  whileHover={{
                    boxShadow:
                      "0 0 30px oklch(0.52 0.22 25 / 0.3), inset 0 0 20px oklch(0.32 0.14 25 / 0.15)",
                    borderColor: "oklch(0.52 0.22 25 / 0.6)",
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Corner accents */}
                  <div
                    className="absolute top-0 left-0 w-4 h-4 border-t border-l"
                    style={{ borderColor: "oklch(0.52 0.22 25 / 0.6)" }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4 border-b border-r"
                    style={{ borderColor: "oklch(0.52 0.22 25 / 0.6)" }}
                  />

                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3
                    className="text-lg font-serif font-black uppercase tracking-widest mb-3"
                    style={{
                      color: "oklch(0.62 0.26 25)",
                      textShadow: "0 0 10px oklch(0.52 0.22 25 / 0.4)",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="font-serif italic text-sm leading-relaxed"
                    style={{ color: "oklch(0.55 0.02 60)" }}
                  >
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Warning / CTA section */}
        <section
          data-ocid="warning.section"
          className="relative py-24 px-4 text-center overflow-hidden"
        >
          {/* Big background text */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="font-serif font-black uppercase text-[20vw] leading-none select-none"
              style={{
                color: "oklch(0.52 0.22 25 / 0.04)",
                letterSpacing: "-0.02em",
              }}
            >
              BOB
            </span>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              {/* Decorative cross symbol */}
              <p
                className="text-5xl mb-8 block"
                style={{
                  filter: "drop-shadow(0 0 12px oklch(0.52 0.22 25))",
                }}
              >
                ✝
              </p>

              <blockquote
                className="font-serif text-xl md:text-3xl font-black leading-tight mb-8 uppercase tracking-wide"
                style={{
                  color: "oklch(0.92 0.02 80)",
                  textShadow: "0 0 30px oklch(0.52 0.22 25 / 0.4)",
                }}
              >
                "What the grave takes,{" "}
                <span style={{ color: "oklch(0.62 0.26 25)" }}>
                  the grave returns.
                </span>{" "}
                With interest."
              </blockquote>

              <div
                className="h-px w-24 mx-auto mb-8"
                style={{ background: "oklch(0.52 0.22 25 / 0.5)" }}
              />

              <p
                className="font-serif italic text-sm md:text-base tracking-widest uppercase"
                style={{ color: "oklch(0.42 0.04 30)" }}
              >
                — Inscription found on the broken gravestone of one{" "}
                <em style={{ color: "oklch(0.62 0.26 25)" }}>
                  Robert &ldquo;Bob&rdquo; Unknown
                </em>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="relative py-10 px-4 text-center"
        style={{
          borderTop: "1px solid oklch(0.52 0.22 25 / 0.3)",
          background: "oklch(0.06 0.01 15)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Epitaph */}
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4 font-serif"
            style={{ color: "oklch(0.52 0.22 25)" }}
          >
            R.I.P. — But Not For Long
          </p>

          <p
            className="font-serif italic text-sm mb-6"
            style={{ color: "oklch(0.38 0.03 40)" }}
          >
            &copy; Bob&apos;s Revival {currentYear} &mdash; Est. from beyond the
            grave
          </p>

          <div
            className="h-px w-16 mx-auto mb-4"
            style={{ background: "oklch(0.52 0.22 25 / 0.3)" }}
          />
        </div>
      </footer>

      {/* Scan line effect */}
      <AnimatePresence>
        <motion.div
          className="fixed top-0 left-0 w-full pointer-events-none"
          style={{
            height: "2px",
            background: "oklch(0.52 0.22 25 / 0.08)",
            zIndex: 200,
          }}
          animate={{ y: [0, "100vh"] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </AnimatePresence>
    </div>
  );
}
