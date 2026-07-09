import { Header } from "@/components/landing/header";
import { FloatingChatbot } from "@/components/landing/floating-chatbot";
import { Hero } from "@/components/landing/hero";
import { Brands } from "@/components/landing/brands";
import { WhatWeOffer } from "@/components/landing/what-we-offer";
import { ServicesGrid } from "@/components/landing/services-grid";
import { QualityParts } from "@/components/landing/quality-parts";
import { AdvancedSolutions } from "@/components/landing/advanced-solutions";
import { WhyChooseUs } from "@/components/landing/why-choose-us";
import { Specialists } from "@/components/landing/specialists";
import { RepairGallery } from "@/components/landing/repair-gallery";
import { Testimonials } from "@/components/landing/testimonials";
import { Location } from "@/components/landing/location";
import { PaymentInfo } from "@/components/landing/payment-info";
import { ContactForm } from "@/components/landing/contact-form";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <FloatingChatbot />
      <main>
        <Hero />
        <Brands />
        <WhatWeOffer />
        <QualityParts />
        <ServicesGrid />
        <AdvancedSolutions />
        <WhyChooseUs />
        <Specialists />
        <RepairGallery />
        <Testimonials />
        <FAQ />
        <Location />
        <PaymentInfo />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
