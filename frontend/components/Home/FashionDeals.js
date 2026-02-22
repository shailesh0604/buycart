import React from 'react'
import HorizontalSlider from '../HorizontalSlider';
import FashionDealsData from '@/app/data/FashionDealsData';
const FashionDeals = () => {
    return (
        <>
            <section className="section-top-deals mt-12">
                <div className="custom-container">
                    <HorizontalSlider
                        title="Fashion Deals"
                        data={FashionDealsData}
                        scrollAmount={350}
                    />
                </div>
            </section>
        </>
    );
}

export default FashionDeals