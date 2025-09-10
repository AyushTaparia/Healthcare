"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAppointmentStore } from "@/lib/store"
import {
  CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  FileText,
  Heart,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Doctor & Schedule", icon: CalendarIcon },
  { id: 3, title: "Medical Details", icon: Heart },
  { id: 4, title: "Confirmation", icon: CheckCircle },
]

export function MultiStepBookingForm() {
  const { doctors, addAppointment, selectedDoctorId, setSelectedDoctor } = useAppointmentStore()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctorId: selectedDoctorId || "",
    date: "",
    time: "",
    reason: "",
    medicalHistory: "",
    emergencyContact: "",
  })

  useEffect(() => {
    if (selectedDoctorId) {
      setFormData((prev) => ({ ...prev, doctorId: selectedDoctorId }))
    }
  }, [selectedDoctorId])

  const selectedDoctor = doctors.find((d) => d.id === formData.doctorId)

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      addAppointment(formData)
      setIsSuccess(true)
      setSelectedDoctor(null) // Clear selected doctor
      toast({
        title: "Appointment Booked!",
        description: "Your appointment has been successfully scheduled.",
      })

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          doctorId: "",
          date: "",
          time: "",
          reason: "",
          medicalHistory: "",
          emergencyContact: "",
        })
        setIsSuccess(false)
        setCurrentStep(1)
        setDate(undefined)
      }, 3000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone
      case 2:
        return formData.doctorId && formData.date && formData.time
      case 3:
        return formData.reason && formData.emergencyContact
      default:
        return true
    }
  }

  if (isSuccess) {
    return (
      <section id="booking-form" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-primary mb-2">Appointment Confirmed!</h3>
                <p className="text-muted-foreground">
                  Your appointment has been successfully booked. You&apos;ll receive a confirmation email shortly.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking-form" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Book Your Appointment</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Schedule your visit with our expert doctors in just a few steps
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                      currentStep >= step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground text-muted-foreground",
                    )}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        currentStep >= step.id ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn("w-8 h-0.5 mx-4", currentStep > step.id ? "bg-primary" : "bg-muted")} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5 text-primary" })}
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>
                Step {currentStep} of {steps.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Doctor & Schedule */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Select Doctor</Label>
                        <Select
                          value={formData.doctorId}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, doctorId: value, time: "" }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            {doctors.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id}>
                                <div className="flex items-center gap-2">
                                  <img
                                    src={doctor.photo || "/placeholder.svg"}
                                    alt={doctor.name}
                                    className="w-6 h-6 rounded-full"
                                  />
                                  <div>
                                    <div className="font-medium">{doctor.name}</div>
                                    <div className="text-sm text-muted-foreground">{doctor.specialization}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Appointment Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(selectedDate) => {
                                  setDate(selectedDate)
                                  setFormData((prev) => ({
                                    ...prev,
                                    date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
                                  }))
                                }}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Appointment Time
                          </Label>
                          <Select
                            value={formData.time}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                            disabled={!selectedDoctor}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={selectedDoctor ? "Choose time" : "Select doctor first"} />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedDoctor?.availableTimes.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Medical Details */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="reason" className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Reason for Visit
                        </Label>
                        <Textarea
                          id="reason"
                          value={formData.reason}
                          onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))}
                          placeholder="Please describe the reason for your appointment"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
                        <Textarea
                          id="medicalHistory"
                          value={formData.medicalHistory}
                          onChange={(e) => setFormData((prev) => ({ ...prev, medicalHistory: e.target.value }))}
                          placeholder="Any relevant medical history, current medications, or allergies"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Emergency Contact
                        </Label>
                        <Input
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                          placeholder="Emergency contact name and phone number"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Confirmation */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="bg-muted/50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Appointment Summary</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p>
                              <strong>Patient:</strong> {formData.name}
                            </p>
                            <p>
                              <strong>Email:</strong> {formData.email}
                            </p>
                            <p>
                              <strong>Phone:</strong> {formData.phone}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Doctor:</strong> {selectedDoctor?.name}
                            </p>
                            <p>
                              <strong>Date:</strong> {date ? format(date, "PPP") : formData.date}
                            </p>
                            <p>
                              <strong>Time:</strong> {formData.time}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p>
                            <strong>Reason:</strong> {formData.reason}
                          </p>
                          {formData.medicalHistory && (
                            <p>
                              <strong>Medical History:</strong> {formData.medicalHistory}
                            </p>
                          )}
                          <p>
                            <strong>Emergency Contact:</strong> {formData.emergencyContact}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button onClick={handleNext} disabled={!isStepValid()} className="flex items-center gap-2">
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !isStepValid()}
                    className="flex items-center gap-2"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {isLoading ? "Booking..." : "Confirm Appointment"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
