import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Seo from '../../components/seo/Seo';

export default function InfosecDictionary() {
    return (
        <div className="min-h-screen bg-white">
            <Seo
                title="Infosec Dictionary"
                description="The QuasarCyberTech information security dictionary is not yet ready for indexing."
                path="/infosec-dictionary"
                robots="noindex,follow"
            />
            <Navbar />
            <main className="pt-[100px] mb-20 text-center min-h-[50vh]">
                <h1 className="text-4xl font-bold mt-10">Infosec Dictionary</h1>
            </main>
            <Footer />
        </div>
    );
}
