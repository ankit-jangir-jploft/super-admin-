import React from "react";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

 
const NextArrow = (props) => {
    const { className, style, onClick, currentSlide, slideCount } = props; 
    if (currentSlide === slideCount - 1) {
      return null;
    }
  
    return (
      <div className="nextarrow-slide"  
      >
         <img src='/images/slider-arrow.svg' onClick={onClick} />
        </div>
    );
  };
  
   
  const PrevArrow = (props) => {
    const { className, style, onClick, currentSlide } = props; 
    if (currentSlide === 0) {
      return null;
    }
  
    return (
     <div className="prevarrow-slide">
         <img src='/images/slider-arrow.svg' onClick={onClick} />
        </div>
    );
  };
  
  const SlickSlider = () => {
    const settings = {
      dots: false,  
      infinite: false, 
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      nextArrow: <NextArrow />,  
      prevArrow: <PrevArrow />,  
    };
  
    return (
      <div > 
        <Slider {...settings}>
          <div>
            <div className="readibutton">
            <input
                type="radio"
            />
            </div>
            <img src="https://v5.checkprojectstatus.com/dugnadstid_api/public/admin/uploads/products/41676.png" alt="Image 1" style={{ width: "100%" }} />
          </div>
          <div>
            <img src="https://v5.checkprojectstatus.com/dugnadstid_api/public/admin/uploads/products/41676.png" alt="Image 2" style={{ width: "100%" }} />
          </div>
          <div>
            <img src="https://v5.checkprojectstatus.com/dugnadstid_api/public/admin/uploads/products/41676.png" alt="Image 3" style={{ width: "100%" }} />
          </div>
          <div>
            <img src="https://v5.checkprojectstatus.com/dugnadstid_api/public/admin/uploads/products/41676.png" alt="Image 4" style={{ width: "100%" }} />
          </div>
          <div>
            <img src="https://v5.checkprojectstatus.com/dugnadstid_api/public/admin/uploads/products/41676.png" alt="Image 5" style={{ width: "100%" }} />
          </div>
        </Slider>
      </div>
    );
  };
  
  export default SlickSlider;