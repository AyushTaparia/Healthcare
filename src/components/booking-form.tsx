"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppointmentStore } from "@/lib/store";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle,
  FileText,
  Heart,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function BookingForm() {
  const { doctors, addAppointment } = useAppointmentStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
  });

  const selectedDoctor = doctors.find((d) => d.id === formData.doctorId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      addAppointment(formData);
      setIsSuccess(true);
      toast({
        title: "Appointment Booked!",
        description: "Your appointment has been successfully scheduled.",
      });

      // Reset form after success
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
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Appointment Confirmed!
                </h3>
                <p className="text-muted-foreground">
                  Your appointment has been successfully booked. You&apos;ll receive
                  a confirmation email shortly.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
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
            Schedule your visit with our expert doctors in just a few clicks
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Appointment Details
              </CardTitle>
              <CardDescription>
                Fill in your information to book an appointment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="emergencyContact"
                      className="flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Emergency Contact
                    </Label>
                    <Input
                      id="emergencyContact"
                      type="tel"
                      value={formData.emergencyContact}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          emergencyContact: e.target.value,
                        }))
                      }
                      placeholder="Emergency contact number"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Select Doctor</Label>
                  <Select
                    value={formData.doctorId}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        doctorId: value,
                        time: "",
                      }))
                    }
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
                              <div className="text-sm text-muted-foreground">
                                {doctor.specialization}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Appointment Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Appointment Time
                    </Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, time: value }))
                      }
                      disabled={!selectedDoctor}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            selectedDoctor
                              ? "Choose time"
                              : "Select doctor first"
                          }
                        />
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

                <div className="space-y-2">
                  <Label htmlFor="reason" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Reason for Visit
                  </Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        reason: e.target.value,
                      }))
                    }
                    placeholder="Please describe the reason for your appointment"
                    required
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="medicalHistory"
                    className="flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Medical History (Optional)
                  </Label>
                  <Textarea
                    id="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        medicalHistory: e.target.value,
                      }))
                    }
                    placeholder="Please provide relevant medical history, current medications, allergies, etc."
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full text-lg py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    "Book Appointment"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
