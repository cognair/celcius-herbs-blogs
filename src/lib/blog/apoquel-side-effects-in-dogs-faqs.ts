/**
 * Single source of truth for Apoquel Side Effects in Dogs blog FAQs.
 *
 * Imported in two places:
 *  - `src/views/blog/ApoquelSideEffectsInDogsGuide.tsx` — renders the visual accordion.
 *  - `src/pages/apoquel-side-effects-in-dogs.astro` — builds Schema.org FAQPage JSON-LD.
 */
export type Faq = { q: string; a: string };

export const APOQUEL_SIDE_EFFECTS_IN_DOGS_FAQS: Faq[] = [
  {
    q: "What are the most common apoquel side effects in dogs?",
    a: "From the FDA label and field studies, the most common apoquel side effects in dogs are vomiting, diarrhea, decreased appetite, and lethargy — all generally mild and transient at labelled doses. More serious potential side effects, including increased susceptibility to infections, mild white blood cell changes on bloodwork, and an association with tumour occurrence in dogs treated long-term, are documented but less common.",
  },
  {
    q: "Can Apoquel cause cancer in dogs?",
    a: "The FDA label states Apoquel \"may exacerbate neoplastic conditions,\" and tumours — including lymphoma and mast cell tumours — have been documented in clinical trials and post-marketing surveillance of Apoquel-treated dogs. However, observational data to date has not shown a consistent increase in new cancer development compared with control populations. The relationship is an association, not proven causation. Dogs with existing cancer history are generally kept off Apoquel as a precaution.",
  },
  {
    q: "How long can a dog safely stay on Apoquel?",
    a: "University veterinary programmes have followed patients on Apoquel for over five years without identifying long-term organ toxicity at labelled doses, though data is still accumulating. Most practitioners in veterinary dermatology recommend periodic bloodwork every 6–12 months and using the lowest effective dose on a once-daily maintenance schedule when possible. Apoquel can be used for both temporary relief and long-term treatment — the key is ongoing monitoring, not an arbitrary time limit.",
  },
  {
    q: "What is the safest natural alternative to Apoquel for dogs?",
    a: "Cytopoint (a monthly injection targeting IL-31 only) has the strongest evidence for allergic itch relief and the most favourable safety profile among the alternatives — it doesn't carry Apoquel's broader immune-suppression risks or the side effects associated with steroids. For dogs where food is the underlying cause, a strict elimination diet is the other strong-evidence treatment. Fish oil is a useful and safe adjunct with moderate evidence. Quercetin, colostrum, and coconut oil have weak evidence for atopic itching specifically.",
  },
  {
    q: "Is Apoquel safe for puppies?",
    a: "No. Apoquel is contraindicated for use in dogs under 12 months of age. Clinical studies found significantly elevated rates of serious infections and demodicosis in young patients, likely because their developing immune system is more sensitive to JAK inhibition. Puppies with allergic reactions and skin itchiness should be evaluated for food allergy first and managed with age-appropriate options until they reach 12 months.",
  },
  {
    q: "Can I just give my dog Benadryl instead of Apoquel?",
    a: "Diphenhydramine (Benadryl) is safe for most dogs at appropriate doses and may provide temporary relief from mild, infrequent itching. In moderate-to-severe canine atopic dermatitis, antihistamines typically deliver inconsistent results because IL-31 and other JAK-dependent cytokines — not histamine — are the dominant drivers of allergic itch in most patients. Use Benadryl for minor acute allergic reactions; don't rely on it as a treatment for chronic atopy. Never give formulations with xylitol, decongestants, or alcohol.",
  },
  {
    q: "What happens if I stop Apoquel suddenly?",
    a: "Apoquel has a short half-life — its effects wear off within 12–24 hours of missing a dose. Stopping suddenly doesn't cause a withdrawal syndrome, but itching typically returns quickly if the underlying cause of the dog's allergy is still active. If stopping because of a side effect, contact your vet — there's usually a transition option (Cytopoint, short-course steroids) to manage symptoms while you switch treatments.",
  },
];

/**
 * Build Schema.org FAQPage JSON-LD from the blog FAQ array.
 */
export function buildApoquelSideEffectsInDogsFaqJsonLd(
  faqs: Faq[] = APOQUEL_SIDE_EFFECTS_IN_DOGS_FAQS,
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
 * Schema.org Article JSON-LD for the apoquel side effects in dogs blog page.
 */
export function buildApoquelSideEffectsInDogsArticleJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Apoquel Side Effects in Dogs: The Complete Guide",
    description:
      "Apoquel side effects in dogs explained from the FDA label — common, serious, long-term immune risks, cancer evidence, and 8 ranked natural alternatives.",
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
      "@id": "https://blog.celsiusherbs.com/apoquel-side-effects-in-dogs",
    },
  };
}
