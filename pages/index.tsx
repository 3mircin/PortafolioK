import Head from "next/head";

export default function Home() {
  const stack = [
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  ];

  const iotRoadmap = [
    { name: "MQTT", status: "Planificado" },
    { name: "ESP32", status: "Planificado" },
    { name: "MicroPython", status: "Planificado" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans p-8 md:p-20">
      <Head>
        <title>Cristian Emir Luján de la Rosa</title>
      </Head>

      <main className="max-w-3xl mx-auto space-y-16">
        {/* Header/Hero */}
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Cristian Emir Luján de la Rosa</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Backend & Systems Developer. Passionate about Linux and problem-solving, currently expanding into IoT.
          </p>
        </header>

        {/* Stack */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stack.map((item) => (
              <div key={item.name} className="flex items-center gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 transition-colors">
                <img src={item.icon} alt={item.name} className="w-8 h-8" />
                <p className="font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* IoT Roadmap */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">IoT Roadmap (Next 6 Months)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {iotRoadmap.map((item) => (
              <div key={item.name} className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-zinc-500">{item.status}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
          <div className="space-y-4">
            <a href="https://github.com/3mircin/Hackathon-ISAC-2026" target="_blank" className="block p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <h3 className="font-bold">Hackathon ISAC 2026</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Technical relevance & Problem solving.</p>
            </a>
            <a href="https://github.com/3mircin/HacktoberFest_MLH" target="_blank" className="block p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <h3 className="font-bold">HacktoberFest MLH</h3>
              <p className="text-zinc-600 dark:text-zinc-400">3rd Place Achievement.</p>
            </a>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Let's Work Together</h2>
          <p className="text-lg">
            Contact me at: <a href="mailto:emirlujan3@gmail.com" className="underline font-medium">emirlujan3@gmail.com</a>
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://www.linkedin.com/in/cristian-emir-lujan-de-la-rosa-281a37365/" className="text-zinc-500 hover:text-black dark:hover:text-white">LinkedIn</a>
            <a href="https://github.com/3mircin" className="text-zinc-500 hover:text-black dark:hover:text-white">GitHub</a>
            <a href="https://www.instagram.com/emirjj.c/" className="text-zinc-500 hover:text-black dark:hover:text-white">Instagram</a>
          </div>
        </section>
      </main>
    </div>
  );
}
