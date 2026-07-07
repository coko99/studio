export default function About() {
  return (
    <section id="o-nama" className="py-24 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="tag mb-6">O nama</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-montserrat)] gold-text gold-glow mb-8">
          Studio je mesto gde dan počinje kafom, a veče završava dobrim
          provodom.
        </h2>
        <div className="divider-gold w-24 mx-auto mb-8" />
        <p className="text-muted text-base sm:text-lg leading-relaxed mb-6">
          Caffe Bar Studio je moderno mesto u Kruševcu za sve koji vole dobru
          atmosferu, kvalitetno piće i večernji izlazak. Tokom dana idealan je
          za kafu i opušteno druženje, dok uveče postaje mesto za koktele,
          muziku uživo, DJ žurke i provod.
        </p>
        <p className="text-muted text-base sm:text-lg leading-relaxed">
          U Studiju se organizuju nastupi, live svirke i tematske večeri, zbog
          čega je lokal prepoznat kao jedno od mesta gde se vikend provodi uz
          dobru energiju.
        </p>
      </div>
    </section>
  );
}
