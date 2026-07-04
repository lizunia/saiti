import { useState } from 'react'
import { services } from '../data/services.js'
import { useSessionStorage } from '../hooks/useSessionStorage.js'

export function BookingModal({ dictionary, onClose }) {
  const [savedBooking, setSavedBooking] = useSessionStorage('glowhaus-booking', null)
  const [form, setForm] = useState({ name: '', phone: '', service: services[0].title, date: '' })

  function updateField(event) {
    setForm((currentForm) => ({ ...currentForm, [event.target.name]: event.target.value }))
  }

  function submitBooking(event) {
    event.preventDefault()
    setSavedBooking({ ...form, createdAt: new Date().toISOString() })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <form className="booking-modal modal-panel" role="dialog" aria-modal="true" onSubmit={submitBooking} onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className="close-button" onClick={onClose} aria-label={dictionary.modalClose}>×</button>
        <h2>{dictionary.bookingTitle}</h2>
        <label>{dictionary.name}<input name="name" value={form.name} onChange={updateField} required /></label>
        <label>{dictionary.phone}<input name="phone" value={form.phone} onChange={updateField} required /></label>
        <label>{dictionary.service}<select name="service" value={form.service} onChange={updateField}>{services.map((service) => <option key={service.id}>{service.title}</option>)}</select></label>
        <label>{dictionary.date}<input type="date" name="date" value={form.date} onChange={updateField} required /></label>
        <button type="submit" className="primary-button wide-button">{dictionary.send}</button>
        {savedBooking && <p className="success-message">{dictionary.bookingSaved}</p>}
      </form>
    </div>
  )
}
