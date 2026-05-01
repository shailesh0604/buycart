import React from 'react';
import { IoIosArrowDown } from "react-icons/io";

const ProductPage = () => {
    return (
        <>
            <section className='section-product'>
                <div className="custom-container-2">

                    <div className="grid grid-cols-1 md:grid-cols-[20vw_auto] gap-4">
                        <div className="bg-blue-400 p-4">
                            <div className="filter-container">
                                <div className="filder-content">
                                    <h2 className="text-2xl font-bold mb-4">Filter</h2>
                                    <hr />
                                    <div className="filter-list ">
                                        <div className="filter-item">
                                            <div className="flex items-center justify-between">
                                                <span>Category</span>
                                                <span><IoIosArrowDown /></span>
                                            </div>

                                            <div className="filter-item-menu">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-400">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem saepe error unde blanditiis. Consequuntur praesentium corporis nihil laudantium voluptatem reprehenderit atque. Earum culpa nemo quis! Ipsa et quia accusantium corrupti?
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductPage