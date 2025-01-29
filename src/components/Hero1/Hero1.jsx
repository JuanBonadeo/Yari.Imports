import '../Hero1/hero1.css'
import Carousel from 'react-bootstrap/Carousel';
import { Button } from '../../ui/';


export const Hero1 = () => {
  return (
    <Carousel interval={4000}>
      <Carousel.Item className='Hero1Container'>
        <img
          className="imgHero1"
          src='https://res.cloudinary.com/do36rxfoe/image/upload/v1738175550/jsywa1h0ar1x39gew9zh.jpg'
          alt="First-slide"
        />
        
      </Carousel.Item>

      <Carousel.Item className='Hero1Container'>
        <img
          className="imgHero1 imgHero3"
          src='https://res.cloudinary.com/do36rxfoe/image/upload/v1738174991/g4k2czqqrai6blkwwslk.jpg'
          alt="First-slide"
        />
        <Carousel.Caption className='HeroCaption hero12'>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='Hero1Container'>
        <img
          className="imgHero1 imgHero3"
          src='https://res.cloudinary.com/do36rxfoe/image/upload/v1738174991/pqlkchy59ueaqrikpzj7.jpg'
          alt="Third-slide"
        />
        <Carousel.Caption className='HeroCaption hero12'>

        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
