import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Seo from '../../components/seo/Seo';

export default function CaseStudies() {
    return (
        <div className="min-h-screen bg-white">
            <Seo
                title="Case Studies"
                description="Case studies from QuasarCyberTech are being prepared for publication."
                path="/case-studies"
                robots="noindex,follow"
            />
            <Navbar />
            <main className="pt-[100px] mb-20 text-center min-h-[50vh]">
                <h1 className="text-4xl font-bold mt-10">Case Studies</h1>
            </main>
            <Footer />
        </div>
    );
}
