import React from "react";
import Image from "next/image";
import HomeCategoryData from "@/app/data/HomeCategoryData";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const HomeCategory = () => {
  // const [activeCategory, setActiveCategory] = useState(null);
  // const [activeSubCat, setActiveSubCat] = useState(null);
  // console.log(activeCategory);

  return (
    <div className="home-category-container">
      <div className="home-category-slider">
        {HomeCategoryData.map((category) => (
          <div
            className="category-slider"
            key={category.id}
            // onMouseEnter={() => {
            //   setActiveCategory(category);
            //   setActiveSubCat(category.subcategorys?.[0] || null);
            // }}
            // onMouseLeave={() => {
            //   setActiveCategory(null);
            //   setActiveSubCat(null);
            // }}
          >
            <div className="category-item">
              <Link href={category.link} className="home-category">
                <div className="cat-icon">
                  <Image
                    width={0}
                    height={0}
                    sizes="100%"
                    loading="lazy"
                    src={category.image}
                    alt={category.alt}
                  />
                </div>
                <div className="cat-txt">
                  <span>{category.title}</span>

                  {/* {category.subcategorys?.length > 0 && (
                    <span className="icon">
                      <IoIosArrowDown />
                    </span>
                  )} */}
                </div>
              </Link>

              {/* Dropdown */}
              {/* {activeCategory?.id === category.id &&
                category.subcategorys?.length > 0 && (
                  <div className="category-dropdown flex gap-8">
                    <div className="dropdown flex flex-col gap-4">
                      {category.subcategorys.map((sub) => (
                        <Link
                          key={sub.id}
                          href={sub.link}
                          className={`dropdown-main-cat ${
                            activeSubCat?.id === sub.id ? "active" : ""
                          }`}
                          onMouseEnter={() => setActiveSubCat(sub)}
                        >
                          <span>{sub.title}</span>
                          {sub.children?.length > 0 && (
                            <span className="icon">
                              <IoIosArrowForward />
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>

                    <div className="dropdown subcategory-dropdown flex flex-col gap-4">
                      <p>More in {activeSubCat?.title}</p>
                      {activeSubCat?.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.link}
                          className="dropdown-sub-cat"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;
