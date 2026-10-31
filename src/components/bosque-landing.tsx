"use client";

import { FormEvent, useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { ArrowDown, ArrowUpRight, Bird, Check, Flame, Menu, Mountain, Trees, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const experiences = [
  { number: "01", title: "Senderos vivos", type: "EXPLORAR", description: "Caminatas guiadas para descubrir los secretos del monte, a tu propio ritmo.", icon: Mountain, className: "experience--trail", image: "/images/exp-senderos.avif", imageAlt: "Sendero de tierra entre árboles altos y helechos" },
  { number: "02", title: "Cabañas refugio", type: "DESCANSAR", description: "Arquitectura cálida, materiales nobles y el bosque como único horizonte.", icon: Trees, className: "experience--cabin", image: "/images/exp-cabanas.jpg", imageAlt: "Cabaña de madera integrada al paisaje del bosque" },
  { number: "03", title: "Noches de fogata", type: "COMPARTIR", description: "El crepitar de la leña, algo rico para compartir y un cielo sin apuro.", icon: Flame, className: "experience--fire", image: "/images/exp-fogata.avif", imageAlt: "Fogata encendida durante la noche en el bosque" },
  { number: "04", title: "Aves del monte", type: "CONTEMPLAR", description: "Una invitación a observar, escuchar y reconocer la vida que nos rodea.", icon: Bird, className: "experience--birds", image: "/images/exp-aves.jpg", imageAlt: "Ave del monte posada sobre una rama" },
];

const dayMoments = [
  { time: "06:18", title: "El bosque despierta", description: "La primera luz atraviesa las copas. El aire está fresco y todo empieza a moverse despacio.", label: "AMANECER", scene: "scene--dawn", image: "/images/dia-amanecer.avif" },
  { time: "09:40", title: "Seguir el sendero", description: "Con un guía local, descubrís huellas, aromas y rincones que no aparecen en los mapas.", label: "CAMINATA", scene: "scene--trail", image: "/images/dia-sendero1.avif" },
  { time: "15:20", title: "Volver al refugio", description: "Una pausa sin horarios. Madera, silencio y una ventana abierta al follaje.", label: "DESCANSO", scene: "scene--cabin", image: "/images/dia-cabana.jpg" },
  { time: "20:35", title: "Quedarse un rato más", description: "La noche reúne las voces alrededor del fuego. Arriba, un cielo lleno de estrellas.", label: "FOGATA", scene: "scene--fire", image: "/images/dia-fogata.jpg" },
];

const galleryItems = [
  { title: "Luz entre las ramas", tag: "01 / PRIMERAS HORAS", className: "gallery__image--one", image: "/images/galeria-01-luz.avif", alt: "Luz dorada filtrándose entre las copas de los árboles" },
  { title: "Un lugar para quedarse", tag: "02 / ARQUITECTURA", className: "gallery__image--two", image: "/images/galeria-02-cabana.jpg", alt: "Cabaña de madera integrada al paisaje del bosque" },
  { title: "El sonido del agua", tag: "03 / PAISAJE", className: "gallery__image--three", image: "/images/galeria-03-agua.avif", alt: "Arroyo de agua clara entre piedras y vegetación nativa" },
  { title: "Cuando cae el sol", tag: "04 / ÚLTIMA LUZ", className: "gallery__image--four", image: "/images/galeria-04-atardecer.jpg", alt: "Atardecer cálido sobre un claro del bosque" },
];

const testimonials = [
  { quote: "Hacía mucho que no descansaba de verdad. Acá el silencio se vuelve parte del viaje.", name: "Lucía M.", detail: "Escapada de fin de semana" },
  { quote: "La caminata fue hermosa y la cabaña, todavía más. Nos fuimos con ganas de volver.", name: "Martín y Sofía", detail: "Dos noches en el refugio" },
  { quote: "Todo está pensado para conectar con el lugar, sin invadirlo. Una experiencia distinta.", name: "Carolina R.", detail: "Experiencia de naturaleza" },
];

function SectionEyebrow({ number, children, light = false }: { number: string; children: React.ReactNode; light?: boolean }) {
  return <div className={`section-eyebrow${light ? " section-eyebrow--light" : ""}`}><span>{number}</span><span className="section-eyebrow__line" /><span>{children}</span></div>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header${isScrolled ? " site-header--scrolled" : ""}${menuOpen ? " site-header--menu-open" : ""}`}>
      <Link className="brand" href="#inicio" aria-label="Bosque Nativo, ir al inicio" onClick={closeMenu}>
        <span className="brand__mark"><Trees size={19} strokeWidth={1.5} /></span>
        <span className="brand__name">bosque<span>nativo</span></span>
      </Link>
      <nav className={`main-nav${menuOpen ? " main-nav--open" : ""}`} aria-label="Navegación principal">
        <Link href="#refugio" onClick={closeMenu}>El refugio</Link>
        <Link href="#experiencias" onClick={closeMenu}>Experiencias</Link>
        <Link href="#galeria" onClick={closeMenu}>Galería</Link>
        <Link className="main-nav__mobile-cta" href="#reservas" onClick={closeMenu}>Reservar escapada <ArrowUpRight size={15} /></Link>
      </nav>
      <Link className="header-cta" href="#reservas">Reservar escapada <ArrowUpRight size={15} /></Link>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { contextSafe } = useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const split = new SplitText(".hero__title", { type: "lines", mask: "lines" });
    gsap.from(split.lines, { yPercent: 110, opacity: 0, duration: 1.15, stagger: 0.13, ease: "power3.out", delay: 0.2 });
    gsap.from(".hero__intro, .hero__actions, .hero__location", { y: 18, opacity: 0, duration: 0.8, stagger: 0.12, delay: 0.72, ease: "power2.out" });
    gsap.to(".hero__mist", { yPercent: 24, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 0.8 } });
    gsap.to(".hero__photo", { yPercent: 15, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 0.8 } });
    return () => split.revert();
  }, { scope: heroRef });
  
  const handlePointerMove = contextSafe((event: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 900) return;
    const bounds = heroRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    gsap.to(".hero__photo", { x: x * -9, y: y * -6, duration: 0.8, ease: "power2.out", overwrite: true });
  });
  
  const resetPointer = contextSafe(() => gsap.to(".hero__photo", { x: 0, duration: 1, ease: "power2.out", overwrite: true }));
  
  return (
    <section className="hero" id="inicio" ref={heroRef} onMouseMove={handlePointerMove} onMouseLeave={resetPointer}>
      <div className="hero__visual">
        <Image src="/images/hero-bosque2.jpg" alt="Bosque nativo al amanecer" fill priority quality={90} sizes="100vw" className="hero__photo" />
        <div className="hero__mist" aria-hidden="true" />
        <div className="hero__shade" aria-hidden="true" />
      </div>
      <div className="hero__content">
        <p className="hero__kicker"><span /> UN REFUGIO EN EL BOSQUE NATIVO</p>
        <h1 className="hero__title">Volver a lo<br /><em>esencial.</em></h1>
        <p className="hero__intro">Hay lugares que te invitan a bajar el ritmo.<br className="desktop-break" /> Este es uno de ellos.</p>
        <div className="hero__actions"><Link className="button button--primary" href="#reservas">Reservar escapada <ArrowUpRight size={16} /></Link><Link className="text-link" href="#refugio">Conocé el refugio <ArrowDown size={15} /></Link></div>
      </div>
      <div className="hero__bottom"><span className="hero__location">SIERRAS DE CÓRDOBA · ARGENTINA</span><span className="hero__scroll"><span /> DESLIZÁ PARA DESCUBRIR</span><span className="hero__coordinates">31° 25′ S / 64° 11′ O</span></div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    { number: "01", title: "Naturaleza sin apuro", description: "Un entorno cuidado para reconectar con los ritmos del bosque y los tuyos." },
    { number: "02", title: "Hospitalidad cercana", description: "Atención cálida, detalles simples y experiencias acompañadas por gente local." },
    { number: "03", title: "Descanso consciente", description: "Comodidad y diseño en equilibrio con el paisaje que nos recibe." },
  ];
  return <section className="benefits section-pad" id="refugio"><div className="section-heading"><SectionEyebrow number="01">EL REFUGIO</SectionEyebrow><h2>Un lugar para<br /><em>estar presente.</em></h2><p className="section-heading__aside">Creemos que la naturaleza no necesita demasiado. Solo espacio, respeto y tiempo.</p></div><div className="benefits__grid">{benefits.map((benefit) => <article className="benefit-card reveal" key={benefit.number}><span className="benefit-card__number">{benefit.number}</span><span className="benefit-card__ornament"><Trees size={21} strokeWidth={1.2} /></span><h3>{benefit.title}</h3><p>{benefit.description}</p></article>)}</div><div className="benefits__note"><span className="note-line" /> UN REFUGIO DE BAJO IMPACTO, EN ARMONÍA CON SU ENTORNO</div></section>;
}

function Experiences() {
  return (
    <section className="experiences section-pad" id="experiencias">
      <div className="section-heading section-heading--light">
        <SectionEyebrow number="02" light>EXPERIENCIAS</SectionEyebrow>
        <h2>El bosque tiene<br /><em>mucho para contar.</em></h2>
        <p className="section-heading__aside">Elegí tu manera de vivirlo. Cada experiencia empieza con una invitación a mirar distinto.</p>
      </div>
      <div className="experience-grid">
        {experiences.map(({ number, title, type, description, icon: Icon, className, image, imageAlt }) => (
          <article className="experience-card reveal" key={number}>
            <div className={`experience-card__visual ${className}`}>
              <Image src={image} alt={imageAlt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 25vw" className="experience-card__image" />
              <div className="experience-card__icon"><Icon size={21} strokeWidth={1.35} /></div>
              <span className="experience-card__number">{number}</span>
              <span className="experience-card__type">{type}</span>
            </div>
            <div className="experience-card__copy">
              <div><h3>{title}</h3><p>{description}</p></div>
              <span className="experience-card__arrow"><ArrowUpRight size={17} /></span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DayInForest() {
  const sectionRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const panels = gsap.utils.toArray<HTMLElement>(".day-scene");
    const labels = gsap.utils.toArray<HTMLElement>(".day-copy");
    gsap.set(panels.slice(1), { autoAlpha: 0, y: 24 });
    gsap.set(labels.slice(1), { autoAlpha: 0, y: 18 });
    const timeline = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "+=3200", scrub: 0.8, pin: true, anticipatePin: 1 } });
    timeline.to(".day-darkness", { opacity: 1, duration: 0.5 }, 0);
    panels.forEach((panel, index) => {
      if (index === 0) return;
      const previous = panels[index - 1];
      const previousLabel = labels[index - 1];
      timeline.to([previous, previousLabel], { autoAlpha: 0, y: -18, duration: 0.35 }, index - 1);
      timeline.to([panel, labels[index]], { autoAlpha: 1, y: 0, duration: 0.45 }, index - 1 + 0.2);
    });
    timeline.to({}, { duration: 0.35 });
  }, { scope: sectionRef });
  
  return (
    <section className="day-section" ref={sectionRef} aria-label="Un día en el bosque">
      <div className="day-darkness" aria-hidden="true" />
      <div className="day-inner">
        <div className="day-top">
          <SectionEyebrow number="03" light>EL RITMO DEL BOSQUE</SectionEyebrow>
          <span className="day-top__note">UNA JORNADA, CUATRO MOMENTOS</span>
        </div>
        <div className="day-layout">
          <div className="day-copy-stack">
            {dayMoments.map((moment, index) => (
              <article className={`day-copy${index === 0 ? " day-copy--first" : ""}`} key={moment.time}>
                <span className="day-copy__label">{moment.label}</span>
                <p className="day-copy__time">{moment.time} <span>·</span> SIERRAS DE CÓRDOBA</p>
                <h2>{moment.title}</h2>
                <p className="day-copy__description">{moment.description}</p>
              </article>
            ))}
          </div>
          <div className="day-visual-stack" aria-hidden="true">
            {dayMoments.map((moment, index) => (
              <div className={`day-scene ${moment.scene}`} key={moment.time}>
                <Image src={moment.image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" className="day-scene__image" />
                <div className="day-scene__glow" />
                <span className="day-scene__index">0{index + 1} / 04</span>
              </div>
            ))}
          </div>
        </div>
        <div className="day-bottom">
          <span>EL TIEMPO SE MIDE DE OTRA MANERA</span><span className="day-bottom__line" /><span>DESLIZÁ PARA CONTINUAR</span>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="gallery section-pad" id="galeria">
      <div className="section-heading">
        <SectionEyebrow number="04">POSTALES DEL REFUGIO</SectionEyebrow>
        <h2>Pequeños momentos,<br /><em>grandes recuerdos.</em></h2>
        <p className="section-heading__aside">Una mirada a eso que pasa cuando dejamos un poco de espacio para lo inesperado.</p>
      </div>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <figure className={`gallery-item gallery-item--${index + 1} reveal`} key={item.tag}>
            <div className={`gallery-item__image ${item.className}`}>
              <Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 50vw" className="gallery-item__img" />
            </div>
            <figcaption><span>{item.tag}</span><strong>{item.title}</strong></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return <section className="testimonials section-pad"><div className="testimonials__intro"><SectionEyebrow number="05">VOCES DEL BOSQUE</SectionEyebrow><h2>Lo que queda<br /><em>después del viaje.</em></h2><p>Hay experiencias que siguen con vos, incluso cuando volvés a casa.</p></div><div className="testimonial-list">{testimonials.map((testimonial, index) => <figure className="testimonial reveal" key={testimonial.name}><span className="testimonial__index">0{index + 1}</span><div><blockquote>“{testimonial.quote}”</blockquote><figcaption><strong>{testimonial.name}</strong><span>{testimonial.detail}</span></figcaption></div></figure>)}</div></section>;
}

function Reservation() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2 personas");
  const [message, setMessage] = useState("");
  const resRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.to(".reservation__image", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: resRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".reservation__visual-glow", {
      opacity: 0.8,
      scale: 1.2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: resRef });
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    const subject = encodeURIComponent("Consulta de reserva — Bosque Nativo");
    const body = encodeURIComponent(`Hola, quiero consultar disponibilidad para una escapada.\n\nNombre: ${name}\nCorreo: ${email}\nFecha estimada: ${date || "A convenir"}\nHuéspedes: ${guests}\nMensaje: ${message || "Sin mensaje adicional"}`);
    window.location.href = `mailto:hola@bosquenativo.com?subject=${subject}&body=${body}`;
    window.setTimeout(() => setStatus("idle"), 900);
  };
  
  return (
    <section className="reservation section-pad" id="reservas" ref={resRef}>
      <div className="reservation__visual">
        <Image src="/images/reserva-bosque1.jpg" alt="Bosque oscuro con rayos de luz" fill quality={90} sizes="(max-width: 900px) 100vw, 50vw" className="reservation__image" />
        <div className="reservation__visual-glow" aria-hidden="true" />
        <div className="reservation__visual-copy">
          <span>EL BOSQUE TE ESPERA</span>
          <p>La próxima historia<br />puede ser la tuya.</p>
        </div>
      </div>
      <div className="reservation__content">
        <SectionEyebrow number="06">TU PRÓXIMA ESCAPADA</SectionEyebrow>
        <h2>Hacé lugar<br /><em>para lo esencial.</em></h2>
        <p className="reservation__lead">Contanos cuándo te gustaría venir. Te ayudamos a encontrar el momento perfecto para desconectar.</p>
        <form className="reservation-form" onSubmit={handleSubmit}>
          <label>Tu nombre<input autoComplete="name" name="nombre" required value={name} onChange={(event) => setName(event.target.value)} placeholder="¿Cómo te llamás?" /></label>
          <label>Correo electrónico<input autoComplete="email" type="email" name="correo" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nombre@correo.com" /></label>
          <div className="reservation-form__row">
            <label>Fecha estimada<input type="date" name="fecha" value={date} onChange={(event) => setDate(event.target.value)} /></label>
            <label>Huéspedes<select name="huespedes" value={guests} onChange={(event) => setGuests(event.target.value)}><option>1 persona</option><option>2 personas</option><option>3 personas</option><option>4 personas</option><option>5 o más</option></select></label>
          </div>
          <label>¿Algo que quieras contarnos? <span className="optional">(opcional)</span><textarea name="mensaje" rows={2} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Una ocasión especial, una consulta..." /></label>
          <button className="button button--primary reservation-form__submit" type="submit" disabled={status === "loading"}>{status === "loading" ? "Preparando consulta…" : "Consultar disponibilidad"} {status === "success" ? <Check size={16} /> : <ArrowUpRight size={16} />}</button>
          <p className="reservation-form__note">Sin compromiso. Te responderemos personalmente.</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="site-footer"><Link className="brand brand--footer" href="#inicio"><span className="brand__mark"><Trees size={19} strokeWidth={1.5} /></span><span className="brand__name">bosque<span>nativo</span></span></Link><p>Un refugio para volver a lo esencial.</p><div className="site-footer__links"><Link href="#experiencias">Experiencias</Link><Link href="#galeria">Galería</Link><Link href="#reservas">Reservas</Link><a href="mailto:hola@bosquenativo.com">Contacto</a></div><span className="site-footer__copy">© {new Date().getFullYear()} BOSQUE NATIVO · HECHO CON RESPETO POR LA NATURALEZA</span></footer>;
}

export default function BosqueLanding() {
  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
      gsap.from(element, { y: 28, opacity: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
    });
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }, { scope: pageRef });

  return <div className="site-shell" ref={pageRef}><a className="skip-link" href="#contenido">Saltar al contenido</a><Header /><main id="contenido"><Hero /><Benefits /><Experiences /><DayInForest /><Gallery /><Testimonials /><Reservation /></main><Footer /></div>;
}