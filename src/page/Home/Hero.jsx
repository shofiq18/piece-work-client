import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";
import image1 from "../../assets/image/image-1.png";
import image2 from "../../assets/image/image-4.jpg";
import image3 from "../../assets/image/image-2.png";

const Hero = () => {
  return (
    <div className="carousel-container mb-24">
      <Carousel>
        <div>
          <img src={image1} alt="Image 1" />
        </div>
        <div>
          <img src={image2} alt="Image 2" />
        </div>
        <div>
          <img src={image3} alt="Image 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
