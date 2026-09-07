export type ServiceOption = {
  name: string;
  description: string;
  href?: string;
};

export type ServiceCategory = {
  id: "experiential" | "events";
  title: string;
  short: string;
  description: string;
  stageTitle: string;
  stageItems: Array<{ label: string; href?: string }>;
  options: ServiceOption[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "experiential",
    title: "Experiential Marketing",
    short: "Brand worlds people can walk into.",
    description:
      "We bring marketing strategies to life through purposeful experiences that carry the brand through every detail, creating meaningful opportunities for audience engagement, strengthening brand connections and driving impactful results.",
    stageTitle: "Experiences",
    stageItems: [
      { label: "Pop Ups" },
      { label: "Retail Activations" },
      { label: "Product Launches" },
      { label: "Campaign Activations" },
      { label: "Sponsorship Activations" },
      { label: "Community Activations" },
      { label: "More" },
    ],
    options: [
      {
        name: "Brand Activations",
        description:
          "Bringing brands, campaigns and initiatives to life through experiences that drive engagement and build meaningful connections between brands and the audience they want to reach.",
      },
      {
        name: "Experiential Strategy",
        description:
          "Defining the goals, audience, messaging and desired outcomes that shape the foundation of an experiential campaign or initiative.",
      },
      {
        name: "Concept Development",
        description:
          "Developing experiential ideas and concepts that turn strategy into meaningful opportunities for audience engagement.",
      },
      {
        name: "Experiential Design",
        description:
          "Establishing the creative direction, visual approach and brand elements that carry the concept throughout the experience, shaping how it looks, feels and connects with the audience.",
      },
      {
        name: "Production & Execution",
        description:
          "Coordinating the production, vendors and logistics required to bring the approved concept and experiential design to life.",
      },
    ],
  },
  {
    id: "events",
    title: "Event Management",
    short: "From first concept to last light.",
    description:
      "From the initial concept to the final detail, we thoughtfully manage each element of the event experience to ensure successful execution and a memorable attendee experience.",
    stageTitle: "Events",
    stageItems: [
      { label: "Corporate Events" },
      { label: "Conferences & Meetings" },
      { label: "Awards & Recognition Events" },
      { label: "Church & Ministry Events" },
      { label: "Nonprofit & Community Events" },
      { label: "Social & Milestone Events" },
      { label: "Weddings", href: "/weddings" },
      { label: "More" },
    ],
    options: [
      {
        name: "Concept & Creative Direction",
        description:
          "Developing the concept and creative vision that shape the overall look and feel of the event experience.",
      },
      {
        name: "Event Design",
        description:
          "Creating the physical environment, visual elements and intentional details that carry the creative vision throughout the event experience.",
      },
      {
        name: "Planning & Coordination",
        description:
          "Planning and coordinating timelines, vendors, event elements and logistics required to ensure every detail is organized and on track ahead of the event.",
      },
      {
        name: "Event Setup & Execution",
        description:
          "Executing and managing the physical setup and installation of event elements to bring the approved event design to life.",
      },
      {
        name: "On-Site Event Management",
        description:
          "Managing the event in real time to ensure timelines, vendors, staff and event elements operate seamlessly from start to finish.",
      },
    ],
  },
];

export const inquiryServices = {
  "Experiential Marketing": [
    "Brand Activations",
    "Experiential Strategy",
    "Concept Development",
    "Experiential Design",
    "Production & Execution",
  ],
  "Event Management": [
    "Concept & Creative Direction",
    "Event Design",
    "Planning & Coordination",
    "Event Setup & Execution",
    "On-Site Event Management",
  ],
  Weddings: [
    "Proposals",
    "Full-Service Wedding Planning",
    "Wedding Design",
    "Wedding Celebrations",
    "Wedding Weekend Experiences",
  ],
} as const;
