import React from 'react'
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const HomeOtherBanner = () => {

    const autoplayDelay = 5000;

    const swiperBreakpoints = {
        // when window width is >= 0px (default mobile view)
        0: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        // when window width is >= 640px
        767: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
    };

    return (
        <>
            <div className="banner-container mt-12">
                <div className="custom-container ">
                    <div className="banner-swiper-container relative">
                        <Swiper
                            // install Swiper modules
                            modules={[Pagination, Autoplay]}
                            spaceBetween={50}
                            autoplay={{
                                delay: autoplayDelay,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            speed={1200}
                            breakpoints={swiperBreakpoints}
                            slidesPerView={1}
                            pagination={{ clickable: true, type: "bullets" }}
                        >
                            <SwiperSlide>
                                <div className="banner-img">
                                    <Image src={"/assets/images/other-banners/web1.webp"} className='hidden lg:block' width={0} height={0} sizes='100%' alt='banner img' />
                                    <Image src={"/assets/images/other-banners/mob1.webp"} className='block lg:hidden' width={0} height={0} sizes='100%' alt='banner img' />
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="banner-img">
                                    <Image src={"/assets/images/other-banners/web2.webp"} className='hidden lg:block' width={0} height={0} sizes='100%' alt='banner img' />
                                    <Image src={"/assets/images/other-banners/mob2.webp"} className='block lg:hidden' width={0} height={0} sizes='100%' alt='banner img' />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeOtherBanner