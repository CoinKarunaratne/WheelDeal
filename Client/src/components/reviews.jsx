import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import reviews from "../utils/reviews";

export default function Reviews() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="sm:px-[100px] py-[50px] bg-[#252525] pb-[200px] relative z-0">
      <h1 className="text-center my-8 font-bold text-4xl text-white">
        Reviews
      </h1>
      <Carousel
        responsive={responsive}
        swipeable={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
      >
        {reviews.map((review) => {
          return (
            <div className="p-8">
              <p className="text-white text-lg">{review.description}</p>
              <p className="text-right text-white text-lg">{review.name}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
