import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Header } from "@/components/layout/header";

export default function AttorneyPage() {
  return (
    <div>
      <Header show={true} background='white' isFixed={false} />
      <div className='bg-light-bg-secondary pt-20 min-h-screen'>
        {/* Hero Section with Background Image and Profile */}
        <section className='bg-white'>
          <div className='max-w-7xl mx-auto px-6'>
            {/* Background Image */}
            <div className='relative h-[280px] w-full'>
              <Image
                src='/anotony.png'
                alt='Attorney background'
                fill
                className='object-cover'
              />
            </div>

            {/* Profile Section - Overlapping */}
            <div className='relative -mt-24 ml-10 pb-12'>
              <div className='flex flex-col md:flex-row md:items-end gap-8'>
                {/* Profile Image */}
                <div className='flex-shrink-0'>
                  <div className='w-44 h-44 rounded-full overflow-hidden border-4 border-white bg-white shadow-lg'>
                    <Image
                      src='/user.png'
                      alt='Chauntelle'
                      width={176}
                      height={176}
                      className='object-cover w-full h-full'
                    />
                  </div>
                </div>

                {/* Name and Contact Info */}
                <div className='flex-grow pb-4'>
                  <h1 className='font-serif text-4xl mb-8 text-text-dark'>
                    Chauntelle
                  </h1>

                  {/* Contact Info Row */}
                  <div className='flex flex-wrap gap-x-12 gap-y-4'>
                    {/* Email */}
                    <div className='flex items-start gap-3'>
                      <Mail className='w-5 h-5 text-secondary-gold flex-shrink-0 mt-0.5' />
                      <div>
                        <p className='text-xs text-text-medium mb-1'>Email</p>
                        <p className='text-sm font-medium text-text-dark'>
                          info@cwwhitelaw.com
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className='flex items-start gap-3'>
                      <Phone className='w-5 h-5 text-secondary-gold flex-shrink-0 mt-0.5' />
                      <div>
                        <p className='text-xs text-text-medium mb-1'>Phone</p>
                        <p className='text-sm font-medium text-text-dark'>
                          713-236-7700
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className='flex items-start gap-3'>
                      <MapPin className='w-5 h-5 text-secondary-gold flex-shrink-0 mt-0.5' />
                      <div>
                        <p className='text-xs text-text-medium mb-1'>
                          Location
                        </p>
                        <p className='text-sm font-medium text-text-dark'>
                          Houston, TX
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Biography Section */}
        <section className='py-16 bg-white'>
          <div className='max-w-6xl mx-auto px-6'>
            <h2 className='font-serif text-3xl mb-6 text-text-dark'>
              Biography
            </h2>
            <p className='text-base leading-relaxed text-text-medium max-w-5xl'>
              I'm a seasoned trial lawyer with deep experience in federal
              criminal defense and sensitive investigations. A former Assistant
              U.S. Attorney, she leverages insider knowledge of government
              prosecutions to defend clients facing grand jury investigations,
              indictments, and high-stakes trials. Known for her meticulous
              preparation and strategic advocacy, Chauntelle is a trusted
              advisor in complex and high-profile cases.
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section className='py-16 bg-light-bg-secondary'>
          <div className='max-w-6xl mx-auto px-6'>
            <h2 className='font-serif text-3xl mb-6 text-text-dark'>
              Education
            </h2>
            <ul className='space-y-3 text-base text-text-medium'>
              <li className='flex gap-2'>
                <span>•</span>
                <span>
                  J.D., Southern University Law Center - cum laude - Law Review
                  Senior Editor and Moot Court Board Member
                </span>
              </li>
              <li className='flex gap-2'>
                <span>•</span>
                <span>B.S., Cameron University</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Bar Admissions and Professional Memberships */}
        <section className='py-16 bg-white'>
          <div className='max-w-6xl mx-auto px-6'>
            <div className='grid md:grid-cols-2 gap-16'>
              {/* Bar Admissions */}
              <div>
                <h2 className='font-serif text-3xl mb-6 text-text-dark'>
                  Bar Admissions
                </h2>
                <ul className='space-y-3 text-base text-text-medium'>
                  <li className='flex gap-2'>
                    <span>•</span>
                    <span>Texas, Louisiana, and Illinois.</span>
                  </li>
                  <li className='flex gap-2'>
                    <span>•</span>
                    <span>
                      U.S. District Courts for the Northern, Western, and
                      Southern Districts of Texas
                    </span>
                  </li>
                  <li className='flex gap-2'>
                    <span>•</span>
                    <span>
                      U.S. District Courts for the Eastern, Middle, and Western
                      Districts of Louisiana
                    </span>
                  </li>
                </ul>
              </div>

              {/* Professional Memberships */}
              <div>
                <h2 className='font-serif text-3xl mb-6 text-text-dark'>
                  Professional Memberships
                </h2>
                <ul className='space-y-3 text-base text-text-medium'>
                  <li className='flex gap-2'>
                    <span>•</span>
                    <span>Federal Bar Association</span>
                  </li>
                  <li className='flex gap-2'>
                    <span>•</span>
                    <span>Houston Bar Association</span>
                  </li>
                  <li className='flex gap-2'>
                    <span>•</span>
                    <span>Houston Young Lawyers Association</span>
                  </li>
                  <li className='flex gap-2'>
                    <span>•</span>
                    <span>National Bar Association</span>
                  </li>
                  <li className='flex gap-2'>
                    <span>•</span>
                    <span>Texas Bar Foundation, Lifetime Fellow</span>
                  </li>
                  <li className='flex gap-2'>
                    <span>•</span>
                    <span>Innocence Project of Texas, Board Member</span>
                  </li>
                  <li className='flex gap-2'>
                    <span>•</span>
                    <span>University of Houston, Adjunct Professor</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
