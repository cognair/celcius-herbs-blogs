/**
 * Single source of truth for Mange in Dogs blog FAQs.
 *
 * Imported in two places:
 *  - `src/views/blog/MangeInDogsGuide.tsx` — renders the visual accordion.
 *  - `src/pages/mange-in-dogs.astro` — builds Schema.org FAQPage JSON-LD.
 */
export type Faq = { q: string; a: string };

export const MANGE_IN_DOGS_FAQS: Faq[] = [
  {
    q: "What are the clinical signs of mange in dogs?",
    a: "The clinical signs of mange in dogs differ by type. Sarcoptic mange causes sudden, severe itching — particularly around ear margins, elbows, and hocks — with scaly skin, crusting, and hair loss. Demodectic mange typically causes hair loss without significant itch, starting as small bald patches around the face in puppies. A vet uses skin scrapings to confirm which type is present.",
  },
  {
    q: "Can I catch mange from my dog?",
    a: "If your dog has highly contagious sarcoptic mange, the mites can temporarily infest human skin and cause an itchy rash — usually on the arms and chest. Because the mites cannot complete their life cycle on human skin, the rash self-resolves once the dog mange is treated. Demodectic mange cannot spread to humans or other dogs at all.",
  },
  {
    q: "Does apple cider vinegar treat mange in dogs?",
    a: "No controlled veterinary studies confirm that apple cider vinegar eliminates demodex mites or sarcoptic mites or resolves clinical signs of mange in dogs. Diluted 1:1 ACV may soothe secondary skin irritation and reduce odour, but it will not treat mange on its own — particularly in moderate or severe cases.",
  },
  {
    q: "Is borax safe for treating mange in dogs?",
    a: "Borax (sodium borate) is toxic if ingested and can cause kidney damage in dogs. There is no peer-reviewed evidence that borax dips reliably kill demodex mites or sarcoptic mites, and veterinary professionals advise against applying it to dogs' skin. The risk-to-evidence ratio does not support using borax as a mange treatment.",
  },
  {
    q: "How long does mange take to clear up in dogs?",
    a: "With prescription treatment, sarcoptic mange in dogs typically resolves in 4–8 weeks. Localized juvenile demodex mange in puppies often resolves on its own within 4–8 weeks as the immune system matures. Generalised demodex mange requires several months of isoxazoline therapy and is monitored with repeat skin scrapings until two consecutive negative results confirm clearance.",
  },
  {
    q: "Can mange in dogs go away on its own?",
    a: "Localized puppy demodex mange sometimes resolves spontaneously as the immune system matures. Sarcoptic mange very rarely self-resolves and typically progresses to chronic dog mange with secondary infections and bacterial skin disease. Adult-onset generalised demodectic mange rarely resolves without treatment, particularly when a compromised immune system from underlying illness is involved.",
  },
  {
    q: "Can mange cause yeast infections in dogs?",
    a: "Yes. The damaged, inflamed skin that mange leaves behind — whether from sarcoptic mites or demodex mites — creates ideal conditions for secondary yeast infections (Malassezia) and bacterial infections. These secondary infections worsen clinical signs considerably and often require separate treatment alongside the antiparasitic therapy.",
  },
];

/**
 * Build Schema.org FAQPage JSON-LD from the blog FAQ array.
 */
export function buildMangeInDogsFaqJsonLd(
  faqs: Faq[] = MANGE_IN_DOGS_FAQS,
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
 * Schema.org Article JSON-LD for the mange in dogs blog page.
 */
export function buildMangeInDogsArticleJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Mange in Dogs: Symptoms, Natural Remedies, and When to Call the Vet",
    description:
      "Mange in dogs explained — sarcoptic vs demodectic symptoms, apple cider vinegar and neem oil protocols, and when prescription treatment is the only option.",
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
      "@id": "https://blog.celsiusherbs.com/mange-in-dogs",
    },
  };
}
