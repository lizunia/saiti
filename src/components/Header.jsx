import { NavLink } from 'react-router-dom'

export function Header({ bagCount, dictionary, favoriteCount, onBook, onToggleLanguage, onToggleTheme, theme }) {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="GlowHaus home">
        <span>G</span>
        {dictionary.brand}
      </NavLink>

      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/">{dictionary.nav.home}</NavLink>
        <NavLink to="/products">{dictionary.nav.products}</NavLink>
        <NavLink to="/services">{dictionary.nav.services}</NavLink>
        <NavLink to="/favorites">{dictionary.nav.favorites} {favoriteCount > 0 ? favoriteCount : ''}</NavLink>
      </nav>

      <div className="header-actions">
        <button type="button" className="icon-button text-button" onClick={onToggleLanguage}>{dictionary.language}</button>
        <button type="button" className="icon-button text-button" onClick={onToggleTheme}>{theme === 'light' ? dictionary.themeLight : dictionary.themeDark}</button>
        <span className="bag-pill">{dictionary.bag}: {bagCount}</span>
        <button type="button" className="primary-button" onClick={onBook}>{dictionary.book}</button>
      </div>
    </header>
  )
}
