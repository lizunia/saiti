import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard.jsx'
import { fallbackProducts } from '../data/fallbackProducts.js'

export function Home({ dictionary, favoriteIds, onBook, onOpenProduct, onToggleFavorite }) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">GlowHaus Studio</span>
          <h1>{dictionary.heroTitle}</h1>
          <p>{dictionary.heroText}</p>
          <div className="hero-actions">
            <Link className="primary-button" to="/products">{dictionary.explore}</Link>
            <button type="button" className="ghost-button" onClick={onBook}>{dictionary.heroBook}</button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1000&q=80" alt="" />
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span className="eyebrow">Glow edit</span>
          <h2>{dictionary.trendTitle}</h2>
          <p>{dictionary.trendText}</p>
        </div>
        <div className="product-grid compact-grid">
          {fallbackProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} dictionary={dictionary} favoriteIds={favoriteIds} onOpenProduct={onOpenProduct} onToggleFavorite={onToggleFavorite} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
