'use client';

import Image from 'next/image';
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
  ['06', 'Измерения', 'Проверяем качество линии.'],
  ['07', 'Сдача', 'Передаём исполнительную документацию.'],
  ['08', 'Запуск', 'Вводим линию в эксплуатацию.'],
];


const projects = [
  ['ЖК Akbulak Rivera', '/media/project-akbulak-rivera.jpg', 15],
  ['ЖК Atlant', '/media/project-atlant.jpg', 15],
  ['ЖК Nexpo City', '/media/project-nexpo-city.jpg', 16],
  ['ЖК Green Line Garden', '/media/12_project_green_line_garden.jpg', 16],
  ['ЖК Green Line Velora', '/media/project-green-line-velora.jpg', 17],
  ['ТРЦ «Керуен»', '/media/project-keruen.jpg', 17],
];

function Arrow({ down = false }) {
  return <span aria-hidden="true">{down ? '↓' : '↗'}</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const heroRef = useRef(null);

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

    const stageItems = document.querySelectorAll('[data-stage]');
    const stageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveStage(Number(entry.target.dataset.stage));
      });
    }, { rootMargin: '-38% 0px -44% 0px', threshold: 0 });
    stageItems.forEach((item) => stageObserver.observe(item));

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
      stageObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header"><a className="brand" href="#top" onClick={closeMenu} aria-label="MBT Connection"><span className="brand-mark">MBT</span><span className="brand-name">CONNECTION</span></a><nav className={menuOpen?'main-nav is-open':'main-nav'} aria-label="Главное меню"><a href="#services" onClick={closeMenu}>Услуги</a><a href="#process" onClick={closeMenu}>Этапы</a><a href="#projects" onClick={closeMenu}>Проекты</a><a href="#contacts" onClick={closeMenu}>Контакты</a></nav><a className="header-contact" href="tel:+77711007766"><span>Обсудить проект</span><Arrow/></a><button className={menuOpen?'menu-button is-open':'menu-button'} type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(value=>!value)}><i/><i/></button></header>

      <section className="hero" id="top" ref={heroRef}><div className="hero-image" aria-hidden="true"><Image src="/media/01_hero_network_equipment.jpg" alt="" fill priority sizes="100vw"/></div><div className="hero-shade"/><div className="hero-content"><p className="eyebrow">ВОЛС · Казахстан</p><h1>Строим оптические сети для бизнеса</h1><p className="hero-lead">Проектирование, строительство и обслуживание ВОЛС по всему Казахстану</p><div className="hero-actions hero-contacts"><a className="button button-light" href="tel:+77711007766"><span><small>Позвонить</small><strong>+7 771 100 77 66</strong></span><Arrow/></a><a className="button button-whatsapp" href="https://wa.me/77711007766" target="_blank" rel="noreferrer"><span><small>WhatsApp</small><strong>Написать</strong></span><Arrow/></a></div></div><aside className="hero-status glass-card"><span className="signal-dot"/><div><small>Год основания</small><strong>2022</strong></div><div><small>Профиль</small><strong>Проектирование и строительство ВОЛС</strong></div></aside><a className="scroll-cue" href="#company"><span>О компании</span><Arrow down/></a></section><section className="company section-shell" id="company"><div className="section-index" data-reveal><span>01</span><p>Компания</p></div><div className="company-copy" data-reveal><p className="section-kicker">MBT Connection</p><h2>Инженерная команда для <em>сложных сетей.</em></h2><div className="company-detail"><p>Проектируем и строим волоконно-оптические линии связи по всему Казахстану</p><p>Ответственность за проект, строительство и сдачу объекта.</p></div></div><div className="company-note glass-card" data-reveal><span>MBT / 2022</span><p>От проекта до ввода сети в эксплуатацию.</p></div></section><section className="stats-section"><div className="stats-intro" data-reveal><p className="section-kicker">В цифрах</p><h2>Масштаб <em>реализованных сетей.</em></h2></div><div className="stats-grid">{stats.map(([value, label], index) => <article className="stat-card glass-card" data-reveal style={{ '--delay': index * 70 + 'ms' }} key={label}><span>0{index + 1}</span><strong>{value}</strong><p>{label}</p></article>)}</div><div className="technology-gallery" data-reveal><div className="tech-image tech-image-main"><Image src="/media/06_fiber_optic_cable_detail.jpg" alt="Оптический кабель" fill sizes="(max-width: 780px) 100vw, 50vw" /></div><div className="tech-image tech-image-inset glass-card"><Image src="/media/07_optical_fusion_splicer.jpg" alt="Оборудование для сварки волокна" fill sizes="(max-width: 780px) 46vw, 24vw" /><span>Оптическая сеть</span></div></div></section><section className="process section-shell" id="process"><div className="section-index" data-reveal><span>03</span><p>Этапы</p></div><div className="process-content"><div className="section-heading" data-reveal><p className="section-kicker">От обследования до запуска</p><h2>Понятный процесс. <em>Контроль на каждом этапе.</em></h2></div><div className="timeline" style={{'--progress':(activeStage/(stages.length-1))*100+'%'}}><div className="timeline-rail"><i/></div>{stages.map(([number,title,text],index)=><article className={index<=activeStage?'timeline-step is-active':'timeline-step'} data-stage={index} key={number} onMouseEnter={()=>setActiveStage(index)}><button type="button" onClick={()=>setActiveStage(index)}><span>{number}</span><i/><h3>{title}</h3><p>{text}</p></button></article>)}</div></div></section><section className="projects" id="projects"><div className="projects-head section-shell"><div className="section-index" data-reveal><span>04</span><p>Проекты</p></div><div className="section-heading" data-reveal><p className="section-kicker">Реализованные объекты</p><h2>Опыт в <em>жилых и коммерческих проектах.</em></h2></div></div><div className="project-grid">{projects.map(([name,image],index)=><article className="project-card" data-reveal key={name}><Image src={image} alt={name} fill sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw"/><div className="project-overlay"/><div className="project-meta glass-card"><span className="project-number">0{index+1}</span><div className="project-caption"><h3>{name}</h3></div><Arrow/></div></article>)}</div></section><section className="services section-shell" id="services"><div className="section-index" data-reveal><span>05</span><p>Услуги</p></div><div className="section-heading" data-reveal><p className="section-kicker">Полный цикл ВОЛС</p><h2>Одна команда — <em>весь проект.</em></h2></div><div className="service-list" data-reveal>{services.map((service,index)=>{const open=activeService===index;return <article className={open?'service-item is-open':'service-item'} key={service.id}><button type="button" onClick={()=>setActiveService(open?-1:index)} aria-expanded={open}><span className="service-number">{service.id}</span><span className="service-title">{service.title}</span><span className="service-tag">{service.tag}</span><span className="service-toggle" aria-hidden="true">{open?'−':'+'}</span></button><div className="service-answer"><div><p>{service.text}</p></div></div></article>;})}</div></section>

      <section className="assurance"><div className="assurance-art" aria-hidden="true"><Image src="/media/connected-fiber-infrastructure-network.png" alt="" fill sizes="100vw" /></div><div className="assurance-shade"/><div className="assurance-content section-shell"><div className="section-index" data-reveal><span>06</span><p>Гарантия и сервис</p></div><div className="assurance-copy" data-reveal><p className="section-kicker">После запуска</p><h2>Поддержка <em>сети после сдачи.</em></h2><p>Гарантийное и постгарантийное обслуживание и аварийное восстановление линий.</p></div><div className="assurance-cards"><article className="glass-card" data-reveal><span>01</span><h3>Гарантия</h3><p>Сервис построенной инфраструктуры.</p></article><article className="glass-card" data-reveal><span>02</span><h3>Восстановление</h3><p>Аварийные работы на линии.</p></article></div></div></section>

      <section className="contacts" id="contacts"><div className="contact-lead" data-reveal><p className="section-kicker">Обсудить проект</p><h2>Нужна надёжная<br/><em>оптическая сеть?</em></h2><a className="button button-blue" href="tel:+77711007766">Позвонить<Arrow/></a></div><div className="contact-panel glass-card" data-reveal><p>Связаться с компанией MBT Connection</p><a href="tel:+77711007766"><span>Телефон</span><strong>+7 771 100 77 66</strong><Arrow/></a><a href="mailto:info@mbtconnect.kz"><span>Почта</span><strong>info@mbtconnect.kz</strong><Arrow/></a><address><span>Адрес</span><strong>Казахстан, Кокшетау<br/>ул. Кошкарбаева, 188</strong></address></div></section><footer><a className="brand" href="#top" aria-label="MBT Connection"><span className="brand-mark">MBT</span><span className="brand-name">CONNECTION</span></a><p>Проектирование · Строительство · Сервис</p><a href="mailto:info@mbtconnect.kz">info@mbtconnect.kz</a><span>© 2026 MBT Connection</span></footer>
    </main>
  );
}
