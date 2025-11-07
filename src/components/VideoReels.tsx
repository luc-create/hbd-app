import { videos } from '../data/media'

export function VideoReels() {
  return (
    <section id="videos" className="section section--alt">
      <div className="section__header">
        <span className="section__eyebrow">Moments en mouvement</span>
        <h2>Des vidéos qui respirent ta lumière</h2>
        <p>
          Appuie sur lecture et replonge instantanément dans ces instants vibrants, drôles ou
          magiques que tu fais naître autour de toi.
        </p>
      </div>

      <div className="video-grid">
        {videos.map((video) => (
          <article key={video.id} className="video-card">
            <div className="video-card__player">
              <video controls preload="metadata" src={video.src} />
            </div>
            <div className="video-card__meta">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default VideoReels

