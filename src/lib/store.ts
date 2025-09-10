import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Doctor {
  id: string
  name: string
  specialization: string
  photo: string
  rating: number
  experience: string
  bio: string
  availableTimes: string[]
}

export interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  doctorId: string
  date: string
  time: string
  reason: string
  medicalHistory: string
  emergencyContact: string
  createdAt: string
}

interface AppointmentStore {
  appointments: Appointment[]
  doctors: Doctor[]
  selectedDoctorId: string | null
  addAppointment: (appointment: Omit<Appointment, "id" | "createdAt">) => void
  getAppointmentsByDoctor: (doctorId: string) => Appointment[]
  getDoctorById: (id: string) => Doctor | undefined
  setSelectedDoctor: (doctorId: string | null) => void
}

// Static doctors data
const staticDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    photo: "/female-doctor-stethoscope.png",
    rating: 4.9,
    experience: "15 years",
    bio: "Specialized in heart disease prevention and treatment with extensive experience in cardiac surgery.",
    availableTimes: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialization: "Neurologist",
    photo: "/male-doctor-glasses.png",
    rating: 4.8,
    experience: "12 years",
    bio: "Expert in treating neurological disorders including epilepsy, stroke, and neurodegenerative diseases.",
    availableTimes: ["08:00", "09:00", "10:00", "13:00", "14:00", "15:00"],
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatrician",
    photo: "/friendly-female-pediatric-doctor.jpg",
    rating: 4.9,
    experience: "10 years",
    bio: "Dedicated to providing comprehensive healthcare for children from infancy through adolescence.",
    availableTimes: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"],
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialization: "Orthopedic Surgeon",
    photo: "/confident-male-orthopedic-surgeon.jpg",
    rating: 4.7,
    experience: "18 years",
    bio: "Specializes in joint replacement surgery and sports medicine with a focus on minimally invasive techniques.",
    availableTimes: ["08:00", "09:00", "10:00", "14:00", "15:00"],
  },
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    specialization: "Dermatologist",
    photo: "/professional-female-dermatologist.jpg",
    rating: 4.8,
    experience: "8 years",
    bio: "Expert in skin health, cosmetic dermatology, and treatment of skin conditions including acne and eczema.",
    availableTimes: ["10:00", "11:00", "13:00", "14:00", "15:00", "16:00"],
  },
  {
    id: "6",
    name: "Dr. Robert Kumar",
    specialization: "General Practitioner",
    photo: "/friendly-male-family-doctor.jpg",
    rating: 4.6,
    experience: "20 years",
    bio: "Providing comprehensive primary care for patients of all ages with a focus on preventive medicine.",
    availableTimes: ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"],
  },
]

export const useAppointmentStore = create<AppointmentStore>()(
  persist(
    (set, get) => ({
      appointments: [],
      doctors: staticDoctors,
      selectedDoctorId: null, // Added selectedDoctorId for pre-filling
      addAppointment: (appointmentData) => {
        const newAppointment: Appointment = {
          ...appointmentData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          appointments: [...state.appointments, newAppointment],
        }))
      },
      getAppointmentsByDoctor: (doctorId) => {
        return get().appointments.filter((apt) => apt.doctorId === doctorId)
      },
      getDoctorById: (id) => {
        return get().doctors.find((doctor) => doctor.id === id)
      },
      setSelectedDoctor: (doctorId) => {
        // Added method to set selected doctor
        set({ selectedDoctorId: doctorId })
      },
    }),
    {
      name: "appointment-storage",
    },
  ),
)
