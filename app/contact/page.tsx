import type { Metadata } from "next";
import { ContactHero } from "@/components/static/Contact/ContactHero";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "تماس با DNH",
  description: "ثبت درخواست محرمانه برای گفت‌وگو با DNH",
};

const page = () => {
  return (
    <div>
      <ContactHero
        phoneDisplay="۰۲۱ XXXX XXXX"
        phoneHref="+9821XXXXXXXX"
        whatsappDisplay="۰۹۱۲ XXX XXXX"
        whatsappHref="https://wa.me/98912XXXXXXX"
        email="info@your-domain.com"
        address="آدرس واقعی دفتر DNH را اینجا وارد کنید"
        googleMapsUrl="https://maps.google.com/?q=YOUR_LOCATION"
       />
      <ContactForm />
    </div>
  );
};

export default page;
