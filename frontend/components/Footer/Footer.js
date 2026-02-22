import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Footer = () => {
  return (
    <>
      <footer className='bg-black pt-12 pb-6'>
        <div className="footer-container">
          <div className="flex justify-between flex-wrap gap-8">
            <div className="footer-logo-info">
              <div className="footer-logo">
                <Image src={"/assets/images/logo/logo-white.png"} width={0} height={0} sizes='100%' alt="logo" />
              </div>
              <p className='footer-info'>BuyCart is your one-stop ecommerce platform to discover, compare, and buy products at the best prices with a seamless shopping experience.</p>
            </div>

            <div className="footer-links">
              <div className="footer-link-title">
                My Account
              </div>
              <div className="footer-link flex flex-col gap-2">
                <Link href={""}>My Account</Link>
                <Link href={""}>Order History</Link>
                <Link href={""}>Shopping Cart</Link>
                <Link href={""}>Wishlist</Link>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-link-title">
                Help
              </div>
              <div className="footer-link flex flex-col gap-2">
                <Link href={""}>Contact</Link>
                <Link href={""}>FAQ</Link>
                <Link href={""}>Terms & Condition</Link>
                <Link href={""}>Privacy Policy</Link>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-link-title">
                Proxy
              </div>
              <div className="footer-link flex flex-col gap-2">
                <Link href={""}>About</Link>
                <Link href={""}>Shops</Link>
                <Link href={""}>Product</Link>
                <Link href={""}>Track Order</Link>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-link-title ">
                Category
              </div>
              <div className="footer-link flex flex-col gap-2">
                <Link href={""}>Friut & Vegitables</Link>
                <Link href={""}>Fashion</Link>
                <Link href={""}>Electronic</Link>
                <Link href={""}>Grocery</Link>
              </div>
            </div>
          </div>
        </div>

        <hr className='border-white mt-10 opacity-50' />

        <div className="text-white text-center mt-6 opacity-90">Buycart Ecommerce ©{new Date().getFullYear()}. All Rights Reserved</div>
      </footer>
    </>
  )
}

export default Footer