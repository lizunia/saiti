import { fallbackProducts } from '../data/fallbackProducts.js'

const API_URL = 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline'

function normalizeProduct(product) {
  return {
    id: product.id,
    name: product.name || 'Untitled product',
    brand: product.brand || 'Beauty brand',
    price: product.price || '0.00',
    product_type: product.product_type || 'makeup',
    rating: product.rating || 4.4,
    description: product.description || 'A makeup product selected for a polished daily routine.',
    image_link: product.image_link || fallbackProducts[0].image_link,
  }
}

export async function getMakeupProducts() {
  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const products = await response.json()
    return {
      products: products.slice(0, 24).map(normalizeProduct),
      source: 'api',
    }
  } catch {
    return {
      products: fallbackProducts,
      source: 'fallback',
    }
  }
}
