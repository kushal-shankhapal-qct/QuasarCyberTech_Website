import React, { useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { useAccessibility } from './EmblaCarouselAccessibility'
import Autoplay from 'embla-carousel-autoplay'
import Accessiblity from 'embla-carousel-accessibility'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel = (props: PropType) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(),

    Accessiblity({
      announceChanges: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement
    })
  ])

  useAccessibility(emblaApi)

  useEffect(() => {
    if (!emblaApi) return
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    autoplay.play()
  }, [emblaApi])

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__live-region" />
    </section>
  )
}

export default EmblaCarousel
