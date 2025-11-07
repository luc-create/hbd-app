export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <span className="site-footer__label">Développé avec tendresse</span>
        <p>
          Ce site est un écrin créé sur-mesure pour célébrer une femme exceptionnelle. Merci de
          laisser ici toute ta lumière.
        </p>
      </div>
      <div className="site-footer__signature">
        <p>Conçu par ton amie dévouée · {new Date().getFullYear()}</p>
        <p>
          Contact&nbsp;: <a href="mailto:konouluc0@gmail.com">konouluc0@gmail.com</a> ·{' '}
          <a href="tel:+22897240460">+228 97 24 04 60</a>
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter

