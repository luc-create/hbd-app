type HeroSectionProps = {
  celebrantName: string
  celebrantTagline: string
  celebrationDate: string
  wishCount: number
  onWriteWish: () => void
  onExploreGifts: () => void
}

export function HeroSection({
  celebrantName,
  celebrantTagline,
  celebrationDate,
  wishCount,
  onWriteWish,
  onExploreGifts,
}: HeroSectionProps) {
  const formattedWishCount =
    wishCount === 0 ? '0 voeu' : wishCount === 1 ? '1 voeu reçu' : `${wishCount} voeux reçus`

  const highlights = [
    { label: 'Sourires partagés', value: '∞' },
    { label: 'Mur de voeux', value: formattedWishCount },
    { label: 'Moments mémorables', value: '365 jours d’amour' },
  ]

  return (
    <header className="hero">
      <div className="hero__content">
        <span className="hero__badge">Edition prestige · {celebrationDate}</span>
        <h1>
          Joyeux Anniversaire
          <span className="hero__name"> {celebrantName} ✨</span>
        </h1>
        <p className="hero__tagline">{celebrantTagline}</p>
        <div className="hero__actions">
          <button className="btn btn--primary" type="button" onClick={onWriteWish}>
            Écrire un voeu
          </button>
          <button className="btn btn--ghost" type="button" onClick={onExploreGifts}>
            Découvrir les cadeaux
          </button>
        </div>
        <div className="hero__highlights">
          {highlights.map((item) => (
            <div key={item.label} className="highlight-card">
              <span className="highlight-card__value">{item.value}</span>
              <span className="highlight-card__label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero__halo" aria-hidden />
    </header>
  )
}

export default HeroSection

