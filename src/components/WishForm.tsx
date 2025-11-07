import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { Wish } from '../types'

type WishFormProps = {
  onSubmit: (wish: { author: string; message: string; relationship: string }) => void
  initialWish?: Pick<Wish, 'author' | 'relationship' | 'message'>
  isEditing?: boolean
  onCancelEdit?: () => void
  isSubmitting?: boolean
}

const MAX_CHARACTERS = 260

const relationships = [
  'Ami·e de toujours',
  'Camarade de cœur',
  'Âme sœur créative',
  'Complice de voyages',
]

export function WishForm({
  onSubmit,
  initialWish,
  isEditing = false,
  onCancelEdit,
  isSubmitting = false,
}: WishFormProps) {
  const [author, setAuthor] = useState(initialWish?.author ?? '')
  const [message, setMessage] = useState(initialWish?.message ?? '')
  const [relationship, setRelationship] = useState(initialWish?.relationship ?? relationships[0])

  useEffect(() => {
    setAuthor(initialWish?.author ?? '')
    setMessage(initialWish?.message ?? '')
    if (initialWish?.relationship && relationships.includes(initialWish.relationship)) {
      setRelationship(initialWish.relationship)
    } else {
      setRelationship(relationships[0])
    }
  }, [initialWish])

  const charactersLeft = useMemo(
    () => Math.max(0, MAX_CHARACTERS - message.length),
    [message],
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      return
    }

    onSubmit({
      author: author.trim(),
      message: trimmedMessage,
      relationship,
    })

    if (!isEditing) {
      setAuthor('')
      setMessage('')
      setRelationship(relationships[0])
    }
  }

  return (
    <div className="wish-form-card">
      <h2>{isEditing ? 'Modifier ton voeu' : 'Glisse-lui un mot doux'}</h2>
      <p className="wish-form-card__subtitle">
        {isEditing
          ? 'Actualise ton message si tu veux préciser quelque chose ou ajouter une touche encore plus personnelle.'
          : 'Laisse parler ton cœur. Ton message apparaîtra instantanément sur le mur des voeux.'}
      </p>

      <form className="wish-form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Ton prénom (optionnel)</span>
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="Ex. Léa"
            aria-label="Ton prénom"
          />
        </label>

        <label className="form-field">
          <span>Votre vibe</span>
          <div className="select-wrapper">
            <select
              value={relationship}
              onChange={(event) => setRelationship(event.target.value)}
              aria-label="Relation avec la célébrée"
            >
              {relationships.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="form-field">
          <span>Ton message</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value.slice(0, MAX_CHARACTERS))}
            placeholder="Souhaite-lui un anniversaire inoubliable…"
            aria-label="Message pour l'anniversaire"
            rows={5}
          />
          <span className="helper-text">{charactersLeft} caractères restants</span>
        </label>

        <div className="wish-form__actions">
          {isEditing && (
            <button
              className="btn btn--ghost"
              type="button"
              onClick={onCancelEdit}
              disabled={isSubmitting}
            >
              Annuler
            </button>
          )}
          <button
            className="btn btn--primary"
            type="submit"
            disabled={!message.trim() || isSubmitting}
          >
            {isEditing ? 'Mettre à jour le voeu' : 'Ajouter mon voeu'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default WishForm

