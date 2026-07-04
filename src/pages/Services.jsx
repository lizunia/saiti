import { services } from '../data/services.js'

export function Services({ dictionary, onBook }) {
  return (
    <section className="content-section page-section">
      <div className="section-heading centered-heading">
        <span className="eyebrow">Studio menu</span>
        <h1>{dictionary.servicesTitle}</h1>
        <p>{dictionary.servicesLead}</p>
      </div>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.id}>
            <img src={service.image} alt={service.title} />
            <div>
              <h3>{service.title}</h3>
              <p>{dictionary.duration}: {service.duration}</p>
              <p>{dictionary.price}: {service.price}</p>
              <button type="button" className="primary-button" onClick={onBook}>{dictionary.reserve}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
