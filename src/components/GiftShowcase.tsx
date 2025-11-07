import { gifts } from '../data/gifts'

type GiftShowcaseProps = {
  unlockedGiftIds: string[]
  onUnlock: (giftId: string) => void
}

export function GiftShowcase({ unlockedGiftIds, onUnlock }: GiftShowcaseProps) {
  return (
    <section id="gifts" className="section">
      <div className="section__header">
        <span className="section__eyebrow">Cadeaux signature</span>
        <h2>Un bouquet d’expériences pensées pour elle</h2>
        <p>
          Chaque cadeau est une aventure immersive préparée avec amour. Débloque-les pour révéler la
          surprise.
        </p>
      </div>

      <div className="gifts-grid">
        {gifts.map((gift) => {
          const isUnlocked = unlockedGiftIds.includes(gift.id)

          return (
            <article
              key={gift.id}
              className={`gift-card ${isUnlocked ? 'gift-card--unlocked' : ''}`}
              style={{
                backgroundImage: `linear-gradient(135deg, ${gift.gradient[0]}, ${gift.gradient[1]})`,
              }}
            >
              <div className="gift-card__badge">{gift.icon}</div>
              <div className="gift-card__content">
                <span className="gift-card__subtitle">{gift.subtitle}</span>
                <h3>{gift.title}</h3>
                <p>{gift.description}</p>
              </div>
              <div className="gift-card__footer">
                {isUnlocked ? (
                  <p className="gift-card__unlock-message">{gift.unlockMessage}</p>
                ) : (
                  <button
                    className="btn btn--light"
                    type="button"
                    onClick={() => onUnlock(gift.id)}
                  >
                    Débloquer ce cadeau
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default GiftShowcase

