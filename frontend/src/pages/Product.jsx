import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import Title from "../components/Title";
import { StarIcon, CheckIcon } from "../components/Icons";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="pt-8 sm:pt-12">
      {/*----------- Product Data-------------- */}
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/*---------- Product Images------------- */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex gap-3 overflow-x-auto sm:w-20 sm:shrink-0 sm:flex-col sm:overflow-visible">
            {productData.image.map((item, index) => (
              <button
                onClick={() => setImage(item)}
                key={index}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={item === image}
                className={`tile aspect-[4/5] w-16 shrink-0 rounded-2xl border-2 transition-colors sm:w-full ${item === image ? "border-ink" : "border-transparent hover:border-hair"}`}
              >
                <img src={item} className="absolute inset-0 h-full w-full object-cover object-top" alt="" />
              </button>
            ))}
          </div>
          <div className="tile aspect-[4/5] flex-1 rounded-[28px]">
            <img className="absolute inset-0 h-full w-full object-cover object-top" src={image} alt={productData.name} />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className="self-start lg:sticky lg:top-24">
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full border border-hair bg-white/60 px-3 py-1">{productData.category}</span>
            <span className="rounded-full border border-hair bg-white/60 px-3 py-1">{productData.subCategory}</span>
          </div>
          <h1 className="mt-5 font-display font-light leading-[1.15] tracking-[-0.03em] text-[length:clamp(1.6rem,3vw,2.4rem)]">{productData.name}</h1>
          <div className="mt-3 flex items-center gap-0.5 text-ink">
            <StarIcon className="h-4 w-4" />
            <StarIcon className="h-4 w-4" />
            <StarIcon className="h-4 w-4" />
            <StarIcon className="h-4 w-4" />
            <StarIcon filled={false} className="h-4 w-4 text-steel" />
            <p className="pl-2 text-sm text-steel">(122)</p>
          </div>
          <p className="mt-6 font-display text-[length:2rem] font-light tracking-tight">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 max-w-prose text-steel">
            {productData.description}
          </p>

          <div className="my-8 flex flex-col gap-3">
            <p className="text-sm font-semibold">Select Size</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Size">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  aria-pressed={item === size}
                  className="chip min-w-[3rem] justify-center"
                  data-on={item === size}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="btn btn-primary w-full sm:w-auto sm:min-w-[14rem]"
          >
            Add to cart
          </button>

          <ul className="mt-9 flex flex-col gap-2.5 border-t border-hair pt-6 text-sm text-steel">
            <li className="flex items-center gap-3"><CheckIcon className="h-4 w-4 shrink-0 text-ink" />100% Original product.</li>
            <li className="flex items-center gap-3"><CheckIcon className="h-4 w-4 shrink-0 text-ink" />Cash on delivery is available on this product.</li>
            <li className="flex items-center gap-3"><CheckIcon className="h-4 w-4 shrink-0 text-ink" />Easy return and exchange policy within 7 days.</li>
          </ul>
        </div>
      </div>

      {/* ---------- Description Section ------------- */}
      <section className="mt-20 max-w-3xl">
        <Title text1="DESCRIPTION" text2="" className="text-[length:1.5rem]" />
        <div className="mt-5 flex flex-col gap-4 text-sm text-steel">
           <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </section>

      {/* --------- display related products ---------- */}

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
