'use client';

import Image from 'next/image';
import PartnersMarquee from '../components/PartnersMarquee';
import { useEffect, useRef, useState } from 'react';

const services = [
  { id: '01', title: 'Проектирование ВОЛС', text: 'Проектная документация и техническое решение для объекта.', tag: 'Проект' },
  { id: '02', title: 'Разрешения и согласования', text: 'Получаем разрешения и согласуем работы.', tag: 'Документы' },
  { id: '03', title: 'Строительство ВОЛС', text: 'Магистральные и распределительные оптические линии.', tag: 'Строительство' },
  { id: '04', title: 'Монтаж и сварка', text: 'Монтаж оборудования и сварка оптических волокон.', tag: 'Монтаж' },
  { id: '05', title: 'OTDR и ввод в эксплуатацию', text: 'Измерения и исполнительная документация перед сдачей.', tag: 'Контроль' },
  { id: '06', title: 'Аварийное восстановление', text: 'Восстановление действующих линий связи.', tag: 'Сервис' },
  { id: '07', title: 'GPON и FTTH', text: 'Оптические сети доступа для жилых и коммерческих объектов.', tag: 'Доступ' },
  { id: '08', title: 'Обслуживание', text: 'Гарантийная и постгарантийная поддержка.', tag: 'Поддержка' },
];

const stats = [
  ['200 000+', 'метров магистрального оптического кабеля'],
  ['130', 'подключённых многоквартирных домов'],
  ['30 000+', 'абонентов'],
  ['20+', 'смонтированных узлов связи'],
];

const stages = [
  ['01', 'Обследование', 'Уточняем задачу и условия.'],
  ['02', 'Проект', 'Готовим техническое решение.'],
  ['03', 'Согласования', 'Оформляем разрешения.'],
  ['04', 'Строительство', 'Строим линию связи.'],
  ['05', 'Монтаж', 'Монтируем оборудование и свариваем волокна.'],
  ['06', 'Проверка', 'Проверяем качество линии.'],
  ['07', 'Сдача', 'Передаём исполнительную документацию.'],
  ['08', 'Запуск', 'Вводим линию в эксплуатацию.'],
  ['09', 'Гарантия и сервис', 'Сопровождаем сеть после сдачи.'],
];


const projects = [
  ['ЖК Akbulak Rivera', '/media/project-akbulak-rivera.jpg', 15],
  ['ЖК Atlant', '/media/project-atlant.jpg', 15],
  ['ЖК Nexpo City', '/media/project-nexpo-city.jpg', 16],
  ['ЖК Green Line Garden', '/media/12_project_green_line_garden.jpg', 16],
  ['ЖК Green Line Velora', '/media/project-green-line-velora.jpg', 17],
  ['ТРЦ «Керуен»', '/media/project-keruen.jpg', 17],
];

const serviceGroups = [
  { title: 'Подготовка', items: ['Предпроектное обследование объекта', 'Проектирование ВОЛС и техническое решение', 'Разрешения и согласования'] },
  { title: 'Строительство и монтаж', items: ['Прокладка оптического кабеля и строительство линий', 'Монтаж оборудования и сварка оптического волокна', 'Оптические сети доступа GPON и FTTH'] },
  { title: 'Сдача и сопровождение', items: ['Измерения OTDR и контроль качества', 'Исполнительная документация и ввод линии', 'Гарантийный и постгарантийный сервис', 'Аварийное восстановление действующих линий'] },
];

function Arrow({ down = false }) {
  return <span aria-hidden="true">{down ? '↓' : '↗'}</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeStage, setActiveStage] = useState(-1);
  const [scrollStage, setScrollStage] = useState(-1);
  const [selectedStage, setSelectedStage] = useState(-1);
  const [revealedStages, setRevealedStages] = useState([]);
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const contactRef = useRef(null);
  const contactButtonRef = useRef(null);
  const whatsappRef = useRef(null);

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    if (!contactOpen) return undefined;
    whatsappRef.current?.focus();
    const onPointerDown = (event) => {
      if (!contactRef.current?.contains(event.target)) setContactOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setContactOpen(false);
        contactButtonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [contactOpen]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.toggle('motion-ready', !reduceMotion);
    const revealItems = document.querySelectorAll('[data-reveal]');
    if (reduceMotion) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item) => revealObserver.observe(item));

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
        heroRef.current?.style.setProperty('--hero-shift', `${progress * 46}px`);
        heroRef.current?.style.setProperty('--hero-scale', `${1.045 + progress * 0.045}`);
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      revealObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return undefined;

    const cards = [...timeline.querySelectorAll('.timeline-step')];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (!visible.length) return;
      setRevealedStages((current) => {
        const next = new Set(current);
        visible.forEach((entry) => next.add(cards.indexOf(entry.target)));
        return next.size === current.length ? current : [...next];
      });
      visible.forEach((entry) => observer.unobserve(entry.target));
    }, { threshold: 0.25 });

    cards.forEach((card) => observer.observe(card));

    const dots = [...timeline.querySelectorAll('.timeline-check')];
    let frame = 0;
    let previousScrollY = window.scrollY;
    const updateRail = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const centers = dots.map((dot) => {
          const rect = dot.getBoundingClientRect();
          return rect.top + rect.height / 2;
        });
        if (centers.length) {
          const timelineTop = timeline.getBoundingClientRect().top;
          const firstCenter = centers[0];
          const lastCenter = centers[centers.length - 1];
          const length = Math.max(0, lastCenter - firstCenter);
          const marker = window.innerHeight * 0.65;
          const fill = Math.min(length, Math.max(0, marker - firstCenter));
          timeline.style.setProperty('--timeline-rail-start', `${firstCenter - timelineTop}px`);
          timeline.style.setProperty('--timeline-rail-length', `${length}px`);
          timeline.style.setProperty('--timeline-scroll-fill', `${fill}px`);
          const nextStage = centers.findLastIndex((center) => center <= marker);
          setScrollStage((current) => current === nextStage ? current : nextStage);
        }
        frame = 0;
      });
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - previousScrollY) > 1) setSelectedStage(-1);
      previousScrollY = window.scrollY;
      updateRail();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateRail);
    updateRail();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateRail);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = () => { setMenuOpen(false); setContactOpen(false); };
  const completedStage = selectedStage >= 0 ? selectedStage : scrollStage;
  const selectStage = (index) => {
    setSelectedStage(index);
    const dots = timelineRef.current?.querySelectorAll('.timeline-check');
    if (!dots?.length) return;
    const first = dots[0].getBoundingClientRect();
    const target = dots[index].getBoundingClientRect();
    const fill = target.top + target.height / 2 - first.top - first.height / 2;
    timelineRef.current.style.setProperty('--timeline-scroll-fill', `${Math.max(0, fill)}px`);
  };

  return (
    <main>
      <header className={headerScrolled ? 'site-header is-scrolled' : 'site-header'}><a className="brand brand-logo" href="#top" onClick={closeMenu} aria-label="MBT Connection"><Image src="/mbt-connection-circuit-logo.webp" alt="" width={1983} height={793} priority /></a><nav className={menuOpen?'main-nav is-open':'main-nav'} aria-label="Главное меню"><a href="#company" onClick={closeMenu}>О компании</a><a href="#projects" onClick={closeMenu}>Объекты</a><a href="#process" onClick={closeMenu}>Этапы</a><a href="#services" onClick={closeMenu}>Услуги</a><a href="#contacts" onClick={closeMenu}>Контакты</a></nav><div className="header-contact-wrap" ref={contactRef}>
  <button className="header-contact" type="button" ref={contactButtonRef} aria-expanded={contactOpen} aria-controls="header-contact-options" onClick={() => { setContactOpen((open) => !open); setMenuOpen(false); }}><span>Обсудить проект</span><Arrow down/></button>
  {contactOpen && <div className="header-contact-popover" id="header-contact-options"><p>Связаться с нами</p><a ref={whatsappRef} href="https://wa.me/77711007766" target="_blank" rel="noreferrer" onClick={() => setContactOpen(false)}><span><strong>Написать в WhatsApp</strong><small>+7 771 100 77 66</small></span><Arrow/></a><a href="tel:+77711007766" onClick={() => setContactOpen(false)}><span><strong>Позвонить</strong><small>+7 771 100 77 66</small></span><Arrow/></a></div>}
</div><button className={menuOpen?'menu-button is-open':'menu-button'} type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} onClick={()=>{ setMenuOpen(value=>!value); setContactOpen(false); }}><i/><i/></button></header>

      <section className="hero" id="top" ref={heroRef}><div className="hero-image" aria-hidden="true"><Image src="/media/01_hero_network_equipment.jpg" alt="" fill priority sizes="100vw"/></div><div className="hero-shade"/><div className="hero-content"><p className="eyebrow">ВОЛС · Казахстан</p><h1>Строим оптические сети для бизнеса</h1><p className="hero-lead">Проектирование, строительство и обслуживание ВОЛС по всему Казахстану</p></div><aside className="hero-status glass-card"><span className="signal-dot"/><div><small>Год основания</small><strong>2022</strong></div><div><small>Профиль</small><strong>Проектирование и строительство ВОЛС</strong></div></aside><a className="scroll-cue" href="#company"><span>О компании</span><Arrow down/></a><PartnersMarquee /></section><section className="company section-shell" id="company">
  <div className="section-index" data-reveal><span>01</span><p>Компания</p></div>
  <div className="company-copy" data-reveal>
    <p className="section-kicker">MBT Connection</p>
    <h2>Опыт в <em>жилых и коммерческих проектах.</em></h2>
    <div className="company-detail"><p>Проектируем и строим волоконно-оптические сети по всему Казахстану.</p><p>Среди реализованных объектов — жилые комплексы и ТРЦ «Керуен».</p></div>
  </div>
  <div className="company-projects" id="projects" data-reveal>
    {projects.map(([name, image], index) => <article className="company-project" key={name}>
      <Image src={image} alt={name} fill sizes="(max-width: 600px) 80vw, (max-width: 1000px) 46vw, 30vw" />
      <div className="company-project-shade" />
      <div className="company-project-caption"><span>0{index + 1}</span><h3>{name}</h3></div>
    </article>)}
  </div>
  <p className="projects-note">В портфолио компании — жилые комплексы и коммерческий объект. Объекты подтверждены каталогом MBT Connection 2026 года.</p>
</section><section className="stats-section"><div className="stats-intro" data-reveal><p className="section-kicker">В цифрах</p><h2>Масштаб <em>реализованных сетей.</em></h2></div><div className="stats-grid">{stats.map(([value, label], index) => <article className="stat-card glass-card" data-reveal style={{ '--delay': index * 70 + 'ms' }} key={label}><span>0{index + 1}</span><strong>{value}</strong><p>{label}</p></article>)}</div><div className="technology-gallery" data-reveal><div className="tech-image tech-image-main"><Image src="/media/06_fiber_optic_cable_detail.jpg" alt="Оптический кабель" fill sizes="(max-width: 780px) 100vw, 50vw" /></div><div className="tech-image tech-image-inset glass-card"><Image src="/media/07_optical_fusion_splicer.jpg" alt="Оборудование для сварки волокна" fill sizes="(max-width: 780px) 46vw, 24vw" /><span>Оптическая сеть</span></div></div></section><section className="process section-shell" id="process">
  <div className="section-index" data-reveal><span>03</span><p>Этапы</p></div>
  <div className="process-content">
    <div className="section-heading" data-reveal><p className="section-kicker">От обследования до поддержки</p><h2>Девять этапов. <em>Одна ответственность.</em></h2></div>
    <div className="timeline" ref={timelineRef}>
      {stages.map(([number, title, description], index) => <article
        className={`timeline-step${index === 8 ? ' timeline-step-support' : ''}${revealedStages.includes(index) ? ' is-revealed' : ''}${activeStage === index ? ' is-active' : ''}${completedStage >= index ? ' is-checked' : ''}`}
        key={number}
        style={{ '--stage-delay': `${index * 30}ms` }}
        onPointerEnter={(event) => { if (event.pointerType === 'mouse') setActiveStage(index); }}
        onPointerDown={() => setActiveStage(index)}
        onPointerUp={(event) => { if (event.pointerType !== 'mouse') setActiveStage(-1); }}
        onPointerCancel={() => setActiveStage(-1)}
        onPointerLeave={(event) => { if (event.pointerType === 'mouse') setActiveStage(-1); }}
        onFocus={() => setActiveStage(index)}
        onBlur={() => setActiveStage(-1)}
        onClick={() => selectStage(index)}
      >
        <button className="timeline-check" type="button" aria-label={`Отметить этап ${number}: ${title} и все предыдущие`} aria-pressed={completedStage >= index} />
        <span className="timeline-number">{number}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        {index === 8 && <div className="timeline-support-details"><div><strong>Гарантия</strong><span>Сервис построенной сети</span></div><div><strong>Восстановление</strong><span>Аварийные работы на линии</span></div></div>}
      </article>)}
    </div>
    <p className="process-image-note">Фон: визуализация инфраструктуры связи</p>
  </div>
</section>

<section className="services section-shell" id="services"><div className="section-index" data-reveal><span>04</span><p>Услуги</p></div><div className="section-heading" data-reveal><p className="section-kicker">Полный цикл ВОЛС</p><h2>Одна команда — <em>весь проект.</em></h2><p>От предпроектного обследования до сдачи линии и дальнейшего обслуживания.</p></div><div className="service-groups">{serviceGroups.map(group => <article className="service-group" key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div><div className="service-list" data-reveal>{services.map((service,index)=>{const open=activeService===index;return <article className={open?'service-item is-open':'service-item'} key={service.id}><button type="button" onClick={()=>setActiveService(open?-1:index)} aria-expanded={open}><span className="service-number">{service.id}</span><span className="service-title">{service.title}</span><span className="service-tag">{service.tag}</span><span className="service-toggle" aria-hidden="true">{open?'−':'+'}</span></button><div className="service-answer"><div><p>{service.text}</p></div></div></article>;})}</div></section>


      <section className="contacts" id="contacts"><div className="contact-lead" data-reveal><p className="section-kicker">Обсудить проект</p><h2>Нужна надёжная<br/><em>оптическая сеть?</em></h2><p className="contact-intro">Обсудим проектирование, строительство или обслуживание волоконно-оптической линии связи в Казахстане.</p><div className="contact-actions"><a className="button button-blue" href="tel:+77711007766">Позвонить<Arrow/></a><a className="button button-whatsapp" href="https://wa.me/77711007766" target="_blank" rel="noopener noreferrer">WhatsApp<Arrow/></a></div><div className="contact-geography"><h3>География работы</h3><p>Филиалы компании находятся в Астане, Кокшетау и Степногорске. Есть опыт проектов в Алматы и Шымкенте; команда готова работать по Казахстану с подрядчиками и партнёрами.</p></div></div><div className="contact-panel glass-card" data-reveal><p>Связаться с компанией MBT Connection</p><a href="tel:+77711007766"><span>Телефон</span><strong>+7 771 100 77 66</strong><Arrow/></a><a href="https://wa.me/77711007766" target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>Написать нам</strong><Arrow/></a><a href="mailto:info@mbtconnect.kz"><span>Почта</span><strong>info@mbtconnect.kz</strong><Arrow/></a><address><span>Адрес</span><strong>Казахстан, Кокшетау<br/>ул. Кошкарбаева, 188</strong></address></div></section><footer><a className="brand" href="#top" aria-label="MBT Connection"><span className="brand-mark">MBT</span><span className="brand-name">CONNECTION</span></a><p>Проектирование · Строительство · Сервис</p><a href="mailto:info@mbtconnect.kz">info@mbtconnect.kz</a><span>© 2026 MBT Connection</span></footer>
    </main>
  );
}
