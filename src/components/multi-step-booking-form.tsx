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
import { Badge } from "@/components/ui/badge"
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
  Star,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Personal Info", icon: User, },
  { id: 2, title: "Schedule", icon: CalendarIcon, },
  { id: 3, title: "Medical Details", icon: Heart, },
  { id: 4, title: "Confirmation", icon: CheckCircle, },
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
    doctorId: "",
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
      setSelectedDoctor(null)
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
            <Card className="border-primary/20 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-primary mb-3">Appointment Confirmed!</h3>
                <p className="text-muted-foreground leading-relaxed">
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
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Schedule your visit with our expert doctors in just a few simple steps
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between px-2 sm:px-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 mb-2",
                        currentStep >= step.id
                          ? "bg-primary border-primary text-primary-foreground shadow-lg"
                          : "border-muted-foreground/30 text-muted-foreground bg-background",
                      )}
                    >
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="text-center">
                      <p
                        className={cn(
                          "text-xs sm:text-sm font-medium",
                          currentStep >= step.id ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-0.5 mx-2 sm:mx-4 transition-colors duration-300 mt-[-20px] max-w-16 sm:max-w-20",
                        currentStep > step.id ? "bg-primary" : "bg-muted-foreground/20",
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5 text-primary" })}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{steps[currentStep - 1].title}</CardTitle>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Step {currentStep} of {steps.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
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
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                            <User className="w-4 h-4 text-primary" />
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your full name"
                            className="h-11 bg-white border border-gray-300"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                            <Phone className="w-4 h-4 text-primary" />
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                            placeholder="Enter your phone number"
                            className="h-11 bg-white border border-gray-300"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                          <Mail className="w-4 h-4 text-primary" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email address"
                          className="h-11 bg-white border border-gray-300"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Doctor & Schedule */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 w-full">
                        <div className="spa">
                        <Label className="text-sm font-medium">Select Doctor *</Label>
                        <Select
                          value={formData.doctorId}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, doctorId: value, time: "" }))}
                        >
                          <SelectTrigger className="h-16 px-4 border-gray-300 py-8 cursor-pointer border-2 hover:border-primary/60 focus:border-primary transition-all duration-200 bg-background/50 backdrop-blur-sm">
                            <SelectValue placeholder="Choose your preferred doctor" className="text-base" />
                          </SelectTrigger>
                          <SelectContent className="max-h-80 border-2 border-primary/20">
                            {doctors.map((doctor) => (
                              <SelectItem
                                key={doctor.id}
                                value={doctor.id}
                                className="p-4 hover:bg-primary/10 focus:bg-primary/10 transition-colors duration-200 cursor-pointer"
                              >
                                <div className="flex items-center gap-4 w-full">
                                  <img
                                    src={doctor.photo || "/placeholder.svg"}
                                    alt={doctor.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                                  />
                                  <div className="flex-1 text-left">
                                    <div className="font-semibold text-base text-foreground">{doctor.name}</div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                      <span>{doctor.specialization}</span>
                                      <span className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium">{doctor.rating}</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        </div>
                        
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Appointment Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full h-11 border-gray-300 hover:bg-primary/60 justify-start cursor-pointer text-left font-normal border-2 focus:border-primary transition-all duration-200",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
                                <span className="text-base">
                                  {date ? format(date, "PPP") : "Select appointment date"}
                                </span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 border-2 border-primary/20" align="start">
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
                                className="border-0"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-3">
                          <Label className="flex items-center gap-2 text-sm font-medium">
                            <Clock className="w-4 h-4 text-primary" />
                            Appointment Time *
                          </Label>
                          <Select
                            value={formData.time}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                            disabled={!selectedDoctor}
                          >
                            <SelectTrigger className="h-16 w-full py-5 border-2 bg-white border-gray-300 cursor-pointer hover:border-primary/60 focus:border-primary transition-all duration-200">
                              <SelectValue
                                placeholder={selectedDoctor ? "Choose available time" : "Select doctor first"}
                                className="text-base"
                              />
                            </SelectTrigger>
                            <SelectContent className="border-2 border-primary/20">
                              {selectedDoctor?.availableTimes.map((time) => (
                                <SelectItem
                                  key={time}
                                  value={time}
                                  className="p-4 hover:bg-primary/50 focus:bg-primary/50 transition-colors duration-200 cursor-pointer"
                                >
                                  <span className="font-medium text-base">{time}</span>
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
                      <div className="space-y-3">
                        <Label htmlFor="reason" className="flex items-center gap-2 text-sm font-medium">
                          <FileText className="w-4 h-4 text-primary" />
                          Reason for Visit *
                        </Label>
                        <Textarea
                          id="reason"
                          value={formData.reason}
                          onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))}
                          placeholder="Please describe the reason for your appointment (symptoms, concerns, routine check-up, etc.)"
                          className="min-h-[100px] resize-none bg-white border border-gray-300"
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="medicalHistory" className="text-sm font-medium">
                          Medical History (Optional)
                        </Label>
                        <Textarea
                          id="medicalHistory"
                          value={formData.medicalHistory}
                          onChange={(e) => setFormData((prev) => ({ ...prev, medicalHistory: e.target.value }))}
                          placeholder="Any relevant medical history, current medications, allergies, or previous surgeries"
                          className="min-h-[80px] resize-none bg-white border border-gray-30"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="emergencyContact" className="flex items-center gap-2 text-sm font-medium">
                          <Phone className="w-4 h-4 text-primary" />
                          Emergency Contact *
                        </Label>
                        <Input
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                          placeholder="Emergency contact name and phone number"
                          className="h-11 bg-white border border-gray-30"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Confirmation */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="bg-muted/50 p-6 rounded-xl border">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          Appointment Summary
                        </h3>
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2 bg-white rounded-lg p-4 border shadow">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Patient:</span>
                                <span className="text-sm font-medium">{formData.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Email:</span>
                                <span className="text-sm">{formData.email}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Phone:</span>
                                <span className="text-sm">{formData.phone}</span>
                              </div>
                            </div>
                            <div className="space-y-2 bg-white rounded-lg p-4 border shadow">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Doctor:</span>
                                <span className="text-sm font-medium">{selectedDoctor?.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Date:</span>
                                <span className="text-sm">{date ? format(date, "PPP") : formData.date}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Time:</span>
                                <span className="text-sm font-medium">{formData.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="pt-4 border-t space-y-2">
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Reason for visit:</span>
                              <p className="text-sm mt-1 bg-white rounded-lg p-2 border">{formData.reason}</p>
                            </div>
                            {formData.medicalHistory && (
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Medical history:</span>
                                <p className="text-sm mt-1 bg-white rounded-lg p-2 border">{formData.medicalHistory}</p>
                              </div>
                            )}
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Emergency contact:</span>
                              <p className="text-sm mt-1 bg-white rounded-lg p-2 border">{formData.emergencyContact}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between items-center mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 h-11 px-6 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button onClick={handleNext} disabled={!isStepValid()} className="flex items-center gap-2 h-11 px-6">
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !isStepValid()}
                    className="flex items-center gap-2 h-11 px-6"
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
                    {isLoading ? "Booking Appointment..." : "Confirm Appointment"}
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
