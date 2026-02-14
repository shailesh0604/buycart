import React from 'react';
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const HomeBanner = () => {

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
            slidesPerView: 2,
            spaceBetween: 30,
        },
    };

    return (
        <>
            <div className="banner-container mt-10">

                <div className="custom-container ">
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination]}
                        spaceBetween={50}
                        loop={true}
                        speed={1000}
                        breakpoints={swiperBreakpoints}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        <SwiperSlide>
                            <div className="banner-img">
                                <Image src={"/assets/images/banners/b1.webp"} width={0} height={0} sizes='100%' alt='banner img' />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="banner-img">
                                <Image src={"/assets/images/banners/b2.webp"} width={0} height={0} sizes='100%' alt='banner img' />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="banner-img">
                                <Image src={"/assets/images/banners/b3.webp"} width={0} height={0} sizes='100%' alt='banner img' />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="banner-img">
                                <Image src={"/assets/images/banners/b4.webp"} width={0} height={0} sizes='100%' alt='banner img' />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="banner-img">
                                <Image src={"/assets/images/banners/b5.webp"} width={0} height={0} sizes='100%' alt='banner img' />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default HomeBanner