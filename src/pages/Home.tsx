import React from 'react';
import Layout from '../components/layout/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">ようこそ</h1>
      <p>オンボーディングシステムへようこそ!</p>
    </Layout>
  );
};

export default Home;
