function getSliderConfig() {
    return {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        infinite: true,
        arrows: true,
        autoplay: false,
        swipe: false,
        focusOnSelect: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            }
          },
          {
            breakpoint: 720,
            settings: {
              arrows: false,
              slidesToShow: 2,
              slidesToScroll: 2,
              swipe: true,
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              swipe: true,
            }
          },
          {
            breakpoint: 320,
            settings: {
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              swipe: true,
            }
          }
        ]
    }
}