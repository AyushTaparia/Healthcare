"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Calendar, Clock, Heart } from "lucide-react"

export function CTAFooter() {

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-100">
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6"
            >
              <Heart className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Take Care of Your Health?</h2>
            <p className="text-xl text-slate-300 text-pretty max-w-2xl mx-auto mb-8">
              Don&apos;t wait - book your appointment today and take the first step towards better health
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Appointment Now
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 dark:bg-slate-900/50 border-slate-700 text-slate-100 hover:bg-slate-800/70 transition-colors">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2 text-white">Call Us</h3>
                  <p className="text-slate-300">+1 (555) 123-4567</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 dark:bg-slate-900/50 border-slate-700 text-slate-100 hover:bg-slate-800/70 transition-colors">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2 text-white">Email Us</h3>
                  <p className="text-slate-300">info@healthcareplus.com</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 dark:bg-slate-900/50 border-slate-700 text-slate-100 hover:bg-slate-800/70 transition-colors">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2 text-white">Visit Us</h3>
                  <p className="text-slate-300">123 Health St, Medical City</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-6 py-3 rounded-full">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium text-white">Open 24/7 for Emergencies</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Bottom */}
      <div className="border-t border-slate-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400">© 2024 HealthCare Plus. All rights reserved.</div>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-slate-200 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-200 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-slate-200 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
