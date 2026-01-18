import React from "react";
import Image from "next/image";
import { LuCircleUserRound } from "react-icons/lu";
import { BsShop } from "react-icons/bs";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";

import Link from "next/link";
const Navbar = () => {
  return (
    <>
      <nav className="relative">
        <div className="navbar-container flex justify-between items-center gap-10">
          <div className="flex gap-6 xl:gap-8 w-full">
            <div className="logo flex items-center gap-1 cursor-pointer">
              <Link href={"/"} className="flex items-center gap-1">
                <div className="logo-img">
                  <Image
                    src={"/assets/images/logo/logo2.png"}
                    priority
                    width={0}
                    height={0}
                    sizes="100%"
                    alt="logo"
                  />
                </div>
                {/* <h1 className="logo-txt">Buycart</h1> */}
              </Link>
            </div>

            <div className="nav-search">
              <input
                type="text"
                placeholder="Search for Products, Brands and More"
              />
              <span className="search">
                <CiSearch />
              </span>
              <span className="close">
                <IoCloseOutline />
              </span>
            </div>
          </div>

          <div className="nav-links-2 flex items-center gap-6 xl:gap-8">
            <div className="nav-link flex items-center gap-2 cursor-pointer">
              <span className="nav-icon">
                <LuCircleUserRound />
              </span>
              <span className="nav-txt">Login</span>
            </div>

            <div className="nav-link flex  items-center gap-1.5 cursor-pointer">
              <span className="nav-icon">
                <IoBagHandleOutline />
              </span>
              <span className="nav-txt">Cart</span>
            </div>

            <div className="nav-link flex  items-center gap-1.5 cursor-pointer">
              <span className="nav-icon">
                <MdSupportAgent />
              </span>
              <span className="nav-txt">Help Center</span>
            </div>

            <div className="nav-link flex items-center gap-2 cursor-pointer">
              <span className="nav-icon">
                <BsShop />
              </span>
              <span className="nav-txt">Become a Seller</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
