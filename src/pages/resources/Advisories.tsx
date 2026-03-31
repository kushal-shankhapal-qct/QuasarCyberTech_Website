import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Seo from '../../components/seo/Seo';

export default function Advisories() {
    return (
        <div className="min-h-screen bg-white">
            <Seo
                title="Security Advisories"
                description="Security advisories from QuasarCyberTech are being prepared for publication."
                path="/advisories"
                robots="noindex,follow"
            />
            <Navbar />
            <main className="pt-[100px] mb-20 text-center min-h-[50vh]">
                <h1 className="text-4xl font-bold mt-10">Advisories</h1>
            </main>
            <Footer />
        </div>
    );
}
