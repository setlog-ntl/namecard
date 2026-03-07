import { siteConfig } from '@/lib/config';
import { FlippableCard } from '@/components/flippable-card';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main id="main" className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--surface-sunken)] dark:bg-gray-950">
      <div className="w-full max-w-sm mx-auto">
        <FlippableCard config={siteConfig} />
        <Footer />
      </div>
    </main>
  );
}