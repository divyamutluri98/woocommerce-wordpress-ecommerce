import { Metadata } from 'next';
import Image from 'next/image';
import { Award, Users, Truck, Shield, Heart, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company and mission',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We are dedicated to providing the best shopping experience with quality products and exceptional service.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2020, we started with a simple vision: to create an online marketplace that offers premium products at affordable prices.
              </p>
              <p className="text-muted-foreground mb-4">
                Our team is passionate about e-commerce and committed to delivering exceptional value to our customers. We carefully curate our product selection to ensure quality and satisfaction.
              </p>
              <p className="text-muted-foreground">
                Today, we serve thousands of happy customers and continue to grow, guided by our core values of quality, integrity, and customer-first service.
              </p>
            </div>
            <div className="relative h-96">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Our team"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Award, title: 'Quality Products', desc: 'Carefully selected items' },
              { icon: Truck, title: 'Fast Shipping', desc: 'Quick delivery' },
              { icon: Shield, title: 'Secure Payment', desc: '100% safe checkout' },
              { icon: Heart, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: Users, title: '24/7 Support', desc: 'Always here to help' },
              { icon: Zap, title: 'Best Prices', desc: 'Competitive rates' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-background rounded-lg">
                <item.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Meet the passionate people behind our success.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
              { name: 'Michael Chen', role: 'CTO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
              { name: 'Emily Davis', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300' },
              { name: 'James Wilson', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300' },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="opacity-90 mb-8 max-w-2xl mx-auto">
            We are always looking for talented individuals to join our growing team.
          </p>
          <a href="/contact" className="inline-block bg-background text-foreground px-8 py-3 rounded-lg font-medium hover:bg-background/90">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
