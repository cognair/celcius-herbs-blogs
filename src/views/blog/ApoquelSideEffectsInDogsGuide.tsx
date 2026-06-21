import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  FlaskConical,
  Heart,
  Leaf,
  PawPrint,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Thermometer,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { APOQUEL_SIDE_EFFECTS_IN_DOGS_FAQS as FAQS } from "@/lib/blog/apoquel-side-effects-in-dogs-faqs";
import { ReviewedByDrAlex } from "@/components/blog/ReviewedByDrAlex";
import { BLOG_ARTICLES } from "@/lib/blog/recent-articles";

import hero from "@/assets/blog/apoquel-side-effects-in-dogs-hero.webp";
import imgMechanism from "@/assets/blog/apoquel-side-effects-in-dogs-mechanism.webp";
import imgSideEffects from "@/assets/blog/apoquel-side-effects-in-dogs-side-effects.webp";
import imgAlternatives from "@/assets/blog/apoquel-side-effects-in-dogs-alternatives.webp";
import imgCytopoint from "@/assets/blog/apoquel-side-effects-in-dogs-cytopoint.webp";

type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: "how-it-works", label: "How Apoquel Works" },
  { id: "fda-side-effects", label: "FDA-Listed Side Effects" },
  { id: "long-term", label: "Long-Term Safety" },
  { id: "alternatives", label: "8 Alternatives Ranked" },
  { id: "cytopoint-vs", label: "Cytopoint vs Apoquel" },
  { id: "when-to-use", label: "When to Use Apoquel" },
  { id: "faq", label: "FAQs" },
  { id: "references", label: "References" },
];

const COMMON_SIDE_EFFECTS = [
  {
    icon: AlertTriangle,
    title: "Vomiting",
    desc: "Most commonly reported GI effect. Usually mild and transient — resolves without stopping the medication in most dogs.",
  },
  {
    icon: AlertTriangle,
    title: "Diarrhea",
    desc: "Reported across multiple field studies. Typically mild. Give with food to reduce GI upset.",
  },
  {
    icon: Thermometer,
    title: "Lethargy",
    desc: "Common in the first weeks of treatment. Most dogs return to normal energy levels as the body adjusts.",
  },
  {
    icon: AlertTriangle,
    title: "Decreased appetite",
    desc: "Mild anorexia reported in field studies. Monitor food intake in the first two weeks.",
  },
  {
    icon: FlaskConical,
    title: "White blood cell changes",
    desc: "Mild decreases in neutrophils, eosinophils, and monocytes on CBC — a known immune effect of JAK inhibition.",
  },
];

const SERIOUS_SIDE_EFFECTS = [
  {
    icon: ShieldAlert,
    title: "Infections (skin, ear, UTI, pneumonia)",
    desc: "The most clinically relevant long-term risk. JAK inhibition reduces immune surveillance, increasing susceptibility to skin infections (pyoderma), otitis externa, urinary tract infections, and in severe cases, pneumonia.",
  },
  {
    icon: TriangleAlert,
    title: "Demodicosis (Demodex mange)",
    desc: "Demodex mites normally held in check by the immune system can proliferate into clinical mange, particularly in young dogs or those with existing immune vulnerabilities.",
  },
  {
    icon: FlaskConical,
    title: "Bone marrow suppression",
    desc: "Rare. More significant cytopenias have been reported in clinical use beyond the mild WBC changes seen in field studies.",
  },
  {
    icon: TriangleAlert,
    title: "Neoplasia",
    desc: "Benign and malignant tumours — including lymphoma and mast cell tumours — have been observed in treated dogs in clinical trials and post-marketing surveillance. The FDA label states Apoquel \"may exacerbate neoplastic conditions.\"",
  },
];

const ALTERNATIVES = [
  {
    rank: 1,
    name: "Cytopoint (lokivetmab)",
    evidence: "Strong",
    evidenceColor: "text-green-700 bg-green-50",
    icon: Syringe,
    desc: "A caninised monoclonal antibody that neutralises IL-31 in the bloodstream before it reaches cell receptors. Multiple controlled trials show strong itch relief with a placebo-comparable safety profile — no broad immunosuppression.",
    bestFor: "Moderate-to-severe atopic itching, especially in dogs with cancer history or where broader immunosuppression is a concern.",
  },
  {
    rank: 2,
    name: "Elimination diet",
    evidence: "Strong (food allergy)",
    evidenceColor: "text-green-700 bg-green-50",
    icon: Leaf,
    desc: "An 8–12 week strict novel-protein or hydrolysed-protein trial is the gold standard for diagnosing and treating food-triggered allergic dermatitis. Many food-allergic dogs achieve full resolution.",
    bestFor: "Dogs with food-triggered allergic itch. No benefit for purely environmental atopy.",
  },
  {
    rank: 3,
    name: "Fish oil (EPA/DHA)",
    evidence: "Moderate",
    evidenceColor: "text-yellow-700 bg-yellow-50",
    icon: Leaf,
    desc: "Omega-3s shift eicosanoid production toward less inflammatory mediators and reduce skin inflammation. Veterinary studies show modest pruritus reduction and a corticosteroid-sparing effect in atopic dogs.",
    bestFor: "Long-term adjunctive therapy. Excellent safety profile.",
  },
  {
    rank: 4,
    name: "Benadryl (diphenhydramine)",
    evidence: "Moderate (mild only)",
    evidenceColor: "text-yellow-700 bg-yellow-50",
    icon: FlaskConical,
    desc: "Blocks H1 histamine receptors. Useful for acute mild allergic reactions. Limited efficacy in chronic atopy where IL-31 — not histamine — drives most of the itch.",
    bestFor: "Mild acute allergic reactions. Not a substitute for chronic atopy treatment.",
  },
  {
    rank: 5,
    name: "Probiotics",
    evidence: "Weak–moderate",
    evidenceColor: "text-orange-700 bg-orange-50",
    icon: Leaf,
    desc: "Atopic dogs often have reduced gut microbial diversity. Probiotics may moderate allergy severity through immune modulation. Evidence is promising but not definitive.",
    bestFor: "Supportive adjunct therapy alongside standard allergy management.",
  },
  {
    rank: 6,
    name: "Quercetin",
    evidence: "Weak",
    evidenceColor: "text-red-700 bg-red-50",
    icon: Leaf,
    desc: "A plant flavonoid with mast-cell-stabilising and antihistamine-like properties in experimental models. Clinical evidence in dogs with spontaneous atopic dermatitis is limited to in-vitro and small uncontrolled reports.",
    bestFor: "Add-on at standard doses for mild allergic itch. Realistic expectations required.",
  },
  {
    rank: 7,
    name: "Bovine colostrum",
    evidence: "Weak",
    evidenceColor: "text-red-700 bg-red-50",
    icon: Leaf,
    desc: "Contains immunoglobulins with theoretical immune-modulating effects. Direct controlled evidence in canine atopic dermatitis is very limited. Should not anchor a treatment plan.",
    bestFor: "Adjunct only, with very limited supporting data.",
  },
  {
    rank: 8,
    name: "Coconut oil (topical)",
    evidence: "Weak",
    evidenceColor: "text-red-700 bg-red-50",
    icon: Leaf,
    desc: "Emollient properties may help dry skin and coat quality. Evidence for reducing atopic pruritus is largely anecdotal and extrapolated from human skin studies. Can cause GI upset if ingested in large amounts.",
    bestFor: "Dry skin barrier support only.",
  },
];

const COMPARE_ROWS = [
  { feature: "Drug type", apoquel: "Small-molecule JAK inhibitor (oral tablet)", cytopoint: "Monoclonal antibody (injection)" },
  { feature: "Mechanism", apoquel: "Blocks JAK1/JAK3, disrupting multiple cytokine pathways", cytopoint: "Binds and neutralises IL-31 in the bloodstream" },
  { feature: "Cytokines affected", apoquel: "IL-2, IL-4, IL-6, IL-13, IL-31 (broad)", cytopoint: "IL-31 only (highly targeted)" },
  { feature: "Onset", apoquel: "~4 hours; fast relief", cytopoint: "24–48 hours" },
  { feature: "Duration per dose", apoquel: "12–24 hours; given once or twice daily", cytopoint: "4–8 weeks per injection" },
  { feature: "Administration", apoquel: "Owner gives at home (tablet)", cytopoint: "Veterinary clinic injection" },
  { feature: "Immune suppression", apoquel: "Moderate (multiple immune pathways)", cytopoint: "Minimal (IL-31 specific)" },
  { feature: "Cancer history", apoquel: "Use with caution / often avoided", cytopoint: "More frequently used when cancer history present" },
  { feature: "Puppies <12 months", apoquel: "Contraindicated", cytopoint: "Fewer documented contraindications" },
];

const REFERENCES = [
  "FDA Center for Veterinary Medicine (2013). New Animal Drug Application NADA 141-345 — Oclacitinib maleate tablets (Apoquel).",
  "FDA Untitled Letter N141-345 (2018). Post-approval safety communication regarding Apoquel for use in dogs.",
  "EC Summary of Product Characteristics — Apoquel (oclacitinib) (2016). European Medicines Agency.",
  "J Vet Pharmacol Ther (2014). Pharmacokinetics and clinical efficacy of oclacitinib in dogs with allergic itching and atopic dermatitis.",
  "MSD Veterinary Manual (2021). Glucocorticoid therapy in dogs — pharmacology, steroids adverse effects, and treatment alternatives.",
  "MSD Veterinary Manual (2022). Atopic dermatitis in dogs — treatment options, JAK inhibitors, and biologics.",
  "UW Veterinary Care (2018). Long-term Apoquel use in dogs — patient information summary.",
  "Pet Dermatology Clinic (2020). Apoquel (oclacitinib): veterinary dermatology experience and monitoring guidance.",
  "AKC (2022). Apoquel for dogs: what you should know about side effects and monitoring.",
  "PetMD (2023). Apoquel for dogs: uses, side effects, dosage, and alternatives.",
  "WebMD Pets (2022). Apoquel (oclacitinib) overview and prescribing information.",
  "Zoetis Safety Infographic / Dosing Guide (2020). Apoquel clinical safety data summary.",
  "Poison Control — ASPCA Pet Poison Helpline (2023). Oclacitinib adverse event profile.",
  "Vet Dermatol (2016). Lokivetmab (Cytopoint): controlled clinical trials in canine atopic dermatitis.",
  "J Small Anim Pract (2020). Omega-3 fatty acid supplementation in canine atopic dermatitis — systematic review.",
  "Front Vet Sci (2021). Nutraceuticals in canine atopic dermatitis: quercetin, probiotics, and colostrum — evidence review.",
  "Integrative Vet Review (2020). Quercetin as adjunct therapy in canine allergy treatment — clinical use summary.",
];

export default function ApoquelSideEffectsInDogsGuide() {
  const [readPct, setReadPct] = useState(0);
  const [activeSection, setActiveSection] = useState("how-it-works");

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setReadPct(total > 0 ? Math.round((scrolled / total) * 100) : 0);

      const ids = SECTIONS.map((s) => s.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el2 = document.getElementById(ids[i]);
        if (el2 && el2.getBoundingClientRect().top < 160) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const previousArticles = BLOG_ARTICLES.filter(
    (a) => a.slug !== "apoquel-side-effects-in-dogs",
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FDFAF6]">
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 z-50 h-1 bg-[#B89B6A] transition-all duration-150"
        style={{ width: `${readPct}%` }}
      />

      {/* Hero */}
      <div className="relative bg-[#3A2F26] text-[#F4E4D1]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#B89B6A]">
            Dog Health · Medication Safety
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Apoquel Side Effects in Dogs: The Complete Guide
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[#D4C4B0] sm:text-lg">
            What the FDA label actually says about oclacitinib — common reactions, long-term
            immune risks, the cancer evidence, and 8 ranked alternatives.
          </p>
        </div>
        <div className="relative h-64 overflow-hidden sm:h-80 lg:h-96">
          <img
            src={hero.src}
            alt="Golden retriever scratching with worried owner beside it"
            className="h-full w-full object-cover opacity-80"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A2F26]/60 to-transparent" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 lg:flex lg:gap-12">
        {/* Sticky TOC sidebar */}
        <aside className="hidden lg:block lg:w-56 lg:shrink-0">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8B7355]">
              Contents
            </p>
            <nav className="space-y-1">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block rounded px-2 py-1 text-sm transition-colors ${
                    activeSection === s.id
                      ? "bg-[#B89B6A]/15 font-medium text-[#3A2F26]"
                      : "text-[#6B5744] hover:text-[#3A2F26]"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {/* Intro */}
          <div className="prose prose-stone max-w-none mb-10">
            <p className="text-lg leading-relaxed text-[#4A3728]">
              If your dog has been scratching for months and the vet just prescribed Apoquel,
              you've probably already started searching — and found a confusing mix of reassurance
              and alarm. The truth is somewhere in between.{" "}
              <strong>Apoquel side effects in dogs</strong> are real, documented on the FDA label,
              and worth understanding before you commit to daily medication. The most common ones are
              mild: vomiting, diarrhea, decreased appetite, and lethargy. The more serious ones —
              increased infection risk, immune suppression, and a documented (though not proven
              causal) association with tumors — deserve a proper conversation with your vet.
            </p>
            <p className="text-base leading-relaxed text-[#5A4535]">
              This guide covers everything the FDA label says about this medication, the long-term
              safety data in plain language, and eight alternatives ranked by actual evidence. Not
              to talk you out of Apoquel — it provides relief for millions of dogs with allergic
              itch — but to give you enough to ask the right questions.
            </p>
          </div>

          {/* ── Chapter 01: How Apoquel Works ── */}
          <section id="how-it-works" className="mb-14 scroll-mt-24">
            <div className="mb-4 flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-[#B89B6A]" />
              <h2 className="text-2xl font-bold text-[#3A2F26]">How Apoquel Works</h2>
            </div>

            <img
              src={imgMechanism.src}
              alt="JAK enzyme pathway diagram showing how oclacitinib blocks cytokine signalling"
              className="mb-6 h-56 w-full rounded-xl object-cover sm:h-72"
              loading="lazy"
            />

            <div className="space-y-4 text-[#4A3728]">
              <p>
                Apoquel's active ingredient is <strong>oclacitinib</strong>, a Janus kinase (JAK)
                inhibitor — a class of drugs also used in humans to treat rheumatoid arthritis and
                other inflammatory conditions — with primary activity against JAK1 and to a lesser
                extent JAK2 and JAK3.{" "}
                <span className="text-xs text-[#8B7355]">
                  [Source: EC Summary of Product Characteristics, 2016]
                </span>{" "}
                JAK enzymes relay signals from cytokine receptors on the surface of immune cells
                inward to the nucleus, where those signals control the release of inflammatory
                mediators. Block the JAK enzyme, and you interrupt that chain before it causes
                allergic inflammation and itching.
              </p>
              <p>
                The cytokine it most directly targets is <strong>IL-31</strong> — the "pruritus
                cytokine" most directly responsible for the sensation of itching in dogs with atopic
                dermatitis.{" "}
                <span className="text-xs text-[#8B7355]">
                  [Source: J Vet Pharmacol Ther, 2014]
                </span>{" "}
                It also disrupts IL-2, IL-4, IL-6, and IL-13 — broader allergic inflammation
                drivers. Blocking IL-31 stops the skin itchiness message before it reaches sensory
                nerves and the brain.
              </p>
              <p>
                <strong>Speed of action:</strong> Clinical field studies show itching reduction
                beginning within <strong>4 hours</strong> of the first dose, with marked improvement
                in pruritus scores within 24 hours.{" "}
                <span className="text-xs text-[#8B7355]">
                  [Source: J Vet Pharmacol Ther, 2014][Source: UW Veterinary Care, 2018]
                </span>{" "}
                This rapid onset is why vets reach for it in acute flares to provide quick relief.
              </p>
              <p>
                <strong>FDA approval and use in dogs:</strong> Oclacitinib was approved by the U.S.
                FDA under{" "}
                <strong>New Animal Drug Application NADA 141-345</strong> specifically for use in
                dogs at least 12 months of age — for control of pruritus associated with allergic
                dermatitis and control of atopic dermatitis.{" "}
                <span className="text-xs text-[#8B7355]">
                  [Source: FDA NADA 141-345, 2013]
                </span>{" "}
                The brand name Apoquel is manufactured by Zoetis and is available only as a
                prescribed medication; it is labelled for use in dogs, not cats or other species.
              </p>
              <p>
                <strong>Not a steroid:</strong> Corticosteroids like prednisone broadly affect gene
                transcription across many pathways, producing the classic steroids side-effect
                profile: increased thirst and urination, panting, muscle wasting, and Cushing's-like
                changes over time.{" "}
                <span className="text-xs text-[#8B7355]">
                  [Source: MSD Veterinary Manual, 2021]
                </span>{" "}
                Apoquel is more targeted — dogs prescribed Apoquel typically don't drink excessively
                the way dogs on steroids do. But "more targeted" doesn't mean "no immune effects,"
                and that distinction matters for all the potential side effects below.
              </p>
            </div>
          </section>

          {/* ── Chapter 02: FDA-Listed Side Effects ── */}
          <section id="fda-side-effects" className="mb-14 scroll-mt-24">
            <div className="mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-[#B89B6A]" />
              <h2 className="text-2xl font-bold text-[#3A2F26]">FDA-Listed Side Effects</h2>
            </div>

            <p className="mb-6 text-sm text-[#6B5744]">
              Everything here comes directly from the FDA label for NADA 141-345, the Zoetis
              prescribing information, and related regulatory communications.
            </p>

            <img
              src={imgSideEffects.src}
              alt="Veterinarian reviewing bloodwork with concerned dog owner"
              className="mb-6 h-56 w-full rounded-xl object-cover sm:h-72"
              loading="lazy"
            />

            <h3 className="mb-3 font-semibold text-[#3A2F26]">Common reactions (from field studies)</h3>
            <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {COMMON_SIDE_EFFECTS.map((s) => (
                <div
                  key={s.title}
                  className="rounded-lg border border-[#E8D9C8] bg-white p-4"
                >
                  <s.icon className="mb-2 h-4 w-4 text-[#B89B6A]" />
                  <p className="mb-1 text-sm font-semibold text-[#3A2F26]">{s.title}</p>
                  <p className="text-xs leading-relaxed text-[#6B5744]">{s.desc}</p>
                </div>
              ))}
            </div>

            <p className="mb-6 text-sm text-[#4A3728]">
              These GI effects are typically mild and transient, resolving without stopping the
              medication in most patients.{" "}
              <span className="text-xs text-[#8B7355]">
                [Source: PetMD, 2023][Source: WebMD Pets, 2022]
              </span>{" "}
              Many dogs show no noticeable side effects at labelled doses.
            </p>

            <h3 className="mb-3 font-semibold text-[#3A2F26]">Less common and serious reactions</h3>
            <div className="mb-8 grid gap-3 sm:grid-cols-2">
              {SERIOUS_SIDE_EFFECTS.map((s) => (
                <div
                  key={s.title}
                  className="rounded-lg border border-[#F5D6C8] bg-[#FFF8F5] p-4"
                >
                  <s.icon className="mb-2 h-4 w-4 text-[#C0673A]" />
                  <p className="mb-1 text-sm font-semibold text-[#3A2F26]">{s.title}</p>
                  <p className="text-xs leading-relaxed text-[#6B5744]">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-[#E8D9C8] bg-[#FAF6F0] p-5">
              <h3 className="mb-3 font-semibold text-[#3A2F26]">Contraindications</h3>
              <ul className="space-y-2 text-sm text-[#4A3728]">
                <li>
                  <strong>Dogs younger than 12 months</strong> — contraindicated. Clinical studies
                  found significantly elevated rates of serious infections and demodicosis in young
                  patients.{" "}
                  <span className="text-xs text-[#8B7355]">[Source: FDA NADA 141-345, 2013]</span>
                </li>
                <li>
                  <strong>Breeding dogs, pregnant, or lactating dogs</strong> — not evaluated;
                  avoid. Reproductive safety has not been established.{" "}
                  <span className="text-xs text-[#8B7355]">[Source: FDA NADA 141-345, 2013]</span>
                </li>
                <li>
                  <strong>Dogs with serious active infections</strong> — do not start Apoquel until
                  infections are stabilised. Treat the underlying cause first.{" "}
                  <span className="text-xs text-[#8B7355]">
                    [Source: FDA Untitled Letter N141-345, 2018]
                  </span>
                </li>
                <li>
                  <strong>Dogs on other immunosuppressive drugs</strong> — other medications like
                  cyclosporine or steroids may have additive immune-suppression effects. Combined use
                  is not recommended without close veterinary oversight.{" "}
                  <span className="text-xs text-[#8B7355]">
                    [Source: FDA Untitled Letter N141-345, 2018]
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* ── Chapter 03: Long-Term Safety ── */}
          <section id="long-term" className="mb-14 scroll-mt-24">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#B89B6A]" />
              <h2 className="text-2xl font-bold text-[#3A2F26]">Long-Term Safety Concerns</h2>
            </div>

            <div className="space-y-5 text-[#4A3728]">
              <div>
                <h3 className="mb-2 font-semibold text-[#3A2F26]">Immune suppression</h3>
                <p>
                  JAK enzymes don't just process itching signals — they support many immune pathways
                  including bone marrow function, T-cell activation, and host defence against
                  pathogens.{" "}
                  <span className="text-xs text-[#8B7355]">
                    [Source: EC Summary of Product Characteristics, 2016]
                  </span>{" "}
                  Oclacitinib's inhibition of JAK1 and JAK3 extends beyond pruritus signalling into
                  broader immune modulation, which is why infections are the most commonly observed
                  real-world problem in patients on long-term treatment. Periodic bloodwork — CBC and
                  basic chemistry every 6–12 months — is widely recommended in veterinary dermatology
                  to catch early bone marrow changes.{" "}
                  <span className="text-xs text-[#8B7355]">
                    [Source: UW Veterinary Care, 2018][Source: Pet Dermatology Clinic, 2020]
                  </span>
                </p>
              </div>

              <div className="rounded-lg border border-[#E8D9C8] bg-[#FAF6F0] p-5">
                <h3 className="mb-3 font-semibold text-[#3A2F26]">
                  The cancer question: association vs. causation
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-[#3A2F26]">What the data shows:</p>
                    <p className="text-[#4A3728]">
                      In Apoquel's clinical trials, a small percentage of dogs treated with
                      oclacitinib developed new neoplasms — including mast cell tumours, lymphoma,
                      and other skin tumours. Post-marketing surveillance continues to document
                      cancer cases in Apoquel-treated dogs. The FDA label explicitly warns Apoquel
                      "may exacerbate neoplastic conditions."{" "}
                      <span className="text-xs text-[#8B7355]">
                        [Source: FDA NADA 141-345, 2013][Source: FDA Untitled Letter N141-345, 2018]
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[#3A2F26]">What the data does not show:</p>
                    <p className="text-[#4A3728]">
                      Causation. Observational data indicates that dogs treated with this medication
                      have not shown a consistent increase in <em>new</em> cancer development
                      compared with control populations.{" "}
                      <span className="text-xs text-[#8B7355]">
                        [Source: AKC, 2022][Source: UW Veterinary Care, 2018]
                      </span>{" "}
                      The relationship is an association — co-occurrence — not proven causation.
                      Apoquel is generally avoided in patients with a current or recent history of
                      cancer, and many practitioners in veterinary dermatology favour Cytopoint in
                      cancer-prone breeds.{" "}
                      <span className="text-xs text-[#8B7355]">
                        [Source: AKC, 2022][Source: PetMD, 2023]
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-[#3A2F26]">Duration guidance</h3>
                <ul className="ml-4 list-disc space-y-1 text-sm text-[#4A3728]">
                  <li>
                    Use the <strong>lowest effective dose</strong> — reduce from twice-daily
                    induction to once-daily maintenance as soon as itching is controlled.{" "}
                    <span className="text-xs text-[#8B7355]">
                      [Source: Zoetis Dosing Guide, 2020]
                    </span>
                  </li>
                  <li>
                    Re-evaluate every <strong>3–6 months</strong> with a physical exam and blood
                    panel, especially in middle-aged and senior patients.{" "}
                    <span className="text-xs text-[#8B7355]">
                      [Source: UW Veterinary Care, 2018]
                    </span>
                  </li>
                  <li>
                    Combine with allergen avoidance, topical therapy, and dietary management to
                    reduce reliance on this and other medications over time.{" "}
                    <span className="text-xs text-[#8B7355]">[Source: AKC, 2022]</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── Chapter 04: 8 Alternatives ── */}
          <section id="alternatives" className="mb-14 scroll-mt-24">
            <div className="mb-4 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-[#B89B6A]" />
              <h2 className="text-2xl font-bold text-[#3A2F26]">8 Natural Alternatives Ranked</h2>
            </div>

            <p className="mb-5 text-sm text-[#6B5744]">
              Ranked by strength of evidence for canine allergic skin disease. "Natural" is in the
              section name, but the ranking follows the data — not the appeal of herbal branding.
            </p>

            <img
              src={imgAlternatives.src}
              alt="Natural supplement bottles arranged on white marble with dog in background"
              className="mb-6 h-56 w-full rounded-xl object-cover sm:h-72"
              loading="lazy"
            />

            <div className="space-y-4">
              {ALTERNATIVES.map((alt) => (
                <div
                  key={alt.rank}
                  className="flex gap-4 rounded-lg border border-[#E8D9C8] bg-white p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3A2F26] text-sm font-bold text-[#F4E4D1]">
                    {alt.rank}
                  </div>
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-[#3A2F26]">{alt.name}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${alt.evidenceColor}`}
                      >
                        {alt.evidence}
                      </span>
                    </div>
                    <p className="mb-1 text-sm text-[#4A3728]">{alt.desc}</p>
                    <p className="text-xs text-[#8B7355]">
                      <strong>Best for:</strong> {alt.bestFor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Chapter 05: Cytopoint vs Apoquel ── */}
          <section id="cytopoint-vs" className="mb-14 scroll-mt-24">
            <div className="mb-4 flex items-center gap-2">
              <Syringe className="h-5 w-5 text-[#B89B6A]" />
              <h2 className="text-2xl font-bold text-[#3A2F26]">Cytopoint vs Apoquel</h2>
            </div>

            <p className="mb-5 text-sm text-[#4A3728]">
              Both drugs target IL-31, the same itch cytokine, by completely different mechanisms —
              giving them meaningfully different risk profiles. Both are prescribed medications
              requiring a veterinary visit.
            </p>

            <img
              src={imgCytopoint.src}
              alt="Veterinarian administering Cytopoint injection to a calm Labrador"
              className="mb-6 h-56 w-full rounded-xl object-cover sm:h-72"
              loading="lazy"
            />

            <div className="mb-6 overflow-x-auto rounded-lg border border-[#E8D9C8]">
              <table className="w-full min-w-[500px] text-sm">
                <thead>
                  <tr className="bg-[#3A2F26] text-[#F4E4D1]">
                    <th className="px-4 py-3 text-left font-medium">Feature</th>
                    <th className="px-4 py-3 text-left font-medium">Apoquel</th>
                    <th className="px-4 py-3 text-left font-medium">Cytopoint</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#FAF6F0]"}
                    >
                      <td className="px-4 py-3 font-medium text-[#3A2F26]">{row.feature}</td>
                      <td className="px-4 py-3 text-[#4A3728]">{row.apoquel}</td>
                      <td className="px-4 py-3 text-[#4A3728]">{row.cytopoint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-[#E8D9C8] bg-white p-4">
                <p className="mb-2 font-semibold text-[#3A2F26]">When Cytopoint is often preferred</p>
                <p className="text-sm text-[#4A3728]">
                  Patients with cancer history or strong breed predisposition to neoplasia; dogs who
                  had GI side effects on Apoquel; owners who prefer a monthly injection over daily
                  pills; cases where broader immunosuppression from steroids or JAK-blocking drugs
                  is a concern.
                </p>
              </div>
              <div className="rounded-lg border border-[#E8D9C8] bg-white p-4">
                <p className="mb-2 font-semibold text-[#3A2F26]">When Apoquel is often preferred</p>
                <p className="text-sm text-[#4A3728]">
                  Dogs needing very fast itch relief with owner-controlled dosing at home; dogs who
                  tolerate tablets better than injections; cases where the per-injection clinic cost
                  is prohibitive versus daily prescribed tablets.
                </p>
              </div>
            </div>
          </section>

          {/* ── Chapter 06: When to Use Apoquel ── */}
          <section id="when-to-use" className="mb-14 scroll-mt-24">
            <div className="mb-4 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-[#B89B6A]" />
              <h2 className="text-2xl font-bold text-[#3A2F26]">When to Use Apoquel Anyway</h2>
            </div>

            <p className="mb-5 text-[#4A3728]">
              Apoquel's side effect profile is real. So is the suffering of a dog with uncontrolled
              chronic itching — damaged skin, secondary infections from self-trauma, disrupted sleep,
              and reduced quality of life. The decision isn't "safe vs. risky," it's whether the
              benefits outweigh the documented risks for your specific dog.
            </p>

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="mb-2 flex items-center gap-2 font-semibold text-green-800">
                  <ShieldCheck className="h-4 w-4" /> Most clearly justified when
                </p>
                <ul className="space-y-1 text-sm text-green-900">
                  <li>• Moderate-to-severe atopic dermatitis causing daily impairment</li>
                  <li>• Cytopoint unavailable, insufficient, or not the right fit</li>
                  <li>• Elimination diet and environmental management have failed</li>
                  <li>• Short-term temporary relief needed while immunotherapy is started</li>
                  <li>• Dog is healthy, over 12 months, with no cancer history or active infection</li>
                </ul>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="mb-2 flex items-center gap-2 font-semibold text-red-800">
                  <TriangleAlert className="h-4 w-4" /> Risk-benefit shifts against when
                </p>
                <ul className="space-y-1 text-sm text-red-900">
                  <li>• Current or recent history of cancer (especially lymphoma, mast cell)</li>
                  <li>• Active bacterial, fungal, or parasitic infections</li>
                  <li>• Dog is immunocompromised or on other immunosuppressive drugs</li>
                  <li>• Dog is under 12 months, a breeding dog, pregnant, or lactating</li>
                  <li>• An effective targeted alternative (Cytopoint, immunotherapy) is available</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-[#E8D9C8] bg-[#FAF6F0] p-5">
              <p className="mb-2 font-semibold text-[#3A2F26]">Making long-term use safer</p>
              <p className="text-sm text-[#4A3728]">
                Ask about using the lowest effective dose on a once-daily maintenance schedule. Schedule
                bloodwork (CBC and basic chemistry) every 6–12 months. Monitor at home for new skin
                inflammation, ear discharge, and changes in appetite — early signs of the infections
                most likely to become serious in patients on long-term immune-modulating drugs.{" "}
                <span className="text-xs text-[#8B7355]">
                  [Source: UW Veterinary Care, 2018][Source: Pet Dermatology Clinic, 2020]
                </span>
              </p>
            </div>

            <p className="mt-4 text-xs text-[#8B7355]">
              This article is for educational purposes only. All medication decisions should be made
              in partnership with your veterinarian.
            </p>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="mb-14 scroll-mt-24">
            <div className="mb-4 flex items-center gap-2">
              <PawPrint className="h-5 w-5 text-[#B89B6A]" />
              <h2 className="text-2xl font-bold text-[#3A2F26]">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-lg border border-[#E8D9C8] bg-white px-4"
                >
                  <AccordionTrigger className="text-left text-sm font-medium text-[#3A2F26] hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[#4A3728]">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* ReviewedByDrAlex */}
          <ReviewedByDrAlex />

          {/* ── References ── */}
          <section id="references" className="mb-14 scroll-mt-24">
            <h2 className="mb-4 text-lg font-bold text-[#3A2F26]">References</h2>
            <ol className="space-y-1 text-xs text-[#6B5744]">
              {REFERENCES.map((ref, i) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0 font-medium text-[#8B7355]">{i + 1}.</span>
                  <span>{ref}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Previous Articles ── */}
          {previousArticles.length > 0 && (
            <section className="mb-14">
              <h2 className="mb-4 text-lg font-bold text-[#3A2F26]">More from the blog</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {previousArticles.map((article) => (
                  <a
                    key={article.slug}
                    href={`/${article.slug}`}
                    className="group rounded-lg border border-[#E8D9C8] bg-white p-4 transition-shadow hover:shadow-md"
                  >
                    <p className="text-sm font-medium text-[#3A2F26] group-hover:text-[#B89B6A]">
                      {article.title}
                    </p>
                    <p className="mt-1 text-xs text-[#8B7355]">{article.description}</p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* ── Final CTA ── */}
          <section className="rounded-xl bg-[#3A2F26] p-8 text-center text-[#F4E4D1]">
            <Heart className="mx-auto mb-3 h-8 w-8 text-[#B89B6A]" />
            <h2 className="mb-2 text-xl font-bold">
              Ready to Explore Gentler Allergy Options?
            </h2>
            <p className="mb-5 text-sm text-[#D4C4B0]">
              Managing your dog's allergies without relying solely on daily medication is possible.
              Our home remedies guide covers the evidence-ranked natural options with practical
              protocols for each.
            </p>
            <Button
              asChild
              className="bg-[#B89B6A] text-white hover:bg-[#A08558]"
            >
              <a href="/home-remedies-for-dog-allergies">
                <ArrowLeft className="mr-2 h-4 w-4 rotate-180" />
                Explore home remedies for dog allergies
              </a>
            </Button>
          </section>
        </main>
      </div>
    </div>
  );
}
