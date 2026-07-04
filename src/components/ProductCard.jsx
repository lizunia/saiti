export function ProductCard({ bagIds, dictionary, favoriteIds, onOpenProduct, onToggleBag, onToggleFavorite, product }) {
  const isFavorite = favoriteIds?.has(product.id)
  const isInBag = bagIds?.has(product.id)

  return (
    <article className="product-card">
      <button type="button" className="image-button" onClick={() => onOpenProduct(product)}>
        <img src={product.image_link} alt={product.name} loading="lazy" />
      </button>
      <div className="product-card-body">
        <span className="eyebrow">{product.brand}</span>
        <h3>{product.name}</h3>
        <p>{product.product_type}</p>
        <div className="product-meta">
          <strong>{`$${product.price}`}</strong>
          <span>{dictionary.rating}: {Number(product.rating).toFixed(1)}</span>
        </div>
        <div className="card-actions">
          <button type="button" onClick={() => onToggleFavorite(product)}>{isFavorite ? dictionary.removeFavorite : dictionary.addFavorite}</button>
          {onToggleBag && <button type="button" className="solid-action" onClick={() => onToggleBag(product)}>{isInBag ? dictionary.removeBag : dictionary.addBag}</button>}
        </div>
      </div>
    </article>
  )
}
