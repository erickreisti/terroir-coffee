import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CoffeeQuiz from '@/components/CoffeeQuiz';
import Showcase from '@/components/Showcase';
import HistorySection from '@/components/HistorySection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <HistorySection />
        <CoffeeQuiz />
        <Showcase />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
