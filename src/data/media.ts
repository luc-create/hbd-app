type Photo = {
  id: string
  src: string
  alt: string
  caption: string
}

type Video = {
  id: string
  src: string
  title: string
  description: string
  poster?: string
}

export const photos: Photo[] = [
  {
    id: 'portrait-rose',
    src: '/media/IMG-20251107-WA0084.jpg',
    alt: 'Portrait lumineux de Nkechi',
    caption: 'Ton sourire qui enjolive toutes les pièces',
  },
  {
    id: 'golden-hour',
    src: '/media/IMG-20251107-WA0085.jpg',
    alt: 'Nkechi en lumière dorée',
    caption: 'Golden hour, golden girl',
  },
  {
    id: 'evening-glam',
    src: '/media/IMG-20251107-WA0086.jpg',
    alt: 'Tenue de soirée glamour',
    caption: 'L’élégance effortless incarnée',
  },
  {
    id: 'casual-chic',
    src: '/media/IMG-20251107-WA0087.jpg',
    alt: 'Moment casual chic',
    caption: 'Même au naturel, tu rayonnes',
  },
  {
    id: 'sunny-vibes',
    src: '/media/IMG-20251107-WA0088.jpg',
    alt: 'Rayon de soleil',
    caption: 'Rayon de soleil en version humaine',
  },
  {
    id: 'confidence',
    src: '/media/IMG-20251107-WA0089.jpg',
    alt: 'Allure confiante',
    caption: 'Confiance absolue, charme irrésistible',
  },
  {
    id: 'warm-smile',
    src: '/media/IMG-20251107-WA0090.jpg',
    alt: 'Sourire chaleureux',
    caption: 'Chaque sourire = un souvenir heureux',
  },
  {
    id: 'fashion-detail',
    src: '/media/IMG-20251107-WA0091.jpg',
    alt: 'Détail look fashion',
    caption: 'Sens du détail impeccable',
  },
  {
    id: 'outdoor-magic',
    src: '/media/IMG-20251107-WA0092.jpg',
    alt: 'Instant magique en extérieur',
    caption: 'Les instants simples deviennent magiques avec toi',
  },
]

export const videos: Video[] = [
  {
    id: 'moment-1',
    src: '/media/VID-20251107-WA0008.mp4',
    title: 'Souvenir scintillant',
    description: 'Une vidéo qui capture toute ta joie spontanée.',
  },
  {
    id: 'moment-2',
    src: '/media/VID-20251107-WA0009.mp4',
    title: 'Danse lumineuse',
    description: 'Ton énergie qui illumine la scène et nos cœurs.',
  },
  {
    id: 'moment-3',
    src: '/media/VID-20251107-WA0010.mp4',
    title: 'Rires contagieux',
    description: 'Parce que ta bonne humeur est un cadeau magnifique.',
  },
  {
    id: 'moment-4',
    src: '/media/VID-20251107-WA0011.mp4',
    title: 'Moments dorés',
    description: 'Souvenirs précieux à revivre encore et encore.',
  },
  {
    id: 'moment-5',
    src: '/media/VID-20251107-WA0012.mp4',
    title: 'Confidence boost',
    description: 'Tu marches, le monde s’arrête pour t’admirer.',
  },
  {
    id: 'moment-6',
    src: '/media/VID-20251107-WA0013.mp4',
    title: 'Vibes de fête',
    description: 'On célèbre ta présence irremplaçable.',
  },
  {
    id: 'moment-7',
    src: '/media/VID-20251107-WA0014.mp4',
    title: 'Escapade vibrante',
    description: 'Une promenade qui respire la liberté.',
  },
  {
    id: 'moment-8',
    src: '/media/VID-20251107-WA0015.mp4',
    title: 'Magie en mouvement',
    description: 'Chaque pas distribue des étincelles.',
  },
  {
    id: 'moment-9',
    src: '/media/WhatsApp-Video-2025-11-07-20-40-40.mp4',
    title: 'Souvenir WhatsApp',
    description: 'Un éclat capturé sur le vif, à revoir sans modération.',
  },
]

