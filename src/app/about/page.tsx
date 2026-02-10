"use client";

import { motion } from "framer-motion";
import { BookOpen, Flame, Quote } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <article className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <BookOpen className="w-10 h-10 text-ember" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-light text-foreground mb-2"
          >
            The Philosophy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            Why forgetting might be the most productive thing you can do
          </motion.p>
        </motion.header>

        {/* The Story of Funes */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
            <span className="text-ember">01.</span> The Curse of Total Recall
          </h2>

          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              In Jorge Luis Borges&apos; short story &ldquo;Funes the Memorious&rdquo; (1942), a young man named
              Ireneo Funes suffers a horseback riding accident that leaves him with an
              extraordinary condition: he can forget nothing.
            </p>

            <motion.blockquote
              className="border-l-2 border-ember/50 pl-4 py-2 my-6 italic text-muted-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Quote className="w-4 h-4 text-ember/50 mb-2" />
              &ldquo;He knew the forms of the clouds in the southern sky on the morning of April 30,
              1882, and he could compare them in his memory with the veins in the marbled
              binding of a book he had seen only once.&rdquo;
            </motion.blockquote>

            <p>
              Funes remembers every leaf on every tree, every word in every book, every moment
              of every day. His memory is so perfect that perceiving a dog at 3:14 pm and the
              same dog at 3:15 pm are entirely different experiences—he cannot abstract or
              generalize.
            </p>

            <p className="font-medium text-foreground">
              And so Funes is paralyzed. Drowning in infinite detail, he cannot think.
            </p>
          </div>
        </motion.section>

        {/* The Paradox */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
            <span className="text-ember">02.</span> The Paradox of Perfect Memory
          </h2>

          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              We live in an age of digital hoarding. Bookmarks we&apos;ll never revisit. Notes we&apos;ll
              never read. Tabs we keep open &ldquo;just in case.&rdquo; Screenshots of inspiration that
              becomes sediment.
            </p>

            <p>
              We&apos;ve become Funes by choice—accumulating everything, processing nothing.
              The weight of all these &ldquo;maybes&rdquo; creates a peculiar form of paralysis.
            </p>

            <div className="my-6 p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-2">Consider:</p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <Flame className="w-4 h-4 text-ember shrink-0 mt-1" />
                  How many unread articles sit in your &ldquo;read later&rdquo; list?
                </li>
                <li className="flex items-start gap-2">
                  <Flame className="w-4 h-4 text-ember shrink-0 mt-1" />
                  How many notes have you taken that you&apos;ve never looked at again?
                </li>
                <li className="flex items-start gap-2">
                  <Flame className="w-4 h-4 text-ember shrink-0 mt-1" />
                  How many ideas are you &ldquo;saving&rdquo; that create low-grade anxiety?
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Productive Forgetting */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
            <span className="text-ember">03.</span> The Art of Productive Forgetting
          </h2>

          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              Nietzsche wrote that &ldquo;forgetting is essential to action of any kind.&rdquo; The cow
              grazing in the field is happy because it forgets each moment as it passes. We, by
              contrast, are &ldquo;impeded by the past.&rdquo;
            </p>

            <motion.blockquote
              className="border-l-2 border-ember/50 pl-4 py-2 my-6 italic text-muted-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Quote className="w-4 h-4 text-ember/50 mb-2" />
              &ldquo;Cheerfulness, good conscience, the joyful deed, trust in what is to come—all this
              depends... on one&apos;s being able to forget at the right time as well as to remember
              at the right time.&rdquo;
              <footer className="text-sm mt-2 not-italic">
                — Friedrich Nietzsche, &ldquo;On the Uses and Disadvantages of History for Life&rdquo;
              </footer>
            </motion.blockquote>

            <p>
              This is not about carelessness or negligence. It&apos;s about <em>active curation</em>.
              Choosing what deserves mental real estate and releasing the rest.
            </p>

            <p>
              The bonfire in this app is not destructive—it&apos;s cathartic. Each burned thought
              leaves behind a trace (the &ldquo;ashes&rdquo;), a one-line reminder of what you let go.
              Just enough to know it existed, not enough to weigh you down.
            </p>
          </div>
        </motion.section>

        {/* How to Use */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
            <span className="text-ember">04.</span> The Practice
          </h2>

          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>Consider this a ritual. A weekly (or daily) practice of release:</p>

            <ol className="space-y-4 list-decimal list-inside">
              <li>
                <span className="font-medium text-foreground">Gather.</span>{" "}
                Paste in the notes, bookmarks, ideas, and todos that have been accumulating.
                Don&apos;t judge—just collect.
              </li>
              <li>
                <span className="font-medium text-foreground">Consider.</span>{" "}
                Which of these have actual energy? Which are obligations you&apos;ve outgrown?
                Which are you keeping out of guilt?
              </li>
              <li>
                <span className="font-medium text-foreground">Release.</span>{" "}
                Drag the expired thoughts to the fire. Watch them burn. Optionally, leave
                a last word—a single line to honor what it was before letting it go.
              </li>
              <li>
                <span className="font-medium text-foreground">Continue.</span>{" "}
                What remains? Those are the thoughts worth your attention. Give them space.
              </li>
            </ol>
          </div>
        </motion.section>

        {/* Closing */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.8 }}
          className="text-center py-8"
        >
          <motion.div
            className="w-24 h-px bg-gradient-to-r from-transparent via-ember/50 to-transparent mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          />

          <p className="text-lg text-foreground/80 italic mb-6">
            &ldquo;To think, we must forget differences, generalize, abstract.&rdquo;
          </p>

          <p className="text-muted-foreground text-sm mb-8">
            — On Funes, from the story
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ember hover:bg-ember-dark text-white rounded-lg transition-colors"
          >
            <Flame className="w-4 h-4" />
            Begin the practice
          </Link>
        </motion.section>

        {/* Further Reading */}
        <motion.footer
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.9 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Further Reading</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="text-foreground/80">
                &ldquo;Funes the Memorious&rdquo; by Jorge Luis Borges (1942)
              </span>
            </li>
            <li>
              <span className="text-foreground/80">
                &ldquo;On the Uses and Disadvantages of History for Life&rdquo; by Friedrich Nietzsche (1874)
              </span>
            </li>
            <li>
              <span className="text-foreground/80">
                &ldquo;Delete: The Virtue of Forgetting in the Digital Age&rdquo; by Viktor Mayer-Schönberger (2009)
              </span>
            </li>
          </ul>
        </motion.footer>
      </article>
    </main>
  );
}
