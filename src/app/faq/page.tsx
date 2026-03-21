import { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions',
};

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How can I track my order?',
        a: 'Once your order is shipped, you will receive an email with a tracking number. You can also track your order by logging into your account and visiting the Orders section.',
      },
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping typically takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee. International shipping takes 7-14 business days.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to over 100 countries worldwide. Shipping rates and delivery times vary by location.',
      },
      {
        q: 'What if my order arrives damaged?',
        a: 'Please contact our support team immediately with photos of the damaged items and packaging. We will arrange for a replacement or refund.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some items like intimates and personalized products are final sale.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Log into your account, go to Orders, select the order you wish to return, and click "Return Item". Follow the prompts to print your return label.',
      },
      {
        q: 'When will I receive my refund?',
        a: 'Refunds are processed within 3-5 business days after we receive your return. The refund will be credited to your original payment method.',
      },
      {
        q: 'Can I exchange an item?',
        a: 'Yes, you can exchange items for a different size or color. Start a return and select "Exchange" as your preference.',
      },
    ],
  },
  {
    category: 'Payments & Pricing',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Visa, MasterCard, American Express, Discover, PayPal, Apple Pay, and Google Pay.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes, all payments are processed through PCI-compliant payment processors. We never store your full credit card details.',
      },
      {
        q: 'Do you offer gift cards?',
        a: 'Yes! Gift cards are available in denominations from $25 to $500. They never expire and can be used for any purchase.',
      },
      {
        q: 'Can I use multiple coupon codes?',
        a: 'Only one coupon code can be used per order. Sale items may not be combined with other discounts.',
      },
    ],
  },
  {
    category: 'Account & Privacy',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click "Sign Up" at the top of the page and enter your email and password. You can also sign up with Google or Facebook.',
      },
      {
        q: 'How do I reset my password?',
        a: 'Click "Forgot Password" on the login page and enter your email. You will receive a link to reset your password.',
      },
      {
        q: 'How do I delete my account?',
        a: 'Contact our support team to request account deletion. We will process your request within 30 days.',
      },
      {
        q: 'How is my data protected?',
        a: 'We use industry-standard encryption and security measures to protect your personal information. Review our Privacy Policy for details.',
      },
    ],
  },
  {
    category: 'Products & Inventory',
    questions: [
      {
        q: 'How do I know if an item is in stock?',
        a: 'Product pages show current stock status. If an item is out of stock, you can click "Notify Me" to receive an email when it is back.',
      },
      {
        q: 'Can I see products before they are released?',
        a: 'Yes, pre-orders are available for upcoming products. Pre-order items ship on the release date.',
      },
      {
        q: 'Do you offer product customization?',
        a: 'Some products offer customization options like engraving or monogramming. Check the product page for available options.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FAQ</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Find answers to the most common questions
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => (
                  <details key={questionIndex} className="group">
                    <summary className="flex items-center justify-between p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80">
                      <span className="font-medium">{item.q}</span>
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="p-4 text-muted-foreground">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <a href="/contact" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90">
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
