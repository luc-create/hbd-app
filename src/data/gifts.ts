export type Gift = {
  id: string
  title: string
  subtitle: string
  description: string
  unlockMessage: string
  icon: string
  gradient: [string, string]
}

export const gifts: Gift[] = [
  {
    id: 'spa-day',
    title: 'Pause cantine à l’U',
    subtitle: 'Déjeuner complice',
    description:
      'On se retrouve au resto universitaire, plat du jour bien chaud, jus bissap bien frais et fous rires entre deux stories. Simple, cosy, juste nous.',
    unlockMessage:
      'Ton plateau est réservé ! On t’attend à la table près de la fenêtre pour refaire le monde.',
    icon: '🍽️',
    gradient: ['#ff9a9e', '#fad0c4'],
  },
  {
    id: 'paris-getaway',
    title: 'Sortie ciné à deux',
    subtitle: 'Soirée pop-corn',
    description:
      'Taxi direction le petit cinéma de quartier, film coup de cœur, partage de pop-corn caramel et selfie souvenir devant l’affiche.',
    unlockMessage:
      'Prépare ta plus belle tenue chill : billets en poche et siège du milieu gardé rien que pour toi.',
    icon: '🎬',
    gradient: ['#a18cd1', '#fbc2eb'],
  },
  {
    id: 'atelier-creation',
    title: 'Pause biscuits & confidences',
    subtitle: 'Douceurs sucrées',
    description:
      'On passe à la boutique du coin, on choisit tes biscuits préférés et on s’assoit sur un banc pour papoter jusqu’au coucher de soleil.',
    unlockMessage:
      'Un sachet de biscuits à la cacahuète t’attend déjà. C’est toi qui décides du spot pour grignoter.',
    icon: '🍪',
    gradient: ['#fbc2eb', '#a6c1ee'],
  },
  {
    id: 'star-dinner',
    title: 'Balade sunset à la plage',
    subtitle: 'Respirer l’océan',
    description:
      'On file à la plage de Lomé, pieds dans le sable, sucreries de rue à partager et playlist dans les écouteurs pendant que le soleil se couche.',
    unlockMessage:
      'Ton pagne est prêt, la brise marine aussi. On t’attend pour tracer nos prénoms dans le sable.',
    icon: '🌅',
    gradient: ['#84fab0', '#8fd3f4'],
  },
]

