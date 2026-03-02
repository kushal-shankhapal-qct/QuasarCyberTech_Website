import React from 'react';
import { Smartphone, Shield, Lock, ArrowRight } from 'lucide-react';
import ServicePageTemplate from './../../components/templates/ServicePageTemplate';

export default function MobileSecurity() {
  const data = {
    seoTitle: "Mobile Security & App Pentesting",
    heroSubtitle: "Protect iOS & Android Ecosystems",
    heroDescription: "Rigorous vulnerability assessments against your mobile applications, APIs, and backend hosting environments.",
    threatLandscape: "Mobile applications routinely expose sensitive endpoints, bypass standard perimeter defenses, and store insecure local data, making them highly lucrative targets.",
    subServices: [
        {
            title: "iOS Deployment Security",
            items: ["Jailbreak Bypass Testing", "Keychain Data Extraction", "Binary Reverse Engineering", "Swift/Objective-C Analysis"]
        },
        {
            title: "Android Architecture Security",
            items: ["APK Decompilation", "Root Detection Bypass", "Intent Spoofing", "Insecure Storage Mapping"]
        },
        {
             title: "Mobile API Assessment",
             items: ["Authentication Flaws", "IDOR Vulnerabilities", "Traffic Interception", "Certificate Pinning Bypasses"]
        }
    ],
    methodology: [
        { step: "01", title: "Static Analysis", description: "Decompiling binaries and analyzing source code for hardcoded secrets." },
        { step: "02", title: "Dynamic Analysis", description: "Intercepting traffic over SSL/TLS using proxy tooling." },
        { step: "03", title: "Runtime Manipulation", description: "Using Frida/Magisk to hook methods and bypass local security controls." },
        { step: "04", title: "API Backend Testing", description: "Exploiting the server-side infrastructure hosting the app data." }
    ],
    toolsAndStandards: ["OWASP MASVS", "Frida", "Burp Suite", "MobSF", "Drozer"],
    engagementModel: {
        type: 'project' as const,
        sla: "Response within 24h",
        duration: "2-4 Weeks",
        description: "Point-in-time assessments evaluating specific major version releases."
    },
    advantages: [
        { title: "Custom Exploit Engineering", description: "We build bespoke tools to bypass proprietary obfuscation limits.", icon: Lock },
        { title: "Comprehensive Coverage", description: "We assess both the local device surface and the remote API structure simultaneously.", icon: Shield },
        { title: "Rapid Remediation", description: "Direct access to our pentesters for patch validation.", icon: Smartphone }
    ],
    relatedServices: [
        { title: "Application Security", linkHref: "/services/application-security", description: "Secure web and desktop applications natively." }
    ]
  };

  return <ServicePageTemplate {...data} />;
}
