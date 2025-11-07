import { useCallback, useEffect, useState } from 'react'
import { photos } from '../data/media'

export function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleOpen = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const handleClose = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return 0
      }

      return (current + 1) % photos.length
    })
  }, [])

  const handlePrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return 0
      }

      return (current - 1 + photos.length) % photos.length
    })
  }, [])

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.removeProperty('overflow')
      return undefined
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      } else if (event.key === 'ArrowRight') {
        handleNext()
      } else if (event.key === 'ArrowLeft') {
        handlePrevious()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = previousOverflow
    }
  }, [activeIndex, handleClose, handleNext, handlePrevious])

  return (
    <>
      <section id="gallery" className="section">
        <div className="section__header">
          <span className="section__eyebrow">Galerie photos</span>
          <h2>Des instants capturés avec finesse</h2>
          <p>
            Chaque cliché raconte une histoire, un éclat de ton aura, une preuve supplémentaire que tu
            es inoubliable.
          </p>
        </div>

        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <figure key={photo.id} className="gallery-card">
              <button
                className="gallery-card__button"
                type="button"
                onClick={() => handleOpen(index)}
                aria-label={`Ouvrir la photo ${index + 1} sur ${photos.length}`}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </button>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {activeIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${activeIndex + 1} sur ${photos.length}`}
          onClick={handleClose}
        >
          <div className="lightbox__container" onClick={(event) => event.stopPropagation()}>
            <button
              className="lightbox__close"
              type="button"
              onClick={handleClose}
              aria-label="Fermer la galerie"
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <button
              className="lightbox__nav lightbox__nav--previous"
              type="button"
              onClick={handlePrevious}
              aria-label="Photo précédente"
            >
              <span aria-hidden="true">&lsaquo;</span>
            </button>

            <figure className="lightbox__figure">
              <img src={photos[activeIndex].src} alt={photos[activeIndex].alt} />
              <figcaption>{photos[activeIndex].caption}</figcaption>
            </figure>

            <button
              className="lightbox__nav lightbox__nav--next"
              type="button"
              onClick={handleNext}
              aria-label="Photo suivante"
            >
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default PhotoGallery

