"use client";

import { useState } from "react";
import type { Project } from "@/content/site";
import { DosButton } from "./Window";

const fileName = (title: string) =>
  title.toUpperCase().replace(/[^A-Z0-9]+/g, "_").slice(0, 8) + ".EXE";

/** Two-pane file manager: project list on the left, details on the right. Arrow keys move the selection. */
export function ProjectBrowser({ projects, github }: { projects: Project[]; github: string }) {
  const [selected, setSelected] = useState(0);
  const current = projects[selected];

  if (projects.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-[var(--dos-yellow)]">C:\PROJECTS&gt; dir</p>
        <p className="mt-4">
          File not found.
          <br />
          New projects are being compiled. Check back soon.
        </p>
        {github && (
          <div className="mt-8">
            <DosButton href={github} primary external>
              Browse GitHub
            </DosButton>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,14rem)_1fr]">
      <ul
        role="listbox"
        aria-label="Projects"
        tabIndex={0}
        aria-activedescendant={`project-${selected}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") setSelected((s) => Math.min(projects.length - 1, s + 1));
          else if (e.key === "ArrowUp") setSelected((s) => Math.max(0, s - 1));
          else return;
          e.preventDefault();
        }}
        className="border-2 border-double border-[var(--dos-cyan)] py-1 outline-none focus-visible:border-[var(--dos-yellow)]"
      >
        {projects.map((p, i) => (
          <li
            key={p.title}
            id={`project-${i}`}
            role="option"
            aria-selected={i === selected}
            onClick={() => setSelected(i)}
            className={`cursor-pointer px-3 py-0.5 ${
              i === selected ? "bg-[var(--dos-cyan)] text-black" : "hover:bg-white/10"
            }`}
          >
            {fileName(p.title)}
          </li>
        ))}
      </ul>

      <div className="border-2 border-double border-[var(--dos-cyan)] p-4">
        <p className="text-lg text-[var(--dos-yellow)]">{current.title}</p>
        <p className="mt-3 leading-relaxed">{current.description}</p>
        <p className="mt-4 text-[var(--dos-cyan)]">
          {current.tech.map((t) => `[${t}]`).join(" ")}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          {current.href && (
            <DosButton href={current.href} primary external>
              Run
            </DosButton>
          )}
          {current.repo && (
            <DosButton href={current.repo} external>
              View Source
            </DosButton>
          )}
        </div>
      </div>
    </div>
  );
}
