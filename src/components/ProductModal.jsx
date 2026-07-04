export function ProductModal({ bagIds, dictionary, favoriteIds, onClose, onToggleBag, onToggleFavorite, product }) {
  const isFavorite = favoriteIds.has(product.id)
  const isInBag = bagIds.has(product.id)

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="product-modal modal-panel" role="dialog" aria-modal="true" aria-label={product.name} onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className="close-button" onClick={onClose} aria-label={dictionary.modalClose}>×</button>
        <img src={product.image_link} alt={product.name} />
        <div>
          <span className="eyebrow">{product.brand}</span>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="product-meta large">
            <strong>{`$${product.price}`}</strong>
            <span>{dictionary.rating}: {Number(product.rating).toFixed(1)}</span>
          </div>
          <div className="card-actions modal-actions-row">
            <button type="button" onClick={() => onToggleFavorite(product)}>{isFavorite ? dictionary.removeFavorite : dictionary.addFavorite}</button>
            <button type="button" className="solid-action" onClick={() => onToggleBag(product)}>{isInBag ? dictionary.removeBag : dictionary.addBag}</button>
          </div>
        </div>
      </section>
    </div>
  )
}
