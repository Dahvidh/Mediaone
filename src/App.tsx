import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  ChevronDown,
  Play,
  Radio,
  Trophy,
  Clapperboard,
  Send,
  CheckCircle2,
} from "lucide-react";

const BASE_URL = "https://mediaoneproductions.com";
const MEDIA_ONE_LOGO = "/resources/media-one-productions-logo.png";

const IMAGES = {
  aboutSection:
    "https://res.cloudinary.com/dgqcoefvx/image/upload/v1791646044/915cad7c-c948-4dae-a11b-9b4e549a644f_avfnkz.jpg",
  aboutPage:
    "https://res.cloudinary.com/dgqcoefvx/image/upload/v1793226600/ff82f774-92f7-4ecb-94bb-2dece837586b_gzroac.jpg",
  tvProduction:
    "https://res.cloudinary.com/dgqcoefvx/image/upload/v1792974955/32BF5ACA-CA3E-499D-92BD-F91F2839C4B8_pvih8h.jpg",
  liveSportsPlayer:
    "https://player.cloudinary.com/embed/?cloud_name=dgqcoefvx&public_id=1599c968-dbc3-4bd6-85a7-163d85fc4b45_eamoeu",
  contact:
    "https://res.cloudinary.com/dgqcoefvx/image/upload/v1791646044/915cad7c-c948-4dae-a11b-9b4e549a644f_avfnkz.jpg",
  team: "https://res.cloudinary.com/dgqcoefvx/image/upload/",
  footer: `${BASE_URL}/wp-content/uploads/2025/12/ft-bg.png`,
};

const WHATSAPP_MESSAGE =
  "Hello Media One Productions, I would like to request a quote for your services. Please let me know the information you need from me to provide an estimate.";
const WHATSAPP_URL = `https://wa.me/2347064434142?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const SERVICES = [
  {
    title: "Live Sports Broadcast",
    slug: "live-sports-broadcast",
    icon: Radio,
    image: IMAGES.contact,
    text: "We provide viewers with a chance to experience the thrill and excitement of watching a game or match in real time.",
    points: ["Clear visuals", "Stable live delivery"],
    detail:
      "Delivering reliable, high-quality live sports coverage that captures every moment as it happens.",
  },
  {
    title: "League Management",
    slug: "league-management",
    icon: Trophy,
    image: IMAGES.contact,
    text: "We provide a way for league operators to manage player and team information, track game results and standings.",
    points: ["Organized league data & results"],
    detail:
      "Efficient tools for managing teams, players, fixtures, and league performance with clarity and control.",
  },
  {
    title: "TV Production",
    slug: "tv-production",
    icon: Clapperboard,
    image: IMAGES.tvProduction,
    text: "We enable the production of TV programs, such as scriptwriting, pre-production planning and post-production services.",
    points: ["Professional end-to-end production"],
    detail: "Creative television production built for broadcast standards.",
  },
];

const TEAM = [
  { name: "Abayomi Ayanusi", role: "Founder" },
  { name: "Cdt. D.O Nnamdi CSc.", role: "Lead Camera Operator" },
  { name: "Abayomi Ayanusi", role: "Lead Media Director" },
  { name: "Chibuike Okereke", role: "Camera Operator" },
  { name: "Timilehin Dosunmu", role: "Camera Operator" },
  { name: "Femi Olufemi", role: "Audio Visual Mixer/ Media Director" },
  { name: "Chibuzor Okereke", role: "Lead Supply Chain/Logistics" },
  //{ name: "David Godfrey", role: "V.P. of Production Design" },
  //{ name: "Michael Kane", role: "V.P. of Business Development, Hard Goods" },
  //{ name: "Denise Czarzasty", role: "Special Projects Ambassador" },
  //{ name: "Kirsten Sweeney", role: "V.P. of Business Development, Soft Goods" },
];

const WORK_HIGHLIGHTS = [
  { id: "9c2yG_2vxaA", title: "Sports Broadcast Highlight 1" },
  { id: "GnB53ZANkmY", title: "Sports Broadcast Highlight 2" },
  { id: "MIDEEh-sUhY", title: "Sports Broadcast Highlight 3" },
  { id: "3j-n9tT1w1k", title: "Sports Broadcast Highlight 4" },
  { id: "6VVVzqVeDsU", title: "Sports Broadcast Highlight 5" },
  { id: "9ibjDRhCfwQ", title: "Sports Broadcast Highlight 6" },
  { id: "Jx88C4BwfQ4", title: "Sports Broadcast Highlight 7" },
];

const pagePath = () =>
  window.location.pathname.replace(/\/$/, "").split("/").pop() || "home";

type LinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

function App() {
  const [path, setPath] = useState(pagePath);
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [formState, setFormState] = useState("");

  useEffect(() => {
    const updatePath = () => setPath(pagePath());
    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  const navigate = (slug: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const url = slug === "home" ? "/" : `/${slug}/`;
    window.history.pushState({}, "", url);
    setPath(slug);
    setMenuOpen(false);
    setServiceOpen(false);
    setFormState("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const Link = ({ to, children, className = "" }: LinkProps) => (
    <a
      className={className}
      href={to === "home" ? "/" : `/${to}/`}
      onClick={navigate(to)}
    >
      {children}
    </a>
  );

  const activeService = SERVICES.find((service) => service.slug === path);
  const isHome = path === "home" || path === "";
  const isAbout = path === "about-us";
  const isServices = path === "our-services";
  const isContact = path === "contacts" || path === "contact-us";
  const isWorkPage = path === "watch-our-work";

  const title =
    activeService?.title ||
    (isAbout
      ? "About Us"
      : isServices
        ? "Our Services"
        : isContact
          ? "Contacts"
          : isWorkPage
            ? "Watch Our Work"
            : "Media One Productions");

  const intro =
    activeService?.detail ||
    (isAbout
      ? "We deliver professional broadcasting and media production services."
      : isServices
        ? "Reliable broadcast and production services for every stage of the story."
        : isContact
          ? "Let’s discuss your next project."
          : isWorkPage
            ? "Highlights from our productions, live broadcasts, and the people and process behind the scenes."
            : "");

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState(
      "Your message has been checked, but this demo is not connected to a delivery service. Please contact Media One Productions directly using WhatsApp."
    );
  };

  const PageHero = () => (
    <section className="page-hero">
      <div
        className="page-hero-image"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(5,13,31,.9),rgba(5,13,31,.45)),url("${
            isContact ? IMAGES.contact : activeService?.image || IMAGES.aboutSection
          }")`,
        }}
      />
      <div className="wrap page-hero-content">
        <div className="breadcrumbs">
          <Link to="home">Homepage</Link>
          <span>/</span>
          <span>{title}</span>
        </div>
        <span className="kicker">
          MEDIA ONE PRODUCTIONS /{" "}
          {isAbout
            ? "WHO WE ARE"
            : isServices
              ? "WHAT WE DO"
              : isContact
                ? "GET IN TOUCH"
                : isWorkPage
                  ? "PORTFOLIO & PRODUCTION"
                  : "OUR SERVICES"}
        </span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );

  const VideoCard = ({
    id,
    heading,
    description,
    label = "VIDEO HIGHLIGHT",
  }: {
    id: string;
    heading: string;
    description: string;
    label?: string;
  }) => (
    <article className="showcase-video-card">
      <iframe
        className="showcase-player"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={heading}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
      <div className="video-caption">
        <span className="kicker">{label}</span>
        <h3>{heading}</h3>
        <p>{description}</p>
      </div>
    </article>
  );

  const AboutPage = () => (
    <section className="section">
      <div className="wrap about-page">
        <img src={IMAGES.aboutPage} alt="Media One Productions team at work" />
        <div>
          <span className="kicker">WHO WE ARE</span>
          <h2>
            We deliver professional sports production with <em>quality.</em>
          </h2>
          <p>
            With a combined experience spanning decades, our team can deliver
            international broadcast-standard production for your tournament or
            league.
          </p>
          <p>
            We have worked with The Nigerian Cricket Federation, Lagos Cricket
            Committee and Dafabet, among others, on the production of the male
            and female U19 T20 leagues, Nigerian Super League and more, which
            surpassed 200k total views. Check our work for more.
          </p>

          <div className="mission-grid">
            <div>
              <b>Our Motto</b>
              <p>You Imagine it, We create it</p>
            </div>
            <div>
              <b>Our Mission</b>
              <p>
                We strive to foster creativity through collaboration and
                innovation, while delivering exceptional production services.
              </p>
            </div>
            <div>
              <b>Our Vision</b>
              <p>
                We are dedicated to providing our customers with the highest
                quality viewing experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap team-section">
        <div className="team-section-heading">
          <span className="kicker">THE PEOPLE BEHIND THE WORK</span>
          <h2>
            Meet our <em>team.</em>
          </h2>
          <p>
            The experienced people bringing our broadcasting, production and
            business operations together.
          </p>
        </div>
        <div className="team-grid">
          {TEAM.map((person, index) => (
            <article className="team-member" key={person.name}>
              <div className="team-member-number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const WorkPage = () => (
    <section className="section work-gallery-section">
      <div className="wrap">
        <div className="section-top">
          <div>
            <span className="kicker">THE WORK. THE PEOPLE. THE PROCESS.</span>
            <h2>
              Highlights & <em>behind the scenes.</em>
            </h2>
          </div>
          <p>
            Explore selected moments from our sports broadcasts, event
            coverage, production setups, and the work that happens before the
            cameras roll.
          </p>
        </div>

        <div className="work-gallery-grid">
          <article className="work-gallery-card work-gallery-feature">
            <img
              src={IMAGES.contact}
              alt="Nigerian Female Invitational T20i tournament broadcast"
            />
            <div className="work-gallery-overlay">
              <span>TOURNAMENT HIGHLIGHT</span>
              <h3>Nigerian Female Invitational T20i</h3>
              <p>Women’s T20 international cricket • Nigeria</p>
            </div>
          </article>
          <article className="work-gallery-card">
            <img src={IMAGES.contact} alt="Live sports broadcast crew" />
            <div className="work-gallery-overlay">
              <span>BEHIND THE SCENES</span>
              <h3>On-location broadcast crew</h3>
              <p>Capturing every moment from the field</p>
            </div>
          </article>
          <article className="work-gallery-card">
            <img src={IMAGES.contact} alt="Broadcast production equipment" />
            <div className="work-gallery-overlay">
              <span>PRODUCTION SETUP</span>
              <h3>Behind the broadcast</h3>
              <p>The people and equipment behind the stream</p>
            </div>
          </article>
        </div>

        <div className="work-video-heading">
          <span className="kicker">WATCH THE REEL</span>
          <h2>
            From the field to <em>your screen.</em>
          </h2>
          <p>Watch selected video highlights from our production work.</p>
        </div>

        <div className="work-video-grid">
          <VideoCard
            id="KCyoVF8yVJQ"
            heading="Broadcast moments that matter."
            description="Sports, live events and professional production."
            label="FEATURED HIGHLIGHT"
          />
          <VideoCard
            id="d9iO5WZZKgY"
            heading="More from the action."
            description="A closer look at the production process and event coverage."
            label="BEHIND THE SCENES"
          />
        </div>

        <div className="work-video-heading">
          <span className="kicker">MORE FROM OUR WORK</span>
          <h2>
            Sports broadcast <em>highlights.</em>
          </h2>
          <p>
            Watch more moments from our production work, directly from YouTube.
          </p>
        </div>

        <div className="work-video-grid work-highlights-grid">
          {WORK_HIGHLIGHTS.map((video, index) => (
            <VideoCard
              key={video.id}
              id={video.id}
              heading={video.title}
              description="Media One Productions • Sports and broadcast work"
              label={`HIGHLIGHT 0${index + 1}`}
            />
          ))}
        </div>

        <div className="work-contact-action">
          <p>Planning a tournament, live event, or production?</p>
          <Link to="contacts" className="primary-btn">
            Let’s Work Together <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );

  const ServicesPage = () => (
    <section className="section">
      <div className="wrap">
        <div className="section-top">
          <div>
            <span className="kicker">OUR CAPABILITIES</span>
            <h2>
              Services made for <em>the moment.</em>
            </h2>
          </div>
          <p>Explore our sports broadcast and television production services.</p>
        </div>
        <div className="all-services">
          {SERVICES.map((service, index) => (
            <article className="all-service" key={service.slug}>
              <Link to={service.slug} className="all-service-img">
                <img src={service.image} alt={service.title} />
              </Link>
              <div>
                <span className="kicker">0{index + 1} / SERVICE</span>
                <h2>
                  <Link to={service.slug}>{service.title}</Link>
                </h2>
                <p>{service.text}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link to={service.slug} className="read-link">
                  Learn more <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const ContactPage = () => (
    <section className="section">
      <div className="wrap contact-layout">
        <div>
          <span className="kicker">GET IN TOUCH</span>
          <h2>
            Let’s make something <em>great.</em>
          </h2>
          <p>
            Tell us about your production or broadcast project. We’ll help you
            find the right solution.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="primary-btn"
          >
            Chat on WhatsApp <ArrowUpRight size={16} />
          </a>
        </div>
        <form className="contact-form" onSubmit={submitForm}>
          <label>
            Name
            <input required name="name" placeholder="Your name" />
          </label>
          <label>
            Email
            <input required type="email" name="email" placeholder="Your email" />
          </label>
          <label>
            Subject
            <input required name="subject" placeholder="Project / inquiry subject" />
          </label>
          <label>
            Message
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Tell us about your project"
            />
          </label>
          <button className="primary-btn" type="submit">
            Send message <Send size={15} />
          </button>
          {formState && (
            <p className="form-notice" role="status">
              <CheckCircle2 size={18} />
              {formState}
            </p>
          )}
        </form>
      </div>
    </section>
  );

  const ServiceDetailPage = () => (
    <section className="section">
      <div className="wrap service-detail">
        <div className="detail-main">
          {activeService?.slug === "live-sports-broadcast" ? (
            <iframe
              className="showcase-player service-live-player"
              src={IMAGES.liveSportsPlayer}
              title="Media One Productions live sports broadcast player"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <img
              src={activeService?.image}
              alt={activeService?.title || "Media One Productions"}
            />
          )}
          <span className="kicker">
            MEDIA ONE PRODUCTIONS / {activeService?.title.toUpperCase()}
          </span>
          <h2>
            {activeService?.title === "TV Production"
              ? "Creative production from concept to final frame."
              : activeService?.detail}
          </h2>
          <p>
            {activeService?.slug === "live-sports-broadcast"
              ? "Live sports broadcasts let viewers experience the thrill and excitement of a game or match in real time. Our coverage can include the match itself, pre-game and post-game analysis, interviews with players and coaches, and highlights."
              : activeService?.slug === "league-management"
                ? `${activeService.text} We help competitions keep their information organized so teams, players and fans can follow the season with confidence.`
                : "TV production includes scriptwriting, storyboards, filming, editing and post-production. Our services can include location scouting, audio mixing, graphics and colour correction."}
          </p>
        </div>
        <aside className="detail-aside">
          <h3>Why Choose Us</h3>
          <p>
            We focus on authentic storytelling that connects with people,
            backed by hands-on experience and professional production tools.
          </p>
          <ul>
            <li>Experienced production crew</li>
            <li>Professional broadcast workflow</li>
            <li>Solutions shaped around your audience</li>
            <li>End-to-end planning and delivery</li>
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="primary-btn"
          >
            Free quote <ArrowUpRight size={15} />
          </a>
        </aside>
      </div>
    </section>
  );

  return (
    <div className="site">
      <div className="topline">
        <div className="wrap topline-inner">
          <span>Media One Productions • Broadcast • Production</span>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Free quote <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      <header className="header">
        <div className="wrap header-inner">
          <Link to="home" className="logo">
            <img src={MEDIA_ONE_LOGO} alt="Media One Productions" />
            <span>Media One Productions</span>
          </Link>
          <button
            className="mobile-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav
            className={menuOpen ? "nav nav-open" : "nav"}
            aria-label="Main navigation"
          >
            <Link to="home">Homepage</Link>
            <Link to="about-us">About Us</Link>
            <div className="nav-services">
              <button
                onClick={() => setServiceOpen(!serviceOpen)}
                aria-expanded={serviceOpen}
              >
                Our Services <ChevronDown size={14} />
              </button>
              <div
                className={serviceOpen ? "dropdown dropdown-open" : "dropdown"}
              >
                <Link to="our-services">All Services</Link>
                {SERVICES.map((service) => (
                  <Link key={service.slug} to={service.slug}>
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="contacts">Contacts</Link>
            <a
              className="quote-btn"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              Free quote <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
      </header>

      {isHome ? (
        <main>
          <section className="home-hero">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Media One Productions sports broadcast reel"
              poster={IMAGES.aboutSection}
              onCanPlay={(event) => {
                event.currentTarget.play().catch(() => {});
              }}
            >
              <source
                src="/resources/media-one-website-video.mp4"
                type="video/mp4"
              />
            </video>
            <div className="wrap hero-inner">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span /> PROFESSIONAL SPORTS MEDIA & PRODUCTION
                </div>
                <h1>
                  We bring the
                  <br />
                  <em>game to life.</em>
                </h1>
                <p>
                  We combine experience, technology, and creative production to
                  deliver reliable sports media solutions that elevate
                  competitions and connect them with audiences locally and
                  globally.
                </p>
                <div className="hero-buttons">
                  <Link to="contacts" className="primary-btn">
                    Contact Us <ArrowUpRight size={17} />
                  </Link>
                </div>
              </div>
              <div className="hero-stamp">
                <span>LIVE</span>
                <Play size={19} fill="currentColor" />
                <small>
                  SPORTS
                  <br />
                  PRODUCTION
                </small>
              </div>
            </div>
            <div className="hero-bottom">
              <div className="wrap hero-bottom-inner">
                <span>Broadcasting moments that matter</span>
                <span>Professional • Reliable • Creative</span>
              </div>
            </div>
          </section>

          <section className="featured section">
            <div className="wrap">
              <div className="section-top">
                <div>
                  <span className="kicker">WHAT WE DO</span>
                  <h2>
                    Our Featured <em>Services</em>
                  </h2>
                </div>
                <p>
                  Media One Productions delivers professional broadcasting,
                  production, and media services designed to engage audiences,
                  elevate brands, and bring live experiences to life.
                </p>
              </div>
              <div className="service-grid">
                {SERVICES.map((service, index) => {
                  const ServiceIcon = service.icon;
                  return (
                    <article className="service-card" key={service.slug}>
                      <Link to={service.slug} className="service-image">
                        <img src={service.image} alt={service.title} />
                        <span>0{index + 1}</span>
                      </Link>
                      <div className="service-card-body">
                        <div className="service-icon">
                          <ServiceIcon size={22} />
                        </div>
                        <h3>
                          <Link to={service.slug}>{service.title}</Link>
                        </h3>
                        <p>{service.text}</p>
                        <ul>
                          {service.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                        <Link to={service.slug} className="read-link">
                          Explore service <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="center-action">
                <Link to="our-services" className="primary-btn">
                  Our Services <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          <section className="about-band section">
            <div className="wrap about-layout">
              <div className="about-image">
                <img src={IMAGES.aboutPage} alt="Media One Productions" />
                <div className="image-caption">
                  <strong>Live production</strong>
                  <span>Experience that shows on screen</span>
                </div>
              </div>
              <div className="about-copy">
                <span className="kicker">ABOUT MEDIA ONE PRODUCTIONS</span>
                <h2>
                  Built for live moments.
                  <br />
                  <em>Trusted for quality.</em>
                </h2>
                <p>
                  Media One Productions is a media and production company
                  focused on delivering high-quality live broadcasts,
                  television production, and digital media solutions.
                </p>
                <p>
                  We work with sports leagues, brands, and content creators to
                  bring stories to life clearly, professionally, and at scale.
                </p>
                <Link to="about-us" className="primary-btn">
                  About Us <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          <section className="video-showcase section">
            <div className="wrap">
              <div className="section-top">
                <div>
                  <span className="kicker">WATCH OUR WORK</span>
                  <h2>
                    Inside the <em>action.</em>
                  </h2>
                </div>
                <p>
                  Watch a glimpse of our production work. More event and
                  broadcast videos can be added to this showcase as they are
                  supplied.
                </p>
              </div>
              <div className="showcase-video-wrap showcase-video-grid">
                <VideoCard
                  id="KCyoVF8yVJQ"
                  heading="Broadcast moments that matter."
                  description="Sports, live events and professional production."
                  label="FEATURED VIDEO"
                />
                <VideoCard
                  id="d9iO5WZZKgY"
                  heading="More from the action."
                  description="Another look at Media One Productions’ event and broadcast work."
                />
              </div>
              <div className="work-more-action">
                <Link to="watch-our-work" className="primary-btn work-more-btn">
                  SEE MORE FROM OUR WORK <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          <section className="whatsapp-band">
            <div className="wrap whatsapp-inner">
              <div>
                <span className="kicker">HAVE A PROJECT IN MIND?</span>
                <h2>
                  Let’s talk on <em>WhatsApp.</em>
                </h2>
                <p>
                  Have a project in mind or need quick guidance? Chat directly
                  with our team.
                </p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="primary-btn"
              >
                Start WhatsApp Chat <ArrowUpRight size={17} />
              </a>
            </div>
          </section>

          <section className="why section">
            <div className="wrap">
              <div className="section-top">
                <div>
                  <span className="kicker">WHY CHOOSE US</span>
                  <h2>
                    Here’s what sets us <em>apart.</em>
                  </h2>
                </div>
              </div>
              <div className="why-grid">
                <article>
                  <span>01</span>
                  <h3>Proven Experience in Live & Broadcast Media</h3>
                  <p>
                    We understand the pressure of live production. Our team
                    brings hands-on experience in broadcasting and TV
                    production.
                  </p>
                </article>
                <article>
                  <span>02</span>
                  <h3>End-to-End Media Solutions</h3>
                  <p>
                    From planning through production, we keep the process
                    organized under one roof.
                  </p>
                </article>
                <article>
                  <span>03</span>
                  <h3>Quality, Reliability, and Audience Focus</h3>
                  <p>
                    Every project is approached with attention to detail and a
                    focus on the viewer experience.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="clients section">
            <div className="wrap clients-inner">
              <div>
                <span className="kicker">OUR CLIENTS</span>
                <h2>
                  Proud to partner with teams that value <em>quality.</em>
                </h2>
              </div>
              <div className="client-logos">
                <div className="partner-logo">
                  <img
                    src="https://ygo-assets-entities-us.yougov.net/48895f5d-90b6-11e8-a0f3-f733138a883b.jpg"
                    alt="Dafabet"
                    loading="lazy"
                  />
                </div>
                <div className="partner-logo">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLB2oP-X8h9B1npPcrYfRUOweVesZsJD-yVkecHzA9XjuCBduAxV2e2eo&s=10"
                    alt="CricHeroes"
                    loading="lazy"
                  />
                </div>
                <div className="partner-logo">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI19JAhIlfdeFuB47A8QsSpXhA7VilwqOtKAZMcEozMg&s=10"
                    alt="Nigerian Cricket Federation"
                    loading="lazy"
                  />
                </div>
                <div className="partner-logo">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9v8ZUX0q_rUuGz2PsYoG4Zwgc0GMC5kTlyFNkXa0TEg&s=10"
                    alt="FBMMC"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main>
          <PageHero />
          {isAbout ? (
            <AboutPage />
          ) : isServices ? (
            <ServicesPage />
          ) : isContact ? (
            <ContactPage />
          ) : isWorkPage ? (
            <WorkPage />
          ) : activeService ? (
            <ServiceDetailPage />
          ) : (
            <section className="section">
              <div className="wrap">
                <h2>Page not found</h2>
                <Link to="home" className="primary-btn">
                  Return home
                </Link>
              </div>
            </section>
          )}
        </main>
      )}

      <footer
        className="footer"
        style={{
          backgroundImage: `linear-gradient(90deg,#071020f5,#071020ed),url("${IMAGES.footer}")`,
        }}
      >
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <img src={MEDIA_ONE_LOGO} alt="Media One Productions" />
            <p>
              Professional sports broadcasting and television production
              built to connect audiences with the moments that matter.
            </p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <Link to="home">Homepage</Link>
            <Link to="about-us">About Us</Link>
            <Link to="our-services">Our Services</Link>
            <Link to="contacts">Contacts</Link>
          </div>
          <div>
            <h3>Our Services</h3>
            {SERVICES.map((service) => (
              <Link key={service.slug} to={service.slug}>
                {service.title}
              </Link>
            ))}
          </div>
          <div>
            <h3>Get In Touch</h3>
            <p>Have a production or broadcast project to discuss?</p>
            <Link to="contacts" className="footer-link">
              Contact our team <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>Copyright © 2026 Media One Productions.</span>
          <span>Powered by ExineMedia</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
