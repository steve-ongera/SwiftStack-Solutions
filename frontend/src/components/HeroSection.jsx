import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const HERO_SLIDES = [
  {
    id: 1,
    background: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80',
    title: '9 Years of excellence in',
    subTitle: 'Technology & Innovation',
    cta1: { text: 'Our Services', link: '/services' },
    cta2: { text: 'Contact Now', link: '/contact' },
    alignment: 'center'
  },
  {
    id: 2,
    background: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
    titleBox: 'World Class Service',
    title: 'When Technology Matters',
    subTitle: 'Your Choice is Simple',
    cta1: { text: 'Our Services', link: '/services' },
    alignment: 'left'
  },
  {
    id: 3,
    background: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80',
    title: 'Meet Our Engineers',
    subTitle: 'We believe in innovation',
    description: 'We will deal with your failure that determines how you achieve success.',
    cta1: { text: 'Get Free Quote', link: '/contact' },
    cta2: { text: 'Learn more', link: '/about' },
    alignment: 'right'
  }
]

export default function HeroSection() {
  // duration (20-60 recommended by Embla) controls the attraction-physics
  // scroll speed — raised from the implicit default (25) to 34 for a
  // noticeably calmer, less jerky slide-to-slide motion. skipSnaps/dragFree
  // are pinned explicitly so the carousel always settles cleanly on a slide
  // instead of drifting past it.
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 34, skipSnaps: false, dragFree: false },
    [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  // Bumped every time a slide becomes active so its text content can be
  // remounted (see `key` below) and replay its entrance animation, instead
  // of just popping into view once and staying static on every loop.
  const [playCount, setPlayCount] = useState(0)

  const scrollTo = useCallback((i) => emblaApi && emblaApi.scrollTo(i), [emblaApi])
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
      setPlayCount((c) => c + 1)
    }
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  return (
    <div className="banner-carousel banner-carousel-1 mb-0">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {HERO_SLIDES.map((slide, index) => (
            <div className="embla__slide" key={slide.id}>
              <div
                className="banner-carousel-item"
                style={{ backgroundImage: `url(${slide.background})` }}
              >
                <div className="slider-content">
                  <div className="container h-100">
                    <div className={`row align-items-center h-100 ${
                      slide.alignment === 'center' ? 'justify-content-center' :
                      slide.alignment === 'right' ? 'justify-content-end' : ''
                    }`}>
                      <div className={`col-md-12 ${
                        slide.alignment === 'center' ? 'text-center' :
                        slide.alignment === 'right' ? 'text-right' : 'text-left'
                      }`}>

                        {/* Remounting this block on every activation (via the
                            key) restarts the CSS entrance animation below,
                            so the fade/translate plays each time the slide
                            comes into view — not just on first paint. */}
                        <div
                          className="hero-slide-copy"
                          key={`${slide.id}-${index === selectedIndex ? playCount : 'idle'}`}
                        >
                          {slide.titleBox && (
                            <h2 className="slide-title-box hero-anim" style={{ animationDelay: '0.05s' }}>{slide.titleBox}</h2>
                          )}
                          {slide.title && (
                            <h2 className="slide-title hero-anim" style={{ animationDelay: '0.12s' }}>{slide.title}</h2>
                          )}
                          {slide.subTitle && (
                            <h3 className="slide-sub-title hero-anim" style={{ animationDelay: '0.2s' }}>{slide.subTitle}</h3>
                          )}
                          {slide.description && (
                            <p
                              className="slider-description lead hero-anim"
                              style={{ color: '#fff', fontSize: '1.2rem', animationDelay: '0.28s' }}
                            >
                              {slide.description}
                            </p>
                          )}

                          <div className="hero-anim" style={{ animationDelay: '0.36s' }}>
                            {slide.cta1 && (
                              <Link
                                to={slide.cta1.link}
                                className={`slider btn ${
                                  slide.cta1.text === 'Contact Now' ||
                                  slide.cta1.text === 'Learn more' ?
                                  'btn-primary border' : 'btn-primary'
                                }`}
                              >
                                {slide.cta1.text}
                              </Link>
                            )}
                            {slide.cta2 && (
                              <Link to={slide.cta2.link} className="slider btn btn-primary border">
                                {slide.cta2.text}
                              </Link>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button className="carousel-control left" onClick={scrollPrev}>
        <i className="fa fa-angle-left"></i>
      </button>
      <button className="carousel-control right" onClick={scrollNext}>
        <i className="fa fa-angle-right"></i>
      </button>

      {/* Dots */}
      <div className="slick-dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={i === selectedIndex ? 'dot active' : 'dot'}
          />
        ))}
      </div>

      <style>{`
        .embla { overflow: hidden; position: relative; }
        .embla__container {
          display: flex;
          /* GPU hints so the browser promotes this layer instead of
             repainting it every frame — this is what was mainly making
             the slide-to-slide motion feel choppy. */
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .embla__slide {
          flex: 0 0 100%;
          min-width: 0;
          transform: translateZ(0);
        }

        .banner-carousel .banner-carousel-item {
          height: 700px;
          color: #fff;
          background-position: 50% 50%;
          background-size: cover;
        }
        @media (max-width: 991px) { .banner-carousel .banner-carousel-item { height: 550px; } }
        @media (max-width: 575px) { .banner-carousel .banner-carousel-item { height: 450px; } }

        .slider-content { position: relative; height: 100%; width: 100%; display: flex; align-items: center; }

        /* Entrance animation for slide copy — smooth ease-out translate
           instead of the previous instant pop-in. Each child staggers via
           inline animationDelay set above. */
        @keyframes heroCopyIn {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-anim {
          opacity: 0;
          animation: heroCopyIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .slide-title-box {
          font-size: 16px; line-height: 39px; background: #ffb600; color: #fff;
          display: inline-block; padding: 0 15px; margin: 0 0 10px;
        }
        .slide-title { font-size: 30px; line-height: 36px; font-weight: 300; color: #fff; margin: 20px 0 10px; }
        @media (max-width: 991px) { .slide-title { font-size: 22px; } }
        @media (max-width: 575px) { .slide-title { font-size: 16px; } }
        .slide-sub-title {
          font-style: normal; font-size: 60px; line-height: 58px; margin: 20px 0;
          color: #fff; font-weight: 900; text-transform: uppercase; letter-spacing: -1px;
        }
        @media (max-width: 991px) { .slide-sub-title { font-size: 46px; } }
        @media (max-width: 575px) { .slide-sub-title { font-size: 30px; line-height: 30px; } }

        .slider.btn {
          margin: 15px 5px 0; border: 2px solid transparent; padding: 12px 20px 10px;
          font-weight: 700; text-transform: uppercase; color: #fff;
          font-family: "Montserrat", sans-serif; transition: 350ms; font-size: 14px;
          border-radius: 3px; display: inline-block; text-decoration: none;
        }
        .slider.btn-primary { background: #ffb600; border: 2px solid #ffb600; }
        .slider.btn-primary.border { background: transparent; border: 2px solid #ffb600; }
        .slider.btn-primary:hover { background: #111; border-color: #111; color: #fff; }
        .slider.btn-primary.border:hover { background: #ffb600; border-color: #ffb600; color: #fff; }

        .banner-carousel .carousel-control {
          position: absolute; top: 50%; z-index: 5; transform: translateY(-50%);
          background: transparent; opacity: 0; transition: opacity .3s ease;
          padding: 0; outline: 0; border: 0; cursor: pointer;
        }
        .banner-carousel:hover .carousel-control { opacity: 1; }
        .banner-carousel .carousel-control.left { left: 20px; }
        .banner-carousel .carousel-control.right { right: 20px; }
        .banner-carousel .carousel-control i {
          background: rgba(0,0,0,0.3); color: #fff; line-height: 58px;
          width: 60px; height: 60px; font-size: 22px; display: inline-block; text-align: center;
          transition: background 0.25s ease;
        }
        .banner-carousel .carousel-control i:hover { background: #ffb600; }

        .slick-dots {
          position: absolute; bottom: 20px; left: 0; right: 0;
          display: flex; justify-content: center; gap: 8px; list-style: none; padding: 0;
        }
        .slick-dots .dot {
          width: 10px; height: 10px; border-radius: 50%; border: none;
          background: rgba(255,255,255,0.5); cursor: pointer; padding: 0;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .slick-dots .dot.active { background: #ffb600; transform: scale(1.15); }
        @media (max-width: 575px) { .banner-carousel .carousel-control { display: none !important; } }

        /* Respect users who've asked for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-anim { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  )
}