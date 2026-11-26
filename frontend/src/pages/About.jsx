import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const reasons = [
  { title: "Quality Assurance", text: "At JustBuyy, quality comes first. Every piece is crafted with care, checked for comfort and durability, and made to last in style." },
  { title: "Convenience", text: "We make shopping simple and stress-free. From easy browsing to fast delivery, everything is designed for your convenience." },
  { title: "Exceptional Customer Service", text: "Your satisfaction comes first. Our dedicated support team is always ready to assist you with quick and friendly service." },
];

const About = () => {
  return (
    <div className="pt-10 sm:pt-14">
      <Title text1={"ABOUT"} text2={"US"} as="h1" />

      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-16">
        <div className="tile aspect-[9/10] rounded-[32px] shadow-soft">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            style={{ mixBlendMode: 'normal' }}
            src={assets.about_img}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center gap-6 text-steel md:max-w-xl">
          <p>
            <span className="font-semibold text-ink">
              JustBuyy was created by Altamash Rezaan{" "}
            </span>{" "}
            with a simple mission: to make online shopping easier, smarter, and
            more enjoyable. What began as a passion for innovation has grown
            into a trusted platform where customers can explore, discover, and
            shop a wide range of products from the comfort of their homes.
          </p>
          <p>
            Since day one, we’ve focused on offering quality and variety. From
            fashion to home essentials, our curated collections, sourced from
            trusted brands, are designed to fit every lifestyle. At JustBuyy,
            we’re not just building a store, we’re building a shopping experience
            you can trust.
          </p>

          <h2 className="font-display text-[length:1.25rem] font-light tracking-tight text-ink">Our Mission</h2>
          <p>
            Our mission at JustBuyy is to empower customers by delivering a
            seamless and enjoyable shopping experience. We are committed to
            offering a diverse selection of high-quality products at competitive
            prices, while ensuring outstanding customer service and dedicated
            support at every step.
          </p>
        </div>
      </div>

      <section className="mt-20">
        <Title text1={"WHY"} text2={"CHOOSE US"} className="text-[length:1.7rem]" />
        <div className="glass mt-8 grid divide-y divide-hair rounded-[28px] text-sm md:grid-cols-3 md:divide-x md:divide-y-0">
          {reasons.map((r) => (
            <div key={r.title} className="flex flex-col gap-3 p-7 sm:p-10">
              <h3 className="text-base font-semibold">{r.title}</h3>
              <p className="text-steel">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
};

export default About;
