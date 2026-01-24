"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LuCircleUserRound } from "react-icons/lu";
import { BsShop } from "react-icons/bs";
import { IoBagHandleOutline } from "react-icons/io5";
// import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import Link from "next/link";

const Navbar = () => {
  const [showDropList, setShowDropList] = useState(false);
  const [showClear, setshowClear] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowDropList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="relative w-full">
        <div className="navbar-container flex justify-between items-center gap-4 md:gap-10">
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
              </Link>
            </div>

            <div className="nav-search" ref={searchBarRef}>
              <input
                ref={inputRef}
                type="text"
                value={search}
                placeholder="Search for Products, Brands and More"
                onClick={() => setShowDropList(true)}
                onFocus={() => setShowDropList(true)}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);
                }}
              />

              <span className="search">
                <LuSearch />
              </span>

              {search && (
                <span
                  className="close cursor-pointer"
                  onClick={() => {
                    setSearch("");
                    setShowDropList(false);
                    inputRef.current?.focus();
                  }}
                >
                  <IoCloseOutline />
                </span>
              )}

              {showDropList && (
                <div className="search-content absolute top-full left-0 w-full px-2 py-3 bg-white shadow rounded">
                  <div className="">
                    <p className="font-semibold text-base text-[#554949]">
                      Treding
                    </p>

                    <div className="flex flex-col gap-2 mt-1.5 ml-0.5">
                      <Link
                        href={"/mobiles"}
                        className="flex items-center gap-2 hover:bg-sky-50 text-[#554949] duration-150 transition-all rounded px-1 py-2"
                      >
                        <span>
                          <LuSearch />
                        </span>
                        <span>mobile</span>
                      </Link>

                      <Link
                        href={"/shoes"}
                        className="flex items-center gap-2 hover:bg-sky-50 text-[#554949] duration-150 transition-all rounded px-1 py-2"
                      >
                        <span>
                          <LuSearch />
                        </span>
                        <span>shoes</span>
                      </Link>

                      <Link
                        href={"/tshirt"}
                        className="flex items-center gap-2 hover:bg-sky-50 text-[#554949] duration-150 transition-all rounded px-1 py-2"
                      >
                        <span>
                          <LuSearch />
                        </span>
                        <span>t shirt</span>
                      </Link>

                      <Link
                        href={"/laptops"}
                        className="flex items-center gap-2 hover:bg-sky-50 text-[#554949] duration-150 transition-all rounded px-1 py-2"
                      >
                        <span>
                          <LuSearch />
                        </span>
                        <span>laptops</span>
                      </Link>

                      <Link
                        href={"/watches"}
                        className="flex items-center gap-2 hover:bg-sky-50 text-[#554949] duration-150 transition-all rounded px-1 py-2"
                      >
                        <span>
                          <LuSearch />
                        </span>
                        <span>watches</span>
                      </Link>

                      <Link
                        href={"/tv"}
                        className="flex items-center gap-2 hover:bg-sky-50 text-[#554949] duration-150 transition-all rounded px-1 py-2"
                      >
                        <span>
                          <LuSearch />
                        </span>
                        <span>tv</span>
                      </Link>

                      <Link
                        href={"/sarees"}
                        className="flex items-center gap-2 hover:bg-sky-50 text-[#554949] duration-150 transition-all rounded px-1 py-2"
                      >
                        <span>
                          <LuSearch />
                        </span>
                        <span>sarees</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="nav-links-2 flex items-center gap-6 xl:gap-8">
            <div className="nav-link hidden lg:flex items-center gap-2 cursor-pointer">
              <span className="nav-icon">
                <LuCircleUserRound />
              </span>
              <span className="nav-txt">Login</span>
            </div>

            <div className="nav-link hidden lg:flex items-center gap-1.5 cursor-pointer">
              <span className="nav-icon relative">
                <IoBagHandleOutline />
                <span className="cart-count">2</span>
              </span>
              <span className="nav-txt">Cart</span>
            </div>

            <div className="nav-link hidden lg:flex items-center gap-1.5 cursor-pointer">
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

      <div className="fixed-navbar-mobile py-2 fixed bottom-0 left-0 block lg:hidden w-full">
        <div className="grid grid-cols-4 justify-items-center">
          <div className="flex flex-col gap-0.5 items-center">
            <span className="fixed-nav-icon">
              <AiOutlineHome />
            </span>
            <span className="fixed-nav-txt">Home</span>
          </div>

          <div className="flex flex-col gap-0.5 items-center">
            <span className="fixed-nav-icon">
              <RxDashboard />
            </span>
            <span className="fixed-nav-txt">Category</span>
          </div>

          <div className="flex flex-col gap-0.5 items-center">
            <span className="fixed-nav-icon">
              <FaRegUser />
            </span>
            <span className="fixed-nav-txt">User</span>
          </div>

          <div className="flex flex-col gap-0.5 items-center">
            <span className="fixed-nav-icon relative">
              <IoBagHandleOutline />
              <span className="cart-count">2</span>
            </span>
            <span className="fixed-nav-txt">Cart</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
