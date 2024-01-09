import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from '../../assets/slider/img1.png';
import img2 from '../../assets/slider/img2.jpg';
import img5 from '../../assets/slider/img5.jpg';
import img6 from '../../assets/slider/img6.png';

const ImageCarousel = () => {
  return (
    <Carousel showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true} interval={5000}>
      <div>
        <img className='rounded' src={img1} alt='slider 1' />
      </div>
      <div>
        <img className='rounded' src={img2} alt='slider 2' />
      </div>
      <div>
        <img className=' rounded' src={img5} alt='slider 5' />
      </div>
      <div>
        <img className=' rounded' src={img6} alt='slider 5' />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
