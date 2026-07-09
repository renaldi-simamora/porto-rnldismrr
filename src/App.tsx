'use client';

import { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { summary, projects, skills, certifications } from './constant';

/* ─────────────────────────────────────────────────
   GSAP SETUP (client-only, guarded for SSR)
───────────────────────────────────────────────── */
const isBrowser = typeof window !== 'undefined';
if (isBrowser) gsap.registerPlugin(ScrollTrigger);

// Avoids the classic Next.js "useLayoutEffect does nothing on the server" warning
// and prevents any first-paint / hydration mismatch.
const useIsoLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

function prefersReducedMotion() {
  return isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ─────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────── */
interface EducationEntry {
  level: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
  accent: string;
}

interface ExperienceEntry {
  jobTitle: string;
  company: string;
  status: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

interface CompetencyGroup {
  category: string;
  items: string[];
  accent: string;
}

/* ─────────────────────────────────────────────────
   DATA (hardcoded — synced with CV, July 2026)
───────────────────────────────────────────────── */
const EXPERIENCE: ExperienceEntry[] = [
  {
    jobTitle: 'IT Support & Development Intern',
    company: 'PT Global Energi Lestari',
    status: 'Internship',
    startDate: 'Jan 2026',
    endDate: 'Jul 2026',
    highlights: [
      'Maintained and monitored ERP systems and web-based applications to ensure system stability and support business operations',
      'Developed and enhanced web application features using Laravel, Blade, HTML, CSS, and JavaScript to improve usability and functionality',
      'Assisted in updating application features, UI components, and system content based on business requirements',
      'Managed and validated application data using SQL to ensure data accuracy, integrity, and consistency',
      'Provided first-level technical support by troubleshooting application and system issues, including documenting and following up on incidents',
      'Collaborated with developers and cross-functional teams to improve system performance, usability, and operational efficiency',
    ],
  },
  {
    jobTitle: 'Fullstack Web Developer',
    company: 'Dicoding Coding Camp × DBS Foundation 2026',
    status: 'Coding Camp - Cohort',
    startDate: 'Feb 2026',
    endDate: 'Jul 2026',
    highlights: [
      'Developed responsive and interactive web applications using React and modern JavaScript',
      'Built backend systems and RESTful APIs for authentication and efficient data processing',
      'Managed and integrated databases (MySQL, Firebase/Supabase) to ensure reliable and scalable application performance',
      'Collaborated in fullstack development to ensure seamless integration across frontend, backend, and deployment',
      'Performed debugging, troubleshooting, and testing (SIT/UAT) to maintain system stability and performance',
      'Applied SDLC principles and implemented basic cloud deployment using AWS',
      'Continuously learned and applied modern web development practices in a collaborative, project-based environment',
    ],
  },
];

const EDUCATION: EducationEntry[] = [
  {
    level: 'University',
    degree: 'Teknologi Rekayasa Komputer (Computer Engineering Technology)',
    institution: 'IPB University',
    startDate: '2023',
    endDate: '2027 (Expected)',
    description: 'GPA 3.46. Focus on Hardware-Software Integration, Embedded Systems, and IoT Development.',
    accent: '#C8FF00',
  },
  {
    level: 'Senior High School',
    degree: 'Science Program',
    institution: 'SMAN 33 Jakarta',
    startDate: '2020',
    endDate: '2023',
    description: 'Graduated with a focus on science and mathematics. Actively participated in extracurricular technology activities.',
    accent: '#00C8FF',
  },
];

/* Key Competencies — from CV "KEY COMPETENCIES" section */
const KEY_COMPETENCIES: CompetencyGroup[] = [
  {
    category: 'Development',
    accent: '#C8FF00',
    items: [
      'Frontend Development (HTML, CSS, JavaScript, React, Next.js)',
      'Backend Development (Laravel, REST API, Node.js - Basic)',
      'Database Management (MySQL, Firebase, PostgreSQL)',
      'UI/UX & Responsive Web Design',
    ],
  },
  {
    category: 'Support & Operations',
    accent: '#00C8FF',
    items: [
      'Application Support & System Maintenance (Troubleshooting, Bug Fixing, Monitoring)',
      'Website Maintenance & Feature Enhancement',
      'Basic Linux Commands',
      'Basic SEO & Web Content Management',
    ],
  },
  {
    category: 'Quality & Collaboration',
    accent: '#FF00C8',
    items: [
      'Software Testing (SIT/UAT)',
      'Team Collaboration & Communication',
    ],
  },
];

/* ─────────────────────────────────────────────────
   MAGNETIC CURSOR (GSAP quickTo — skipped on touch / reduced motion)
───────────────────────────────────────────────── */
function MagneticCursor() {
  useEffect(() => {
    if (!isBrowser) return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || prefersReducedMotion()) return;

    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    const ring = document.createElement('div');

    cursor.style.cssText = 'position:fixed;pointer-events:none;z-index:99999;width:8px;height:8px;background:#C8FF00;border-radius:50%;transform:translate(-50%,-50%);mix-blend-mode:difference;left:-100px;top:-100px;';
    follower.style.cssText = 'position:fixed;pointer-events:none;z-index:99998;width:40px;height:40px;border:1px solid rgba(200,255,0,.4);border-radius:50%;transform:translate(-50%,-50%);mix-blend-mode:difference;left:-100px;top:-100px;';
    ring.style.cssText = 'position:fixed;pointer-events:none;z-index:99997;width:80px;height:80px;border:1px solid rgba(200,255,0,.12);border-radius:50%;transform:translate(-50%,-50%);left:-100px;top:-100px;';

    document.body.appendChild(ring);
    document.body.appendChild(follower);
    document.body.appendChild(cursor);

    const cursorX = gsap.quickTo(cursor, 'left', { duration: 0.15, ease: 'power3.out' });
    const cursorY = gsap.quickTo(cursor, 'top', { duration: 0.15, ease: 'power3.out' });
    const followX = gsap.quickTo(follower, 'left', { duration: 0.35, ease: 'power3.out' });
    const followY = gsap.quickTo(follower, 'top', { duration: 0.35, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'left', { duration: 0.6, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'top', { duration: 0.6, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      cursorX(e.clientX); cursorY(e.clientY);
      followX(e.clientX); followY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
    };
    const onEnter = () => gsap.to(cursor, { width: 60, height: 60, background: 'rgba(200,255,0,.15)', duration: 0.25 });
    const onLeave = () => gsap.to(cursor, { width: 8, height: 8, background: '#C8FF00', duration: 0.25 });

    const interactive = document.querySelectorAll('a,button,[data-magnetic]');
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      [cursor, follower, ring].forEach((el) => { if (el.parentNode) el.parentNode.removeChild(el); });
    };
  }, []);
  return null;
}

function NoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255;
        imageData.data[i] = v; imageData.data[i + 1] = v; imageData.data[i + 2] = v; imageData.data[i + 3] = 8;
      }
      ctx.putImageData(imageData, 0, 0);
    };
    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6, mixBlendMode: 'overlay' }} />;
}

function FloatingOrbs() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,255,0,.04) 0%, transparent 70%)', top: '-10%', right: '-5%', animation: 'orbFloat1 20s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,200,255,.03) 0%, transparent 70%)', bottom: '-20%', left: '-15%', animation: 'orbFloat2 25s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,100,255,.035) 0%, transparent 70%)', top: '40%', left: '30%', animation: 'orbFloat3 18s ease-in-out infinite' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────
   GSAP SCROLL-REVEAL HOOK
   Replaces the old IntersectionObserver based useReveal.
   Initial opacity is set inline (style={{opacity:0}}) by each
   consumer to avoid a flash-of-visible-content before GSAP mounts.
───────────────────────────────────────────────── */
function useReveal<T extends HTMLElement = HTMLDivElement>(opts?: { y?: number; delay?: number; x?: number }) {
  const ref = useRef<T>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || !isBrowser) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: opts?.y ?? 40, x: opts?.x ?? 0 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.9,
          delay: opts?.delay ?? 0,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      );
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts?.y, opts?.delay, opts?.x]);
  return ref;
}

function Typewriter({ strings }: { strings: string[] }) {
  const [text, setText] = useState('');
  const [si, setSi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = strings[si];
    const speed = deleting ? 40 : 80;
    const pause = !deleting && ci === current.length ? 2200 : 0;
    const t = setTimeout(() => {
      if (!deleting && ci < current.length) { setText(current.slice(0, ci + 1)); setCi(ci + 1); }
      else if (!deleting && ci === current.length) setDeleting(true);
      else if (deleting && ci > 0) { setText(current.slice(0, ci - 1)); setCi(ci - 1); }
      else { setDeleting(false); setSi((si + 1) % strings.length); }
    }, pause || speed);
    return () => clearTimeout(t);
  }, [text, si, ci, deleting, strings]);
  return (
    <span style={{ fontFamily: "'Space Mono', monospace", color: '#C8FF00' }}>
      {text}<span style={{ borderRight: '2px solid #C8FF00', animation: 'blink 1s step-end infinite', marginLeft: 2 }} />
    </span>
  );
}

function Navbar({ sections }: { sections: { label: string; ref: React.RefObject<HTMLDivElement | null> }[] }) {
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;
    const onResize = () => setIsCompact(window.innerWidth < 980);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (ref: React.RefObject<HTMLDivElement | null>, i: number) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setActive(i);
    setMenuOpen(false);
  };

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? 'rgba(8,8,10,.92)' : 'transparent', backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none', borderBottom: scrolled ? '1px solid rgba(200,255,0,.08)' : 'none', transition: 'all .5s cubic-bezier(.4,0,.2,1)', padding: isCompact ? '0 1rem' : '0 clamp(1.5rem,5vw,4rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: isCompact ? 64 : 72 }}>
      <button
        type="button"
        onClick={() => go(sections[0].ref, 0)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C8FF00', fontSize: isCompact ? 10 : 11, fontWeight: 700, letterSpacing: 2, fontFamily: "'Space Mono', monospace" }}
      >
        RENALDI SIMAMORA
      </button>

      {!isCompact && (
        <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {sections.map((s, idx) => (
            <button key={s.label} onClick={() => go(s.ref, idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: active === idx ? '#C8FF00' : 'rgba(180,190,200,.5)', fontSize: 11, fontWeight: 600, letterSpacing: 2, padding: '8px 14px', borderRadius: 4, fontFamily: "'Space Mono', monospace", transition: 'color .25s', position: 'relative' }}>
              {s.label.toUpperCase()}
              {active === idx && <div style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 20, height: 1, background: '#C8FF00' }} />}
            </button>
          ))}
        </div>
      )}

      {isCompact && (
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(200,255,0,.25)', borderRadius: 10, color: '#C8FF00', padding: '7px 10px', fontSize: 10, fontFamily: "'Space Mono', monospace", letterSpacing: 1.4, cursor: 'pointer' }}
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      )}

      {!isCompact && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1px solid rgba(200,255,0,.2)', borderRadius: 50, fontSize: 11, fontFamily: "'Space Mono', monospace", color: 'rgba(200,255,0,.7)', letterSpacing: 1 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8FF00', boxShadow: '0 0 8px #C8FF00', animation: 'pulse 2s ease-in-out infinite' }} />
          AVAILABLE
        </div>
      )}

      {isCompact && menuOpen && (
        <div style={{ position: 'absolute', top: 70, left: 12, right: 12, background: 'rgba(8,8,10,.98)', border: '1px solid rgba(200,255,0,.15)', borderRadius: 14, padding: 10, display: 'grid', gap: 4 }}>
          {sections.map((s, idx) => (
            <button
              key={s.label}
              onClick={() => go(s.ref, idx)}
              style={{ textAlign: 'left', background: active === idx ? 'rgba(200,255,0,.08)' : 'transparent', border: '1px solid transparent', borderRadius: 10, cursor: 'pointer', color: active === idx ? '#C8FF00' : 'rgba(210,220,230,.82)', fontSize: 11, fontWeight: 600, letterSpacing: 1.2, padding: '10px 12px', fontFamily: "'Space Mono', monospace" }}
            >
              {s.label.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────────
   SECTION HEADING
───────────────────────────────────────────────── */
function SectionHeading({ children, index }: { children: React.ReactNode; index: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} style={{ opacity: 0, marginBottom: '5rem', position: 'relative' }}>
      <div style={{ fontSize: 'clamp(80px,12vw,160px)', fontWeight: 900, color: 'rgba(255,255,255,.02)', fontFamily: "'Space Mono', monospace", position: 'absolute', top: '-.6em', left: '-.05em', lineHeight: 1, userSelect: 'none', letterSpacing: -4, pointerEvents: 'none' }}>{index}</div>
      <div style={{ position: 'relative' }}>
        <div style={{ fontSize: 11, letterSpacing: 5, color: '#C8FF00', fontFamily: "'Space Mono', monospace", marginBottom: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 32, height: 1, background: '#C8FF00' }} />SECTION {index}
        </div>
        <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, color: '#F0F4F8', margin: 0, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: -2, lineHeight: 1.1 }}>{children}</h2>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────────── */
function Section({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   KEY COMPETENCIES CARD
───────────────────────────────────────────────── */
function CompetencyCard({ group, index }: { group: CompetencyGroup; index: number }) {
  const ref = useReveal<HTMLDivElement>({ delay: index * 0.1 });
  return (
    <div ref={ref} style={{ opacity: 0, background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 18, padding: '1.8rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,${group.accent},transparent)` }} />
      <div style={{ fontSize: 10, color: group.accent, fontFamily: "'Space Mono',monospace", letterSpacing: 2, marginBottom: 16, textTransform: 'uppercase' }}>{group.category}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {group.items.map((item) => (
          <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'rgba(210,220,230,.75)', lineHeight: 1.6 }}>
            <span style={{ color: group.accent, marginTop: 2, flexShrink: 0 }}>▹</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   PROJECT CARD (tilt now driven by gsap.quickTo for smoothness)
───────────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
  const quickRotX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickRotY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const revealRef = useReveal<HTMLDivElement>({ delay: (index % 3) * 0.08 });

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion()) return;
    quickRotX.current = gsap.quickTo(cardRef.current, 'rotateX', { duration: 0.5, ease: 'power3.out' });
    quickRotY.current = gsap.quickTo(cardRef.current, 'rotateY', { duration: 0.5, ease: 'power3.out' });
  }, []);

  const onMM = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setGlow({ x: px * 100, y: py * 100 });
    quickRotX.current?.((py - 0.5) * -10);
    quickRotY.current?.((px - 0.5) * 10);
  };
  const onEnter = () => { setHovered(true); if (cardRef.current) gsap.to(cardRef.current, { y: -12, duration: 0.5, ease: 'power3.out' }); };
  const onLeave = () => {
    setHovered(false);
    quickRotX.current?.(0);
    quickRotY.current?.(0);
    if (cardRef.current) gsap.to(cardRef.current, { y: 0, duration: 0.5, ease: 'power3.out' });
  };

  return (
    <div ref={revealRef} style={{ opacity: 0 }}>
      <div
        ref={cardRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={onMM}
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.02))',
          border: `1px solid ${hovered ? 'rgba(200,255,0,.3)' : 'rgba(255,255,255,.06)'}`,
          borderRadius: 22,
          overflow: 'hidden',
          cursor: 'pointer',
          transform: `perspective(1000px) rotateX(${hovered ? '0deg' : '0deg'}) rotateY(${hovered ? '0deg' : '0deg'})`,
          transition: 'border-color .3s, box-shadow .3s',
          boxShadow: hovered ? '0 30px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(200,255,0,.1)' : '0 4px 20px rgba(0,0,0,.2)',
        }}
      >
        <div style={{ overflow: 'hidden', height: 220, position: 'relative', background: 'rgba(255,255,255,.03)' }}>
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform .7s cubic-bezier(.4,0,.2,1)', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: hovered ? 'linear-gradient(to bottom,rgba(8,8,10,.1),rgba(8,8,10,.7))' : 'linear-gradient(to bottom,rgba(8,8,10,.2),rgba(8,8,10,.8))', transition: 'background .4s' }} />
          <div style={{ position: 'absolute', top: 16, right: 20, fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'rgba(200,255,0,.6)', letterSpacing: 2 }}>{String(index + 1).padStart(2, '0')}</div>
          <div style={{ position: 'absolute', left: 16, bottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 'calc(100% - 32px)' }}>
            {(project.technologies ?? []).slice(0, 4).map((tech) => (
              <span key={tech} style={{ padding: '6px 10px', borderRadius: 999, background: 'rgba(8,8,10,.65)', border: '1px solid rgba(200,255,0,.18)', fontSize: 10, color: '#F0F4F8', fontFamily: "'Space Mono',monospace", letterSpacing: .8, backdropFilter: 'blur(10px)' }}>
                {tech}
              </span>
            ))}
          </div>
          {hovered && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(circle at ${glow.x}% ${glow.y}%,rgba(200,255,0,.08) 0%,transparent 60%)` }} />}
        </div>
        <div style={{ padding: '1.8rem' }}>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
          >
            <h3 style={{ color: '#F0F4F8', fontSize: 17, fontWeight: 700, margin: '0 0 10px', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: -.5 }}>{project.title}</h3>
            <p style={{ color: 'rgba(180,190,200,.6)', fontSize: 14, lineHeight: 1.75, margin: '0 0 1rem' }}>
              {project.description}
            </p>
            <div style={{ fontSize: 11, color: 'rgba(200,255,0,.55)', fontFamily: "'Space Mono',monospace", letterSpacing: 1, marginBottom: '1.1rem' }}>
              {expanded ? 'Tutup detail' : 'Klik untuk lihat detail project'}
            </div>
          </button>
          <div style={{ maxHeight: expanded ? 320 : 0, opacity: expanded ? 1 : 0, overflow: 'hidden', transition: 'max-height .35s ease, opacity .25s ease', marginBottom: expanded ? '1.2rem' : 0 }}>
            <div style={{ display: 'grid', gap: 10, paddingTop: expanded ? 2 : 0 }}>
              {(project.details ?? []).map((detail) => (
                <div key={detail.label} style={{ padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.06)' }}>
                  <div style={{ fontSize: 10, color: '#C8FF00', fontFamily: "'Space Mono',monospace", letterSpacing: 2, marginBottom: 6, textTransform: 'uppercase' }}>{detail.label}</div>
                  <div style={{ color: 'rgba(240,244,248,.72)', fontSize: 13, lineHeight: 1.7 }}>{detail.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.2rem' }}>
            {(project.technologies ?? []).map((tech) => (
              <span key={tech} style={{ padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', fontSize: 10, color: 'rgba(240,244,248,.75)', fontFamily: "'Space Mono',monospace", letterSpacing: .8 }}>
                {tech}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {project.links.map((link) => (
              <a key={link.url + link.text} href={link.url} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 14px', borderRadius: 999, background: link.url === '#' ? 'rgba(255,255,255,.03)' : 'rgba(200,255,0,.08)', border: `1px solid ${link.url === '#' ? 'rgba(255,255,255,.08)' : 'rgba(200,255,0,.2)'}`, color: link.url === '#' ? 'rgba(240,244,248,.65)' : '#C8FF00', textDecoration: 'none', fontSize: 11, fontFamily: "'Space Mono',monospace", letterSpacing: 1, transition: 'transform .25s, background .25s, border-color .25s' }}>
                {link.text}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: "'Space Mono',monospace", color: hovered ? '#C8FF00' : 'rgba(200,255,0,.4)', transition: 'color .3s', letterSpacing: 1, marginTop: 14 }}>
            VIEW PROJECT <span style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform .3s', display: 'inline-block' }}>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertCard({ cert, index }: { cert: typeof certifications[0]; index: number }) {
  const ref = useReveal<HTMLDivElement>({ delay: (index % 6) * 0.06, y: 30 });
  return (
    <div ref={ref} style={{ opacity: 0, background: 'rgba(255,255,255,.02)', border: '1px solid rgba(200,255,0,.1)', borderRadius: 16, padding: '1.6rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,#C8FF00,transparent)' }} />
      <div style={{ fontSize: 9, color: '#C8FF00', fontFamily: "'Space Mono',monospace", letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' }}>{cert.category}</div>
      <h4 style={{ fontSize: 15, fontWeight: 700, color: '#F0F4F8', margin: '0 0 6px', fontFamily: "'Space Grotesk',sans-serif" }}>{cert.title}</h4>
      <p style={{ fontSize: 13, color: 'rgba(240,244,248,.5)', margin: '0 0 8px' }}>{cert.issuer}</p>
      <div style={{ fontSize: 10, color: 'rgba(200,255,0,.5)', fontFamily: "'Space Mono',monospace" }}>{cert.date}</div>
    </div>
  );
}

function EducationCard({ edu }: { edu: EducationEntry }) {
  const ref = useReveal<HTMLDivElement>({ y: 30 });
  return (
    <div ref={ref} style={{ opacity: 0, background: 'rgba(255,255,255,.02)', border: '1px solid rgba(200,255,0,.1)', borderRadius: 16, padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,${edu.accent},transparent)` }} />
      <div style={{ fontSize: 10, color: edu.accent, fontFamily: "'Space Mono',monospace", letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' }}>{edu.level}</div>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: '#F0F4F8', margin: '0 0 6px', fontFamily: "'Space Grotesk',sans-serif" }}>{edu.degree}</h3>
      <p style={{ fontSize: 14, color: `${edu.accent}cc`, fontFamily: "'Space Mono',monospace", margin: '0 0 12px', fontWeight: 600 }}>{edu.institution}</p>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: 'rgba(240,244,248,.5)', fontFamily: "'Space Mono',monospace", letterSpacing: 1, marginBottom: 4 }}>PERIOD</div>
        <div style={{ fontSize: 14, color: '#F0F4F8', fontWeight: 600 }}>{edu.startDate} – {edu.endDate}</div>
      </div>
      <p style={{ fontSize: 13, color: 'rgba(240,244,248,.6)', lineHeight: 1.7 }}>{edu.description}</p>
    </div>
  );
}

function SkillItem({ skill }: { skill: typeof skills[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '1.8rem 1rem', borderRadius: 16, background: hovered ? 'rgba(200,255,0,.05)' : 'rgba(255,255,255,.02)', border: `1px solid ${hovered ? 'rgba(200,255,0,.25)' : 'rgba(255,255,255,.05)'}`, transform: hovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)', transition: 'all .35s cubic-bezier(.34,1.56,.64,1)', cursor: 'default' }}>
      <img src={skill.image} alt={skill.alt} width={48} height={48} style={{ filter: hovered ? 'none' : 'grayscale(70%) opacity(.6)', transition: 'filter .3s' }} />
      <span style={{ fontSize: 10, color: hovered ? 'rgba(200,255,0,.8)' : 'rgba(180,190,200,.4)', fontFamily: "'Space Mono',monospace", letterSpacing: 1.5, transition: 'color .3s' }}>{skill.alt.toUpperCase()}</span>
    </div>
  );
}

function TimelineItem({ item, index, mobile = false }: { item: ExperienceEntry; index: number; mobile?: boolean }) {
  const isLeft = index % 2 === 0;
  const accent = isLeft ? '#C8FF00' : '#00C8FF';
  const ref = useReveal<HTMLDivElement>({ delay: index * 0.12, x: isLeft ? -40 : 40, y: 20 });
  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,.025)',
    border: `1px solid ${isLeft ? 'rgba(200,255,0,.15)' : 'rgba(0,200,255,.15)'}`,
    borderRadius: 16, padding: '1.5rem', maxWidth: 340, width: '100%',
    position: 'relative', overflow: 'hidden',
  };
  const renderCard = () => (
    <div style={cardStyle}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${accent},transparent)` }} />
      <div style={{ fontSize: 10, color: accent, fontFamily: "'Space Mono',monospace", marginBottom: 10, letterSpacing: 2 }}>{item.startDate} — {item.endDate}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#F0F4F8', marginBottom: 4, fontFamily: "'Space Grotesk',sans-serif" }}>{item.jobTitle}</div>
      <div style={{ fontSize: 13, color: 'rgba(180,190,200,.55)' }}>{item.company}</div>
      <div style={{ fontSize: 10, color: accent + '99', marginTop: 10, marginBottom: item.highlights?.length ? 10 : 0, fontFamily: "'Space Mono',monospace", letterSpacing: 1 }}>{item.status}</div>
      {item.highlights?.length > 0 && (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {item.highlights.map((h) => (
            <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: 'rgba(200,210,220,.65)', lineHeight: 1.5 }}>
              <span style={{ color: accent, marginTop: 1 }}>•</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  if (mobile) {
    return (
      <div ref={ref} style={{ opacity: 0, marginBottom: '1.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 14 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: accent, boxShadow: `0 0 14px ${accent}88` }} />
            <div style={{ width: 1, flex: 1, minHeight: 28, background: 'rgba(255,255,255,.12)', marginTop: 8 }} />
          </div>
          <div style={{ flex: 1 }}>
            {renderCard()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ opacity: 0, display: 'grid', gridTemplateColumns: '1fr 40px 1fr', alignItems: 'start', marginBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 32 }}>
        {isLeft ? renderCard() : <div />}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: accent, boxShadow: `0 0 16px ${accent}88` }} />
      </div>
      <div style={{ paddingLeft: 32 }}>
        {!isLeft ? renderCard() : <div />}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   STAT ITEM — GSAP-driven count-up
───────────────────────────────────────────────── */
function StatItem({ value, label }: { value: string; label: string }) {
  const ref = useReveal<HTMLDivElement>();
  const numRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    const numEl = numRef.current;
    if (!el || !numEl || !isBrowser || prefersReducedMotion()) return;
    const numeric = parseInt(value.replace(/\D/g, ''), 10);
    const suffix = value.replace(/[0-9]/g, '');
    if (Number.isNaN(numeric)) return;

    const ctx = gsap.context(() => {
      const counter = { n: 0 };
      gsap.to(counter, {
        n: numeric,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
        onUpdate: () => { numEl.textContent = Math.round(counter.n) + suffix; },
      });
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div ref={ref} style={{ opacity: 0, textAlign: 'center' }}>
      <div ref={numRef} style={{ fontSize: 'clamp(40px,5vw,64px)', fontWeight: 900, fontFamily: "'Space Mono',monospace", color: '#C8FF00', lineHeight: 1, marginBottom: 8 }}>
        {/\d/.test(value) ? '0' : value}
      </div>
      <div style={{ fontSize: 11, letterSpacing: 3, color: 'rgba(180,190,200,.5)', fontFamily: "'Space Mono',monospace", textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
  const scramble = useCallback(() => {
    let iter = 0;
    const max = text.length * 3;
    const id = setInterval(() => {
      setDisplay(text.split('').map((ch, i) => (i < iter / 3 ? ch : ch === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)])).join(''));
      iter++;
      if (iter > max) { clearInterval(id); setDisplay(text); }
    }, 30);
  }, [text, chars]);
  useEffect(() => { scramble(); }, [scramble]);
  return <span onMouseEnter={scramble} style={{ cursor: 'default', letterSpacing: 'inherit' }}>{display}</span>;
}

/* ─────────────────────────────────────────────────
   WHAT I DO
───────────────────────────────────────────────── */
interface WhatIDoEntry {
  title: string;
  description: string;
  icon: string;
  accent: string;
}

const WHAT_I_DO: WhatIDoEntry[] = [
  {
    title: 'Fullstack Web Development',
    description: 'Build fullstack web applications, from responsive frontend interfaces to backend APIs and database integration.',
    icon: '💻',
    accent: '#C8FF00',
  },
  {
    title: 'IT System Support',
    description: 'Support and maintain IT systems, including ERP monitoring, infrastructure upkeep, and day-to-day technical operations.',
    icon: '🛠️',
    accent: '#00C8FF',
  },
  {
    title: 'Troubleshooting & Debugging',
    description: 'Troubleshoot and debug technical issues across software and systems, identifying root causes and shipping reliable fixes.',
    icon: '🔍',
    accent: '#FF00C8',
  },
];

function WhatIDoCard({ item, index }: { item: WhatIDoEntry; index: number }) {
  const ref = useReveal<HTMLDivElement>({ delay: index * 0.12 });
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      data-magnetic
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: 0,
        transition: 'border-color .3s, background .3s',
        background: hovered ? item.accent + '08' : 'rgba(255,255,255,.02)',
        border: `1px solid ${hovered ? item.accent + '40' : 'rgba(255,255,255,.06)'}`,
        borderRadius: 18,
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,${item.accent},transparent)` }} />
      <div style={{ fontSize: 28, marginBottom: 18 }}>{item.icon}</div>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F0F4F8', margin: '0 0 10px', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: -.5 }}>{item.title}</h3>
      <p style={{ fontSize: 13.5, color: 'rgba(200,210,220,.6)', lineHeight: 1.75, margin: 0 }}>{item.description}</p>
    </div>
  );
}

const ORBIT_COLORS = ['#FF6B35', '#2965F1', '#F7DF1E', '#3178C6', '#38BDF8', '#539E43', '#61DAFB', '#00ADD8', '#3776AB', '#FF6B35', '#2965F1', '#F7DF1E'];

function CinematicOrbit({ items }: { items: { image: string; alt: string }[] }) {
  const SIZE = 620;
  const RADIUS = SIZE * 0.375;
  const TRACK_D = RADIUS * 2;
  const wrapRef = useReveal<HTMLDivElement>();

  return (
    <div ref={wrapRef} style={{ opacity: 0, display: 'flex', justifyContent: 'center', padding: '2rem 0', overflow: 'hidden' }}>
      <style>{`
        @keyframes orbitCW { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes counterCCW { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(-360deg)} }
        @keyframes arcGlow { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes nebulaPulse { 0%,100%{opacity:.6;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.9;transform:translate(-50%,-50%) scale(1.06)} }
        @keyframes ringGlow { 0%,100%{opacity:.4} 50%{opacity:.9} }
        @keyframes dotOrbitAnim { from{transform:translate(-50%,-50%) rotate(0deg) translateX(var(--dot-r)) scale(1)} to{transform:translate(-50%,-50%) rotate(360deg) translateX(var(--dot-r)) scale(1)} }
      `}</style>

      <div style={{ width: SIZE, height: SIZE, position: 'relative', flexShrink: 0, maxWidth: '100%' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', width: SIZE * 0.5, height: SIZE * 0.5, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%,rgba(99,150,255,.18) 0%,transparent 45%),radial-gradient(circle at 65% 70%,rgba(167,100,255,.14) 0%,transparent 40%),radial-gradient(circle at 50% 50%,rgba(0,200,255,.07) 0%,transparent 60%)', filter: 'blur(20px)', animation: 'nebulaPulse 6s ease-in-out infinite', pointerEvents: 'none' }} />

        {[0.5, 0.65, 0.8].map((scale, ri) => (
          <div key={ri} style={{ position: 'absolute', left: '50%', top: '50%', width: SIZE * scale, height: SIZE * scale, transform: 'translate(-50%,-50%)', borderRadius: '50%', border: ri === 0 ? '1.5px solid rgba(200,255,0,.07)' : ri === 1 ? '1px solid rgba(99,179,255,.1)' : '.5px solid rgba(255,255,255,.04)', animation: `ringGlow ${5 + ri * 2}s ease-in-out infinite ${ri * 0.8}s`, pointerEvents: 'none' }} />
        ))}

        <div style={{ position: 'absolute', left: '50%', top: '50%', width: TRACK_D, height: TRACK_D, transform: 'translate(-50%,-50%)', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.08)', boxShadow: '0 0 0 1px rgba(200,255,0,.03),0 0 50px rgba(99,150,255,.06) inset', pointerEvents: 'none' }} />

        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          width: TRACK_D, height: TRACK_D,
          animation: 'arcGlow 22s linear infinite',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg,rgba(200,255,0,.6) 0deg,rgba(0,200,255,.4) 80deg,rgba(167,100,255,.35) 170deg,rgba(255,80,100,.25) 260deg,transparent 340deg,rgba(200,255,0,.6) 360deg)',
          maskImage: 'radial-gradient(circle, transparent calc(50% - 4px), black calc(50% - 3px), black 50%, transparent 50%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent calc(50% - 4px), black calc(50% - 3px), black 50%, transparent 50%)',
          opacity: 0.75,
          pointerEvents: 'none',
        }} />

        {Array.from({ length: 8 }).map((_, mi) => {
          const col = ORBIT_COLORS[mi % ORBIT_COLORS.length];
          const speed = 9 + (mi % 4) * 2.5;
          const startAngle = (mi / 8) * 360;
          const style = { '--dot-r': `${RADIUS}px` } as React.CSSProperties;
          return (
            <div key={`d-${mi}`} style={{
              ...style,
              position: 'absolute' as const,
              left: '50%',
              top: '50%',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: col,
              boxShadow: `0 0 10px ${col}, 0 0 20px ${col}`,
              filter: 'blur(0.5px)',
              transform: `translate(-50%,-50%) rotate(${startAngle}deg) translateX(${RADIUS}px)`,
              animation: `dotOrbitAnim ${speed}s linear infinite`,
            }} />
          );
        })}

        {items.map((it, idx) => {
          const n = items.length;
          const color = ORBIT_COLORS[idx % ORBIT_COLORS.length];
          const delay = -((idx / n) * 28);
          return (
            <div key={it.alt} style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, animation: 'orbitCW 28s linear infinite', animationDelay: `${delay}s` }}>
              <div style={{ position: 'absolute', left: RADIUS, top: 0, transform: 'translate(-50%,-50%)', animation: 'counterCCW 28s linear infinite', animationDelay: `${delay}s` }}>
                <div style={{ position: 'absolute', inset: -16, borderRadius: '50%', background: `radial-gradient(circle,${color}25 0%,transparent 70%)`, filter: 'blur(8px)', pointerEvents: 'none' }} />
                <div style={{ width: 78, height: 78, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,10,18,.88)', border: `2px solid ${color}`, boxShadow: `0 0 14px ${color}60,0 0 4px ${color}30 inset`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%,rgba(255,255,255,.14),transparent 60%)', borderRadius: '50%' }} />
                  <img src={it.image} alt={it.alt} width={44} height={44} style={{ objectFit: 'contain', position: 'relative', zIndex: 1, display: 'block' }} />
                </div>
              </div>
            </div>
          );
        })}

        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', pointerEvents: 'none', zIndex: 2 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: 'rgba(200,255,0,.5)', fontFamily: "'Space Mono',monospace", marginBottom: 10 }}>SECTION 06</div>
          <div style={{ fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 800, color: '#F0F4F8', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: -.5, lineHeight: 1.2 }}>Skills &<br />Tools</div>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8FF00', margin: '16px auto 0', boxShadow: '0 0 12px #C8FF00,0 0 24px rgba(200,255,0,.4)' }} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────── */
export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const compRef = useRef<HTMLDivElement>(null);
  const whatRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const projRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const ctRef = useRef<HTMLDivElement>(null);

  // Hero refs for the GSAP entrance timeline
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroLine1Ref = useRef<HTMLHeadingElement>(null);
  const heroLine2Ref = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);

  const navSections = [
    { label: 'Home', ref: heroRef },
    { label: 'About', ref: aboutRef },
    { label: 'Competencies', ref: compRef },
    { label: 'What I Do', ref: whatRef },
    { label: 'Exp', ref: expRef },
    { label: 'Projects', ref: projRef },
    { label: 'Tools', ref: skillsRef },
    { label: 'Certs', ref: certRef },
    { label: 'Contact', ref: ctRef },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // GSAP hero entrance timeline — runs once on mount, client-only.
  useIsoLayoutEffect(() => {
    if (!isBrowser) return;
    const nodes = [heroBadgeRef.current, heroLine1Ref.current, heroLine2Ref.current, heroSubRef.current, heroCtaRef.current, heroScrollRef.current];
    if (nodes.some((n) => !n)) return;

    if (prefersReducedMotion()) {
      gsap.set(nodes, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(nodes, { opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(heroBadgeRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(heroLine1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.25')
        .fromTo(heroLine2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
        .fromTo(heroCtaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
        .fromTo(heroScrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2');
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: '#08080A', minHeight: '100vh', color: '#F0F4F8', fontFamily: "'Space Grotesk','Segoe UI',sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes pulse    { 0%,100%{opacity:1;box-shadow:0 0 8px #C8FF00} 50%{opacity:.5;box-shadow:0 0 4px #C8FF00} }
        @keyframes rotate   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes rotateCCW{ from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes orbFloat1{ 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-40px,30px) scale(1.05)} }
        @keyframes orbFloat2{ 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(60px,-40px) scale(.95)} }
        @keyframes orbFloat3{ 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,50px)} }
        @keyframes shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::selection { background:rgba(200,255,0,.2); color:#C8FF00; }
        ::-webkit-scrollbar{ width:4px; }
        ::-webkit-scrollbar-track{ background:#08080A; }
        ::-webkit-scrollbar-thumb{ background:rgba(200,255,0,.2); border-radius:2px; }
        ::-webkit-scrollbar-thumb:hover{ background:rgba(200,255,0,.4); }
        html{ scroll-behavior:smooth; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <NoiseBackground />
      <FloatingOrbs />
      <MagneticCursor />
      <Navbar sections={navSections} />

      {/* ══ HERO ══ */}
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '0 clamp(1.5rem,5vw,4rem)', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(200,255,0,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(200,255,0,.02) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{ width: 'clamp(96px,18vw,132px)', height: 'clamp(96px,18vw,132px)', borderRadius: '50%', padding: 4, background: 'linear-gradient(135deg, rgba(200,255,0,.95), rgba(0,200,255,.9))', boxShadow: '0 12px 40px rgba(0,0,0,.35)' }}>
              <img
                src="/pass%20foto%20renaldi.jpeg"
                alt="Renaldi Simamora professional photo"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '2px solid rgba(8,8,10,.7)', display: 'block' }}
              />
            </div>
          </div>

          <div ref={heroBadgeRef} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 18px', borderRadius: 50, border: '1px solid rgba(200,255,0,.2)', background: 'rgba(200,255,0,.05)', fontSize: 11, fontFamily: "'Space Mono',monospace", color: 'rgba(200,255,0,.7)', letterSpacing: 3, marginBottom: 24 }}>
            <span>↳</span> HELLO WORLD, I'M
          </div>

          <h1 ref={heroLine1Ref} style={{ fontSize: 'clamp(44px,8vw,96px)', fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", letterSpacing: -4, lineHeight: .95, margin: '0 0 8px', background: 'linear-gradient(135deg,#F0F4F8 0%,rgba(240,244,248,.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Renaldi
          </h1>
          <h1 ref={heroLine2Ref} style={{ fontSize: 'clamp(44px,8vw,96px)', fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", letterSpacing: -4, lineHeight: 1, margin: '0 0 32px' }}>
            <span style={{ background: 'linear-gradient(135deg,#C8FF00 0%,#00C8FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto', animation: 'shimmer 4s linear infinite' }}>Simamora</span>
          </h1>

          <div ref={heroSubRef} style={{ fontSize: 'clamp(15px,2vw,20px)', marginBottom: 48, height: 32 }}>
            <Typewriter strings={['Software Engineer', 'Frontend Developer', 'IoT Development', 'Fullstack Web Developer', 'Hardware Engineer', 'Data Enthusiast']} />
          </div>

          <div ref={heroCtaRef} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => aboutRef.current?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '14px 36px', borderRadius: 50, fontWeight: 700, fontSize: 13, background: '#C8FF00', border: 'none', color: '#08080A', cursor: 'pointer', letterSpacing: 2, fontFamily: "'Space Mono',monospace", transition: 'transform .2s,box-shadow .2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(200,255,0,.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
              EXPLORE WORK ↓
            </button>
            <button onClick={() => ctRef.current?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '14px 36px', borderRadius: 50, fontWeight: 700, fontSize: 13, background: 'transparent', border: '1px solid rgba(200,255,0,.3)', color: '#C8FF00', cursor: 'pointer', letterSpacing: 2, fontFamily: "'Space Mono',monospace", transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,255,0,.08)'; e.currentTarget.style.borderColor = '#C8FF00'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(200,255,0,.3)'; }}>
              GET IN TOUCH
            </button>
          </div>
        </div>

        <div ref={heroScrollRef} style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom,transparent,rgba(200,255,0,.4))' }} />
          <div style={{ fontSize: 9, letterSpacing: 4, color: 'rgba(200,255,0,.4)', fontFamily: "'Space Mono',monospace", writingMode: 'vertical-lr' }}>SCROLL DOWN</div>
        </div>
        <div style={{ position: 'absolute', top: 90, right: 24, fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'rgba(200,255,0,.15)', letterSpacing: 2 }}>West Jakarta // DKI JAKARTA</div>
      </section>

      {/* ══ ABOUT ══ */}
      <section ref={aboutRef} style={{ padding: '8rem clamp(1.5rem,5vw,4rem)', position: 'relative', borderTop: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Section>
            <SectionHeading index="01">About Me</SectionHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'rgba(200,255,0,.4)', marginBottom: 20, letterSpacing: 2 }}>{'// bio.tsx'}</div>
                <p style={{ color: 'rgba(200,210,220,.75)', lineHeight: 2, fontSize: 15.5, borderLeft: '2px solid rgba(200,255,0,.15)', paddingLeft: 20 }}>{summary}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,.05)' }}>
                  <StatItem value="3" label="Projects Shipped" />
                  <StatItem value="15+" label="Certifications" />
                  <StatItem value="3.46" label="GPA" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {([
                  { label: 'Location', value: 'West Jakarta, ID', icon: '📍', accent: '#C8FF00' },
                  { label: 'Status', value: 'Open to Work / Internship', icon: '●', accent: '#C8FF00' },
                  { label: 'Focus', value: 'Full-Stack Dev', icon: '⚡', accent: '#00C8FF' },
                  { label: 'Study', value: 'IPB University', icon: '🎓', accent: '#FF00C8' },
                ] as { label: string; value: string; icon: string; accent: string }[]).map(item => (
                  <div key={item.label} data-magnetic style={{ padding: '1.5rem', borderRadius: 16, background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.06)', position: 'relative', overflow: 'hidden', transition: 'border-color .3s,background .3s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = item.accent + '40'; e.currentTarget.style.background = item.accent + '08'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.06)'; e.currentTarget.style.background = 'rgba(255,255,255,.02)'; }}>
                    <div style={{ fontSize: 20, marginBottom: 12 }}>{item.icon}</div>
                    <div style={{ fontSize: 10, color: item.accent, fontFamily: "'Space Mono',monospace", letterSpacing: 2, marginBottom: 6, opacity: .7 }}>{item.label.toUpperCase()}</div>
                    <div style={{ fontSize: 14, color: '#F0F4F8', fontWeight: 600 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ══ KEY COMPETENCIES ══ */}
      <section ref={compRef} style={{ padding: '8rem clamp(1.5rem,5vw,4rem)', background: 'rgba(255,255,255,.01)', borderTop: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Section>
            <SectionHeading index="02">Key Competencies</SectionHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
              {KEY_COMPETENCIES.map((group, i) => (<CompetencyCard key={group.category} group={group} index={i} />))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ WHAT I DO ══ */}
      <section ref={whatRef} style={{ padding: '8rem clamp(1.5rem,5vw,4rem)', borderTop: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Section>
            <SectionHeading index="03">What I Do</SectionHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.5rem' }}>
              {WHAT_I_DO.map((item, i) => (<WhatIDoCard key={item.title} item={item} index={i} />))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section ref={expRef} style={{ padding: '8rem clamp(1.5rem,5vw,4rem)', background: 'rgba(255,255,255,.01)', borderTop: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Section>
            <SectionHeading index="04">Experience</SectionHeading>
            <div style={{ position: 'relative' }}>
              {!isMobile && <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom,transparent,rgba(200,255,0,.15) 15%,rgba(200,255,0,.15) 85%,transparent)', transform: 'translateX(-50%)' }} />}
              {EXPERIENCE.map((item, index) => (<TimelineItem key={item.company} item={item} index={index} mobile={isMobile} />))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section ref={projRef} style={{ padding: '8rem clamp(1.5rem,5vw,4rem)', borderTop: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Section>
            <SectionHeading index="05">Selected Work / Projects</SectionHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '1.5rem' }}>
              {projects.map((project, index) => (<ProjectCard key={project.title} project={project} index={index} />))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section ref={skillsRef} style={{ padding: '8rem clamp(1.5rem,5vw,4rem)', background: 'rgba(255,255,255,.01)', borderTop: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Section>
            <div style={{ fontSize: 11, letterSpacing: 5, color: '#C8FF00', fontFamily: "'Space Mono',monospace", marginBottom: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 32, height: 1, background: '#C8FF00' }} />SECTION 06
            </div>
            <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, color: '#F0F4F8', margin: '0 0 5rem', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: -2, lineHeight: 1.1 }}>Skills & Tools</h2>
            {!isMobile && <CinematicOrbit items={skills} />}
            <div style={{ marginTop: isMobile ? '0' : '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: '1rem' }}>
              {skills.map(skill => (<SkillItem key={skill.alt} skill={skill} />))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ CERTIFICATIONS ══ */}
      <section ref={certRef} style={{ padding: '8rem clamp(1.5rem,5vw,4rem)', borderTop: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Section>
            <SectionHeading index="07">Certifications</SectionHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
              {certifications.map((cert, i) => (<CertCard key={cert.title} cert={cert} index={i} />))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ EDUCATION ══ */}
      <section ref={eduRef} style={{ padding: '8rem clamp(1.5rem,5vw,4rem)', background: 'rgba(255,255,255,.01)', borderTop: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Section>
            <SectionHeading index="08">Education</SectionHeading>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {EDUCATION.map(edu => (<EducationCard key={edu.institution} edu={edu} />))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section ref={ctRef} style={{ padding: '8rem clamp(1.5rem,5vw,4rem)', borderTop: '1px solid rgba(255,255,255,.04)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)', fontSize: 'clamp(80px,18vw,220px)', fontWeight: 900, color: 'rgba(255,255,255,.015)', fontFamily: "'Space Mono',monospace", whiteSpace: 'nowrap', letterSpacing: -8, userSelect: 'none', pointerEvents: 'none', lineHeight: 1 }}>CONTACT</div>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <Section>
            <SectionHeading index="09">Let's Connect</SectionHeading>
            <p style={{ color: 'rgba(180,190,200,.55)', fontSize: 16, lineHeight: 1.8, maxWidth: 460, margin: '0 auto 3.5rem' }}>
              Have a project in mind or want to collaborate? My inbox is always open.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
              {([
                { href: 'mailto:renaldisimamora626@gmail.com', label: 'renaldisimamora626@gmail.com', icon: '✉', accent: '#C8FF00' },
                { href: 'https://wa.me/6285894410430', label: '+62 858 9441 0430', icon: '📱', accent: '#00C8FF' },
                { href: undefined, label: 'West Jakarta, Indonesia', icon: '📍', accent: '#FF00C8' },
              ] as { href?: string; label: string; icon: string; accent: string }[]).map(item => {
                const Tag = (item.href ? 'a' : 'div') as 'a' | 'div';
                return (
                  <Tag key={item.label} {...(item.href ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 24px', borderRadius: 50, background: 'rgba(255,255,255,.03)', border: `1px solid ${item.accent}30`, color: item.accent, textDecoration: 'none', fontSize: 14, fontFamily: "'Space Mono',monospace", transition: 'all .25s', cursor: item.href ? 'pointer' : 'default' }}
                    onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.background = item.accent + '10'; e.currentTarget.style.boxShadow = `0 0 30px ${item.accent}20`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <span>{item.icon}</span>{item.label}
                  </Tag>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '3rem' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.05)' }} />
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'rgba(180,190,200,.3)', letterSpacing: 3 }}>OR FIND ME ON</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.05)' }} />
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              {([
                {
                  href: 'https://instagram.com/rnldismrr', label: 'Instagram', accent: '#E1306C',
                  svg: <svg width="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>,
                },
                {
                  href: 'https://www.linkedin.com/in/renaldi-simamora-82a01428b/', label: 'LinkedIn', accent: '#0A66C2',
                  svg: <svg width="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
                },
                {
                  href: 'https://github.com/renaldi-simamora', label: 'GitHub', accent: '#F0F0F0',
                  svg: <svg width="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>,
                },
              ] as { href: string; label: string; accent: string; svg: React.ReactNode }[]).map(item => (
                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}
                  style={{ width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', color: 'rgba(180,190,200,.5)', textDecoration: 'none', transition: 'all .25s cubic-bezier(.34,1.56,.64,1)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = item.accent + '15'; e.currentTarget.style.borderColor = item.accent + '50'; e.currentTarget.style.color = item.accent; e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'; e.currentTarget.style.color = 'rgba(180,190,200,.5)'; e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}>
                  {item.svg}
                </a>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,.04)', padding: '1.5rem clamp(1.5rem,5vw,4rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontFamily: "'Space Mono',monospace", color: '#C8FF00', fontSize: 13, letterSpacing: 3 }}>
          <ScrambleText text="PORTFOLIO" />
        </div>
        <div style={{ fontSize: 11, color: 'rgba(180,190,200,.25)', fontFamily: "'Space Mono',monospace", letterSpacing: 1 }}>{'// © 2026 Renaldi Simamora — built with React & GSAP'}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {(['#C8FF00', '#00C8FF', '#FF00C8'] as string[]).map((c, i) => (
            <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', background: c, animation: `pulse 2s ease-in-out infinite ${i * .3}s`, boxShadow: `0 0 6px ${c}` }} />
          ))}
        </div>
      </footer>
    </div>
  );
}