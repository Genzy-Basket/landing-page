import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function CanonicalTag() {
  const { pathname } = useLocation()

  useEffect(() => {
    const url = `https://genzybasket.com${pathname.endsWith('/') ? pathname : pathname + '/'}`
    let link = document.querySelector('link[rel="canonical"]')
    if (link) {
      link.setAttribute('href', url)
    } else {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      link.setAttribute('href', url)
      document.head.appendChild(link)
    }
  }, [pathname])

  return null
}
