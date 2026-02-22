// data.js

export const pricingPlans = ["Monthly", "Quarterly", "Half-Yearly", "Annually"];

export const subscriptionData = {
  Lite: ["₦4,500", "₦4,050", "₦3,600", "₦3,150"],
  Plus: ["₦6,750", "₦6,075", "₦5,400", "₦4,725"],
  Pro: ["₦10,125", "₦9,113", "₦8,100", "₦7,088"],
  Extra: ["₦15,888", "₦14,299", "₦12,710", "₦11,122"],
};

export const subscriptionPlans = {
  Monthly: {
    //Lite: { code: 225828, amount: 100.00 },
    Lite: { code: 145789, amount: 4500.00 },
    Plus: { code: 145793, amount: 6750.00 },
    Pro: { code: 145797, amount: 10125.00 },
    Extra: { code: 145801, amount: 15888.00 },
  },
  Quarterly: {
    Lite: { code: 145790, amount: 12150.00 },
    Plus: { code: 145794, amount: 18225.00 },
    Pro: { code: 145798, amount: 27339.00 },
    Extra: { code: 145803, amount: 42897.00 },
  },
  Biannually: {
    Lite: { code: 145791, amount: 21600.00 },
    Plus: { code: 145795, amount: 32500.00 },
    Pro: { code: 145799, amount: 48600.00 },
    Extra: { code: 145804, amount: 76260.00 },
  },
  Yearly: {
    Lite: { code: 145792, amount: 37800.00 },
    Plus: { code: 145796, amount: 56700.00 },
    Pro: { code: 145800, amount: 85056.00 },
    Extra: { code: 145805, amount: 133464.00 },
  },
};

// oneTimePaymentPlan.js
export const oneTimePaymentPlan = {
  Monthly: {
    Lite: { amount: 12150 },
    Plus: { amount: 18225 },
    Pro: { amount: 27339 },
    Extra: { amount: 42897 },
  },
  Quarterly: {
    Lite: { amount: 12150 },
    Plus: { amount: 18225 },
    Pro: { amount: 27339 },
    Extra: { amount: 42897 },
  },
  "Half-Yearly": {
    Lite: { amount: 21600 },
    Plus: { amount: 32400 },
    Pro: { amount: 48600 },
    Extra: { amount: 76260 },
  },
  Annually: {
    Lite: { amount: 37800 },
    Plus: { amount: 56700 },
    Pro: { amount: 85056 },
    Extra: { amount: 133464 },
  },
};

export const StripePlans = [
  {
    name: "Lite",
    prices: [
      { id: "price_1RVaT3KFCHhvNl8MnpIRO6sB", amount: 19.99, interval: "month", interval_count: 1 },
      { id: "price_1RUQH6KFCHhvNl8MpGkQudFZ", amount: 17.99, interval: "month", interval_count: 3 },
      { id: "price_1RUQDsKFCHhvNl8MLHnJLcY3", amount: 15.99, interval: "month", interval_count: 6 },
      { id: "price_1RUPhgKFCHhvNl8MoJ5r6z8w", amount: 13.99, interval: "year", interval_count: 1 },
    ],
  },
  {
    name: "Plus",
    prices: [
      { id: "price_1RUQh6KFCHhvNl8Mwqv4LERx", amount: 34.99, interval: "month", interval_count: 1 },
      { id: "price_1RUQdOKFCHhvNl8MjuxFiI61", amount: 31.49, interval: "month", interval_count: 3 },
      { id: "price_1RUQEPKFCHhvNl8MeLkYh1HL", amount: 27.99, interval: "month", interval_count: 6 },
      { id: "price_1RUPimKFCHhvNl8MoiP8rN6w", amount: 24.49, interval: "year", interval_count: 1 },
    ],
  },
  {
    name: "Pro",
    prices: [
      { id: "price_1RUQheKFCHhvNl8MPXX32Wcx", amount: 59.99, interval: "month", interval_count: 1 },
      { id: "price_1RUQeOKFCHhvNl8MY8qegnWw", amount: 53.99, interval: "month", interval_count: 3 },
      { id: "price_1RUQFAKFCHhvNl8MeDmWpn1F", amount: 47.99, interval: "month", interval_count: 6 },
      { id: "price_1RUPjlKFCHhvNl8MCc7aCqb3", amount: 41.99, interval: "year", interval_count: 1 },
    ],
  },
  {
    name: "Extra",
    prices: [
      { id: "price_1RUQi1KFCHhvNl8M0mYCn8Py", amount: 99.99, interval: "month", interval_count: 1 },
      { id: "price_1RUQfIKFCHhvNl8Mj8u6zpZ4", amount: 89.99, interval: "month", interval_count: 3 },
      { id: "price_1RUQFhKFCHhvNl8MHHmRMPwa", amount: 79.99, interval: "month", interval_count: 6 },
      { id: "price_1RUPkKKFCHhvNl8MCRsWyf8j", amount:  69.99, interval: "year", interval_count: 1 },
    ],
  },
];

export const stripeTransactionFees = {
  Online: {
    Lite: "3.9% + $0.50",
    Plus: "3.5% + $0.45",
    Pro: "3.0% + $0.40",
    Extra: "2.9% + $0.30",
  },
};

export const transactionFees = {
  Online: {
    Lite: "2.4%+₦150",
    Plus: "2.1%+₦175",
    Pro: "1.8%+₦200",
    Extra: "1.5%+₦250",
  },
  Offline: {
    Lite: "₦450",
    Plus: "₦400",
    Pro: "₦350",
    Extra: "₦250",
  },
};

export const planFeatures = {
  Lite: [
    "Basic online booking",
    "Calendar sync",
    "Email/SMS reminders",
    "Basic customer database",
    "Basic email templates",
    "Email support",
  ],
  Plus: [
    "Group appointments",
    "Recurring appointments",
    "Resource allocation",
    "Waitlists",
    "5 staff accounts",
    "Inventory management",
    "Low-stock alerts",
    "Promotions",
    "Gift cards",
    "Priority email + chat + Whatsapp support",
  ],
  Pro: [
    "VIP booking prioritization",
    "AI scheduling assistant",
    "Unlimited staff accounts",
    "Multi-location support",
    "Advanced analytics",
    "Membership programs",
    "Loyalty programs",
    "Dedicated account manager",
  ],
  Extra: [
    "Full CRM + segmentation",
    "Custom workflow automation",
    "₦5k ad credits/month",
    "24/7 priority support + onboarding",
    "Premium integrations (Mailchimp, Meta Ads, Google Ads)",
  ],
};

export const coreFeatures = [
  {
    category: "Core Scheduling",
    items: [
      {
        name: "Basic online booking",
        plans: { Lite: true, Plus: true, Pro: true, Extra: true },
      },
      {
        name: "Group appointments",
        plans: { Lite: false, Plus: true, Pro: true, Extra: true },
      },
      {
        name: "Recurring appointments",
        plans: { Lite: false, Plus: true, Pro: true, Extra: true },
      },
      {
        name: "VIP booking prioritization",
        plans: { Lite: false, Plus: false, Pro: true, Extra: true },
      },
      {
        name: "Calendar sync",
        plans: { Lite: true, Plus: true, Pro: true, Extra: true },
      },
      {
        name: "Resource allocation",
        plans: { Lite: false, Plus: true, Pro: true, Extra: true },
      },
      {
        name: "Waitlists",
        plans: { Lite: false, Plus: true, Pro: true, Extra: true },
      },
      {
        name: "AI scheduling assistant",
        plans: { Lite: false, Plus: false, Pro: true, Extra: true },
      },
      {
        name: "Email/SMS reminders",
        plans: { Lite: true, Plus: true, Pro: true, Extra: true },
      },
      {
        name: "Staff accounts",
        plans: {
          Lite: "None",
          Plus: "5",
          Pro: "Unlimited",
          Extra: "Unlimited",
        },
      },
    ],
  },
];

export const paymentFeatures = [
  {
    category: "Payments & POS",
    items: [
      {
        name: "Online",
        subitems: [
          "Accept online payments",
          "POS integration",
          "Automated invoicing",
          "Subscription billing",
        ],
        plans: {
          Lite: [true, false, false, false],
          Plus: [true, true, false, false],
          Pro: [true, true, true, false],
          Extra: [true, true, true, true],
        },
      },
      {
        name: "Offline",
        subitems: [
          "Manual invoice generator",
          "Split payments",
          "Tax automation",
          "Dynamic pricing",
        ],
        plans: {
          Lite: [true, false, false, false],
          Plus: [true, true, false, false],
          Pro: [true, true, true, false],
          Extra: [true, true, true, true],
        },
      },
    ],
  },
];

export const businessTools = [
  {
    name: "Basic customer database",
    plans: { Lite: true, Plus: true, Pro: true, Extra: true },
  },
  {
    name: "Inventory management",
    plans: { Lite: false, Plus: true, Pro: true, Extra: true },
  },
  {
    name: "Multi-location support",
    plans: { Lite: false, Plus: false, Pro: true, Extra: true },
  },
  {
    name: "Custom workflow automation",
    plans: { Lite: false, Plus: false, Pro: false, Extra: true },
  },
  {
    name: "Low-stock alerts",
    plans: { Lite: false, Plus: true, Pro: true, Extra: true },
  },
  {
    name: "Advanced analytics",
    plans: { Lite: false, Plus: false, Pro: true, Extra: true },
  },
];

export const marketingFeatures = [
  {
    name: "Basic email templates",
    plans: { Lite: true, Plus: true, Pro: true, Extra: true },
  },
  {
    name: "Review generation",
    plans: { Lite: false, Plus: true, Pro: true, Extra: true },
  },
  {
    name: "Membership programs",
    plans: { Lite: false, Plus: false, Pro: true, Extra: true },
  },
  {
    name: "Full CRM + segmentation",
    plans: { Lite: false, Plus: false, Pro: false, Extra: true },
  },
  {
    name: "Promotions",
    plans: { Lite: false, Plus: true, Pro: true, Extra: true },
  },
  {
    name: "Gift cards",
    plans: { Lite: false, Plus: true, Pro: true, Extra: true },
  },
  {
    name: "Loyalty programs",
    plans: { Lite: false, Plus: false, Pro: true, Extra: true },
  },
  {
    name: "₦5k ad credits/month",
    plans: { Lite: false, Plus: false, Pro: false, Extra: true },
  },
];

export const integrations = [
  {
    name: "Google Calendar",
    plans: { Lite: true, Plus: true, Pro: true, Extra: true },
  },
  {
    name: "QuickBooks Online",
    plans: { Lite: false, Plus: true, Pro: true, Extra: true },
  },
  {
    name: "Xero",
    plans: { Lite: false, Plus: false, Pro: true, Extra: true },
  },
  {
    name: "Premium: Mailchimp, Meta Ads, Google Ads",
    plans: { Lite: false, Plus: false, Pro: false, Extra: true },
  },
  {
    name: "Zapier",
    plans: { Lite: false, Plus: true, Pro: true, Extra: true },
  },
  {
    name: "API access",
    plans: { Lite: false, Plus: false, Pro: true, Extra: true },
  },
];

export const supportOptions = [
  {
    name: "Email support",
    plans: { Lite: true, Plus: true, Pro: true, Extra: true },
  },
  {
    name: "Priority email + chat + Whatsapp",
    plans: { Lite: false, Plus: true, Pro: true, Extra: true },
  },
  {
    name: "Dedicated account manager",
    plans: { Lite: false, Plus: false, Pro: true, Extra: true },
  },
  {
    name: "24/7 priority + onboarding",
    plans: { Lite: false, Plus: false, Pro: false, Extra: true },
  },
];

export const addOns = [
  {
    name: "AI Analytics Pack",
    prices: ["₦4,500", "₦6,750", "₦10,125", "₦15,888"],
  },
  {
    name: "Custom Domain (Annual)",
    prices: ["₦30,000", "₦30,000", "₦30,000", "₦30,000"],
  },
  {
    name: "Multi-Language",
    prices: ["₦10,000", "₦10,000", "₦10,000", "₦10,000"],
  },
];

export const loanOptions = [
  {
    name: "Loan Offer",
    values: ["Up to ₦100K", "Up to ₦300K", "Up to ₦1M", "Up to ₦5M"],
  },
  {
    name: "Minimum Monthly Volume",
    values: ["₦300K+", "₦500K+", "₦1M+", "₦3M+"],
  },
  {
    name: "Interest Rate",
    values: ["7% Monthly", "5% Monthly", "4% Monthly", "3% Monthly"],
  },
  {
    name: "Repayment Terms",
    values: ["2 months", "2 months", "2 months", "2 months"],
  },
  {
    name: "Flexible Repayments",
    values: [
      "Fixed monthly amount or percentage of daily transactions",
      "Fixed monthly amount or percentage of daily transactions",
      "Fixed monthly amount or percentage of daily transactions",
      "Fixed monthly amount or percentage of daily transactions",
    ],
  },
  {
    name: "Minimum Time on Dimpified",
    values: ["3 months", "4 months", "5 months", "6 months"],
  },
];

export const planSubTitle = {
  Lite: "eCommerce & Scheduling Package",
  Plus: "Store Management & Team Management Package",
  Pro: "Payments & Financial Management Package",
  Extra: "Marketing & Customer Management Package",
};

export const planDescriptions = {
  Lite: "Ideal for freelancers/solo merchants who need scheduling and a web presence.",
  Plus: "Best for small merchants with physical stores and teams.",
  Pro: "Tailored for businesses needing advanced payments and financial control.",
  Extra: "For growth-focused merchants who want CRM and marketing automation.",
};

export const packageNames = {
  Lite: "eCommerce & Scheduling Package",
  Plus: "Store Management & Team Management Package",
  Pro: "Payments & Financial Management Package",
  Extra: "Marketing & Customer Management Package",
};



export const paidPlanSubTitle = {
  Plus: "For growing creators",
  Pro: "For serious creators",
};

export const paidPlanDescriptions = {
  Plus: "Unlock essential tools to grow your content and reach more audience.",
  Pro: "Get all features, advanced analytics, priority support, and unlimited growth tools.",
};

export const paidPlanFeatures = {
  Plus: [
    "Access to basic analytics",
    "Upload up to 50 pieces of content per month",
    "Community engagement tools",
    "Email support",
    "Basic monetization options",
  ],
  Pro: [
    "All features in Plus plan",
    "Advanced analytics & insights",
    "Unlimited content uploads",
    "Priority email & chat support",
    "Advanced monetization options",
    "Collaboration and team management",
    "Custom branding for your ecosystem",
  ],
};
