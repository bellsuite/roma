"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    suite: "",
    message: "",
    acceptTerms: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <section className="p-padding-global bg-bianco">
      <div className="max-w-container-large mx-auto">
        <h2 className="font-heading text-5xl text-blu mb-2">Contattaci</h2>
        <p className="text-grigio-scuro mb-10 text-lg max-w-xl">
          Vuoi conoscere la disponibilità delle nostre 2 suite nel periodo che ti interessa?
          <br />
          Lasciaci i tuoi dati: ti ricontatteremo al più presto.
        </p>

        {submitted ? (
          <div className="p-8 border border-blu text-blu text-center">
            <h3 className="font-heading text-2xl mb-2">Grazie per averci contattato!</h3>
            <p>Ti risponderemo il prima possibile.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-blu font-semibold text-sm mb-1">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-oro/60 p-3 rounded-md bg-bianco focus:outline-none focus:border-oro"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-blu font-semibold text-sm mb-1">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-oro/60 p-3 rounded-md bg-bianco focus:outline-none focus:border-oro"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-blu font-semibold text-sm mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-oro/60 p-3 rounded-md bg-bianco focus:outline-none focus:border-oro"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="text-blu font-semibold text-sm mb-1">Phone number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border border-oro/60 p-3 rounded-md bg-bianco focus:outline-none focus:border-oro"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="suite" className="text-blu font-semibold text-sm mb-1">Suite</label>
              <select
                id="suite"
                name="suite"
                value={formData.suite}
                onChange={handleChange}
                className="w-full border border-oro/60 p-3 rounded-md bg-bianco focus:outline-none focus:border-oro text-grigio-scuro"
                required
              >
                <option value="">Select one...</option>
                <option value="suite1">Suite 1</option>
                <option value="suite2">Suite 2</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="text-blu font-semibold text-sm mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full border border-oro/60 p-3 rounded-md bg-bianco focus:outline-none focus:border-oro"
                placeholder="Type your message..."
                required
              ></textarea>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="w-4 h-4 border border-oro/60 rounded-none accent-blu"
                required
              />
              <label htmlFor="acceptTerms" className="text-grigio-scuro text-sm">
                I accept the <a href="#" className="text-blu underline">Terms</a>
              </label>
            </div>

            <button type="submit" className="bg-blu text-bianco px-12 py-3 font-semibold rounded-md transition-colors hover:bg-blu/80">
              Invio
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
