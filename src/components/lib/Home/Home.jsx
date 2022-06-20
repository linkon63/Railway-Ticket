import React from 'react';
import Layout from '../../layout/Layout';
import HomeComponent from './HomeComponent';

const Home = () => {
    return (
        <Layout props={<HomeComponent />} />
    );
};

export default Home;