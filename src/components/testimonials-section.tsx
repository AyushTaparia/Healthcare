"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Patient",
    content:
      "The booking process was incredibly smooth and the doctors are truly exceptional. I felt cared for from the moment I walked in.",
    rating: 5,
    photo: "/happy-female-patient.jpg",
  },
  {
    id: 2,
    name: "John Davis",
    role: "Patient",
    content: "Outstanding medical care with a personal touch. The online booking system made scheduling so convenient.",
    rating: 5,
    photo: "/satisfied-male-patient.jpg",
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "Patient",
    content: "Professional, caring, and efficient. The entire team goes above and beyond to ensure patient comfort.",
    rating: 5,
    photo: "/smiling-female-patient.jpg",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Patient",
    content: "The quality of care here is unmatched. Easy appointment booking and excellent follow-up care.",
    rating: 5,
    photo: "/happy-male-patient-with-glasses.jpg",
  },
  {
    id: 5,
    name: "Lisa Chen",
    role: "Patient",
    content: "Highly recommend! The doctors are knowledgeable and the staff is incredibly friendly and helpful.",
    rating: 5,
    photo: "/cheerful-asian-female-patient.jpg",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">What Our Patients Say</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied patients
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8 md:p-12">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                      >
                        <Quote className="w-12 h-12 text-primary mx-auto mb-4" />
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed"
                      >
                        &quot;{testimonials[currentIndex].content}&quot;
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4"
                      >
                        <img
                          src={testimonials[currentIndex].photo || "/placeholder.svg"}
                          alt={testimonials[currentIndex].name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="text-left">
                          <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                          <p className="text-muted-foreground">{testimonials[currentIndex].role}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg hover:scale-110 transition-transform bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg hover:scale-110 transition-transform bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
