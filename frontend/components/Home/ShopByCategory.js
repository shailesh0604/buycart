import ShopByCategoryData from '@/app/data/ShopByCategoryData'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const ShopByCategory = () => {
    return (
        <>
            <section className='section-shop-by-category'>
                <div className="custom-container">
                    <div className="section-heading">
                        <h1 className="section-title">
                            Shop By Category
                        </h1>
                    </div>

                    <div className="shop-by-category-contents">
                        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {ShopByCategoryData.map((e) => (
                                <div key={e.id} className='shop-by-category-content relative'>
                                    <Link href={e.link} className='shop-by-category-item h-full flex flex-col gap-4 items-center'>
                                        <div className="shop-cat-img">
                                            <Image src={e.image} width={0} height={0} sizes='100%' alt={e.title} />
                                        </div>
                                        <h4 className='shop-cat-txt absolute bottom-1 left-1/2 -translate-1/2 text-nowrap'>{e.title}</h4>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default ShopByCategory