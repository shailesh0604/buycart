"use client"
import React from 'react'
import HomeCategory from '@/components/Home/HomeCategory';
import TopDeals from '@/components/Home/TopDeals';
import HomeBanner from '@/components/Home/HomeBanner';
const HomePage = () => {
  return (
    <>
      <HomeCategory />
      <HomeBanner />
      <TopDeals />
    </>
  );

}

export default HomePage