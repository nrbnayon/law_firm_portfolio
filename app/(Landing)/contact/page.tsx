"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { Hero } from "@/components/sections/hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchContactInfo,
  clearError,
} from "@/redux/features/contact/contactSlice";
import { ContactFormData } from "@/types/contact";

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { contactInfo, isLoading, error } = useAppSelector(
    (state) => state.contact
  );

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    matterType: "",
    message: "",
    agreement: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch contact info on mount
  useEffect(() => {
    dispatch(fetchContactInfo());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("Contact info error:", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Fallback data
  const contactData = contactInfo
    ? {
        email: contactInfo.email,
        phone: contactInfo.phone,
        address: {
          line1: contactInfo.address.line1,
          line2: contactInfo.address.line2 || "",
          line3: contactInfo.address.line3 || "",
        },
      }
    : {
        email: "info@cwwhitelaw.com",
        phone: "713-236-7700",
        address: {
          line1: "Lyric Tower",
          line2: "440 Louisiana St., STE 900",
          line3: "Houston, TX 77002",
        },
      };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!formData.matterType) {
      errors.matterType = "Matter type is required";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    if (!formData.agreement) {
      errors.agreement = "You must agree to the terms";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields", {
        description: "Check the form for errors and try again.",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      // Template parameters
      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        matter_type: formData.matterType,
        message: formData.message,
        to_email: contactData.email,
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
        duration: 3000,
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        matterType: "",
        message: "",
        agreement: false,
      });
      setFormErrors({});
    } catch (error: any) {
      console.error("EmailJS error:", error);
      toast.error("Failed to send message", {
        description: "Please try again later or contact us directly.",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <Hero
        title="Contact Us"
        subtitle="Confidential Consultation | Secure intake, clear next steps."
        imageSrc="/insight.png"
        darkBg={false}
        height="min-h-[40vh] md:min-h-[50vh]"
        padding="pt-20"
      />

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-3">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-12">
            {/* Contact Information */}
            <div>
              <h2
                className="font-bold text-3xl md:text-4xl mb-6"
                style={{ color: "var(--text-dark)" }}
              >
                Contact Information
              </h2>
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: "var(--text-medium)" }}
              >
                Our team is available to respond to your inquiry and provide an
                initial assessment of your legal matter.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 p-3 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--primary-gold)" }}
                  >
                    <Image
                      src="/icon/Mail.svg"
                      alt="email"
                      width={16}
                      height={16}
                      quality={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg mb-1"
                      style={{ color: "var(--text-dark)" }}
                    >
                      Email
                    </h3>
                    <p
                      className="text-lg"
                      style={{ color: "var(--text-medium)" }}
                    >
                      {contactData.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--primary-gold)" }}
                  >
                    <Phone
                      className="w-6 h-6"
                      style={{ color: "var(--text-white)" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg mb-1"
                      style={{ color: "var(--text-dark)" }}
                    >
                      Phone
                    </h3>
                    <p
                      className="text-lg"
                      style={{ color: "var(--text-medium)" }}
                    >
                      {contactData.phone}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--primary-gold)" }}
                  >
                    <MapPin
                      className="w-6 h-6"
                      style={{ color: "var(--text-white)" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg mb-1"
                      style={{ color: "var(--text-dark)" }}
                    >
                      Location
                    </h3>
                    <p
                      className="text-lg"
                      style={{ color: "var(--text-medium)" }}
                    >
                      {contactData.address.line1} <br />
                      {contactData.address.line2}
                      <br />
                      {contactData.address.line3}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Request a Consultation Form */}
            <div
              className="p-8 md:p-12 rounded-none border md:col-span-2"
              style={{ backgroundColor: "var(--text-white)" }}
            >
              <h2
                className="font-bold text-3xl md:text-4xl mb-8"
                style={{ color: "var(--text-dark)" }}
              >
                Request a Consultation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    className="block text-base font-medium mb-2"
                    style={{ color: "var(--text-dark)" }}
                  >
                    Full Name{" "}
                    <span style={{ color: "var(--secondary-gold)" }}>*</span>
                  </label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full rounded-none h-12 border-[#E0E0E0]! ${
                      formErrors.fullName ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.fullName && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-base font-medium mb-2"
                      style={{ color: "var(--text-dark)" }}
                    >
                      Email Address{" "}
                      <span style={{ color: "var(--secondary-gold)" }}>*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full rounded-none h-12 border-[#E0E0E0]! ${
                        formErrors.email ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your email address"
                    />
                    {formErrors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-base font-medium mb-2"
                      style={{ color: "var(--text-dark)" }}
                    >
                      Phone number{" "}
                      <span style={{ color: "var(--secondary-gold)" }}>*</span>
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full rounded-none h-12 border-[#E0E0E0]! ${
                        formErrors.phone ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {formErrors.phone && (
                      <p className="text-sm text-red-500 mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-base font-medium mb-2"
                    style={{ color: "var(--text-dark)" }}
                  >
                    Matter Type{" "}
                    <span style={{ color: "var(--secondary-gold)" }}>*</span>
                  </label>
                  <select
                    name="matterType"
                    value={formData.matterType}
                    onChange={handleInputChange}
                    className={`w-full rounded-none h-12 border border-[#E0E0E0]! focus:outline-none focus:ring-1 px-2 ${
                      formErrors.matterType ? "border-red-500" : ""
                    }`}
                    style={{
                      color: "var(--text-medium)",
                    }}
                  >
                    <option value="">Select matter type</option>
                    <option value="criminal-defense">Criminal Defense</option>
                    <option value="white-collar">White Collar Defense</option>
                  </select>
                  {formErrors.matterType && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.matterType}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-base font-medium mb-2"
                    style={{ color: "var(--text-dark)" }}
                  >
                    Brief Description of your Matter{" "}
                    <span style={{ color: "var(--secondary-gold)" }}>*</span>
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full min-h-32 rounded-none border border-[#E0E0E0]! ${
                      formErrors.message ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your message"
                  />
                  {formErrors.message && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="attorney-agreement"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <label
                    htmlFor="attorney-agreement"
                    className="text-sm"
                    style={{ color: "var(--text-medium)" }}
                  >
                    I understand that submitting this form does not create an
                    attorney-client relationship and that conflict checks must
                    be completed before representation begins.
                    <span style={{ color: "var(--secondary-gold)" }}>*</span>
                  </label>
                </div>
                {formErrors.agreement && (
                  <p className="text-sm text-red-500 mt-1">
                    {formErrors.agreement}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-medium py-5 text-lg rounded-none!"
                  style={{
                    backgroundColor: "var(--text-dark)",
                    color: "var(--text-white)",
                  }}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
