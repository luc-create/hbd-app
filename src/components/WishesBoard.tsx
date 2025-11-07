import type { Wish } from '../types'

type WishesBoardProps = {
  wishes: Wish[]
  celebrantName: string
  onEdit: (wish: Wish) => void
  visitorId: string
  isLoading?: boolean
}

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'long',
  timeStyle: 'short',
})

export function WishesBoard({
  wishes,
  celebrantName,
  onEdit,
  visitorId,
  isLoading = false,
}: WishesBoardProps) {
  const hasWishes = wishes.length > 0

  return (
    <div className="wish-board">
      <div className="wish-board__header">
        <h2>Mur des voeux</h2>
        <p>
          Des mots doux pour {celebrantName}. Chaque message est un éclat qui illumine sa journée.
        </p>
      </div>

      {isLoading ? (
        <div className="wish-board__empty">
          <p>Chargement des voeux…</p>
        </div>
      ) : hasWishes ? (
        <ul className="wish-board__list">
          {wishes.map((wish) => (
            <li key={wish.id} className="wish-card">
              <div className="wish-card__meta">
                <span className="wish-card__author">
                  {wish.author || 'Anonyme'} · {wish.relationship}
                </span>
                <time dateTime={wish.createdAt}>{dateFormatter.format(new Date(wish.createdAt))}</time>
              </div>
              <p className="wish-card__message">{wish.message}</p>
              {(!wish.ownerId || wish.ownerId === visitorId) && (
                <div className="wish-card__actions">
                  <button type="button" onClick={() => onEdit(wish)}>
                    Modifier ce voeu
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="wish-board__empty">
          <p>Aucun voeu pour le moment… sois la première personne à lui écrire un message inoubliable.</p>
        </div>
      )}
    </div>
  )
}

export default WishesBoard

