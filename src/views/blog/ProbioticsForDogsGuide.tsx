import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Dna,
  Droplets,
  FlaskConical,
  Leaf,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PROBIOTICS_FOR_DOGS_FAQS as FAQS } from "@/lib/blog/probiotics-for-dogs-faqs";
import { ReviewedByDrAlex } from "@/components/blog/ReviewedByDrAlex";
import { BLOG_ARTICLES } from "@/lib/blog/recent-articles";

import imgHero from "@/assets/blog/probiotics-for-dogs-hero.webp";
import imgMicrobiome from "@/assets/blog/probiotics-for-dogs-microbiome.webp";
import imgStrains from "@/assets/blog/probiotics-for-dogs-strains.webp";
import imgDosage from "@/assets/blog/probiotics-for-dogs-dosage.webp";
import imgForms from "@/assets/blog/probiotics-for-dogs-forms.webp";

type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: "why-dogs-need-probiotics", label: "Why dogs need probiotics" },
  { id: "six-strains", label: "6 research-backed strains" },
  { id: "when-to-give", label: "When to give probiotics" },
  { id: "dosage", label: "Dosage by dog size" },
  { id: "forms", label: "Probiotic forms compared" },
  { id: "prebiotics-storage", label: "Prebiotics & storage" },
  { id: "products", label: "5 products compared" },
  { id: "faq", label: "FAQs" },
  { id: "references", label: "References" },
];

const STRAINS = [
  {
    icon: FlaskConical,
    name: "Lactobacillus acidophilus",
    evidence: "Moderate",
    evidenceColor: "bg-blue-100 text-blue-800",
    body: "Naturally present in healthy canine GI tracts. Produces lactic acid and bacteriocins that inhibit harmful bacteria, supporting healthy digestion and gut-barrier integrity. Multiple studies — often using multi-strain probiotic supplements — report improved stool quality and frequency. Best for general GI maintenance.",
  },
  {
    icon: Dna,
    name: "Lactobacillus rhamnosus",
    evidence: "Weak–Moderate",
    evidenceColor: "bg-amber-100 text-amber-800",
    body: "Extensively studied in humans for diarrhoea and allergy management. In dogs, shows adhesion to canine intestinal mucus, in vitro antimicrobial activity, and survival through the digestive tract. Clinical trials in dogs are limited — evidence is mechanistic plus a smaller body of canine data. Good for allergy-related gut support.",
  },
  {
    icon: ShieldCheck,
    name: "Bifidobacterium animalis (AHC7)",
    evidence: "Moderate–Strong",
    evidenceColor: "bg-green-100 text-green-800",
    body: "One of the best-studied strains for acute diarrhea in dogs. The AHC7 strain was tested in a controlled trial of kennelled dogs and showed reduced incidence and duration of acute diarrhea vs placebo. Produces short chain fatty acids that support healthy gut bacteria populations. Best for high-stress or shelter environments.",
  },
  {
    icon: Stethoscope,
    name: "Enterococcus faecium (SF68)",
    evidence: "Moderate",
    evidenceColor: "bg-blue-100 text-blue-800",
    body: "Naturally abundant in the canine intestine and among the most consistently tested probiotic strains in dog trials. Multiple JAVMA-reviewed studies show improved fecal scores and reduced diarrhea duration. Some formulations also improved antibody responses. The SF68 strain has the most canine trial data — check labels specifically.",
  },
  {
    icon: Leaf,
    name: "Bacillus subtilis / B. coagulans",
    evidence: "Weak–Moderate",
    evidenceColor: "bg-amber-100 text-amber-800",
    body: "Spore-forming bacteria — their major advantage is stability. Spores survive heat, stomach acid, and commercial processing in dog foods that would kill lactic acid bacteria. Germinate in the digestive tract, producing beneficial metabolites. Feeding trials show improved fecal consistency and digestibility. Best for shelf-stable chews and kibble toppers.",
  },
  {
    icon: PawPrint,
    name: "Bifidobacterium longum (BL999)",
    evidence: "Moderate for anxiety",
    evidenceColor: "bg-blue-100 text-blue-800",
    body: "A psychobiotic strain acting via the gut-brain axis. A controlled trial in dogs with anxiety-related behaviour (noise phobia, separation) found reduced anxiety scores and improved owner-reported outcomes vs placebo. Mechanism involves immune health modulation and neuroactive metabolite production. Best for stress-related diarrhea or anxious pets.",
  },
];

const WHEN_TO_USE = [
  {
    icon: Droplets,
    title: "After antibiotics",
    verdict: "Reasonable",
    verdictColor: "text-blue-700 bg-blue-50 border-blue-200",
    body: "Antibiotics disrupt the canine gut microbiome, reducing diversity and allowing opportunistic pathogens to proliferate. Probiotics for dogs help restore a desirable intestinal microbial balance. Some trials show shortened diarrhea duration after antibiotics — overall benefit is measurable but not guaranteed across all dogs or antibiotic courses.",
  },
  {
    icon: AlertTriangle,
    title: "Acute diarrhea & irritable bowels",
    verdict: "Good evidence",
    verdictColor: "text-green-700 bg-green-50 border-green-200",
    body: "Several placebo-controlled studies show improved fecal scores and shorter diarrhea duration in dogs given dog-specific probiotic supplements. Dogs with irritable bowels following dietary changes, travel, or boarding are particularly good candidates. Results often appear within a few days.",
  },
  {
    icon: AlertTriangle,
    title: "Chronic GI / IBD",
    verdict: "Adjunctive only",
    verdictColor: "text-amber-700 bg-amber-50 border-amber-200",
    body: "Effects on microbiota and immune system markers have been documented, but consistent clinical improvement in dogs with more severe inflammatory bowel disease has not been demonstrated. Use under vet guidance as a complement — not a standalone treatment for serious health problems.",
  },
  {
    icon: ShieldCheck,
    title: "Skin & food allergies",
    verdict: "Promising, limited",
    verdictColor: "text-amber-700 bg-amber-50 border-amber-200",
    body: "Dogs with atopic dermatitis consistently show lower gut microbial diversity. Probiotics may reduce allergy severity through immune system modulation — but data are promising rather than definitive. Treat as supportive therapy alongside standard allergy management.",
  },
  {
    icon: PawPrint,
    title: "Anxiety & stress",
    verdict: "Strain-specific",
    verdictColor: "text-blue-700 bg-blue-50 border-blue-200",
    body: "Specific psychobiotic strains — particularly B. longum BL999 — have shown genuine behaviour-related benefits in controlled trials. General-purpose probiotic supplements have weaker evidence for anxiety. If anxiety is the goal, the strain matters more than the CFU count.",
  },
  {
    icon: Stethoscope,
    title: "Recovery & senior dogs",
    verdict: "Biologically plausible",
    verdictColor: "text-blue-700 bg-blue-50 border-blue-200",
    body: "Probiotics for dogs support immune health and microbiome restoration in recovering pets. Elderly dogs given probiotics showed a shift toward a younger-looking microbiota profile and improved immune parameters and appetite. Low risk under vet supervision.",
  },
];

const DOSAGE_ROWS = [
  { size: "Toy / Small", weight: "Up to 10 kg (22 lb)", cfu: "1–2 billion CFU" },
  { size: "Medium", weight: "10–25 kg (22–55 lb)", cfu: "2–5 billion CFU" },
  { size: "Large", weight: "25–45 kg (55–100 lb)", cfu: "5–10 billion CFU" },
  { size: "Giant", weight: "Over 45 kg (100 lb)", cfu: "10+ billion CFU" },
];

const FORMS = [
  {
    name: "Powder",
    bioavailability: "High",
    stability: "Refrigerate",
    palatability: "Moderate",
    bestFor: "Max CFU delivery, digestive health",
    body: "The most flexible format. Mix into wet food to buffer stomach acid and improve survival through the digestive tract. High-quality powders typically have the highest viable CFU counts per dose. Refrigeration required after opening.",
  },
  {
    name: "Enteric capsule",
    bioavailability: "High",
    stability: "Refrigerate",
    palatability: "Low",
    bestFor: "Exact dosing, fussy dogs who take pills",
    body: "Enteric coating protects probiotic organisms through stomach acid and releases in the small intestine. Good bioavailability when the coating is intact. Can be opened and mixed into food, but this removes the protective coating.",
  },
  {
    name: "Soft chew",
    bioavailability: "Moderate",
    stability: "Shelf-stable",
    palatability: "High",
    bestFor: "Daily compliance, treat-motivated pets",
    body: "Most palatable format for dogs. Heat and pressure during manufacturing kills many live bacteria — well-made chews use spore-forming strains (B. subtilis, B. coagulans) or apply live bacteria post-processing. Shelf-stable without refrigeration.",
  },
  {
    name: "Kefir / yogurt",
    bioavailability: "Variable",
    stability: "Short shelf life",
    palatability: "High",
    bestFor: "Whole-food dietary complement",
    body: "Plain, unsweetened, full-fat kefir contains live cultures — multiple Lactobacillus and Bifidobacterium strains plus beneficial yeasts. CFU count is variable and lower than a concentrated supplement. Useful as a whole-food complement; never give flavoured versions or products with artificial sweeteners.",
  },
];

const PRODUCTS = [
  {
    name: "Purina FortiFlora",
    strains: "E. faecium SF68",
    cfu: "100M",
    format: "Powder sachet",
    bestFor: "Acute diarrhea, post-antibiotics",
  },
  {
    name: "Nutramax Proviable-DC",
    strains: "7 strains incl. L. acidophilus, E. faecium",
    cfu: "500M",
    format: "Capsule + paste",
    bestFor: "Broad GI support, easy dosing",
  },
  {
    name: "Zesty Paws Probiotic Bites",
    strains: "B. coagulans, DE111 (B. subtilis)",
    cfu: "1B",
    format: "Soft chew",
    bestFor: "Daily maintenance, treat-motivated pets",
  },
  {
    name: "VetriScience Vetri Probiotic",
    strains: "Multi-strain incl. L. rhamnosus",
    cfu: "3B",
    format: "Soft chew",
    bestFor: "Allergy-prone dogs, immune health",
  },
  {
    name: "Native Pet Probiotic",
    strains: "Multi-strain + prebiotics (pumpkin, chicory)",
    cfu: "2.5B",
    format: "Powder",
    bestFor: "Synbiotic approach, whole-food focus",
  },
];

const PREBIOTIC_FOODS = [
  {
    food: "Plain pumpkin puree",
    why: "Rich in soluble and insoluble fibre. Long-standing vet recommendation to aid digestive health.",
    dose: "1–4 tsp per meal by dog size",
  },
  {
    food: "Chicory root / inulin",
    why: "Concentrated prebiotic fibre that specifically feeds Bifidobacterium species.",
    dose: "Often added to commercial dog foods",
  },
  {
    food: "Cooked sweet potato",
    why: "Soluble fibre substrate plus beta-carotene and B vitamins for immune health.",
    dose: "1–3 tbsp depending on dog size",
  },
  {
    food: "Cooked oats",
    why: "Beta-glucan — a soluble fibre with prebiotic and immune system-modulating properties.",
    dose: "2–4 tbsp for medium dogs",
  },
  {
    food: "Banana (in moderation)",
    why: "Inulin and resistant starch feed healthy gut bacteria in the colon.",
    dose: "1–2 thin slices per day",
  },
  {
    food: "Ground flaxseed",
    why: "Prebiotic fibre plus omega-3s. Grind before feeding for bioavailability.",
    dose: "½–1 tsp for medium dogs",
  },
];

const REFERENCES = [
  "Frontiers in Veterinary Science, 2023. Gut microbiota composition and the role of probiotics in canine health.",
  "Veterinary Medicine and Science, 2017. The gut microbiome of the dog.",
  "JAVMA (Journal of the American Veterinary Medical Association), 2017. Evidence-based use of probiotics in dogs and cats.",
  "Frontiers in Immunology, 2019. Probiotics, immunity, and the canine microbiome.",
  "Microbiota and Probiotics in Canine and Feline Welfare, 2020. Lactobacillus species in dogs: adhesion, survival, and clinical applications.",
  "ISAPP (International Scientific Association for Probiotics and Prebiotics), 2023. Species-specific dysbiosis and probiotic strategies in companion animals.",
  "Cornell University College of Veterinary Medicine, 2024. Probiotics for dogs: what owners need to know.",
  "Gut Probiotics and Health of Dogs and Cats, 2024. Strain-level evidence for canine and feline probiotic use.",
  "Probiotics in Pet Food Review, 2025. Stability, CFU guarantees, and canine clinical trial outcomes.",
  "Influence of Probiotic Administration in Canine Feed, 2024. Bacillus subtilis and lactic acid bacteria in commercial dog diets.",
  "ScienceDirect — Canine-specific probiotic product, 2016. Placebo-controlled trial: fecal scores and diarrhea duration in dogs.",
  "PetMD, 2023. Probiotics for dogs with allergies and skin conditions.",
  "Semanticscholar — Influence of Probiotic Supplementation in Dogs, 2017. Genus-level microbiota shifts following probiotic administration.",
];

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
        {n}
      </span>
      <div className="h-px flex-1 bg-border" />
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
        {title}
      </span>
    </div>
  );
}

function EvidenceBadge({
  grade,
  className = "",
}: {
  grade: string;
  className?: string;
}) {
  const lower = grade.toLowerCase();
  const color = lower.includes("strong")
    ? "bg-green-100 text-green-800"
    : lower.includes("moderate")
    ? "bg-blue-100 text-blue-800"
    : lower.includes("weak") || lower.includes("anecdotal")
    ? "bg-amber-100 text-amber-800"
    : "bg-red-100 text-red-800";
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${color} ${className}`}
    >
      {grade}
    </span>
  );
}

export default function ProbioticsForDogsGuide() {
  const [activeSection, setActiveSection] = useState("why-dogs-need-probiotics");
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s.id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(s.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-primary z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </a>
          <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Field Guide · Canine Health
          </div>
          <div className="text-xs text-muted-foreground hidden sm:block">
            Reviewed by Celsius Herbs vet team
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-ink-deep text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-primary-foreground/70 mb-6">
              <Leaf className="w-3.5 h-3.5" /> Dog Gut Health · Probiotic Science
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              Probiotics for Dogs: What the Research Shows
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-2xl">
              Six strains with actual canine trial data. Dosage by weight. Powder
              vs chew vs kefir — which format survives the gut. And a comparison
              of five products vets actually recommend.
            </p>
            <figure className="rounded-2xl overflow-hidden mb-8">
              <img
                src={imgHero}
                alt="Golden retriever next to amber apothecary jars — probiotics for dogs guide"
                className="w-full object-cover max-h-80"
                loading="eager"
              />
            </figure>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Dna, label: "6 strains rated" },
                { icon: FlaskConical, label: "Evidence per strain" },
                { icon: Clock, label: "Dosage by weight" },
                { icon: BookOpen, label: "5 products compared" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-primary-foreground/10 rounded-full px-3 py-1.5 text-sm text-primary-foreground/80"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">

          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-3">
                Contents
              </p>
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block text-sm py-1 px-3 rounded-lg transition-colors ${
                    activeSection === s.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </aside>

          {/* Article */}
          <article className="min-w-0 space-y-16">

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900 leading-relaxed">
                  <strong>Educational content only — not a substitute for veterinary advice.</strong>{" "}
                  Persistent diarrhea, blood in stool, or rapid deterioration always warrant a vet
                  visit first. For severely immunocompromised dogs or dogs with serious health
                  problems, consult your vet before starting any probiotic supplements.
                </p>
              </div>
            </div>

            {/* Chapter 01 — Why Dogs Need Probiotics */}
            <section id="why-dogs-need-probiotics" className="scroll-mt-24">
              <SectionLabel n="01" title="Why Dogs Need Probiotics" />
              <p className="text-muted-foreground leading-relaxed mb-6">
                The gut microbiome is the community of beneficial microorganisms —
                bacteria, fungi, viruses, and other microbial life — living in the
                gastrointestinal system. A healthy adult dog carries roughly 500 to 1,000
                species in the intestines, dominated by Firmicutes, Bacteroidetes,
                Proteobacteria, Fusobacteria, and Actinobacteria. Together, the good
                bacteria and helpful microbes in this ecosystem underpin digestion, immune
                health, and even mood.{" "}
                <span className="text-xs text-muted-foreground">
                  [Source: Frontiers in Veterinary Science, 2023]
                </span>
              </p>
              <figure className="rounded-2xl overflow-hidden border border-border mb-6">
                <img
                  src={imgMicrobiome}
                  alt="Petri dish with bacterial culture — canine microbiome illustration"
                  className="w-full object-cover max-h-72"
                  loading="lazy"
                />
              </figure>
              <div className="space-y-4 mb-6">
                {[
                  {
                    icon: Droplets,
                    title: "Digestion & nutrients",
                    body: "Healthy gut bacteria ferment dietary fibre into short chain fatty acids like butyrate, which fuel the colon's epithelial cells and support healthy digestion of nutrients from dog foods. They help digest food efficiently and reduce the risk of leaky gut.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Immune system calibration",
                    body: "Around 70–80% of the immune system is housed near the gut. Probiotic supplementation in dogs has been linked to enhanced immune markers, improved SCFA production, and modulation of antibody responses — contributing to better immune health overall.",
                  },
                  {
                    icon: Leaf,
                    title: "Pathogen protection",
                    body: "Good bacteria compete with harmful organisms for adhesion sites in the digestive system and produce natural antimicrobials that lower gut pH, making it harder for pathogens to establish. This is competitive exclusion — one of the most direct mechanisms by which dogs probiotics work.",
                  },
                  {
                    icon: PawPrint,
                    title: "Appetite, growth & behaviour",
                    body: "In younger or recovering dogs, a healthy microbiome aids nutrient uptake and supports normal growth via optimised digestion and gut motility. The gut-brain axis also links gut health to mood — disrupted microbiota is associated with heightened stress reactivity in pets.",
                  },
                ].map(({ icon: Icon, title, body }) => (
                  <div key={title} className="rounded-2xl border border-border p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm">{title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Dogs with diarrhea, food allergies, atopic dermatitis, obesity, immune
                system disorders, or advancing age consistently show reduced gut microbial
                diversity compared with healthy peers.{" "}
                <span className="text-xs">[Source: JAVMA, 2017]</span> Probiotics for
                dogs aim to restore a desirable intestinal microbial balance — not by
                permanently colonising the gut (most strains do not), but by producing
                metabolites that support a healthier native community and improving the
                overall well-being of pets with gut-driven health problems.
              </p>
            </section>

            {/* Chapter 02 — 6 Strains */}
            <section id="six-strains" className="scroll-mt-24">
              <SectionLabel n="02" title="6 Strains That Have Research Behind Them" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Benefits documented for one strain cannot be assumed for another within
                the same species.{" "}
                <span className="text-xs">[Source: JAVMA, 2017]</span> When giving dogs
                probiotics, the specific strain matters as much as the CFU count. Check
                the label — the certificate of analysis should list species{" "}
                <em>and</em> strain designation.
              </p>
              <figure className="rounded-2xl overflow-hidden border border-border mb-6">
                <img
                  src={imgStrains}
                  alt="Six amber apothecary vials labeled with probiotic strain names — illustrative"
                  className="w-full object-cover max-h-64"
                  loading="lazy"
                />
              </figure>
              <div className="space-y-4">
                {STRAINS.map(({ icon: Icon, name, evidence, evidenceColor, body }) => (
                  <div key={name} className="border border-border rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-semibold text-sm italic">{name}</span>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${evidenceColor}`}
                      >
                        {evidence}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Chapter 03 — When to Give */}
            <section id="when-to-give" className="scroll-mt-24">
              <SectionLabel n="03" title="When to Give Your Dog Probiotics" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Evidence strength varies considerably by indication. Here's an honest
                breakdown of when probiotics for dogs are most and least supported by
                published research.
              </p>
              <div className="space-y-4">
                {WHEN_TO_USE.map(({ icon: Icon, title, verdict, verdictColor, body }) => (
                  <div key={title} className="border border-border rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-semibold text-sm">{title}</span>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ${verdictColor}`}
                      >
                        {verdict}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Chapter 04 — Dosage */}
            <section id="dosage" className="scroll-mt-24">
              <SectionLabel n="04" title="Dosage by Dog Size" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                No universally agreed CFU dose exists for dogs. Most recommendations are
                extrapolated from clinical trials and commercial probiotic supplement
                formulations, which typically provide 10⁸ to 10¹⁰ CFU per day.{" "}
                <span className="text-xs">[Source: JAVMA, 2017]</span> Studies showing
                clear benefits — such as the <em>B. animalis</em> AHC7 and{" "}
                <em>E. faecium</em> SF68 trials — generally used doses around 10⁹
                CFU/day or higher.
              </p>
              <figure className="rounded-2xl overflow-hidden border border-border mb-6">
                <img
                  src={imgDosage}
                  alt="Measuring spoon with probiotic powder on linen — dosage guide"
                  className="w-full object-cover max-h-64"
                  loading="lazy"
                />
              </figure>
              <div className="rounded-2xl overflow-hidden border border-border mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border">
                        <th className="text-left p-3 font-semibold">Dog size</th>
                        <th className="text-left p-3 font-semibold">Weight range</th>
                        <th className="text-left p-3 font-semibold">Starting CFU/day</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DOSAGE_ROWS.map((row, i) => (
                        <tr
                          key={row.size}
                          className={`border-b border-border last:border-0 ${
                            i % 2 === 0 ? "bg-muted/20" : ""
                          }`}
                        >
                          <td className="p-3 font-medium">{row.size}</td>
                          <td className="p-3 text-muted-foreground">{row.weight}</td>
                          <td className="p-3 font-medium text-primary">{row.cfu}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  {
                    title: "Start low and titrate up",
                    body: "Some pets experience loose stools or mild gas in the first 3–7 days as the digestive system adjusts. Halve the dose for the first week then build to the full dose. This is an adaptation response, not a sign the probiotic is harmful.",
                  },
                  {
                    title: "CFU guaranteed at expiry, not manufacture",
                    body: "Many probiotic supplements state CFU at time of manufacture; look for labels that guarantee CFU through the expiry date. [Source: Probiotics in Pet Food Review, 2025]",
                  },
                  {
                    title: "Consistency beats dose",
                    body: "Daily supplementation at a moderate dose typically outperforms sporadic high-dose use for digestive health benefits. [Source: JAVMA, 2017]",
                  },
                ].map(({ title, body }) => (
                  <div
                    key={title}
                    className="flex gap-3 bg-muted/30 rounded-2xl p-4"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm leading-relaxed">
                      <strong className="text-foreground">{title}.</strong>{" "}
                      <span className="text-muted-foreground">{body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Chapter 05 — Probiotic Forms */}
            <section id="forms" className="scroll-mt-24">
              <SectionLabel n="05" title="Probiotic Forms Compared" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                The format of probiotic supplements affects how many live organisms
                actually reach the gut in viable form. For dogs probiotics to work well,
                they need to survive stomach acid and reach the intestine alive.
              </p>
              <figure className="rounded-2xl overflow-hidden border border-border mb-6">
                <img
                  src={imgForms}
                  alt="Four probiotic supplement formats — powder jar, capsule, chew, and yogurt on wooden surface"
                  className="w-full object-cover max-h-64"
                  loading="lazy"
                />
              </figure>
              <div className="space-y-4 mb-6">
                {FORMS.map(({ name, bioavailability, stability, palatability, bestFor, body }) => (
                  <div key={name} className="border border-border rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="font-semibold">{name}</span>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground flex-shrink-0">
                        {bestFor}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{body}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-muted/40 rounded-lg p-2 text-center">
                        <div className="font-medium text-foreground mb-0.5">Bioavailability</div>
                        <div className="text-muted-foreground">{bioavailability}</div>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-2 text-center">
                        <div className="font-medium text-foreground mb-0.5">Stability</div>
                        <div className="text-muted-foreground">{stability}</div>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-2 text-center">
                        <div className="font-medium text-foreground mb-0.5">Palatability</div>
                        <div className="text-muted-foreground">{palatability}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Chapter 06 — Prebiotics & Storage */}
            <section id="prebiotics-storage" className="scroll-mt-24">
              <SectionLabel n="06" title="Prebiotic Foods & Storage Guide" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Dogs probiotics work best when the native gut bacteria they support have
                the right food. Prebiotics are non-digestible fibres and compounds that
                selectively feed beneficial gut microbes.{" "}
                <span className="text-xs">[Source: Frontiers in Veterinary Science, 2023]</span>{" "}
                Prebiotics also help maintain the healthy gut bacteria already present —
                particularly important after antibiotics or health problems that have
                disrupted the microbiome. Many human foods that work as prebiotics are
                unsuitable for dogs, so the list below focuses specifically on dog-safe
                options.
              </p>
              <div className="rounded-2xl overflow-hidden border border-border mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border">
                        <th className="text-left p-3 font-semibold">Food</th>
                        <th className="text-left p-3 font-semibold hidden md:table-cell">Why it helps</th>
                        <th className="text-left p-3 font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PREBIOTIC_FOODS.map((row, i) => (
                        <tr
                          key={row.food}
                          className={`border-b border-border last:border-0 ${
                            i % 2 === 0 ? "bg-muted/20" : ""
                          }`}
                        >
                          <td className="p-3 font-medium">{row.food}</td>
                          <td className="p-3 text-muted-foreground hidden md:table-cell">
                            {row.why}
                          </td>
                          <td className="p-3 text-muted-foreground">{row.dose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="font-semibold text-sm mb-3">Storage rules</div>
              <div className="space-y-3">
                {[
                  "Most probiotic supplements containing Lactobacillus and Bifidobacterium species require refrigeration after opening. Heat and moisture kill live bacteria rapidly — even a few days of warm storage can destroy a meaningful percentage of viable organisms.",
                  "Spore-based products (Bacillus strains) can often be stored at room temperature because the spores are highly resistant to heat and moisture. Always check the label.",
                  "Avoid leaving the container open near heat sources, steam, or in humid bathrooms.",
                  "Look for 'guaranteed through expiry date' language on packaging — a product guaranteeing 'X billion CFU at manufacture' may have far fewer viable organisms by purchase time. [Source: Probiotics in Pet Food Review, 2025]",
                  "Live cultures in probiotic supplements degrade faster once the container seal is broken — track the opening date. Once opened, use within 30–90 days for refrigerated products.",
                ].map((rule, i) => (
                  <div key={i} className="flex gap-3 bg-muted/30 rounded-2xl p-4">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Chapter 07 — 5 Products Compared */}
            <section id="products" className="scroll-mt-24">
              <SectionLabel n="07" title="5 Top Products Compared" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                The table below is editorial, not sponsored. Selection criteria: named
                strains with canine data, CFU guaranteed at expiry, third-party CoA
                available, formulated or reviewed by a veterinarian.
              </p>
              <div className="rounded-2xl overflow-hidden border border-border mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border">
                        <th className="text-left p-3 font-semibold">Product</th>
                        <th className="text-left p-3 font-semibold hidden md:table-cell">Strains</th>
                        <th className="text-left p-3 font-semibold">CFU/dose</th>
                        <th className="text-left p-3 font-semibold hidden sm:table-cell">Format</th>
                        <th className="text-left p-3 font-semibold">Best for</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRODUCTS.map((row, i) => (
                        <tr
                          key={row.name}
                          className={`border-b border-border last:border-0 ${
                            i % 2 === 0 ? "bg-muted/20" : ""
                          }`}
                        >
                          <td className="p-3 font-medium">{row.name}</td>
                          <td className="p-3 text-muted-foreground hidden md:table-cell">
                            {row.strains}
                          </td>
                          <td className="p-3 text-muted-foreground">{row.cfu}</td>
                          <td className="p-3 text-muted-foreground hidden sm:table-cell">
                            {row.format}
                          </td>
                          <td className="p-3 text-muted-foreground">{row.bestFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-muted/30 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Purchasing note:</strong> CFU counts,
                formulations, and availability change. Always verify the current label and
                consult your vet before starting any probiotic supplements, especially if
                your dog has an existing condition, takes antibiotics regularly, or has had
                urinary tract infections.
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24">
              <SectionLabel n="08" title="Dogs Probiotics FAQs" />
              <Accordion type="single" collapsible className="space-y-2">
                {FAQS.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border border-border rounded-2xl px-5 py-1"
                  >
                    <AccordionTrigger className="text-sm font-medium text-left hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* ReviewedByDrAlex */}
            <ReviewedByDrAlex />

            {/* References */}
            <section id="references" className="scroll-mt-24">
              <SectionLabel n="09" title="References" />
              <ol className="space-y-2">
                {REFERENCES.map((ref, i) => (
                  <li
                    key={i}
                    className="text-xs text-muted-foreground leading-relaxed flex gap-3"
                  >
                    <span className="text-[10px] font-bold tabular-nums text-muted-foreground/60 mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* CTA */}
            <section className="bg-peach rounded-3xl p-8 text-center space-y-4">
              <p className="font-serif text-2xl text-ink-deep leading-snug">
                Ready to support your dog's gut?
              </p>
              <p className="text-sm text-ink-deep/80 max-w-lg mx-auto leading-relaxed">
                Probiotics for dogs work best as part of a broader approach — good dog
                foods with appropriate fibre, prebiotic-rich whole foods, and minimal
                unnecessary antibiotic courses. If your pet is also dealing with
                persistent skin irritation or allergies, these often share the same root:
                gut dysbiosis.
              </p>
              <a href="/home-remedies-for-dog-allergies">
                <Button
                  size="lg"
                  className="rounded-full bg-ink-deep text-primary-foreground hover:bg-ink-deep/90"
                >
                  See home remedies for dog allergies
                </Button>
              </a>
            </section>

            {/* Previous articles */}
            {BLOG_ARTICLES.length > 0 && (
              <section className="border-t border-border pt-10">
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-6">
                  More from the blog
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {BLOG_ARTICLES.slice(0, 4).map((article) => (
                    <a
                      key={article.href}
                      href={article.href}
                      className="group rounded-2xl border border-border p-5 hover:border-primary/40 transition-colors"
                    >
                      <p className="text-sm font-medium group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                      </p>
                      {article.description && (
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                          {article.description}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </section>
            )}

          </article>
        </div>
      </div>
    </div>
  );
}
