import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="mt-8 border-t border-hair pb-8 pt-12 text-sm">
      <div className="flex flex-col gap-12 sm:grid sm:grid-cols-[3fr_1fr_1fr] sm:gap-14">
        <div>
          <Logo className="text-[length:1.6rem]" />
          <p className="mt-5 max-w-md text-steel">
            JustBuyy is your go-to destination for stylish and affordable
            clothing, designed to bring comfort and confidence to your everyday
            wear. We believe fashion should be effortless, which is why our
            collection blends trendy designs with high-quality fabrics to suit
            every occasion.
          </p>
        </div>

        <div>
          <p className="mb-4 font-display text-[length:0.95rem] font-normal tracking-tight">Company</p>
          <ul className="flex flex-col gap-2 text-steel">
            <li><Link to="/" className="transition-colors hover:text-ink">Home</Link></li>
            <li><Link to="/about" className="transition-colors hover:text-ink">About us</Link></li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-display text-[length:0.95rem] font-normal tracking-tight">Get in touch</p>
          <ul className="flex flex-col gap-2 text-steel">
            <li><a href="tel:+912124567890" className="transition-colors hover:text-ink">+91-212-456-7890</a></li>
            <li><a href="mailto:contact@justbuyy.in" className="transition-colors hover:text-ink">contact@justbuyy.in</a></li>
          </ul>
        </div>
      </div>

      <p className="mt-12 text-center text-xs text-steel">
        © {new Date().getFullYear()} justbuyy.in. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
