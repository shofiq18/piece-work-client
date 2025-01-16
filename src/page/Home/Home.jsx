import React from 'react';
import Hero from './Hero';
import TestimonialSection from './TestimonialSection';
import HowItWorks from './HowItWorks';
import Pricing from './Pricing';
import FAQ from './FAQ';


const Home = () => {
    return (
        <div className='min-h-screen'>
            <Hero></Hero>
            <TestimonialSection></TestimonialSection>
            <HowItWorks></HowItWorks>
            <Pricing></Pricing>
            <FAQ></FAQ>

        </div>
    );
};

export default Home;