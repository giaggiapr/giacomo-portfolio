import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { content } from "./data/content";
import { projects } from "./data/projects";
import foto from "./assets/foto1.jpg";


const FILTERS = ["all", "web", "fullstack", "game"];

function Navbar({ t, lang, setLang }) {
  const items = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="nav">
      <div className="container navInner">
        <a href="#top" className="brand">
          Giacomo Battistelli
        </a>

        <div className="row">
          <nav className="row navLinks">
            {items.map((it) => (
              <a key={it.href} href={it.href} className="muted navLink">
                {it.label}
              </a>
            ))}
          </nav>

          <button
            className="btn ghost"
            onClick={() => setLang((x) => (x === "it" ? "en" : "it"))}
            title="Language (press L)"
            type="button"
          >
            {lang === "it" ? "EN" : "IT"} <span className="kbd">L</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ t }) {
  const [open, setOpen] = useState(false);

  return (
    <section id="top" style={{ padding: "72px 0" }}>
      <div className="container">
        <div className="card heroCard">

          <div className="heroLayout">

            {/* FOTO */}
            <div className="heroPhotoBox">
              <img
                src={foto}
                alt="Giacomo Battistelli"
                className="heroPhoto"
                onClick={() => setOpen(true)}
              />
              <p className="photoHint">Click to enlarge</p>
            </div>

            {/* TESTO */}
            <div className="heroText">
              <div className="row heroTop">
                <span className="badge">{t.hero.tag}</span>
                <span className="muted heroTech">React • Node • MongoDB • Unity</span>
              </div>

              <h1 className="heroTitle">{t.hero.title}</h1>
              <p className="muted heroSubtitle">{t.hero.subtitle}</p>

              <div className="row" style={{ marginTop: 14 }}>
                <a className="btn" href="#projects">
                  {t.hero.ctaProjects}
                </a>
                <a className="btn secondary" href="#contact">
                  {t.hero.ctaContact}
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MODAL FOTO */}
      {open && (
        <div className="photoModal" onClick={() => setOpen(false)}>
          <img src={foto} alt="Giacomo Battistelli large" className="photoLarge" />
        </div>
      )}
    </section>
  );
}


function About({ t }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2>{t.about.title}</h2>
        <div className="grid cols-2">
          <div className="card">
            <p className="muted" style={{ margin: 0, lineHeight: 1.75 }}>
              {t.about.body}
            </p>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0 }}>{t.about.focusTitle}</h3>
            <div className="row">
              {t.about.focusBadges.map((x) => (
                <span className="badge" key={x}>
                  {x}
                </span>
              ))}
            </div>

            <hr />

            <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
              <b>{t.about.goalTitle}</b> {t.about.goalBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills({ t }) {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2>{t.skills.title}</h2>
        <div className="grid cols-3">
          {t.skills.blocks.map((b) => (
            <div className="card" key={b.title}>
              <h3 style={{ marginTop: 0 }}>{b.title}</h3>
              <div className="row">
                {b.items.map((x) => (
                  <span key={x} className="badge">
                    {x}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ open, onClose, t, project }) {
  if (!open || !project) return null;

  return (
    <div className="modalBackdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <div>
            <h3 style={{ marginTop: 0 }}>{project.title}</h3>
            <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
              {project.details}
            </p>
          </div>
          <button className="btn ghost" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        <hr />

        <h4 style={{ margin: "0 0 8px" }}>{t.projects.modalTech}</h4>
        <div className="row">
          {project.tech.map((x) => (
            <span key={x} className="badge">
              {x}
            </span>
          ))}
        </div>

        <hr />

        <h4 style={{ margin: "0 0 8px" }}>{t.projects.modalLinks}</h4>
        <div className="row">
          {project.live && (
            <a className="btn" href={project.live} target="_blank" rel="noreferrer">
              Live
            </a>
          )}
          {project.repo && (
            <a className="btn secondary" href={project.repo} target="_blank" rel="noreferrer">
              Code
            </a>
          )}
          {!project.repo && (
            <span className="muted">{t.projects.repoOnRequest}</span>
          )}
        </div>

        {project.embed && (
          <>
            <hr />
            <div className="embedWrap">
              <iframe
                title={project.title}
                src={project.embed}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Projects({ t }) {
  const [filterKey, setFilterKey] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (filterKey === "all") return projects;
    return projects.filter((p) => p.typeKey === filterKey);
  }, [filterKey]);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <h2 style={{ margin: 0 }}>{t.projects.title}</h2>
            <p className="muted" style={{ margin: "8px 0 0", lineHeight: 1.6 }}>
              {t.projects.subtitle}
            </p>
          </div>

          <div className="row">
            {FILTERS.map((k) => (
              <button
                key={k}
                className={`btn ${filterKey === k ? "" : "ghost"}`}
                onClick={() => setFilterKey(k)}
                type="button"
              >
                {t.projects.filters[k]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid cols-2" style={{ marginTop: 16 }}>
          {filtered.map((p) => (
            <div className="card" key={p.title}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <h3 style={{ marginTop: 0 }}>{p.title}</h3>
                <span className="badge">{t.projects.typeLabels[p.typeKey]}</span>
              </div>

              <p className="muted" style={{ marginTop: 0, lineHeight: 1.6 }}>
                {p.short}
              </p>

              <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="row">
                  {p.tech.slice(0, 4).map((x) => (
                    <span key={x} className="badge">
                      {x}
                    </span>
                  ))}
                </div>

                <div className="row">
                  {p.live && (
                    <a className="btn ghost" href={p.live} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  )}
                  <button className="btn secondary" onClick={() => setSelected(p)} type="button">
                    {t.projects.detailsBtn}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ProjectModal open={!!selected} onClose={() => setSelected(null)} t={t} project={selected} />
      </div>
    </section>
  );
}

function Experience({ t }) {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2>{t.experience.title}</h2>
        <div className="grid cols-3">
          {t.experience.items.map((x) => (
            <div className="card" key={x.title}>
              <h3 style={{ marginTop: 0 }}>{x.title}</h3>
              <p className="muted" style={{ margin: 0, lineHeight: 1.65 }}>
                {x.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ t }) {
  const email = "giacomo.battistelli@icloud.com";
  const github = "https://github.com/giaggiapr";
  const linkedin = ""; // se ce l’hai poi lo mettiamo

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2>{t.contact.title}</h2>
        <div className="card">
          <p className="muted" style={{ marginTop: 0 }}>
            {t.contact.body}
          </p>

          <div className="row" style={{ marginTop: 12 }}>
            <a className="btn" href={`mailto:${email}`}>
              {t.contact.emailBtn}
            </a>
            <a className="btn secondary" href={github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            {linkedin ? (
              <a className="btn secondary" href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            ) : (
              <span className="muted">{t.contact.linkedinHint}</span>
            )}
            <a className="btn ghost" href="#top">
              ↑ Top
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer style={{ padding: "28px 0", borderTop: "1px solid #e2e8f0" }}>
      <div className="container footerInner">
        <span className="muted">{t.footer}</span>
        <span className="muted">
          {t.footerHint} <span className="kbd">L</span>
        </span>
      </div>
    </footer>
  );
}

export default function App() {
  const [lang, setLang] = useState("it");
  const t = content[lang];

  // ✅ FIX: scorciatoia tastiera con useEffect (non useMemo)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key && e.key.toLowerCase() === "l") {
        setLang((x) => (x === "it" ? "en" : "it"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Navbar t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} />
        <About t={t} />
        <Skills t={t} />
        <Projects t={t} />
        <Experience t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
