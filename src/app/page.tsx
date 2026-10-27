import { projects, site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { EmailButton } from "@/components/retro/EmailButton";
import { ProjectBrowser } from "@/components/retro/ProjectBrowser";
import { StarSky } from "@/components/retro/StarSky";
import { DosButton, Window } from "@/components/retro/Window";

const MENU = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// Bullets shown per job before the "more" toggle
const VISIBLE_BULLETS = 4;

export default function Home() {
  return (
    <div className="retro relative min-h-svh overflow-x-clip text-[15px]">
      <StarSky />

      {/* Menu bar, first letter of each item highlighted like a DOS hotkey */}
      <header className="sticky top-0 z-50 flex items-center gap-1 bg-[var(--dos-gray)] px-2 text-black shadow-[0_4px_0_#000]">
        <a href="#top" className="px-3 py-1 font-bold hover:bg-[var(--dos-teal)]">≡</a>
        {MENU.map((m) => (
          <a key={m.href} href={m.href} className="px-3 py-1 hover:bg-[var(--dos-teal)]">
            <span className="text-[var(--dos-red)]">{m.label[0]}</span>
            {m.label.slice(1)}
          </a>
        ))}
        <span className="ml-auto hidden px-3 sm:block">{site.name.toUpperCase()}.EXE</span>
      </header>

      {/* Narrower between 1360px and 2xl so the pinned star panel fits beside the centered column */}
      <main id="top" className="mx-auto flex w-full max-w-4xl flex-col gap-24 px-5 pt-20 pb-36 sm:px-8 min-[1360px]:max-w-[45rem] 2xl:max-w-4xl">
        <Reveal>
          <Window title="README.TXT" tone="blue">
            <div className="px-2 py-6 sm:px-6 sm:py-10">
              <p className="text-[var(--dos-cyan)]">C:\&gt; whoami</p>
              <h1 className="mt-4 text-4xl leading-none font-extrabold tracking-tight text-[var(--dos-yellow)] sm:text-6xl">
                {site.name}
              </h1>
              <p className="mt-3 text-xl text-white sm:text-2xl">{site.role}</p>
              <p className="mt-1 text-[var(--dos-cyan)]">{site.location}</p>
              <div className="mt-6 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="max-w-xl leading-relaxed">
                    {site.tagline}
                    <span className="dos-cursor" aria-hidden />
                  </p>
                  <div className="mt-10 flex flex-wrap gap-5">
                    <DosButton href="#experience" primary>
                      View Experience
                    </DosButton>
                    <DosButton href="#contact">Contact Me</DosButton>
                  </div>
                </div>
                <figure className="shrink-0 self-center md:self-start">
                  {/* 128px source shown at exactly 2x so the pixels stay crisp and square */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={site.photo.src}
                    alt={site.photo.alt}
                    width={256}
                    height={256}
                    className="pixel-photo"
                  />
                  <figcaption className="mt-3 text-center text-xs text-[var(--dos-cyan)]">PHOTO.BMP · 128×128 · 4 shades</figcaption>
                </figure>
              </div>
            </div>
          </Window>
        </Reveal>

        <section id="about" className="scroll-mt-20">
          <Reveal>
            <Window title="About Me">
              <div className="grid gap-8 px-2 py-4 sm:px-4 md:grid-cols-[3fr_2fr]">
                <div className="space-y-4 leading-relaxed">
                  {site.about.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <fieldset className="self-start border-2 border-double border-black px-4 pt-1 pb-3">
                  <legend className="bg-black px-2 text-white">Quick Facts</legend>
                  <dl className="space-y-2">
                    {site.facts.map((f) => (
                      <div key={f.label}>
                        <dt className="text-xs uppercase opacity-70">{f.label}</dt>
                        <dd className="font-bold">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </fieldset>
              </div>
            </Window>
          </Reveal>
        </section>

        <section id="experience" className="scroll-mt-20">
          <Reveal>
            <Window title="HISTORY.LOG" tone="blue">
              <ol className="space-y-10 px-2 py-4 sm:px-4">
                {site.experience.map((job) => (
                  <li key={job.company + job.period}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="text-lg font-bold text-[var(--dos-yellow)]">{job.title}</h3>
                      <span className="text-[var(--dos-cyan)]">{job.period}</span>
                    </div>
                    <p className="mb-3 text-white/80">
                      {job.company} · {job.location}
                    </p>
                    <ul className="space-y-1.5">
                      {job.bullets.slice(0, VISIBLE_BULLETS).map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-[var(--dos-cyan)]">►</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {job.bullets.length > VISIBLE_BULLETS && (
                      <details className="dos-more mt-1.5">
                        <summary className="cursor-pointer text-[var(--dos-cyan)] hover:text-[var(--dos-yellow)]">
                          {job.bullets.length - VISIBLE_BULLETS} more
                        </summary>
                        <ul className="mt-1.5 space-y-1.5">
                          {job.bullets.slice(VISIBLE_BULLETS).map((b) => (
                            <li key={b} className="flex gap-2">
                              <span className="text-[var(--dos-cyan)]">►</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </li>
                ))}
              </ol>
            </Window>
          </Reveal>
        </section>

        <section id="skills" className="scroll-mt-20">
          <Reveal>
            <Window title="TECH.SYS">
              <div className="grid gap-x-6 gap-y-5 px-2 py-4 sm:grid-cols-2 sm:px-4">
                {site.skillGroups.map((g) => (
                  <fieldset key={g.name} className="border-2 border-double border-black px-4 pt-1 pb-3">
                    <legend className="bg-black px-2 text-white">{g.name}</legend>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1">
                      {g.items.map((s) => (
                        <li key={s}>[■] {s}</li>
                      ))}
                    </ul>
                  </fieldset>
                ))}
              </div>
            </Window>
          </Reveal>

          <div className="mt-24 grid gap-24 md:grid-cols-2 md:gap-12">
            <Reveal>
              <Window title="EDUCATION.DAT" tone="gray">
                <ul className="space-y-4 px-2 py-2">
                  {site.education.map((e) => (
                    <li key={e.name}>
                      <p className="font-bold">{e.name}</p>
                      <p className="opacity-80">{e.school}</p>
                    </li>
                  ))}
                </ul>
              </Window>
            </Reveal>
            <Reveal delay={100}>
              <Window title="LANGUAGE.CFG" tone="gray">
                <ul className="space-y-4 px-2 py-2">
                  {site.spokenLanguages.map((l) => (
                    <li key={l.name}>
                      <div className="flex justify-between gap-4">
                        <span className="font-bold">{l.name}</span>
                        <span aria-hidden className="text-[var(--dos-blue)]">
                          {"█".repeat(l.bars)}
                          <span className="opacity-30">{"█".repeat(5 - l.bars)}</span>
                        </span>
                      </div>
                      <p className="opacity-80">{l.level}</p>
                    </li>
                  ))}
                </ul>
              </Window>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="scroll-mt-20">
          <Reveal>
            <Window title="Project Manager" tone="blue">
              <div className="p-2 sm:p-4">
                <ProjectBrowser projects={projects} github={site.links.github} />
              </div>
            </Window>
          </Reveal>
        </section>

        <section id="contact" className="scroll-mt-20 sm:px-16">
          <Reveal>
            <Window title="Contact">
              <div className="px-2 py-6 text-center sm:px-6">
                <p className="leading-relaxed">
                  Have a role, a project, or just want to say hello?
                  <br />
                  Press a button below to open a connection.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-5">
                  {site.links.emailEncoded && (
                    <EmailButton encoded={site.links.emailEncoded}>Send Email</EmailButton>
                  )}
                  {site.links.github && (
                    <DosButton href={site.links.github} external>
                      GitHub
                    </DosButton>
                  )}
                  {site.links.linkedin && (
                    <DosButton href={site.links.linkedin} external>
                      LinkedIn
                    </DosButton>
                  )}
                </div>
              </div>
            </Window>
          </Reveal>
        </section>
      </main>

      {/* Status bar */}
      <footer className="fixed inset-x-0 bottom-0 z-50 flex gap-6 bg-[var(--dos-gray)] px-4 py-1 text-black">
        {MENU.map((m, i) => (
          <a key={m.href} href={m.href} className="hover:underline">
            <span className="text-[var(--dos-red)]">F{i + 2}</span> {m.label}
          </a>
        ))}
        <span className="ml-auto hidden sm:block">© {site.name}</span>
      </footer>
    </div>
  );
}
