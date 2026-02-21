import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Check,
  Sparkles,
  Users,
  Store,
  Building,
  Calendar,
  Bell,
  CreditCard,
  Repeat,
  Target,
  Star,
  Package,
  Shield,
  Zap,
  TrendingUp,
  Clock,
  Link as LinkIcon,
  MapPin,
  UserPlus,
  BarChart3,
  Settings,
  Award,
  Headphones,
  Box,
  ArrowRight,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
} from "lucide-react";
import Logo from "./images/dimp-blue.png";
import Navbar from "../../component/Blog/Navbar";
import Footer from "../../component/Blog/Footer";

export default function SubscriptionsPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [activePlan, setActivePlan] = useState("plus");

  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <HeroSection />
      <BillingToggle
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
      />
      <PricingPlans
        billingCycle={billingCycle}
        activePlan={activePlan}
        setActivePlan={setActivePlan}
      />
      <FeatureComparison />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 px-6 lg:px-20 bg-gradient-to-b from-white to-[#FBF1FF]">
      <div className="max-w-6xl mx-auto text-center">
        <span className="inline-flex items-center bg-[#F3E8FF] text-[#9810FA] text-sm font-semibold px-6 py-2 rounded-full mb-6">
          SIMPLE, TRANSPARENT PRICING
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Pick a plan built to fit
          <br />
          <span className="bg-gradient-to-r from-[#9810FA] to-purple-600 bg-clip-text text-transparent">
            your growing business
          </span>
        </h1>

        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Start free, upgrade as you grow. No hidden fees, no long-term
          contracts.
        </p>

        {/* Stats */}
        {/* <div className="flex flex-wrap justify-center gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
            <div className="text-gray-600">Businesses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">30-day</div>
            <div className="text-gray-600">Money Back</div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

const BillingToggle = ({ billingCycle, setBillingCycle }) => {
  return (
    <section className="py-8 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200 inline-flex mb-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-[#9810FA] to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                billingCycle === "annual"
                  ? "bg-gradient-to-r from-[#9810FA] to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Annual Billing
              <span className="text-xs bg-white text-[#9810FA] px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
          <p className="text-gray-600 text-sm">
            Switch anytime. No hidden fees, cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

const PricingPlans = ({ billingCycle, activePlan, setActivePlan }) => {
  const plans = [
    {
      id: "Free",
      name: "Free Plan",
      tagline: "For solopreneurs and small businesses",
      icon: <Sparkles className="w-6 h-6" />,
      price: billingCycle === "annual" ? "Free" : "Free",
      billing: "",
      description:
        "Perfect for solopreneurs who want to show services and get booked",
      features: [
        { text: "Service listing page", icon: <Check className="w-4 h-4" /> },
        {
          text: "Booking link for social media",
          icon: <Check className="w-4 h-4" />,
        },
        { text: "Google Calendar sync", icon: <Check className="w-4 h-4" /> },
        { text: "Auto booking reminders", icon: <Check className="w-4 h-4" /> },
        {
          text: "Direct bank account payments",
          icon: <Check className="w-4 h-4" />,
        },
      ],
      cta: "Start Free",
      link: "/free/auth/pre-signup", // Lite plan specific link
      popular: false,
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: "Lite",
      name: "Lite Plan",
      tagline: "For growing businesses with physical stores",
      icon: <Store className="w-6 h-6" />,
      price: billingCycle === "annual" ? "₦45,000" : "₦4,500",
      billing:
        billingCycle === "annual" ? "per year (save ₦9,000)" : "per month",
      description: "For businesses with physical stores and multiple staff",
      features: [
        {
          text: "Everything in Free Plan +",
          icon: <Check className="w-4 h-4" />,
        },
        {
          text: "Professional website landing page",
          icon: <Check className="w-4 h-4" />,
        },
        {
          text: "Unlimited auto booking reminders",
          icon: <Check className="w-4 h-4" />,
        },
        { text: "Recurring appointments", icon: <Check className="w-4 h-4" /> },
        {
          text: "Staff onboarding & management",
          icon: <Check className="w-4 h-4" />,
        },
        { text: "Group appointments", icon: <Check className="w-4 h-4" /> },
        {
          text: "Direct bank account payments",
          icon: <Check className="w-4 h-4" />,
        },
        {
          text: "Regular feature updates",
          icon: <Check className="w-4 h-4" />,
        },
      ],
      cta: "Get Started",
      link: "/auth/personal-Information", // Plus and Pro plan link
      popular: true,
      color: "from-purple-500 to-pink-500",
    },
    // {
    //   id: "pro",
    //   name: "Pro Plan",
    //   tagline: "For multi-location businesses & teams",
    //   icon: <Building className="w-6 h-6" />,
    //   price: billingCycle === "annual" ? "₦67,500" : "₦6,750",
    //   billing:
    //     billingCycle === "annual" ? "per year (save ₦13,500)" : "per month",
    //   description:
    //     "Track your business across multiple physical stores and teams",
    //   features: [
    //     {
    //       text: "Everything in Plus Plan +",
    //       icon: <Check className="w-4 h-4" />,
    //     },
    //     {
    //       text: "VIP booking prioritization",
    //       icon: <Check className="w-4 h-4" />,
    //     },
    //     {
    //       text: "Unlimited staff accounts",
    //       icon: <Check className="w-4 h-4" />,
    //     },
    //     { text: "Multi-location support", icon: <Check className="w-4 h-4" /> },
    //     { text: "Membership programs", icon: <Check className="w-4 h-4" /> },
    //     {
    //       text: "Dedicated account manager",
    //       icon: <Check className="w-4 h-4" />,
    //     },
    //     { text: "Inventory management", icon: <Check className="w-4 h-4" /> },
    //     {
    //       text: "Advanced analytics dashboard",
    //       icon: <Check className="w-4 h-4" />,
    //     },
    //   ],
    //   cta: "Get Started",
    //   link: "/auth/personal-Information", // Plus and Pro plan link
    //   popular: false,
    //   color: "from-indigo-500 to-blue-500",
    // },
  ];

  return (
    <section className="py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-2xl border-2 ${
                plan.popular
                  ? "border-[#9810FA] shadow-2xl transform scale-[1.02]"
                  : "border-gray-200 shadow-lg"
              } bg-white overflow-hidden hover:shadow-xl transition-all duration-300`}
              onClick={() => setActivePlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-[#9810FA] to-purple-600 text-white text-xs font-bold px-6 py-2 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`inline-flex items-center justify-center bg-gradient-to-br ${plan.color} p-3 rounded-xl`}
                  >
                    <div className="text-white">{plan.icon}</div>
                  </div>
                  {plan.popular && (
                    <span className="text-xs font-semibold bg-[#F3E8FF] text-[#9810FA] px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.tagline}</p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-2">{plan.billing}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-green-50 p-1 rounded-full mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Link to={plan.link}>
                  <button
                    className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-[#9810FA] to-purple-600 text-white hover:shadow-lg"
                        : "border-2 border-[#9810FA] text-[#9810FA] hover:bg-[#9810FA] hover:text-white"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </Link>

                <p className="text-center text-gray-500 text-xs mt-4">
                  {plan.id === "lite"
                    ? "No credit card required"
                    : "14-day free trial"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plan Comparison */}
        <div className="mt-16 bg-gradient-to-r from-[#9810FA]/5 to-purple-600/5 rounded-2xl p-8 border border-purple-100">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Not sure which plan is right for you?
              </h3>
              <p className="text-gray-600 mb-6">
                Most businesses start with Plus and upgrade to Pro as they grow.
                Start with our 14-day free trial—no commitment required.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#9810FA]" />
                  <span className="text-sm text-gray-700">
                    30-day money-back guarantee
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#9810FA]" />
                  <span className="text-sm text-gray-700">Cancel anytime</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">
                  Need help choosing?
                </h4>
                <p className="text-gray-600 text-sm mb-6">
                  Chat with our sales team to find the perfect plan for your
                  business needs.
                </p>
                <Link to="/contact">
                  <button className="w-full py-3 border-2 border-[#9810FA] text-[#9810FA] rounded-lg font-semibold hover:bg-[#9810FA] hover:text-white transition-all">
                    Talk to Sales
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureComparison = () => {
  const features = [
    {
      category: "Core Features",
      items: [
        { name: "Service Listing Page", lite: true, plus: true, pro: true },
        { name: "Booking Link", lite: true, plus: true, pro: true },
        { name: "Google Calendar Sync", lite: true, plus: true, pro: true },
        {
          name: "Auto Booking Reminders",
          lite: false,
          plus: "1 SMS and 1 Email per booking",
          pro: "2 SMS and 2 Email per booking",
        },
        { name: "Direct Bank Payments", lite: true, plus: true, pro: true },
      ],
    },
    {
      category: "Business Management",
      items: [
        { name: "Professional Website", lite: false, plus: true, pro: true },
        { name: "Staff Management", lite: false, plus: "3", pro: "Unlimited" },
        { name: "Recurring Appointments", lite: false, plus: true, pro: true },
        { name: "Group Appointments", lite: false, plus: true, pro: true },
        { name: "Multi-location Support", lite: false, plus: false, pro: true },
      ],
    },
    // {
    //   category: "Growth Features",
    //   items: [
    //     { name: "VIP Booking", lite: false, plus: false, pro: true },
    //     { name: "Membership Programs", lite: false, plus: false, pro: true },
    //     { name: "Inventory Management", lite: false, plus: false, pro: true },
    //     { name: "Advanced Analytics", lite: false, plus: false, pro: true },
    //     { name: "Dedicated Support", lite: false, plus: false, pro: true },
    //   ],
    // },
  ];

  return (
    <section className="py-20 px-6 lg:px-20 bg-[#FBF1FF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Compare All Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how each plan scales with your business needs
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-[#9810FA] to-purple-600 text-white">
                <th className="p-6 text-left rounded-tl-2xl">Feature</th>
                <th className="p-6 text-center">Free</th>
                <th className="p-6 text-center bg-purple-700">Lite</th>
                {/* <th className="p-6 text-center rounded-tr-2xl">Pro</th> */}
              </tr>
            </thead>
            <tbody>
              {features.map((category, catIndex) => (
                <React.Fragment key={catIndex}>
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="p-4">
                      <h3 className="font-bold text-gray-900">
                        {category.category}
                      </h3>
                    </td>
                  </tr>
                  {category.items.map((item, itemIndex) => (
                    <tr
                      key={itemIndex}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4 text-gray-700">{item.name}</td>
                      <td className="p-4 text-center">
                        {item.lite === true ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : item.lite === false ? (
                          <span className="text-gray-400">—</span>
                        ) : (
                          <span className="text-sm text-gray-600">
                            {item.lite}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center bg-purple-50">
                        {item.plus === true ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : item.plus === false ? (
                          <span className="text-gray-400">—</span>
                        ) : (
                          <span className="text-sm text-gray-600">
                            {item.plus}
                          </span>
                        )}
                      </td>
                      {/* <td className="p-4 text-center">
                        {item.pro === true ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : item.pro === false ? (
                          <span className="text-gray-400">—</span>
                        ) : (
                          <span className="text-sm text-gray-600">
                            {item.pro}
                          </span>
                        )}
                      </td> */}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Can I switch plans later?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No setup fees. All plans include free setup and migration assistance to get you started quickly.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, bank transfers, and other local payment methods available in your region.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Absolutely. You can cancel your subscription at any time, and you'll continue to have access until the end of your billing period.",
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer:
        "Yes! Save 20% when you choose annual billing. You get all the same features at a significantly lower price.",
    },
    {
      question: "What happens after my free trial?",
      answer:
        "After your 14-day free trial, you can choose any plan that fits your needs. We'll notify you before your trial ends so you can decide.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 lg:px-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Everything you need to know about our subscriptions
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-5 h-5 text-[#9810FA]" />
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                </div>
                <span
                  className={`text-[#9810FA] text-xl font-bold transition-transform duration-300 ${
                    activeIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Still have questions about pricing or features?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="px-6 py-3 border-2 border-[#9810FA] text-[#9810FA] rounded-full font-semibold hover:bg-[#9810FA] hover:text-white transition-all duration-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat with Sales
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-6 py-3 bg-gradient-to-r from-[#9810FA] to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Schedule a Call
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-20 px-6 lg:px-20 bg-gradient-to-r from-[#9810FA] to-purple-700">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to transform your business?
              </h2>
              <p className="text-gray-600 mb-8">
                Join thousands of service professionals who are growing their
                business with Dimpified. Start with our 14-day free trial—no
                credit card required.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">No setup fees</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Cancel anytime</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">
                    30-day money-back guarantee
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-[#F3E8FF] to-pink-50 rounded-2xl p-8 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Start Free Today
                </h3>
                <p className="text-gray-600 mb-6">No credit card required</p>
                <Link to="/free/auth/pre-signup">
                  <button className="w-full py-4 bg-gradient-to-r from-[#9810FA] to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2">
                    Get Started Free for 14 Days
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
              <p className="text-gray-500 text-sm">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-[#9810FA] hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};