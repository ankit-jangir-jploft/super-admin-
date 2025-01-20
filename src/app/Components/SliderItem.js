import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props) => {
  const { className, style, onClick, currentSlide, slideCount } = props;
  if (currentSlide === slideCount - 1) {
    return null;
  }

  return (
    <div className='nextarrow-slide'>
      <img
        src='/images/slider-arrow.svg'
        onClick={onClick}
      />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick, currentSlide } = props;
  if (currentSlide === 0) {
    return null;
  }

  return (
    <div className='prevarrow-slide'>
      <img
        src='/images/slider-arrow.svg'
        onClick={onClick}
      />
    </div>
  );
};

const SlickSlider = (props) => {
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

  const [images, setImages] = useState(props.images || []);

  return (
    <div>
      <Slider {...settings}>
        {images?.length &&
          images?.map((img) => {
            return (
              <div>
                <div className='readibutton'>
                  <input type='radio' />
                </div>
                <img
                  src={img?.image}
                  onError={(e) =>
                    (e.target.src =
                      "https://v5.checkprojectstatus.com/dugnadstid_staging/public/admin/uploads/products/41676.png")
                  }
                  alt='Image 1'
                  style={{ width: "100%" }}
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default SlickSlider;
