/**
 * Single source of truth for Probiotics for Dogs blog FAQs.
 *
 * Imported in two places:
 *  - `src/views/blog/ProbioticsForDogsGuide.tsx` — renders the visual accordion.
 *  - `src/pages/probiotics-for-dogs.astro` — builds Schema.org FAQPage JSON-LD.
 */
export type Faq = { q: string; a: string };

export const PROBIOTICS_FOR_DOGS_FAQS: Faq[] = [
  {
    q: "How long before probiotics start working in dogs?",
    a: "Most owners notice stool-quality improvements within 3 to 7 days of consistent use. For immune-related or skin and allergy benefits, allow 4 to 8 weeks of regular supplementation before evaluating. Some dogs show adjustment-phase loose stools in the first few days — this usually resolves on its own without stopping the probiotic.",
  },
  {
    q: "Can I give my dog human probiotics?",
    a: "Technically they are not toxic, but dog and human gut microbiomes differ significantly in composition. Many human strains show poor adhesion to canine intestinal mucus and low survival through the dog's digestive tract. Use dog-specific probiotic formulations where possible — particularly for therapeutic goals like post-antibiotic recovery or diarrhea.",
  },
  {
    q: "Are probiotics for dogs safe for puppies?",
    a: "Generally yes, in age-appropriate doses. Some veterinary probiotic products specify use from 6 weeks of age. Avoid high doses in very young puppies and check with your vet if the puppy has an existing health issue or is already on antibiotics or other medication.",
  },
  {
    q: "Should probiotics for dogs be given with food or on an empty stomach?",
    a: "With food is generally better for most strains. Food buffers stomach acid, improving survival of live bacteria through the digestive tract to where they are needed. Spore-based products (Bacillus strains) are less sensitive to stomach acid and can be given either way, making them a practical choice for busy pet owners.",
  },
  {
    q: "What are signs probiotics are working in dogs?",
    a: "Firmer, more consistent stools; reduced bloating or gas; better appetite; less urgency around bathroom trips. For anxiety-targeted strains, improved calm behaviour during stress triggers such as car rides and thunderstorms. If you see no change in 4–6 weeks of consistent use at the correct dose, the product or strain may not be the right match.",
  },
  {
    q: "My dog had loose stools after starting probiotics — should I stop?",
    a: "A mild, temporary loosening in the first few days is common and usually self-resolving as the digestive system adjusts. Halve the dose for a week, then build back up to the full dose. If diarrhea is severe, contains blood, or persists beyond 5–7 days, stop the probiotic and see a vet.",
  },
  {
    q: "Can probiotics help dogs with allergies?",
    a: "Early evidence shows that dogs with atopic dermatitis often have reduced gut microbial diversity, and probiotics may moderate allergy severity through immune system modulation. The evidence is promising but not definitive — think supportive adjunct therapy alongside standard allergy management, not a standalone cure.",
  },
  {
    q: "Is plain kefir a good probiotic for dogs?",
    a: "It can be a useful dietary complement. Plain, unsweetened, full-fat kefir contains multiple live Lactobacillus and Bifidobacterium strains plus beneficial yeasts at meaningful counts. The CFU load is variable and lower than a concentrated supplement, but many dogs find it highly palatable. Start with 1–2 tablespoons for a medium dog. Never give flavoured kefir or products containing xylitol or artificial sweeteners.",
  },
];

/**
 * Build Schema.org FAQPage JSON-LD from the blog FAQ array.
 */
export function buildProbioticsForDogsFaqJsonLd(
  faqs: Faq[] = PROBIOTICS_FOR_DOGS_FAQS,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

/**
 * Schema.org Article JSON-LD for the probiotics for dogs blog page.
 */
export function buildProbioticsForDogsArticleJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Probiotics for Dogs: What the Research Shows",
    description:
      "Probiotics for dogs explained strain by strain, with dosage by weight, forms compared, and a vet-reviewed product table.",
    author: {
      "@type": "Organization",
      name: "Celsius Herbs Veterinary Advisory Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Celsius Herbs",
      logo: {
        "@type": "ImageObject",
        url: "https://celsiusherbs.com/cdn/shop/files/celsius-herbs-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://blog.celsiusherbs.com/probiotics-for-dogs",
    },
  };
}
