import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Bug,
  Clock,
  FlaskConical,
  Leaf,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MANGE_IN_DOGS_FAQS as FAQS } from "@/lib/blog/mange-in-dogs-faqs";
import { ReviewedByDrAlex } from "@/components/blog/ReviewedByDrAlex";
import { BLOG_ARTICLES } from "@/lib/blog/recent-articles";

import hero from "@/assets/blog/mange-in-dogs-hero.webp";
import imgComparison from "@/assets/blog/mange-in-dogs-comparison.webp";
import imgContagion from "@/assets/blog/mange-in-dogs-contagion.webp";
import imgNaturalTreatment from "@/assets/blog/mange-in-dogs-natural-treatment.webp";
import imgPrescription from "@/assets/blog/mange-in-dogs-prescription.webp";

type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: "sarcoptic-vs-demodectic", label: "Sarcoptic vs Demodectic" },
  { id: "contagion", label: "Can It Spread to Humans?" },
  { id: "natural-treatment", label: "Natural Treatment Protocols" },
  { id: "apple-cider-vinegar", label: "Apple Cider Vinegar" },
  { id: "prescription-treatment", label: "Prescription Treatment" },
  { id: "faq", label: "FAQs" },
  { id: "references", label: "References" },
];

const REMEDY_CARDS = [
  {
    icon: Leaf,
    name: "Neem Oil",
    evidence: "Moderate potential",
    evidenceColor: "text-yellow-700 bg-yellow-50",
    how: "Dilute 1 part neem in 10 parts carrier oil. Massage into affected patches; prevent licking until absorbed. Can be added to medicated shampoos.",
    concern: "Concentrated neem irritates skin. Oral ingestion at high doses causes neurological signs. Always dilute.",
  },
  {
    icon: Leaf,
    name: "Coconut Oil",
    evidence: "Soothing only",
    evidenceColor: "text-orange-700 bg-orange-50",
    how: "Apply a thin layer of virgin coconut oil to dry, crusty patches as an emollient between vet visits.",
    concern: "No evidence it kills mites. Heavy use can clog hair follicles. Use sparingly as supportive care only.",
  },
  {
    icon: AlertTriangle,
    name: "Borax + Hydrogen Peroxide",
    evidence: "Not recommended",
    evidenceColor: "text-red-700 bg-red-50",
    how: "Widely shared online ('Ted's recipe') but no peer-reviewed evidence it eliminates mange mites.",
    concern: "Borax is toxic if ingested — GI upset, kidney damage. Hydrogen peroxide damages hair follicles. Veterinary professionals advise against it.",
  },
];

const TREATMENT_ROWS = [
  {
    drug: "Bravecto / NexGard (isoxazolines)",
    type: "Oral chew",
    indication: "Demodex mange (first-line); sarcoptic mange",
    evidence: "Strong",
  },
  {
    drug: "Revolution (selamectin)",
    type: "Monthly topical spot-on",
    indication: "Sarcoptic mange; also fleas, heartworm",
    evidence: "Strong",
  },
  {
    drug: "Ivermectin (off-label)",
    type: "Oral or injection",
    indication: "Both types; largely replaced by isoxazolines",
    evidence: "Moderate — MDR1 breed risk",
  },
];

const RECOVERY_ROWS = [
  { phase: "Itch relief", sarcoptic: "1–2 weeks", demodex: "Variable (less pruritic)" },
  { phase: "Skin lesion improvement", sarcoptic: "3–4 weeks", demodex: "3–4 weeks" },
  { phase: "Hair regrowth", sarcoptic: "4–8 weeks", demodex: "Weeks to months" },
  { phase: "Full resolution", sarcoptic: "4–8 weeks", demodex: "Several months (to negative skin scrapings)" },
];

const REFERENCES = [
  "MSD Veterinary Manual, 2023. Mange in Dogs. Merck & Co.",
  "Cornell University College of Veterinary Medicine, 2021. Demodectic Mange.",
  "Centers for Disease Control and Prevention (CDC), 2021. Scabies: Epidemiology. cdc.gov.",
  "Journal of Parasitic Diseases, 2016. Acaricidal potential of neem (Azadirachta indica) — a review.",
  "Pet Poison Helpline, 2020. Borax / Boric Acid Toxicity in Pets.",
  "Healthy Paw Life, 2022. Gentle Ways to Treat Mange Naturally.",
  "Dogs Naturally Magazine, 2021. 8 Natural Ways to Fight Mange in Dogs.",
  "K9 of Mine, 2021. Home Remedies for Dog Mange.",
  "Veterinary Dermatology, 2019. Coconut oil topical use in veterinary dermatology.",
  "Journal of Small Animal Practice, 2000. Selamectin efficacy in sarcoptic mange.",
  "Journal of Veterinary Dermatology, 2016. Fluralaner (Bravecto) for demodectic mange treatment.",
  "Journal of Veterinary Parasitology, 2015. Afoxolaner (NexGard) for demodectic and sarcoptic mange.",
  "Washington State University Veterinary Clinical Pharmacology Laboratory, 2020. MDR1 Gene Mutation and Ivermectin Sensitivity in Dogs.",
  "American Animal Hospital Association (AAHA) Parasite Prevention Guidelines, 2020. Ectoparasite treatment recommendations.",
];

export default function MangeInDogsGuide() {
  const [readPct, setReadPct] = useState(0);
  const [activeSection, setActiveSection] = useState("sarcoptic-vs-demodectic");

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
    (a) => a.href !== "/mange-in-dogs",
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
            Dog Health · Skin & Parasites
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Mange in Dogs: Symptoms, Natural Remedies, and When to Call the Vet
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[#D4C4B0] sm:text-lg">
            Sarcoptic vs demodectic mange explained — what causes each, which is contagious, what the
            natural remedy evidence actually says, and when prescription treatment is the only real option.
          </p>
        </div>
        <div className="relative h-64 overflow-hidden sm:h-80 lg:h-96">
          <img
            src={hero}
            alt="Dog with skin irritation being examined on a veterinary table"
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
              Mange in dogs is a parasitic skin disease caused by microscopic mites — and it is one of the
              conditions owners most frequently misidentify at home. The images online look dramatic because
              untreated dog mange can strip the coat, leave skin raw and infected, and cause relentless itch
              that disrupts sleep for both dog and owner.{" "}
              <span className="text-xs text-[#8B7355]">[Source: MSD Veterinary Manual, 2023]</span>
            </p>
            <p className="text-base leading-relaxed text-[#5A4535]">
              The good news is that mange in dogs is very treatable. The harder part is knowing which type
              your dog has — sarcoptic and demodectic mange behave completely differently, require different
              treatments, and carry very different risks, including the risk of spreading to you and to other
              dogs. This guide covers what sets them apart, what the natural remedy evidence actually says,
              and exactly when home treatment isn't enough.
            </p>
          </div>

          {/* ── Chapter 01: Sarcoptic vs Demodectic Mange ── */}
          <section id="sarcoptic-vs-demodectic" className="mb-14 scroll-mt-24">
            <div className="mb-4 flex items-center gap-2">
              <Bug className="h-5 w-5 text-[#B89B6A]" />
              <h2 className="text-2xl font-bold text-[#3A2F26]">Sarcoptic vs Demodectic Mange</h2>
            </div>

            <img
              src={imgComparison}
              alt="Comparison of sarcoptic mange (intense scratching, red ears) and demodectic mange (patchy bald spots on face)"
              className="mb-6 h-56 w-full rounded-xl object-cover sm:h-72"
              loading="lazy"
            />

            <div className="space-y-4 text-[#4A3728]">
              <p>
                Mange in dogs comes in two main forms. There is also a less common third type —{" "}
                <em>Cheyletiella</em> mite infestation, sometimes called <strong>"walking dandruff"</strong>{" "}
                for the way shed mites visibly move through the coat — but clinical management most often
                comes down to sarcoptic or demodectic.{" "}
                <span className="text-xs text-[#8B7355]">[Source: MSD Veterinary Manual, 2023]</span>
              </p>

              <h3 className="text-lg font-semibold text-[#3A2F26]">Sarcoptic Mange (Canine Scabies)</h3>
              <p>
                Sarcoptic mange, or canine scabies, is a highly contagious skin disease caused by{" "}
                <em>Sarcoptes scabiei var. canis</em> — parasitic mites that burrow into the surface layers
                of a pet's skin and complete their entire life cycle there. It is female mites that burrow
                deepest, laying eggs in tunnels within the pet's skin. This burrowing causes the severe
                itching that is the hallmark clinical sign of this form of dog mange.{" "}
                <span className="text-xs text-[#8B7355]">[Source: MSD Veterinary Manual, 2023]</span>
              </p>

              <div className="rounded-lg border border-[#E8D9C8] bg-white p-4">
                <p className="mb-2 text-sm font-semibold text-[#3A2F26]">
                  Who it affects:
                </p>
                <p className="text-sm text-[#5A4535]">
                  Any dog, any age, any breed. Dogs in shelters, rescues, boarding facilities, or dog parks
                  are at highest risk. The tiny mites are highly contagious between dogs, and the skin
                  disease can spread rapidly through a multi-dog household.{" "}
                  <span className="text-xs text-[#8B7355]">[Source: MSD Veterinary Manual, 2023]</span>
                </p>
              </div>

              <p className="text-sm font-semibold text-[#3A2F26]">Clinical signs (mild → severe):</p>
              <ul className="space-y-1 text-sm text-[#4A3728]">
                <li>• Sudden, severe itching — dog scratches, chews, or rubs almost constantly</li>
                <li>• Red papules and crusts on ear margins, elbows, hocks, chest, and belly</li>
                <li>• Scaly skin, patchy hair loss, and irritated skin spreading progressively</li>
                <li>• Thick yellow-gray crusts, skin lesions, and self-inflicted scratch wounds</li>
                <li>
                  • In severe cases: widespread hair loss, darkened dog's skin, weight loss, disrupted sleep,
                  and secondary infections — secondary bacterial infections and yeast infections — layering
                  on top of the mange mites damage
                </li>
              </ul>
              <p className="text-sm text-[#5A4535]">
                Left untreated, sarcoptic mange can become a debilitating disease that robs a dog of its
                coat, sleep, and body condition.{" "}
                <span className="text-xs text-[#8B7355]">[Source: MSD Veterinary Manual, 2023]</span>
              </p>

              <h3 className="text-lg font-semibold text-[#3A2F26]">Demodectic Mange (Demodex Mange)</h3>
              <p>
                Demodectic mange — also called demodex mange or <strong>"red mange"</strong> — is a skin
                disease caused by <em>Demodex canis</em>, parasitic mites that live in the hair follicles
                and sebaceous glands of virtually every dog as a normal commensal.{" "}
                <span className="text-xs text-[#8B7355]">
                  [Source: Cornell University College of Veterinary Medicine, 2021]
                </span>{" "}
                Demodex canis mites are transmitted from dam to pups during the first days of life, where
                they take up permanent residence in the hair follicles. In healthy dogs, the pet's immune
                system keeps these mange mites in check with no clinical signs. Disease develops when the
                pet's immune system is compromised.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-[#E8D9C8] bg-white p-4">
                  <p className="mb-1 text-sm font-semibold text-[#3A2F26]">
                    Young dogs (&lt;12 months)
                  </p>
                  <p className="text-sm text-[#5A4535]">
                    Localized demodectic mange (juvenile-onset) — small bald patches with scaly skin around
                    eyes or muzzle, usually no itch. Many cases in healthy dogs resolve spontaneously as
                    the immune system matures.{" "}
                    <span className="text-xs text-[#8B7355]">
                      [Source: Cornell University College of Veterinary Medicine, 2021]
                    </span>
                  </p>
                </div>
                <div className="rounded-lg border border-[#F5D6C8] bg-[#FFF8F5] p-4">
                  <p className="mb-1 text-sm font-semibold text-[#3A2F26]">
                    Adults with compromised immune systems
                  </p>
                  <p className="text-sm text-[#5A4535]">
                    Generalised demodex mange in older dogs usually signals an underlying disease:
                    hypothyroidism, Cushing's, cancer, or immune-suppressive drugs. Bulldogs, Shar Peis,
                    and terriers show genetic predisposition.{" "}
                    <span className="text-xs text-[#8B7355]">
                      [Source: MSD Veterinary Manual, 2023]
                    </span>
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-[#E8D9C8] bg-[#FAF6F0] p-4">
                <p className="mb-2 text-sm font-semibold text-[#3A2F26]">
                  How to prevent mange in dogs
                </p>
                <p className="text-sm text-[#5A4535]">
                  To prevent sarcoptic mange: avoid high-risk contact when cases are reported, treat all
                  dogs simultaneously if one is diagnosed, keep bedding clean. To prevent demodex mange
                  from progressing: address underlying health conditions promptly, and avoid prolonged
                  steroid use where alternatives exist.{" "}
                  <span className="text-xs text-[#8B7355]">
                    [Source: AAHA Parasite Prevention Guidelines, 2020]
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ── Chapter 02: Can Mange Spread to Humans? ── */}
          <section id="contagion" className="mb-14 scroll-mt-24">
            <div className="mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-[#B89B6A]" />
              <h2 className="text-2xl font-bold text-[#3A2F26]">Can Mange Spread to Humans?</h2>
            </div>

            <img
              src={imgContagion}
              alt="Concerned owner examining their dog's ear margins for signs of mange"
              className="mb-6 h-56 w-full rounded-xl object-cover sm:h-72"
              loading="lazy"
            />

            <div className="space-y-4 text-[#4A3728]">
              <p>
                Whether mange in dogs poses a risk to your household depends entirely on which type of
                dog mange your dog has.
              </p>

              <div className="rounded-lg border border-[#F5D6C8] bg-[#FFF8F5] p-5">
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-[#C0673A]" />
                  <p className="font-semibold text-[#3A2F26]">
                    Sarcoptic Mange: Yes — Highly Contagious, Temporarily to Humans
                  </p>
                </div>
                <p className="text-sm text-[#5A4535]">
                  Sarcoptic mange is highly contagious — between dogs, and capable of causing a temporary
                  rash in people. If your dog has canine scabies, mites can transfer to your skin and cause
                  an itchy rash on arms, wrists, or chest. However,{" "}
                  <em>Sarcoptes scabiei var. canis</em> cannot complete its life cycle on human skin.
                  Because the mites cannot sustain their life cycle without a dog host, they die within a
                  few days and the rash self-resolves once the dog mange is treated.{" "}
                  <span className="text-xs text-[#8B7355]">[Source: CDC, 2021]</span>
                </p>
                <ul className="mt-3 space-y-1 text-sm text-[#5A4535]">
                  <li>• Wash bedding, furniture covers, and grooming equipment</li>
                  <li>• Treat all other dogs in the household simultaneously</li>
                  <li>• Tell your GP if a family member develops a rash — mention the dog's diagnosis</li>
                  <li>• Isolate the dog from cats, ferrets, and foxes until treatment is underway</li>
                </ul>
              </div>

              <div className="rounded-lg border border-[#D4E8D4] bg-[#F5FBF5] p-5">
                <div className="mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#3A7A3A]" />
                  <p className="font-semibold text-[#3A2F26]">
                    Demodectic Mange: Not Contagious to Other Dogs or People
                  </p>
                </div>
                <p className="text-sm text-[#5A4535]">
                  Demodex mange is not contagious — not to other dogs, not to people, not to other species.{" "}
                  <span className="text-xs text-[#8B7355]">
                    [Source: Cornell University College of Veterinary Medicine, 2021]
                  </span>{" "}
                  Demodex canis mites are host-specific; they pass from mother to pups during nursing, not
                  through casual contact. A dog with demodectic mites can share a bed with other dogs and
                  will not transmit the skin disease. Sarcoptic mange requires immediate environmental
                  decontamination; demodectic mange requires neither.
                </p>
              </div>
            </div>
          </section>

          {/* ── Chapter 03: Natural Treatment Protocols ── */}
          <section id="natural-treatment" className="mb-14 scroll-mt-24">
            <div className="mb-4 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-[#B89B6A]" />
              <h2 className="text-2xl font-bold text-[#3A2F26]">Natural Treatment Protocols</h2>
            </div>

            <img
              src={imgNaturalTreatment}
              alt="Glass bottles of apple cider vinegar and neem oil on a wooden surface"
              className="mb-6 h-56 w-full rounded-xl object-cover sm:h-72"
              loading="lazy"
            />

            <div className="space-y-4 text-[#4A3728]">
              <p>
                Natural remedies for mange in dogs fall into two honest categories: things that may soothe
                inflamed dogs skin, and things people believe will eradicate demodex mites or sarcoptic
                mites. The evidence for mite eradication at home is weak across the board. Here is what
                the research says.{" "}
                <span className="text-xs text-[#8B7355]">[Source: MSD Veterinary Manual, 2023]</span>
              </p>

              <div className="space-y-4">
                {REMEDY_CARDS.map((r) => (
                  <div
                    key={r.name}
                    className="rounded-lg border border-[#E8D9C8] bg-white p-5"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <r.icon className="h-4 w-4 text-[#B89B6A]" />
                        <p className="font-semibold text-[#3A2F26]">{r.name}</p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${r.evidenceColor}`}>
                        {r.evidence}
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-[#4A3728]">
                      <strong>How to use:</strong> {r.how}
                    </p>
                    <p className="text-sm text-[#6B5744]">
                      <strong>Note:</strong> {r.concern}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Chapter 04: Apple Cider Vinegar ── */}
          <section id="apple-cider-vinegar" className="mb-14 scroll-mt-24">
            <div className="mb-4 flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-[#B89B6A]" />
              <h2 className="text-2xl font-bold text-[#3A2F26]">Apple Cider Vinegar: How to Use It</h2>
            </div>

            <div className="space-y-4 text-[#4A3728]">
              <p>
                Apple cider vinegar (ACV) is the most frequently recommended home remedy for mange in dogs.
                The idea is that acetic acid changes the skin pH and makes dogs skin less hospitable to
                demodex mites and sarcoptic mites.
              </p>

              <div className="rounded-lg border border-[#F5D6C8] bg-[#FFF8F5] p-4">
                <p className="mb-1 text-sm font-semibold text-[#3A2F26]">Evidence: Weak/Anecdotal</p>
                <p className="text-sm text-[#5A4535]">
                  No controlled veterinary studies have demonstrated ACV's efficacy against{" "}
                  <em>Sarcoptes</em> or <em>Demodex</em> mites on dogs skin. Claims rest on general
                  antimicrobial properties of acetic acid — not on evidence specific to mange in dogs. ACV
                  alone will not treat mange.{" "}
                  <span className="text-xs text-[#8B7355]">[Source: MSD Veterinary Manual, 2023]</span>
                </p>
              </div>

              <div className="rounded-lg border border-[#E8D9C8] bg-white p-5">
                <p className="mb-3 text-sm font-semibold text-[#3A2F26]">
                  Safer protocol (low-risk supportive use)
                </p>
                <div className="space-y-2 text-sm text-[#4A3728]">
                  <p>
                    <strong>Dilution:</strong> 1 part ACV to 1 part water — never apply undiluted, which
                    will sting on inflamed dogs skin{" "}
                    <span className="text-xs text-[#8B7355]">[Source: Healthy Paw Life, 2022]</span>
                  </p>
                  <p>
                    <strong>Frequency:</strong> 2–3 times per week
                  </p>
                  <p>
                    <strong>Method:</strong> Sponge or spray over the coat and affected skin. Avoid open
                    sores, eyes, and ears. Let air-dry; no rinsing needed.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-[#E8D9C8] bg-[#FAF6F0] p-4">
                <p className="mb-2 text-sm font-semibold text-[#3A2F26]">What ACV can reasonably do</p>
                <p className="text-sm text-[#5A4535]">
                  A diluted ACV wipe may reduce secondary bacterial odour on dogs skin and has a mild drying
                  effect on weeping lesions. For mild, localised mange in dogs while waiting for a vet
                  appointment, it is low-risk and may offer some comfort. Do not expect it to clear the
                  infestation or resolve clinical signs of mange in dogs.
                </p>
              </div>

              <div className="rounded-lg border border-[#F5D6C8] bg-[#FFF8F5] p-4">
                <p className="mb-2 text-sm font-semibold text-[#3A2F26]">When not to use it</p>
                <ul className="space-y-1 text-sm text-[#5A4535]">
                  <li>• On open sores, wounds, or excoriated dogs skin — acid stings on broken tissue</li>
                  <li>• In or near the eyes or ears</li>
                  <li>• As a substitute for skin scrapings diagnosis or prescription treatment in moderate or severe mange in dogs</li>
                  <li>• Combined with borax — adds toxicity risk without improving efficacy</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── Chapter 05: When You Need Prescription Treatment ── */}
          <section id="prescription-treatment" className="mb-14 scroll-mt-24">
            <div className="mb-4 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-[#B89B6A]" />
              <h2 className="text-2xl font-bold text-[#3A2F26]">When You Need Prescription Treatment</h2>
            </div>

            <img
              src={imgPrescription}
              alt="Friendly vet offering a prescription oral tablet to a dog on an examination table"
              className="mb-6 h-56 w-full rounded-xl object-cover sm:h-72"
              loading="lazy"
            />

            <div className="space-y-4 text-[#4A3728]">
              <p>
                If your dog has moderate-to-severe mange in dogs — spreading hair loss, significant
                crusting, secondary yeast infections or bacterial infection, systemic clinical signs, or
                relentless itch — home remedies are insufficient. Delaying prescription treatment prolongs
                suffering and risks chronic skin disease.
              </p>

              <p>
                Veterinary diagnosis via <strong>skin scrapings</strong> (and sometimes hair plucks or
                biopsy) is the only reliable way to confirm which type of mange your dog has. Without skin
                scrapings confirming the mite species, you are treating a guess.
              </p>

              <h3 className="text-lg font-semibold text-[#3A2F26]">Conventional options to treat mange in dogs</h3>

              <div className="overflow-x-auto rounded-lg border border-[#E8D9C8]">
                <table className="w-full text-sm">
                  <thead className="bg-[#F5EFE6] text-[#3A2F26]">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Drug</th>
                      <th className="px-4 py-3 text-left font-semibold">Type</th>
                      <th className="px-4 py-3 text-left font-semibold">Indication</th>
                      <th className="px-4 py-3 text-left font-semibold">Evidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8D9C8]">
                    {TREATMENT_ROWS.map((r, i) => (
                      <tr key={i} className="bg-white">
                        <td className="px-4 py-3 font-medium text-[#3A2F26]">{r.drug}</td>
                        <td className="px-4 py-3 text-[#5A4535]">{r.type}</td>
                        <td className="px-4 py-3 text-[#5A4535]">{r.indication}</td>
                        <td className="px-4 py-3 text-[#5A4535]">{r.evidence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="rounded-lg border border-[#F5D6C8] bg-[#FFF8F5] p-4">
                <p className="mb-1 text-sm font-semibold text-[#3A2F26]">
                  MDR1 Gene Mutation Warning — Ivermectin
                </p>
                <p className="text-sm text-[#5A4535]">
                  Collies, Shelties, Australian Shepherds, and related breeds with MDR1 gene mutations are
                  at serious risk of neurotoxicity from ivermectin — even at moderate doses.{" "}
                  <span className="text-xs text-[#8B7355]">
                    [Source: Washington State University Veterinary Clinical Pharmacology Laboratory, 2020]
                  </span>{" "}
                  Never use ivermectin in these breeds without specific vet guidance.
                </p>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#B89B6A]" />
                <h3 className="text-lg font-semibold text-[#3A2F26]">Recovery Timeline</h3>
              </div>

              <div className="overflow-x-auto rounded-lg border border-[#E8D9C8]">
                <table className="w-full text-sm">
                  <thead className="bg-[#F5EFE6] text-[#3A2F26]">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Phase</th>
                      <th className="px-4 py-3 text-left font-semibold">Sarcoptic Mange</th>
                      <th className="px-4 py-3 text-left font-semibold">Demodex Mange (Generalised)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8D9C8]">
                    {RECOVERY_ROWS.map((r, i) => (
                      <tr key={i} className="bg-white">
                        <td className="px-4 py-3 font-medium text-[#3A2F26]">{r.phase}</td>
                        <td className="px-4 py-3 text-[#5A4535]">{r.sarcoptic}</td>
                        <td className="px-4 py-3 text-[#5A4535]">{r.demodex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-[#8B7355]">
                [Source: MSD Veterinary Manual, 2023] [Source: Cornell University College of Veterinary
                Medicine, 2021]
              </p>

              <div className="rounded-lg border border-[#F5D6C8] bg-[#FFF8F5] p-5">
                <p className="mb-3 font-semibold text-[#3A2F26]">
                  Red flags — same-day vet visit
                </p>
                <ul className="space-y-1 text-sm text-[#5A4535]">
                  <li>• Intense itching that prevents rest and sleep</li>
                  <li>• Open sores, pus, or foul odour — likely secondary yeast infections or bacterial skin disease</li>
                  <li>• Clinical signs of mange spreading rapidly across the body</li>
                  <li>• Lethargy, weight loss, or loss of appetite alongside skin changes</li>
                  <li>• Any lesion that hasn't improved in 2–4 weeks despite home management</li>
                  <li>• Any suspicion of highly contagious sarcoptic mange — puts other dogs and household members at risk</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── FAQs ── */}
          <section id="faq" className="mb-14 scroll-mt-24">
            <div className="mb-4 flex items-center gap-2">
              <Bug className="h-5 w-5 text-[#B89B6A]" />
              <h2 className="text-2xl font-bold text-[#3A2F26]">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-lg border border-[#E8D9C8] bg-white px-4"
                >
                  <AccordionTrigger className="py-4 text-left text-sm font-medium text-[#3A2F26] hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-[#5A4535]">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Reviewed by Dr. Alex */}
          <ReviewedByDrAlex className="mb-10" />

          {/* ── References ── */}
          <section id="references" className="mb-14 scroll-mt-24">
            <h2 className="mb-4 text-xl font-bold text-[#3A2F26]">References</h2>
            <ol className="space-y-1 text-sm text-[#6B5744]">
              {REFERENCES.map((ref, i) => (
                <li key={i}>
                  <span className="mr-2 font-medium text-[#3A2F26]">{i + 1}.</span>
                  {ref}
                </li>
              ))}
            </ol>
          </section>

          {/* ── CTA ── */}
          <section className="mb-14 rounded-xl border border-[#E8D9C8] bg-[#FAF6F0] p-6 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8B7355]">
              Support your dog's skin recovery
            </p>
            <h2 className="mb-3 text-xl font-bold text-[#3A2F26]">
              Ready to Support Your Dog's Skin from the Inside Out?
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-[#5A4535]">
              Mange strips skin of its natural defences. While your vet manages the mite infestation,
              supporting your dog's skin barrier and immune system can make a real difference in
              recovery — especially for dogs prone to repeated skin flare-ups.
            </p>
            <Button asChild className="bg-[#3A2F26] text-[#F4E4D1] hover:bg-[#4A3F36]">
              <a href="/home-remedies-for-dog-allergies">Explore Skin Support for Dogs →</a>
            </Button>
          </section>

          {/* ── Previous articles ── */}
          {previousArticles.length > 0 && (
            <section className="mb-6">
              <h2 className="mb-4 text-lg font-bold text-[#3A2F26]">More from Celsius Herbs</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {previousArticles.map((a) => (
                  <a
                    key={a.href}
                    href={a.href}
                    className="rounded-lg border border-[#E8D9C8] bg-white p-4 text-sm font-medium text-[#3A2F26] transition-colors hover:bg-[#FAF6F0]"
                  >
                    {a.label}
                  </a>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
