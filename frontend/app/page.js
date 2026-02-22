"use client"
import React from 'react'
import HomeCategory from '@/components/Home/HomeCategory';
import TopDeals from '@/components/Home/TopDeals';
import HomeBanner from '@/components/Home/HomeBanner';
import FashionDeals from '@/components/Home/FashionDeals';
import HomeOtherBanner from '@/components/Home/HomeOtherBanner';
import ShopByCategory from '@/components/Home/ShopByCategory';
const HomePage = () => {
  return (
    <>
      <HomeCategory />
      <HomeBanner />
      <TopDeals />
      <HomeOtherBanner />
      <FashionDeals />
      <ShopByCategory />
    </>
  );

}

export default HomePage