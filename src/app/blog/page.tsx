import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest news, tips, and insights from our team',
};

const posts = [
  {
    id: 1,
    title: '10 Tips for Online Shopping Safety',
    excerpt: 'Protect yourself from scams and fraud with these essential security tips for safe online shopping.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Security',
  },
  {
    id: 2,
    title: 'The Future of E-commerce: Trends to Watch',
    excerpt: 'From AI-powered recommendations to sustainable practices, discover the trends shaping online retail.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    author: 'Michael Chen',
    date: '2024-01-12',
    category: 'Industry',
  },
  {
    id: 3,
    title: 'How to Choose the Right Product',
    excerpt: 'A comprehensive guide to evaluating product quality, reviews, and value for money.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
    author: 'Emily Davis',
    date: '2024-01-10',
    category: 'Guides',
  },
  {
    id: 4,
    title: 'Sustainable Shopping: A Greener Future',
    excerpt: 'Learn how to make eco-conscious choices while shopping online and reducing your carbon footprint.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
    author: 'James Wilson',
    date: '2024-01-08',
    category: 'Sustainability',
  },
  {
    id: 5,
    title: 'Understanding Return Policies',
    excerpt: 'Everything you need to know about our hassle-free return process and your consumer rights.',
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
    author: 'Sarah Johnson',
    date: '2024-01-05',
    category: 'Policy',
  },
  {
    id: 6,
    title: 'Mobile Shopping: Tips for Small Screens',
    excerpt: 'Maximize your mobile shopping experience with these handy tips and app recommendations.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    author: 'Michael Chen',
    date: '2024-01-03',
    category: 'Tips',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            News, tips, and insights from our team
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center text-primary font-medium">
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get the latest updates, tips, and exclusive offers delivered to your inbox.
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
              required
            />
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
