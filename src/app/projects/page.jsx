import Image from 'next/image';
import Link from 'next/link';
import InnerPage from '../../components/inner-page';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata('/projects');

const projects = [
  ['ЖК Akbulak Rivera', '/media/project-akbulak-rivera.jpg'],
  ['ЖК Atlant', '/media/project-atlant.jpg'],
  ['ЖК Nexpo City', '/media/project-nexpo-city.jpg'],
  ['ЖК Green Line Garden', '/media/12_project_green_line_garden.jpg'],
  ['ЖК Green Line Velora', '/media/project-green-line-velora.jpg'],
  ['ТРЦ «Керуен»', '/media/project-keruen.jpg'],
];

export default function ProjectsPage() {
  return <InnerPage path="/projects" eyebrow="Объекты" title="Реализованные объекты MBT Connection">
    <p className="inner-lead">В портфолио компании — жилые комплексы и коммерческий объект. Объекты подтверждены каталогом MBT Connection 2026 года.</p>
    <div className="inner-project-grid">{projects.map(([name, image]) => <article className="inner-project" key={name}><div><Image src={image} alt={name} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><h2>{name}</h2></article>)}</div>
    <p className="inner-note">О <Link href="/services">направлениях работ</Link> и <Link href="/#process">порядке реализации проекта</Link> можно узнать на сайте.</p>
  </InnerPage>;
}
