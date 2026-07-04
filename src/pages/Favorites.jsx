import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard.jsx'

export function Favorites({ bagIds, dictionary, favorites, onOpenProduct, onToggleBag, onToggleFavorite }) {
  return (
    <section className="content-section page-section">
      <div className="section-heading centered-heading">
        <span className="eyebrow">Saved edit</span>
        <h1>{dictionary.favoritesTitle}</h1>
        <p>{dictionary.favoritesLead}</p>
      </div>
      {favorites.length === 0 ? (
        <div className="empty-panel">
          <p>{dictionary.emptyFavorites}</p>
          <Link className="primary-button" to="/products">{dictionary.explore}</Link>
        </div>
      ) : (
        <div className="product-grid">
          {favorites.map((product) => <ProductCard bagIds={bagIds} dictionary={dictionary} favoriteIds={new Set(favorites.map((item) => item.id))} key={product.id} onOpenProduct={onOpenProduct} onToggleBag={onToggleBag} onToggleFavorite={onToggleFavorite} product={product} />)}
        </div>
      )}
    </section>
  )
}
