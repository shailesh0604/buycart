"use client";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";


const CustomSlider = ({
    data = [],
    renderItem,
    itemWidth = 160,
    itemsPerView = 6,
    className = "",
}) => {
    const [index, setIndex] = useState(0);

    const maxIndex = Math.max(data.length - itemsPerView, 0);

    return (
        <div className={`custom-slider-container ${className}`}>
            {/* Prev */}

            {itemsPerView !== data.length && (
                <button className={`custom-nav nav-left ${index > 0 ? '' : 'hide'}`} onClick={() => setIndex(index - 1)}>
                    <FaChevronLeft />
                </button>
            )
            }

            {itemsPerView !== data.length && (
                <button className={`custom-nav nav-right ${index < maxIndex ? '' : 'hide'}`} onClick={() => setIndex(index + 1)}>
                    <FaChevronRight />
                </button>
            )
            }


            <div className="slider-wrapper">
                <div
                    className="slider-track"
                    style={{
                        transform: `translateX(-${index * itemWidth}px)`,
                    }}
                >
                    {data.map((item, i) => (
                        <div
                            key={i}
                            className="slider-item"
                            style={{ minWidth: itemWidth }}
                        >
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomSlider;
