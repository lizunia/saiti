import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard.jsx'
import { getMakeupProducts } from '../services/makeupApi.js'

export function Products({ bagIds, dictionary, favoriteIds, onOpenProduct, onToggleBag, onToggleFavorite }) {
  const [products, setProducts] = useState([])
  const [source, setSource] = useState('api')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')

  useEffect(() => {
    let active = true
    getMakeupProducts().then((result) => {
      if (active) {
        setProducts(result.products)
        setSource(result.source)
        setLoading(false)
      }
    })
    return () => { active = false }
  }, [])

  const productTypes = useMemo(() => ['all', ...new Set(products.map((product) => product.product_type))], [products])
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.brand.toLowerCase().includes(search.toLowerCase())
    const matchesType = type === 'all' || product.product_type === type
    return matchesSearch && matchesType
  }), [products, search, type])

  return (
    <section className="content-section page-section">
      <div className="section-heading centered-heading">
        <span className="eyebrow">API catalog</span>
        <h1>{dictionary.productsTitle}</h1>
        <p>{dictionary.productsLead}</p>
      </div>
      <div className="catalog-toolbar">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={dictionary.searchPlaceholder} type="search" />
        <select value={type} onChange={(event) => setType(event.target.value)}>
          {productTypes.map((productType) => <option value={productType} key={productType}>{productType === 'all' ? dictionary.all : productType}</option>)}
        </select>
      </div>
      {source === 'fallback' && <p className="notice">{dictionary.apiFallback}</p>}
      {loading ? <p className="loading-text">{dictionary.loading}</p> : <div className="product-grid">{filteredProducts.map((product) => <ProductCard bagIds={bagIds} dictionary={dictionary} favoriteIds={favoriteIds} key={product.id} onOpenProduct={onOpenProduct} onToggleBag={onToggleBag} onToggleFavorite={onToggleFavorite} product={product} />)}</div>}
    </section>
  )
}
