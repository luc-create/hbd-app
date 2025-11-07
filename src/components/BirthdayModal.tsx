import { useEffect } from 'react'

type BirthdayModalProps = {
  open: boolean
  onClose: () => void
}

const YOUTUBE_EMBED_URL =
  'https://www.youtube.com/embed/dNEnzdcnWzE?autoplay=1&rel=0&showinfo=0&modestbranding=1'

export function BirthdayModal({ open, onClose }: BirthdayModalProps) {
  useEffect(() => {
    if (!open) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className="birthday-modal" role="dialog" aria-modal="true" aria-label="Musique d'anniversaire">
      <div className="birthday-modal__backdrop" onClick={onClose} />
      <div className="birthday-modal__container" role="document">
        <button
          className="birthday-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Fermer la vidéo d'anniversaire"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <div className="birthday-modal__header">
          <span className="birthday-modal__eyebrow">Surprise musicale</span>
          <h2>Un son pour lancer la fête</h2>
          <p>
            Clique sur lecture si ton navigateur ne lance pas la musique automatiquement et laisse-toi porter !
          </p>
        </div>

        <div className="birthday-modal__player">
          <iframe
            src={YOUTUBE_EMBED_URL}
            title="Happy Birthday"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default BirthdayModal

