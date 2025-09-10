"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppointmentStore } from "@/lib/store"
import { Star, Calendar, Award } from "lucide-react"

export function DoctorsSection() {
  const { doctors, setSelectedDoctor } = useAppointmentStore()

  const handleBookAppointment = (doctorId: string) => {
    setSelectedDoctor(doctorId)
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="doctors" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Meet Our Expert Doctors</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Our team of experienced healthcare professionals is dedicated to providing you with the best medical care
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <motion.img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full"
                    >
                      <Award className="w-4 h-4" />
                    </motion.div>
                  </div>

                  <div className="text-center space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                      <Badge variant="secondary" className="mb-2">
                        {doctor.specialization}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{doctor.experience} experience</p>
                    </div>

                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(doctor.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium">{doctor.rating}</span>
                    </div>

                    <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{doctor.bio}</p>

                    <Button
                      onClick={() => handleBookAppointment(doctor.id)}
                      className="w-full group-hover:scale-105 transition-transform"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
