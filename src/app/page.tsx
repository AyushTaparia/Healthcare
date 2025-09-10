import { HeroSection } from "@/components/hero-section"
import { MultiStepBookingForm } from "@/components/multi-step-booking-form"
import { DoctorsSection } from "@/components/doctors-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTAFooter } from "@/components/cta-footer"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <ThemeToggle />
      <HeroSection />
      <MultiStepBookingForm />
      <DoctorsSection />
      <TestimonialsSection />
      <CTAFooter />
    </main>
  )
}
