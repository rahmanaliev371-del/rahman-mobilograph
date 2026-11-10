import type { Category, PlanKey, SectionId, ServiceKey } from "@/lib/data";

/**
 * English dictionary. It defines the shape every other language must follow —
 * TypeScript will flag any missing or extra key in ru.ts / kk.ts.
 */
const en = {
  meta: {
    title: "RAHMAN MOBILOGRAPH — Mobile videographer in Almaty",
    description:
      "Cinematic mobile videography in Almaty, Kazakhstan: reels, event filming, editing, color grading and advertising videos.",
  },
  name: "Rahman",
  location: { city: "Almaty", country: "Kazakhstan" },
  nav: {
    items: {
      about: "About",
      work: "Work",
      services: "Services",
      process: "Process",
      pricing: "Pricing",
      contact: "Contact",
    } satisfies Record<SectionId, string>,
    bookShoot: "Book a shoot",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    basedIn: "Based in",
    language: "Language",
    mainNav: "Main",
  },
  hero: {
    role: "Mobile videographer",
    tagline: "Cinematic stories, shot on a phone in Almaty.",
    intro:
      "Mobile videographer based in Almaty. Reels, events, weddings and promo videos — filmed, edited and color graded with a cinematic eye.",
    viewWork: "View work",
    scroll: "Scroll",
    portraitAlt: "Rahman, mobile videographer, standing in the mountains near Almaty",
    portraitLabel: "Portrait",
  },
  about: {
    label: "About",
    title: "Behind",
    accent: "the lens",
    statement:
      "I'm Rahman — a mobile videographer from Almaty. I believe a phone in the right hands is a cinema camera. I film reels, events and promo videos with attention to light, rhythm and atmosphere — so a place, a product or a day feels on screen the way it felt in person.",
  },
  portfolio: {
    label: "Portfolio",
    title: "Selected",
    accent: "work",
    aside:
      "Reels and films across six formats. Placeholders below will be replaced with real projects — tap a category to filter.",
    all: "All",
    filterLabel: "Filter projects by category",
    categories: {
      restaurant: "Restaurant Reels",
      sport: "Sport Video",
      wedding: "Wedding Teaser",
      product: "Product Promo",
      store: "Store Promo",
      travel: "Travel Video",
    } satisfies Record<Category, string>,
    /** Generic card title, followed by a number: "Restaurant Reel 01". */
    itemNames: {
      restaurant: "Restaurant Reel",
      sport: "Sport Video",
      wedding: "Wedding Teaser",
      product: "Product Promo",
      store: "Store Promo",
      travel: "Travel Video",
    } satisfies Record<Category, string>,
    comingSoon: "Video coming soon",
    instagramNote: "The latest videos are published first on Instagram.",
    moreOnInstagram: "More on Instagram",
  },
  services: {
    label: "Services",
    title: "What",
    accent: "I do",
    aside: "From a single reel to a full event — shooting, editing and grading in one pair of hands.",
    items: {
      reels: {
        title: "Reels shooting",
        description:
          "Vertical videos built for Instagram and TikTok — dynamic framing, fast hooks and a rhythm made for the feed.",
      },
      events: {
        title: "Event filming",
        description:
          "Openings, parties, presentations and celebrations — captured discreetly, with the atmosphere intact.",
      },
      editing: {
        title: "Video editing",
        description:
          "Cutting on rhythm, sound design and transitions that keep the viewer watching to the last frame.",
      },
      grading: {
        title: "Color grading",
        description:
          "A consistent, filmic look for your footage — tones that feel considered rather than filtered.",
      },
      cinematic: {
        title: "Cinematic videos",
        description:
          "Story-driven pieces with movement, light and pacing borrowed from cinema — shot entirely on mobile.",
      },
      ads: {
        title: "Advertising videos",
        description: "Promo content for restaurants, stores and products, designed around one clear message.",
      },
    } satisfies Record<ServiceKey, { title: string; description: string }>,
  },
  process: {
    label: "Process",
    title: "How it",
    accent: "works",
    text: "Five clear steps from the first message to the final file. You always know what happens next.",
    steps: [
      {
        title: "Brief",
        description:
          "We talk through your goal, audience and references — what the video needs to do and where it will live.",
      },
      {
        title: "Concept",
        description:
          "An idea, a shot list and a mood. You know exactly what we are filming before the camera comes out.",
      },
      {
        title: "Shoot",
        description:
          "On location, working with natural and available light, movement and detail to capture the material.",
      },
      {
        title: "Edit & grade",
        description:
          "Selecting the best takes, cutting to rhythm, adding sound and grading the colour into a single look.",
      },
      {
        title: "Delivery",
        description:
          "Final files in the formats you need — ready to post, with room for your feedback before release.",
      },
    ],
  },
  pricing: {
    label: "Pricing",
    title: "Choose",
    accent: "your format",
    aside:
      "Prices are starting points — the final cost depends on the task. Send your idea on WhatsApp or Instagram and get an exact estimate.",
    package: "Package",
    onRequest: "On request",
    quoted: "Quoted individually",
    /** `{price}` is replaced with the formatted amount. */
    priceFrom: "from {price} tenge",
    cta: "Discuss a project",
    plans: {
      single: {
        name: "Single Reel",
        summary: "One vertical video for a launch, a dish or a moment.",
        tag: "9:16",
        includes: [
          "Idea and shot list",
          "Shooting on location",
          "Editing, sound and color grading",
          "Vertical 9:16 delivery",
        ],
      },
      pack: {
        name: "Content Pack",
        summary: "A series of reels from one shoot, in one visual style.",
        tag: "Series",
        includes: [
          "Content plan for the series",
          "Several reels from one shoot",
          "Consistent grading across videos",
          "Formats for Reels and TikTok",
        ],
      },
      event: {
        name: "Event & Wedding",
        summary: "Coverage of the day, cut into a cinematic teaser.",
        tag: "9:16 + 16:9",
        includes: [
          "Filming the event",
          "Teaser or highlight video",
          "Cinematic color grading",
          "Vertical and horizontal versions",
        ],
      },
    } satisfies Record<PlanKey, { name: string; summary: string; tag: string; includes: string[] }>,
  },
  contact: {
    label: "Contact",
    /** Three headline lines; the middle one is set in serif italic. */
    headline: ["Let's create", "something", "cinematic"] as [string, string, string],
    text: "Tell me about your project — a reel, an event, a wedding or a promo. The fastest way to reach me is WhatsApp, or a direct message on Instagram.",
    channels: {
      whatsapp: "Write on WhatsApp",
      instagram: "Write on Instagram",
      tiktok: "Watch on TikTok",
    },
    /** Pre-filled text when a visitor opens WhatsApp from the site. */
    whatsappMessage: "Hello! I'd like to book a shoot.",
  },
  footer: {
    backToTop: "Back to top",
    nav: "Footer",
  },
};

export type Dictionary = typeof en;
export default en;
