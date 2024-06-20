import Category from "./category/Category";
import Courses from "./courses/Courses";
import WhyLearn from "./whyLearn/WhyLearn";

const Homepage = () => {
  return (
    <div>
      <Category />
      <Courses />
      <WhyLearn />
    </div>
  );
};

export default Homepage;
