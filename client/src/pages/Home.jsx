import { Section } from '../components'

const Home = () => {
  return (
    <Section title="Beranda" className="z-0 min-h-[calc(100vh-100px)] bg-slate-100">
      <div className="container mx-auto mt-10 grid grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div className="rounded-lg bg-white px-6 py-3 shadow-card" key={i}>
            <h1 className="text-xl font-semibold">Matematika Diskrit</h1>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Home
