import Image from 'next/image';

const partners = [
  { name: 'BI Group', image: '/partners/transparent/bi-group.png' },
  { name: 'Beeline', image: '/partners/transparent/beeline.png' },
  { name: 'Альянс', image: '/partners/transparent/alliance.png' },
  { name: 'Allprof Telecom', image: '/partners/transparent/allprof-telecom.png' },
] as const;

// A full group is wider than a large desktop viewport. The second, identical
// group lets the track travel exactly one group width before restarting.
const repetitionsPerGroup = 4;

export default function PartnersMarquee() {
  return (
    <section className="clients-section" id="clients" aria-labelledby="clients-title">
      <div className="clients-heading"><span className="clients-heading-rule" aria-hidden="true" /><h2 id="clients-title">Наши клиенты</h2></div>

      <div className="clients-marquee">
        <div className="clients-track">
          {Array.from({ length: 2 }, (_, groupIndex) => (
            <div className="clients-group" key={groupIndex} aria-hidden={groupIndex === 1 ? true : undefined}>
              {Array.from({ length: repetitionsPerGroup }, (_, repeatIndex) =>
                partners.map((partner) => (
                  <div
                    className="client-card"
                    key={`${repeatIndex}-${partner.name}`}
                    aria-hidden={groupIndex === 0 && repeatIndex > 0 ? true : undefined}
                  >
                    <div className="client-logo">
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
