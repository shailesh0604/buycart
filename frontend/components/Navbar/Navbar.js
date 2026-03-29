"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LuCircleUserRound } from "react-icons/lu";
import { BsShop } from "react-icons/bs";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { FiLogOut, FiUser, FiPackage } from "react-icons/fi";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
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


  const handleLogout = async () => {
    setShowUserMenu(false);
    await logout();          // POST /api/auth/logout → clears httpOnly cookie
    router.push("/login");
  };

  // First letter for avatar
  const avatarLetter = user?.name
    ? user.name[0].toUpperCase()
    : user?.email?.[0].toUpperCase();

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
                <div className="search-content absolute top-full left-0 w-full px-2 py-3 bg-white rounded z-10 shadow-2xl">
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

            {/* ── LOGIN / USER DROPDOWN ── */}
            {loading ? (
              // While session is being checked — show skeleton
              <div className="hidden lg:block w-16 h-4 bg-gray-200 rounded animate-pulse" />

            ) : user ? (
              // ✅ LOGGED IN — avatar + dropdown
              <div className="relative hidden lg:block" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu((v) => !v)}
                  className="nav-link flex items-center gap-2 cursor-pointer"
                >
                  {/* Orange avatar circle */}
                  <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {avatarLetter}
                  </span>
                  <span className="nav-txt max-w-25 truncate">
                    {user.name || user.email}
                  </span>
                </button>

                {/* Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">

                    {/* User info header */}
                    <div className="px-4 py-3 bg-orange-50 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user.name || "My Account"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link href="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                        <FiUser size={15} />My Profile
                      </Link>
                      <Link href="/orders"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                        <FiPackage size={15} />My Orders
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 py-1">
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                        <FiLogOut size={15} />Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

            ) : (
              // ✅ LOGGED OUT — Login link
              <Link className="nav-link hidden lg:flex items-center gap-2 cursor-pointer" href="/login">
                <span className="nav-icon"><LuCircleUserRound /></span>
                <span className="nav-txt">Login</span>
              </Link>
            )}

            {/* ── Cart ── */}
            <Link className="nav-link hidden lg:flex items-center gap-1.5 cursor-pointer" href="/cart">
              <span className="nav-icon relative">
                <IoBagHandleOutline />
                <span className="cart-count">2</span>
              </span>
              <span className="nav-txt">Cart</span>
            </Link>

            {/* ── Help Center ── */}
            <Link className="nav-link hidden lg:flex items-center gap-1.5 cursor-pointer" href="/help-center">
              <span className="nav-icon"><MdSupportAgent /></span>
              <span className="nav-txt">Help Center</span>
            </Link>

            {/* ── Become a Seller ── */}
            <Link className="nav-link flex items-center gap-2 cursor-pointer" href="/become-seller">
              <span className="nav-icon"><BsShop /></span>
              <span className="nav-txt">Become a Seller</span>
            </Link>
          </div>
        </div>
      </nav>


      {/* ── Mobile bottom bar ── */}
      <div className="fixed-navbar-mobile py-2 fixed bottom-0 left-0 block lg:hidden w-full">
        <div className="grid grid-cols-4 justify-items-center">
          <Link className="flex flex-col gap-0.5 items-center" href={"/"}>
            <span className="fixed-nav-icon">
              <AiOutlineHome />
            </span>
            <span className="fixed-nav-txt">Home</span>
          </Link>

          <Link className="flex flex-col gap-0.5 items-center" href={"/category"}>
            <span className="fixed-nav-icon">
              <RxDashboard />
            </span>
            <span className="fixed-nav-txt">Category</span>
          </Link>

          {/* Mobile: avatar+logout if logged in, login link if not */}
          {user ? (
            <button onClick={handleLogout} className="flex flex-col gap-0.5 items-center">
              <span className="fixed-nav-icon flex items-center justify-center">
                <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                  {avatarLetter}
                </span>
              </span>
              <span className="fixed-nav-txt">Logout</span>
            </button>
          ) : (
            <Link className="flex flex-col gap-0.5 items-center" href="/login">
              <span className="fixed-nav-icon"><FaRegUser /></span>
              <span className="fixed-nav-txt">Login</span>
            </Link>
          )}

          <Link className="flex flex-col gap-0.5 items-center" href={"/cart"}>
            <span className="fixed-nav-icon relative">
              <IoBagHandleOutline />
              <span className="cart-count">2</span>
            </span>
            <span className="fixed-nav-txt">Cart</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
