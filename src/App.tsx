import { useCallback, useEffect, useMemo, useState } from 'react'
import BirthdayModal from './components/BirthdayModal'
import GiftShowcase from './components/GiftShowcase'
import HeroSection from './components/HeroSection'
import MomentsSpotlight from './components/MomentsSpotlight'
import PhotoGallery from './components/PhotoGallery'
import SiteFooter from './components/SiteFooter'
import VideoReels from './components/VideoReels'
import WishForm from './components/WishForm'
import WishesBoard from './components/WishesBoard'
import { useLocalStorageState } from './hooks/useLocalStorage'
import { supabase } from './lib/supabaseClient'
import type { Wish } from './types'

const GIFTS_STORAGE_KEY = 'hbd:gifts:unlocked'
const VISITOR_ID_STORAGE_KEY = 'hbd:visitor-id'

const CELEBRANT = {
  name: 'Nkechi',
  tagline: 'Ta lumière illumine toutes les pièces, ton rire est contagieux et ton élégance est sans effort.',
  celebrationDate: '8 novembre 2025',
}

function App() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [unlockedGiftIds, setUnlockedGiftIds] = useLocalStorageState<string[]>(
    GIFTS_STORAGE_KEY,
    [],
  )
  const [isBirthdayModalOpen, setIsBirthdayModalOpen] = useState(false)
  const [editingWish, setEditingWish] = useState<Wish | null>(null)
  const [isLoadingWishes, setIsLoadingWishes] = useState(true)
  const [isSavingWish, setIsSavingWish] = useState(false)
  const [wishesError, setWishesError] = useState<string | null>(null)
  const [visitorId] = useState(() => {
    if (typeof window === 'undefined') {
      return ''
    }

    const existing = window.localStorage.getItem(VISITOR_ID_STORAGE_KEY)
    if (existing) {
      return existing
    }

    const generated =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `visitor-${Math.random().toString(36).slice(2)}`

    window.localStorage.setItem(VISITOR_ID_STORAGE_KEY, generated)
    return generated
  })

  useEffect(() => {
    setIsBirthdayModalOpen(true)
  }, [])

  const wishCount = wishes.length

  const orderedWishes = useMemo(
    () =>
      [...wishes].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [wishes],
  )

  const mapRowToWish = useCallback(
    (row: {
      id: string
      author: string | null
      relationship: string | null
      message: string
      created_at: string
      owner_id: string | null
    }): Wish => ({
      id: row.id,
      author: row.author ?? '',
      relationship: row.relationship ?? '',
      message: row.message,
      createdAt: row.created_at,
      ownerId: row.owner_id ?? '',
    }),
    [],
  )

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const fetchWishes = useCallback(async () => {
    setIsLoadingWishes(true)
    setWishesError(null)
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('id, author, relationship, message, created_at, owner_id')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      if (data) {
        setWishes(data.map(mapRowToWish))
      }
    } catch (error) {
      console.error('Failed to fetch wishes:', error)
      setWishesError("Impossible d'afficher les voeux pour le moment. Réessaie plus tard.")
    } finally {
      setIsLoadingWishes(false)
    }
  }, [mapRowToWish])

  useEffect(() => {
    fetchWishes()
  }, [fetchWishes])

  const handleSubmitWish = useCallback(
    async (wish: { author: string; relationship: string; message: string }) => {
      if (editingWish && editingWish.ownerId && editingWish.ownerId !== visitorId) {
        if (typeof window !== 'undefined') {
          window.alert('Tu peux uniquement modifier les voeux que tu as écrits.')
        }
        setEditingWish(null)
        return
      }

      setIsSavingWish(true)
      setWishesError(null)
      const payload = {
        author: wish.author.trim() || null,
        relationship: wish.relationship,
        message: wish.message,
        owner_id: visitorId,
        created_at: new Date().toISOString(),
      }

      try {
        if (editingWish) {
          const { error } = await supabase
            .from('wishes')
            .update(payload)
            .eq('id', editingWish.id)

          if (error) {
            throw error
          }
        } else {
          const { error } = await supabase.from('wishes').insert([payload])
          if (error) {
            throw error
          }
        }

        await fetchWishes()
        if (editingWish) {
          setEditingWish(null)
        }
      } catch (error) {
        console.error('Failed to save wish:', error)
        if (typeof window !== 'undefined') {
          window.alert("Oops, le voeu n'a pas pu être enregistré. Réessaie dans un instant.")
        }
      } finally {
        setIsSavingWish(false)
      }
    },
    [editingWish, fetchWishes, visitorId],
  )

  const handleEditWish = useCallback(
    (wish: Wish) => {
      if (wish.ownerId && wish.ownerId !== visitorId) {
        if (typeof window !== 'undefined') {
          window.alert('Tu ne peux pas modifier ce voeu.')
        }
        return
      }

      setEditingWish(wish)
      scrollToSection('wishes')
    },
    [scrollToSection, visitorId],
  )

  const handleCancelEdit = useCallback(() => {
    setEditingWish(null)
  }, [])

  const handleUnlockGift = useCallback(
    (giftId: string) => {
      setUnlockedGiftIds((previous) =>
        previous.includes(giftId) ? previous : [...previous, giftId],
      )
    },
    [setUnlockedGiftIds],
  )

  return (
    <div className="surface">
      <BirthdayModal open={isBirthdayModalOpen} onClose={() => setIsBirthdayModalOpen(false)} />

      <HeroSection
        celebrantName={CELEBRANT.name}
        celebrantTagline={CELEBRANT.tagline}
        celebrationDate={CELEBRANT.celebrationDate}
        wishCount={wishCount}
        onWriteWish={() => scrollToSection('wishes')}
        onExploreGifts={() => scrollToSection('gifts')}
      />

      <main className="main">
        <section id="wishes" className="section section--split">
          <div className="section__header">
            <span className="section__eyebrow">Mur de célébration</span>
            <h2>Partage ton voeu pour {CELEBRANT.name}</h2>
            <p>
              Des mots qui réchauffent le cœur, des souvenirs partagés, une dose d’amour sincère.
              Ton message restera précieusement affiché ici.
            </p>
          </div>

          <div className="wish-grid">
            <WishForm
              onSubmit={handleSubmitWish}
              initialWish={
                editingWish
                  ? {
                      author: editingWish.author,
                      relationship: editingWish.relationship,
                      message: editingWish.message,
                    }
                  : undefined
              }
              isEditing={Boolean(editingWish)}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSavingWish}
            />
            <WishesBoard
              wishes={orderedWishes}
              celebrantName={CELEBRANT.name}
              onEdit={handleEditWish}
              visitorId={visitorId}
              isLoading={isLoadingWishes}
            />
            {wishesError && <p className="wish-error">{wishesError}</p>}
          </div>
        </section>

        <GiftShowcase unlockedGiftIds={unlockedGiftIds} onUnlock={handleUnlockGift} />

        <MomentsSpotlight />
        <PhotoGallery />
        <VideoReels />
      </main>

      <SiteFooter />
    </div>
  )
}

export default App

