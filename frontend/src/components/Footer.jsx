import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            JustBuyy is your go-to destination for stylish and affordable
            clothing, designed to bring comfort and confidence to your everyday
            wear. We believe fashion should be effortless, which is why our
            collection blends trendy designs with high-quality fabrics to suit
            every occasion.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-212-456-7890</li>
            <li>contact@justbuyy.in</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
        Copyright 2025@ justbuyy.in - All Right Reserved.{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
