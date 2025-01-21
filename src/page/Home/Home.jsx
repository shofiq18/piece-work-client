import React from 'react';
import Hero from './Hero';
import TestimonialSection from './TestimonialSection';
import HowItWorks from './HowItWorks';
import FAQ from './FAQ';
import BestWorkers from './BestWorkers';
import VisionMission from '../VisionMission';


const Home = () => {
    return (
        <div className='min-h-screen'>
            <Hero></Hero>
            <BestWorkers></BestWorkers>
            <TestimonialSection></TestimonialSection>
            <HowItWorks></HowItWorks>
            <VisionMission></VisionMission>
            <FAQ></FAQ>

        </div>
    );
};

export default Home;