import { useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { BookingModal } from './components/BookingModal.jsx'
import { ProductModal } from './components/ProductModal.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { translations } from './data/translations.js'
import { Home } from './pages/Home.jsx'
import { Products } from './pages/Products.jsx'
import { Services } from './pages/Services.jsx'
import { Favorites } from './pages/Favorites.jsx'
import './App.css'

function App() {
  const [theme, setTheme] = useLocalStorage('glowhaus-theme', 'light')
  const [language, setLanguage] = useLocalStorage('glowhaus-language', 'ka')
  const [favorites, setFavorites] = useLocalStorage('glowhaus-favorites', [])
  const [beautyBag, setBeautyBag] = useLocalStorage('glowhaus-bag', [])
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const dictionary = translations[language]
  const favoriteIds = useMemo(() => new Set(favorites.map((item) => item.id)), [favorites])
  const bagIds = useMemo(() => new Set(beautyBag.map((item) => item.id)), [beautyBag])

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  function toggleLanguage() {
    setLanguage((currentLanguage) => (currentLanguage === 'ka' ? 'en' : 'ka'))
  }

  function toggleFavorite(product) {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some((item) => item.id === product.id)
      return exists
        ? currentFavorites.filter((item) => item.id !== product.id)
        : [...currentFavorites, product]
    })
  }

  function toggleBag(product) {
    setBeautyBag((currentBag) => {
      const exists = currentBag.some((item) => item.id === product.id)
      return exists ? currentBag.filter((item) => item.id !== product.id) : [...currentBag, product]
    })
  }

  return (
    <div className="app" data-theme={theme}>
      <Header
        bagCount={beautyBag.length}
        dictionary={dictionary}
        favoriteCount={favorites.length}
        language={language}
        onBook={() => setBookingOpen(true)}
        onToggleLanguage={toggleLanguage}
        onToggleTheme={toggleTheme}
        theme={theme}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                dictionary={dictionary}
                favoriteIds={favoriteIds}
                onBook={() => setBookingOpen(true)}
                onOpenProduct={setSelectedProduct}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                bagIds={bagIds}
                dictionary={dictionary}
                favoriteIds={favoriteIds}
                onOpenProduct={setSelectedProduct}
                onToggleBag={toggleBag}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/services"
            element={<Services dictionary={dictionary} onBook={() => setBookingOpen(true)} />}
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                bagIds={bagIds}
                dictionary={dictionary}
                favorites={favorites}
                onOpenProduct={setSelectedProduct}
                onToggleBag={toggleBag}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer dictionary={dictionary} />

      {bookingOpen && <BookingModal dictionary={dictionary} onClose={() => setBookingOpen(false)} />}
      {selectedProduct && (
        <ProductModal
          bagIds={bagIds}
          dictionary={dictionary}
          favoriteIds={favoriteIds}
          onClose={() => setSelectedProduct(null)}
          onToggleBag={toggleBag}
          onToggleFavorite={toggleFavorite}
          product={selectedProduct}
        />
      )}
    </div>
  )
}

export default App