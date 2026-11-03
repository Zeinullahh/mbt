import Link from 'next/link';
import InnerPage from '../../components/inner-page';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata('/services');

const groups = [
  { title: 'Подготовка', items: ['Предпроектное обследование объекта', 'Проектирование ВОЛС и техническое решение', 'Разрешения и согласования'] },
  { title: 'Строительство и монтаж', items: ['Прокладка оптического кабеля и строительство линий', 'Монтаж оборудования и сварка оптического волокна', 'Оптические сети доступа GPON и FTTH'] },
  { title: 'Сдача и сопровождение', items: ['Измерения OTDR и контроль качества', 'Исполнительная документация и ввод линии', 'Гарантийный и постгарантийный сервис', 'Аварийное восстановление действующих линий'] },
];

export default function ServicesPage() {
  return <InnerPage path="/services" eyebrow="Услуги" title="Проектирование, строительство и обслуживание ВОЛС">
    <p className="inner-lead">MBT Connection выполняет полный цикл работ с волоконно-оптическими линиями связи: от обследования до сдачи и дальнейшего обслуживания.</p>
    <div className="inner-grid">{groups.map(group => <section className="inner-card" key={group.title}><h2>{group.title}</h2><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></section>)}</div>
    <p className="inner-note">Работы включают монтаж, сварку и измерение оптических линий. Подробнее о последовательности — в <Link href="/#process">этапах работы</Link>; примеры объектов — в <Link href="/projects">портфолио</Link>.</p>
  </InnerPage>;
}
