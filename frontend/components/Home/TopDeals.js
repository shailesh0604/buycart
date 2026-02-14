import React from "react";
import TopDealsData from "@/app/data/TopDealsData";
import HorizontalSlider from "../HorizontalSlider";

const TopDeals = () => {
  return (
    <>
      <section className="section-top-deals mt-12">
        <div className="custom-container">
          <HorizontalSlider
            title="Top Deals"
            data={TopDealsData}
            scrollAmount={320}
          />
        </div>
      </section>
    </>
  );
};

export default TopDeals;
