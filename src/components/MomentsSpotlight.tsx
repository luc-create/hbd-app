const moments = [
  {
    id: 'first-meeting',
    year: '2016',
    title: 'Premier éclat',
    description:
      'Le jour où nos chemins se sont croisés et que tes rires sont devenus une bande-son indispensable.',
    icon: '🌸',
  },
  {
    id: 'roadtrip',
    year: '2019',
    title: 'Road-trip impromptu',
    description:
      '3 heures de route, des playlists à tue-tête et un coucher de soleil que seule ta présence pouvait magnifier.',
    icon: '🚗',
  },
  {
    id: 'career-milestone',
    year: '2022',
    title: 'Ta grande victoire',
    description:
      'Ce pitch que tu as transformé en standing ovation – preuve que ton talent n’a pas de limite.',
    icon: '🏆',
  },
  {
    id: 'today',
    year: '2025',
    title: 'Aujourd’hui',
    description:
      'On célèbre la femme lumineuse que tu es, et tous les lendemains que tu vas encore enflammer.',
    icon: '✨',
  },
]

export function MomentsSpotlight() {
  return (
    <section className="section section--alt" id="moments">
      <div className="section__header">
        <span className="section__eyebrow">Moments précieux</span>
        <h2>Un fil doré de souvenirs</h2>
        <p>
          Quelques fragments de notre histoire pour te rappeler combien chaque instant à tes côtés
          est un trésor.
        </p>
      </div>

      <div className="timeline">
        {moments.map((moment) => (
          <article key={moment.id} className="timeline__item">
            <div className="timeline__icon">{moment.icon}</div>
            <div>
              <span className="timeline__year">{moment.year}</span>
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MomentsSpotlight

