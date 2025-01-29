import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './marcas.css';

// Configuración del Slider
var settings = {
  className: 'center',
  infinite: false, 
  autoplay: false, 
  centerMode: false, 
  slidesToShow: 3,
  slidesToScroll: 1, 
  speed: 300, 
  arrows: false, 
  dots: false, 
  responsive: [
    {
      breakpoint: 768, 
      settings: {
        slidesToShow: 3, 
      },
    },
  ],
};

export const Marcas = () => {
  const marcas = [
    { id: 1, name: 'Marca 1', logo: 'marcas1.png' },
    { id: 2, name: 'Marca 2', logo: 'marcas2.png' },
    { id: 3, name: 'Marca 3', logo: 'marcas3.png' },
    { id: 4, name: 'Marca 4', logo: 'marcas1.png' },
    { id: 5, name: 'Marca 5', logo: 'marcas2.png' },
    { id: 6, name: 'Marca 6', logo: 'marcas3.png' },
  ];

  return (
    <div className="sliderContainerMarcas">
      <h2>Nuestras Marcas</h2>
      <Slider {...settings} className="slidesMarcas">
        {marcas.map((marca) => (
          <div key={marca.id} className="marcaCard">
            <img src={marca.logo} alt={marca.name} className="marcaLogo" />
          </div>
        ))}
      </Slider>
    </div>
  );
};