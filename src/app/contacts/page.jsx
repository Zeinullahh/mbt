import Link from 'next/link';
import InnerPage from '../../components/inner-page';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata('/contacts');

export default function ContactsPage() {
  return <InnerPage path="/contacts" eyebrow="Контакты" title="Связаться с MBT Connection">
    <p className="inner-lead">Обсудим проектирование, строительство или обслуживание волоконно-оптической линии связи в Казахстане.</p>
    <div className="inner-grid">
      <section className="inner-card"><h2>Телефон</h2><p><a href="tel:+77711007766">+7 771 100 77 66</a></p><p><a href="https://wa.me/77711007766">Написать в WhatsApp</a></p></section>
      <section className="inner-card"><h2>Электронная почта</h2><p><a href="mailto:info@mbtconnect.kz">info@mbtconnect.kz</a></p></section>
      <section className="inner-card"><h2>Адрес</h2><address>Казахстан, Кокшетау, ул. Кошкарбаева, 188</address></section>
    </div>
    <section className="inner-geography"><h2>География работы</h2><p>Филиалы компании находятся в Астане, Кокшетау и Степногорске. Есть опыт проектов в Алматы и Шымкенте; команда готова работать по Казахстану с подрядчиками и партнёрами.</p></section>
    <p className="inner-note">Посмотрите <Link href="/services">услуги</Link> и <Link href="/projects">реализованные объекты</Link> перед обращением.</p>
  </InnerPage>;
}
