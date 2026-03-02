import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Government() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-[100px] mb-20 text-center min-h-[50vh]">
                <h1 className="text-4xl font-bold mt-10">Government</h1>
            </main>
            <Footer />
        </div>
    );
}
