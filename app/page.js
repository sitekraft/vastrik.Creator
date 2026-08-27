import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import PromoImage from '@/components/PromoImage/PromoImage'
import Stats from '@/components/Stats/Stats'
import Playbook from '@/components/Playbook/Playbook'
import Challenges from '@/components/Challenges/Challenges'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PromoImage />
      <Stats />
      <Playbook />
      <Challenges />
      <Footer />
    </main>
  )
}
