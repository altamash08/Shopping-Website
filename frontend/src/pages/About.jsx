import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] rounded-xl shadow-md transition-transform duration-500 hover:scale-105"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <p>
            <span className="font-bold text-lg text-gray-600">
              {" "}
              JustBuyy was created by Altamash Rezaan{" "}
            </span>{" "}
            with a simple mission: to make online shopping easier, smarter, and
            more enjoyable. What began as a passion for innovation has grown
            into a trusted platform where customers can explore, discover, and
            shop a wide range of products from the comfort of their homes.
          </p>
          <p>
            Since day one, we’ve focused on offering quality and variety. From
            fashion to home essentials, our curated collections—sourced from
            trusted brands—are designed to fit every lifestyle. At JustBuyy,
            we’re not just building a store—we’re building a shopping experience
            you can trust.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at JustBuyy is to empower customers by delivering a
            seamless and enjoyable shopping experience. We are committed to
            offering a diverse selection of high-quality products at competitive
            prices, while ensuring outstanding customer service and dedicated
            support at every step.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            At JustBuyy, quality comes first. Every piece is crafted with care,
            checked for comfort and durability, and made to last in style.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            We make shopping simple and stress-free. From easy browsing to fast
            delivery, everything is designed for your convenience.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Your satisfaction comes first. Our dedicated support team is always
            ready to assist you with quick and friendly service.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
