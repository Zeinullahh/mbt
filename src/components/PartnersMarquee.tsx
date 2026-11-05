import Image from 'next/image';

const partners = [
  { name: 'BI Group', image: '/partners/bi-group.png' },
  { name: 'Beeline', image: '/partners/beeline.png' },
  { name: 'Альянс', image: '/partners/alliance.png' },
  { name: 'Allprof Telecom', image: '/partners/allprof-telecom.png' },
] as const;

// A full group is wider than a large desktop viewport. The second, identical
// group lets the track travel exactly one group width before restarting.
const repetitionsPerGroup = 4;

export default function PartnersMarquee() {
  return (
    <section className="partners-section" id="partners" aria-labelledby="partners-title">
      <div className="partners-heading section-shell">
        <div className="section-index"><span>05</span><p>Партнёры</p></div>
        <div className="partners-heading-copy">
          <h2 id="partners-title">Наши партнёры</h2>
          <p>Компании, с которыми мы сотрудничаем</p>
        </div>
      </div>

      <div className="partners-marquee">
        <div className="partners-track">
          {Array.from({ length: 2 }, (_, groupIndex) => (
            <div className="partners-group" key={groupIndex} aria-hidden={groupIndex === 1 ? true : undefined}>
              {Array.from({ length: repetitionsPerGroup }, (_, repeatIndex) =>
                partners.map((partner) => (
                  <div
                    className="partner-card"
                    key={`${repeatIndex}-${partner.name}`}
                    aria-hidden={groupIndex === 0 && repeatIndex > 0 ? true : undefined}
                  >
                    <div className="partner-logo">
                      <Image src={partner.image} alt={partner.name} fill sizes="(max-width: 540px) 160px, 210px" style={{ objectFit: 'contain' }} />
                    </div>
                  </div>
                )),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
