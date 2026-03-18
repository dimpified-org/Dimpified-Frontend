import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { initializeGA, logPageView } from "../api/analytics";
import Logo from "../pages/LandingPages/images/dimp-blue.png";
import { CountryProvider } from "../pages/pricing/CountryContext";

const DimpLanding = lazy(() => import("../pages/LandingPages/DimpLanding"));
// const CustomerLanding = lazy(() =>
//   import("../pages/LandingPages/CustomerLanding")
// );
const FreeBookingPage = lazy(
  () => import("../pages/Templates/FreeBookingPage"),
);

const BookQuickServices = lazy(
  () => import("../pages/LandingPages/BookQuickServices"),
);
const About = lazy(() => import("../pages/LandingPages/About"));

const Team = lazy(() => import("../pages/LandingPages/Team"));
const MerchantOnboarding = lazy(
  () => import("../pages/LandingPages/MerchantOnboarding"),
);
const BarberOnboarding = lazy(
  () => import("../pages/LandingPages/BarberOnboarding"),
);
const HairdresserOnboarding = lazy(
  () => import("../pages/LandingPages/HairdresserOnboarding"),
);
const MakeupOnboarding = lazy(
  () => import("../pages/LandingPages/MakeupOnboarding"),
);
const SpaOnboarding = lazy(() => import("../pages/LandingPages/SpaOnboarding"));
const NailOnboarding = lazy(
  () => import("../pages/LandingPages/NailOnboarding"),
);
const GymOnboarding = lazy(() => import("../pages/LandingPages/GymOnboarding"));
const DentistOnboarding = lazy(
  () => import("../pages/LandingPages/DentistOnboarding"),
);

//PAID TEMPLATES

const MinimalistTemplate = lazy(
  () => import("../pages/PaidTemplates/MinimalistTemplate"),
);

const PaidBookingPage = lazy(
  () => import("../pages/PaidTemplates/PaidBookingPage"),
);

const SubtleGrayTemplate = lazy(
  () => import("../pages/PaidTemplates/SubtleGrayTemplate"),
);
const LightBlushTemplate = lazy(
  () => import("../pages/PaidTemplates/LightBlushTemplate"),
);

//REDIRECT PAGES
const BarbersRedirect = lazy(
  () => import("../pages/Onboarding/BarbersRedirect"),
);
const HairdressersRedirect = lazy(
  () => import("../pages/Onboarding/HairdressersRedirect"),
);
const MakeupRedirect = lazy(() => import("../pages/Onboarding/MakeupRedirect"));
const NailRedirect = lazy(() => import("../pages/Onboarding/NailRedirect"));
const GymRedirect = lazy(() => import("../pages/Onboarding/GymRedirect"));

const DentistRedirect = lazy(
  () => import("../pages/Onboarding/DentistRedirect"),
);
const SpaRedirect = lazy(() => import("../pages/Onboarding/SpaRedirect"));

//US ONBOARDING PAGES

const USBarberOnboarding = lazy(
  () => import("../pages/Onboarding/USBarberOnboarding"),
);
const USHairdresserOnboarding = lazy(
  () => import("../pages/Onboarding/USHairdresserOnboarding"),
);
const USMakeupOnboarding = lazy(
  () => import("../pages/Onboarding/USMakeupOnboarding"),
);
const USSpaOnboarding = lazy(
  () => import("../pages/Onboarding/USSpaOnboarding"),
);
const USGymOnboarding = lazy(
  () => import("../pages/Onboarding/USGymOnboarding"),
);
const USDentistOnboarding = lazy(
  () => import("../pages/Onboarding/USDentistOnboarding"),
);
const USNailOnboarding = lazy(
  () => import("../pages/Onboarding/USNailOnboarding"),
);

//Ca ONBOARDING PAGES

const CaBarberOnboarding = lazy(
  () => import("../pages/Onboarding/CaBarberOnboarding"),
);
const CaHairdresserOnboarding = lazy(
  () => import("../pages/Onboarding/CaHairdresserOnboarding"),
);
const CaMakeupOnboarding = lazy(
  () => import("../pages/Onboarding/CaMakeupOnboarding"),
);
const CaSpaOnboarding = lazy(
  () => import("../pages/Onboarding/CaSpaOnboarding"),
);
const CaGymOnboarding = lazy(
  () => import("../pages/Onboarding/CaGymOnboarding"),
);
const CaDentistOnboarding = lazy(
  () => import("../pages/Onboarding/CaDentistOnboarding"),
);
const CaNailOnboarding = lazy(
  () => import("../pages/Onboarding/CaNailOnboarding"),
);

//POLICY AND TERMS
const PrivacyPolicy = lazy(() => import("../pages/LandingPages/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("../pages/LandingPages/RefundPolicy"));
const TermsOfService = lazy(
  () => import("../pages/LandingPages/TermsOfService"),
);

const BarberLanding = lazy(() => import("../pages/LandingPages/BarberLanding"));
const FindBarber = lazy(() => import("../pages/LandingPages/FindBarber"));
const HairDresserLanding = lazy(
  () => import("../pages/LandingPages/HairDresserLanding"),
);

const Pricing = lazy(() => import("../pages/pricing/Pricing"));
const UsaPricing = lazy(() => import("../pages/pricing/UsaPricing"));
const UkPricing = lazy(() => import("../pages/pricing/UkPricing"));
const EuPricing = lazy(() => import("../pages/pricing/EuPricing"));
const CadPricing = lazy(() => import("../pages/pricing/CadPricing"));
const GhanaPricing = lazy(() => import("../pages/pricing/GhanaPricing.jsx"));
const LiberiaPricing = lazy(
  () => import("../pages/pricing/LiberiaPricing.jsx"),
);
const SierraLeonePricing = lazy(
  () => import("../pages/pricing/SierraLeonePricing.jsx"),
);
const GambiaPricing = lazy(() => import("../pages/pricing/GambiaPricing.jsx"));
const SouthAfricaPricing = lazy(
  () => import("../pages/pricing/SouthAfricaPricing.jsx"),
);
const NamibiaPricing = lazy(
  () => import("../pages/pricing/NamibiaPricing.jsx"),
);
const BotswanaPricing = lazy(
  () => import("../pages/pricing/BotswanaPricing.jsx"),
);
const ZimbabwePricing = lazy(
  () => import("../pages/pricing/ZimbabwePricing.jsx"),
);
const KenyaPricing = lazy(() => import("../pages/pricing/KenyaPricing.jsx"));
const TanzaniaPricing = lazy(
  () => import("../pages/pricing/TanzaniaPricing.jsx"),
);
const UgandaPricing = lazy(() => import("../pages/pricing/UgandaPricing.jsx"));
const RwandaPricing = lazy(() => import("../pages/pricing/RwandaPricing.jsx"));
const EthiopiaPricing = lazy(
  () => import("../pages/pricing/EthiopiaPricing.jsx"),
);
const IndiaPricing = lazy(() => import("../pages/pricing/IndiaPricing.jsx"));
const SingaporePricing = lazy(
  () => import("../pages/pricing/SingaporePricing.jsx"),
);
const PhilippinesPricing = lazy(
  () => import("../pages/pricing/PhilippinesPricing.jsx"),
);
const MalaysiaPricing = lazy(
  () => import("../pages/pricing/MalaysiaPricing.jsx"),
);
const GlobalPricing = lazy(() => import("../pages/pricing/GlobalPricing"));
const PricingRedirect = lazy(() => import("../pages/pricing/PricingRedirect"));
const LandingHelpCenter = lazy(
  () => import("../pages/support/LandingHelpCenter"),
);
const MakeUpLanding = lazy(() => import("../pages/LandingPages/MakeUpLanding"));
const FindHairStylist = lazy(
  () => import("../pages/LandingPages/FindHairStylist"),
);
const ServiceSelector = lazy(
  () => import("../pages/LandingPages/SelectServices"),
);

const NailLanding = lazy(() => import("../pages/LandingPages/NailStudios"));
const FindMakeUp = lazy(() => import("../pages/LandingPages/FindMakeup"));
const SpaLanding = lazy(() => import("../pages/LandingPages/SpaLanding"));
const GymLanding = lazy(() => import("../pages/LandingPages/GymLanding"));
const DentistLanding = lazy(
  () => import("../pages/LandingPages/DentistLanding"),
);
const FindSpa = lazy(() => import("../pages/LandingPages/FindSpa"));
const FindGym = lazy(() => import("../pages/LandingPages/FindGym"));
const FindDentist = lazy(() => import("../pages/LandingPages/FindDentist"));

const MerchantBannerWithQR = lazy(
  () => import("../features/Banner/MerchantBannerWithQR"),
);

const MakeupTemplate = lazy(
  () => import("../pages/Templates/PersonalCare/makeup/MakeupTemplate"),
);
const ThirdMakeup = lazy(
  () => import("../pages/Templates/PersonalCare/makeup/ThirdMakeup"),
);
const FourthMakeup = lazy(
  () => import("../pages/Templates/PersonalCare/makeup/FourthMakeup"),
);
const FifthMakeup = lazy(
  () => import("../pages/Templates/PersonalCare/makeup/FifthMakeup"),
);
const BarberMordern = lazy(
  () => import("../pages/Templates/PersonalCare/Barber/BarberModern"),
);

const BarberGents = lazy(
  () => import("../pages/Templates/PersonalCare/Barber/BarberGents"),
);
const WeddingTemplate = lazy(
  () => import("../pages/Templates/Event-Services/Wedding"),
);
const BarberPosh = lazy(
  () => import("../pages/Templates/PersonalCare/Barber/BarberPosh"),
);
const BarberFourth = lazy(
  () => import("../pages/Templates/PersonalCare/Barber/BarberFourth"),
);
const BlankTemplate = lazy(
  () => import("../pages/Templates/Blank-Template/BlankTemplate"),
);
const BarberFresh = lazy(
  () => import("../pages/Templates/PersonalCare/Barber/BarberFresh"),
);
const Barber2 = lazy(
  () => import("../pages/Templates/PersonalCare/Barber/Barber2"),
);
const HairstylistTemplate = lazy(
  () => import("../pages/Templates/HairstylistTemplate"),
);
const SecondStylist = lazy(
  () => import("../pages/Templates/PersonalCare/Hairstylist/SecondStylist"),
);
const SecondMakeup = lazy(
  () => import("../pages/Templates/PersonalCare/makeup/SecondMakeup"),
);
const FourthStylist = lazy(
  () => import("../pages/Templates/PersonalCare/Hairstylist/FourthStylist"),
);
const ThirdStylist = lazy(
  () => import("../pages/Templates/PersonalCare/Hairstylist/ThirdStylist"),
);
const FifthStylist = lazy(
  () => import("../pages/Templates/PersonalCare/Hairstylist/FifthStylist"),
);
const SixthStylist = lazy(
  () => import("../pages/Templates/PersonalCare/Hairstylist/SixthStylist"),
);
const SeventhStylist = lazy(
  () => import("../pages/Templates/PersonalCare/Hairstylist/SeventhStylist"),
);
const EighthStylist = lazy(
  () => import("../pages/Templates/PersonalCare/Hairstylist/EighthStylist"),
);

// NAIL IMPORTS
const FirstNail = lazy(
  () => import("../pages/Templates/PersonalCare/nail/NailsTemplate"),
);
const FindNail = lazy(() => import("../pages/LandingPages/FindNail"));
const SecondNail = lazy(
  () => import("../pages/Templates/PersonalCare/nail/SecondNail"),
);
const ThirdNail = lazy(
  () => import("../pages/Templates/PersonalCare/nail/ThirdNail"),
);
const FourthNail = lazy(
  () => import("../pages/Templates/PersonalCare/nail/FourthNail"),
);
const FifthNail = lazy(
  () => import("../pages/Templates/PersonalCare/nail/FifthNail"),
);
const SixthNail = lazy(
  () => import("../pages/Templates/PersonalCare/nail/SixthNail"),
);

// GYM IMPORTS
const GymTemplate = lazy(
  () => import("../pages/Templates/PersonalCare/gym/GymTemplate"),
);
const SecondGym = lazy(
  () => import("../pages/Templates/PersonalCare/gym/SecondGym"),
);
const ThirdGym = lazy(
  () => import("../pages/Templates/PersonalCare/gym/ThirdGym"),
);

const FourthGym = lazy(
  () => import("../pages/Templates/PersonalCare/gym/FourthGym"),
);
const FifthGym = lazy(
  () => import("../pages/Templates/PersonalCare/gym/FifthGym"),
);
const SixthGym = lazy(
  () => import("../pages/Templates/PersonalCare/gym/SixthGym"),
);
const SeventhGym = lazy(
  () => import("../pages/Templates/PersonalCare/gym/SeventhGym"),
);

const FirstSpa = lazy(
  () => import("../pages/Templates/PersonalCare/spa/FirstSpa"),
);
const SecondSpa = lazy(
  () => import("../pages/Templates/PersonalCare/spa/SecondSpa"),
);
const ThirdSpa = lazy(
  () => import("../pages/Templates/PersonalCare/spa/ThirdSpa"),
);
const FourthSpa = lazy(
  () => import("../pages/Templates/PersonalCare/spa/FourthSpa"),
);
const FifthSpa = lazy(
  () => import("../pages/Templates/PersonalCare/spa/FifthSpa"),
);
const SixthSpa = lazy(
  () => import("../pages/Templates/PersonalCare/spa/SixthSpa"),
);
const SeventhSpa = lazy(
  () => import("../pages/Templates/PersonalCare/spa/SeventhSpa"),
);
const EighthSpa = lazy(
  () => import("../pages/Templates/PersonalCare/spa/EighthSpa"),
);

const FirstDentist = lazy(
  () => import("../pages/Templates/PersonalCare/dental/FirstDentist"),
);
const SecondDentist = lazy(
  () => import("../pages/Templates/PersonalCare/dental/SecondDentist"),
);
const ThirdDentist = lazy(
  () => import("../pages/Templates/PersonalCare/dental/ThirdDentist"),
);
const FourthDentist = lazy(
  () => import("../pages/Templates/PersonalCare/dental/FourthDentist"),
);
const FifthDentist = lazy(
  () => import("../pages/Templates/PersonalCare/dental/FifthDentist"),
);
// import HairstylistTemplate from "../pages/Templates/HairstylistTemplate";

const InvestorLanding = lazy(
  () => import("../pages/LandingPages/InvestorLanding"),
);

import UserLogin from "../pages/Anthentication/RegisterUser/UserLogin";

// TEAM MEMBER AUTH
import TeamUserSignUp from "../pages/Anthentication/TeamAuthentication/TeamUserSignUp";

import Overview from "../pages/CreatorDashBoard/Overview";
import AgentPage from "../pages/Affiiate/AgentPage";
import AgentPageAuthForm from "../pages/Affiiate/Authentication/AgentPageAuthForm";
import EmailVerify from "../pages/Affiiate/Authentication/VerifyEmail";
import AffiliateResetPassword from "../pages/Affiiate/Authentication/ResetPassword";
import RegistrationSuccess from "../pages/Affiiate/Authentication/RegistrationSuccess";
import AffliateDashboardIndex from "../pages/Affiiate/Dashboard/AgentDashboardIndex";
import AffiliateOverview from "../pages/Affiiate/Dashboard/AgentOverview";
import AffiliateMyUser from "../pages/Affiiate/Dashboard/AgentMyUser";
import AffiliateContractPage from "../pages/Affiiate/Dashboard/AgentContractPage";
import AffiliateWithdrawPayment from "../pages/Affiiate/Dashboard/WithdrawRequest";
import AffiliateOnboarding from "../pages/Affiiate/Dashboard/AgentOnboarding";

import ProfilePage from "../pages/Affiiate/Dashboard/ProfilePage";
import LoginModal from "./Modal/LoginModal";
import ForgotPassword from "../pages/Anthentication/RegisterUser/ForgetPassword";
import ResetPassword from "../pages/Anthentication/RegisterUser/NewPassword";
import EmailSignIn from "../pages/Anthentication/RegisterUser/EmailLogin";

import VerifyPasswordCode from "../pages/Anthentication/RegisterUser/VerifyPasswordCode";
import Payments from "../pages/CreatorDashBoard/Payments";
import Booking from "../pages/CreatorDashBoard/Booking";
import EditTemplate from "../pages/CreatorDashBoard/EditTemplate";
import EditService from "../pages/CreatorDashBoard/EditService";

import getSubdomain from "../helper/getSubdomain";
import MainTemplate from "../pages/UserTemplate/MainTemplate";
import CreateNewService from "./dashboard/editService/CreateNewService";
import CreatedServices from "./dashboard/editService/CreatedService";
import VideoGallery from "../pages/CreatorDashBoard/Watchdemo";
import CreatorProfile from "../pages/CreatorDashBoard/CreatorProfile";
import HelpCenter from "../pages/CreatorDashBoard/HelpCenter";
import UpdateSubscription from "../pages/CreatorDashBoard/UpgradeSubcription";
import Notification from "../pages/CreatorDashBoard/Notification";
import { ProtectedRoute } from "./ProtectedRoute";
import ManageCustomer from "../pages/CreatorDashBoard/ManageCustomer";
import Teams from "../pages/CreatorDashBoard/Teams";
import SupportTicket from "../pages/CreatorDashBoard/SupportTicket";
import BlockTime from "./dashboard/booking/BlockTimeOff/BlockTime";
import TeamMemberProfile from "../pages/CreatorDashBoard/TeamMemberProfile";
import Google from "../pages/Google/Google";
import SuccessPage from "./StripePricing/StripeSuccess";

//New Auth Import
import BasicInfo from "../pages/NewAuthentication/PersonalInfo/BasicInfo";
import EmailVerification from "../pages/NewAuthentication/PersonalInfo/EmailVerification";
import BusinessType from "../pages/NewAuthentication/PersonalInfo/BusinessType";
import BusinessInfo from "../pages/NewAuthentication/PersonalInfo/BusinessInfo";
import SelectTemplate from "../pages/NewAuthentication/SelectTemplateAndPayment/SelectTemplate";
import PreviewTemplate from "../pages/NewAuthentication/SelectTemplateAndPayment/PreviewTemplate";
import Subscriptions from "../pages/NewAuthentication/SelectTemplateAndPayment/Subscriptions";
import OnboardEditTemplate from "../pages/NewAuthentication/EditTemplate/OnboardEditTemplate";
import OnboardingPreviewTemplate from "../pages/NewAuthentication/EditTemplate/OnboardingPreviewTemplate";
import AuthLayout from "../pages/NewAuthentication/AuthLayout";
import WebsiteUnavailableModal from "./Modal/WebsiteUnavailableModal";

import BookQuickServicesNew from "../pages/Templates/General/BookQuickServicesNew";

// New Landing Pages
import NewLanding from "../pages/LandingPages/NewLandingPage";
import NewAboutPage from "../pages/LandingPages/NewAboutPage";
import FeaturesPage from "../pages/LandingPages/NewFeaturesPage";
import SubscriptionsPage from "../pages/LandingPages/NewSubscriptionPage";

// BLOG
import BlogLandingPage from "./Blog/BlogLandingPage";
import AllBlogsPage from "./Blog/AllBlogs";
import AboutBlog from "./Blog/AboutBlog";
import ContactPage from "./Blog/Contact";
import SingleBlogPage from "./Blog/SingleBlogPage";
import ErrorBlog from "./Blog/ErrorBlog";

// Free Booking
import FreeOnboardingLanding from "../pages/Anthentication/FreeBooking/FreeOnboardingLanding";
import FreeOnboardingPreSignup from "../pages/Anthentication/FreeBooking/FreeOnboardingPreSignup";
// import FreeOnboardingLayout from "../pages/Anthentication/FreeBooking/FreeOnboardingSteps/FreeOnboardingLayout";
import FreeOnboardingPersonalInfo from "../pages/Anthentication/FreeBooking/FreeOnboardingSteps/FreeOnboardingPersonalInfo";
import FreeOnboardingEmailVerification from "../pages/Anthentication/FreeBooking/FreeOnboardingSteps/FreeOnboardingEmailVerification";
import FreeOnboardingSetupOne from "../pages/Anthentication/FreeBooking/FreeOnboardingSteps/FreeBookingSetup/FreeOnboardingSetupOne";
import FreeOnboardingSetupTwo from "../pages/Anthentication/FreeBooking/FreeOnboardingSteps/FreeBookingSetup/FreeOnboardingSetupTwo";
import FreeOnboardingSetupThree from "../pages/Anthentication/FreeBooking/FreeOnboardingSteps/FreeBookingSetup/FreeOnboardingSetupThree";
import FreeOnboardingReview from "../pages/Anthentication/FreeBooking/FreeOnboardingSteps/FreeOnboardingReview";
import FreeOverview from "../pages/FreeCreatorDashboard/Overview";
import FreeAllBookings from "../pages/FreeCreatorDashboard/FreeBookings";
import FreeCreatorProfile from "../pages/FreeCreatorDashboard/FreeCreatorProfile";
import ManageServices from "../pages/FreeCreatorDashboard/FreeManageService";
import PaidOnboardingPreSignup from "../pages/Anthentication/PaidBooking/PaidOnboardingPreSignup";
import PaidOnboardingPersonalInfo from "../pages/Anthentication/PaidBooking/PaidOnboardingSteps/PaidOnboardingPersonalInfo";
import PaidOnboardingEmailVerification from "../pages/Anthentication/PaidBooking/PaidOnboardingSteps/PaidOnboardingEmailVerification";
import PaidOnboardingSetupOne from "../pages/Anthentication/PaidBooking/PaidOnboardingSteps/PaidBookingSetup/PaidOnboardingSetupOne";
import PaidOnboardingSetupTwo from "../pages/Anthentication/PaidBooking/PaidOnboardingSteps/PaidBookingSetup/PaidOnboardingSetupTwo";
import PaidOnboardingSetupThree from "../pages/Anthentication/PaidBooking/PaidOnboardingSteps/PaidBookingSetup/PaidOnboardingSetupThree";
import PaidOnboardingReview from "../pages/Anthentication/PaidBooking/PaidOnboardingSteps/PaidOnboardingReview";
import PaidSelectTemplate from "../pages/Anthentication/PaidBooking/PaidOnboardingSteps/PaidSelectTemplate";
import PaidPreviewTemplate from "../pages/Anthentication/PaidBooking/PaidOnboardingSteps/PaidPreviewTemplate";
import PaidSubscription from "../pages/Anthentication/PaidBooking/PaidOnboardingSteps/PaidSubcription";

const TrackPageView = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const AllRoutes = () => {
  const ecosystemDomain = getSubdomain();
  useEffect(() => {
    initializeGA();
  }, []);

  useEffect(() => {
    // Optional: Add logic to remove the loading animation after a delay
    const timer = setTimeout(() => {
      const logoSpinner = document.getElementById("logo-spinner");
      if (logoSpinner) {
        logoSpinner.style.display = "none";
      }
    }, 3000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <TrackPageView />
      <CountryProvider>
        <Suspense
          fallback={
            <div
              id="logo-spinner"
              className="fixed inset-0 flex items-center justify-center z-50 bg-white"
            >
              {/* Logo or icon to animate */}
              <div className="animate-pulse h-24 w-24" id="logo-animation">
                <img src={Logo} alt="Logo" className="w-96 h-auto" />
              </div>
            </div>
          }
        >
          <Routes>
            {ecosystemDomain ? (
              <Route
                path="/"
                element={<MainTemplate subdomain={ecosystemDomain} />}
              />
            ) : (
              <Route path="/old-landing" element={<DimpLanding />} />
            )}
            <Route path="/merchants" element={<DimpLanding />} />
            <Route path="/invest" element={<InvestorLanding />} />
            <Route path="/paid/:subdomain" element={<PaidBookingPage />} />
            <Route path="/:subdomain" element={<FreeBookingPage />} />
            <Route
              path="/merchants/banner"
              element={<MerchantBannerWithQR />}
            />
            {/* New Landings */}
            <Route path="/" element={<NewLanding />} />
           
            <Route path="/about-dimpified" element={<NewAboutPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            {/* New Landings End */}
            {/* New Paid Templates */}
            <Route
              path="/paid-templates/minimalist"
              element={<MinimalistTemplate />}
            />
            <Route
              path="/paid-templates/subtle-gray"
              element={<SubtleGrayTemplate />}
            />
            <Route
              path="/paid-templates/light-blush"
              element={<LightBlushTemplate />}
            />
            {/* New {/* New Landings End */}
            <Route path="/barbers/onboarding" element={<BarbersRedirect />} />
            <Route path="/makeup/onboarding" element={<MakeupRedirect />} />
            <Route path="/spa/onboarding" element={<SpaRedirect />} />
            <Route path="/dentist/onboarding" element={<DentistRedirect />} />
            <Route path="/gym/onboarding" element={<GymRedirect />} />
            <Route path="/nails/onboarding" element={<NailRedirect />} />
            <Route
              path="/hairdressers/onboarding"
              element={<HairdressersRedirect />}
            />
            {/*US ONBOARDING ROUTES */}
            <Route
              path="/us/barbers/onboarding"
              element={<USBarberOnboarding />}
            />{" "}
            <Route
              path="/us/hairdressers/onboarding"
              element={<USHairdresserOnboarding />}
            />{" "}
            <Route path="/us/nails/onboarding" element={<USNailOnboarding />} />{" "}
            <Route
              path="/us/dentist/onboarding"
              element={<USDentistOnboarding />}
            />{" "}
            <Route
              path="/us/makeup/onboarding"
              element={<USMakeupOnboarding />}
            />{" "}
            <Route path="/us/spa/onboarding" element={<USSpaOnboarding />} />{" "}
            <Route path="/us/gym/onboarding" element={<USGymOnboarding />} />{" "}
            {/*Ca ONBOARDING ROUTES */}
            <Route
              path="/ca/barbers/onboarding"
              element={<CaBarberOnboarding />}
            />{" "}
            <Route
              path="/ca/hairdressers/onboarding"
              element={<CaHairdresserOnboarding />}
            />{" "}
            <Route path="/ca/nails/onboarding" element={<CaNailOnboarding />} />{" "}
            <Route
              path="/ca/dentist/onboarding"
              element={<CaDentistOnboarding />}
            />{" "}
            <Route
              path="/ca/makeup/onboarding"
              element={<CaMakeupOnboarding />}
            />{" "}
            <Route path="/ca/spa/onboarding" element={<CaSpaOnboarding />} />{" "}
            <Route path="/ca/gym/onboarding" element={<CaGymOnboarding />} />{" "}
            <Route
              path="/book-instant-services"
              element={<BookQuickServices />}
            />{" "}
            <Route path="/old-about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route
              path="/merchants/onboarding"
              element={<MerchantOnboarding />}
            />
            <Route
              path="/ng/barbers/onboarding"
              element={<BarberOnboarding />}
            />
            <Route
              path="/ng/makeup/onboarding"
              element={<MakeupOnboarding />}
            />
            <Route
              path="/ng/hairdressers/onboarding"
              element={<HairdresserOnboarding />}
            />
            <Route path="/ng/spa/onboarding" element={<SpaOnboarding />} />
            <Route path="/ng/nails/onboarding" element={<NailOnboarding />} />
            <Route path="/ng/gym/onboarding" element={<GymOnboarding />} />
            <Route
              path="/ng/dentist/onboarding"
              element={<DentistOnboarding />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/auth/login" element={<UserLogin />} />
            <Route
              path="/auth/signUp/Team-Member/:email"
              element={<TeamUserSignUp />}
            />
            <Route path="/googleb978a18bdb7000d2.html" element={<Google />} />
            <Route path="/barbers" element={<BarberLanding />} />
            <Route path="/barbers-near-me" element={<FindBarber />} />
            <Route path="/hairdressers" element={<HairDresserLanding />} />
            <Route path="/nails" element={<NailLanding />} />
            <Route path="/makeup" element={<MakeUpLanding />} />
            <Route path="/spa" element={<SpaLanding />} />
            <Route path="/gym" element={<GymLanding />} />
            <Route path="/dentist" element={<DentistLanding />} />
            <Route path="/login" element={<LoginModal />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/creator/reset-password/:email"
              element={<ResetPassword />}
            />
            <Route path="/creator/Email-Signin" element={<EmailSignIn />} />
            <Route
              path="/creator/PasswordCode-Verification/:email"
              element={<VerifyPasswordCode />}
            />
            <Route path="/pricing" element={<PricingRedirect />} />
            <Route path="/us/pricing" element={<UsaPricing />} />
            <Route path="/ca/pricing" element={<CadPricing />} />
            <Route path="/uk/pricing" element={<UkPricing />} />
            <Route path="/ng/pricing" element={<Pricing />} />
            <Route path="/gh/pricing" element={<GhanaPricing />} />
            <Route path="/lr/pricing" element={<LiberiaPricing />} />
            <Route path="/sl/pricing" element={<SierraLeonePricing />} />
            <Route path="/gm/pricing" element={<GambiaPricing />} />
            <Route path="/za/pricing" element={<SouthAfricaPricing />} />
            <Route path="/na/pricing" element={<NamibiaPricing />} />
            <Route path="/bw/pricing" element={<BotswanaPricing />} />
            <Route path="/zw/pricing" element={<ZimbabwePricing />} />
            <Route path="/ke/pricing" element={<KenyaPricing />} />
            <Route path="/tz/pricing" element={<TanzaniaPricing />} />
            <Route path="/ug/pricing" element={<UgandaPricing />} />
            <Route path="/rw/pricing" element={<RwandaPricing />} />
            <Route path="/et/pricing" element={<EthiopiaPricing />} />
            <Route path="/in/pricing" element={<IndiaPricing />} />
            <Route path="/sg/pricing" element={<SingaporePricing />} />
            <Route path="/ph/pricing" element={<PhilippinesPricing />} />
            <Route path="/my/pricing" element={<MalaysiaPricing />} />
            <Route path="/eu/pricing" element={<EuPricing />} />
            <Route path="/global/pricing" element={<GlobalPricing />} />
            {/* <Route path="/usecases" element={<SkillCategories />} /> */}
            <Route path="/help" element={<LandingHelpCenter />} />
            <Route path="/hairdressers-near-me" element={<FindHairStylist />} />
            <Route path="/usecases" element={<ServiceSelector />} />
            <Route path="/makeup-near-me" element={<FindMakeUp />} />
            <Route path="/nailtechs-near-me" element={<FindNail />} />
            <Route path="/gym-near-me" element={<FindGym />} />
            <Route path="/spa-near-me" element={<FindSpa />} />
            {/* New Auth Routes */}
            <Route path="/auth" element={<AuthLayout />}>
              {/* Personal Info Flow (steps 1-4) */}
              <Route path="personal-Information" element={<BasicInfo />} />
              <Route
                path="email-verification"
                element={<EmailVerification />}
              />
              <Route path="business-type" element={<BusinessType />} />
              <Route path="business-info" element={<BusinessInfo />} />

              {/* Template Selection Flow */}
              <Route path="select-template" element={<SelectTemplate />} />
              <Route path="preview-template" element={<PreviewTemplate />} />
              <Route path="subscriptions" element={<Subscriptions />} />

              {/* Template Editing Flow */}
              <Route path="edit-template" element={<OnboardEditTemplate />} />
              <Route
                path="preview-edited"
                element={<OnboardingPreviewTemplate />}
              />
            </Route>
            {/* Old Auth Routes */}
            <Route path="/dentist-near-me" element={<FindDentist />} />
            <Route path="/websitesub" element={<WebsiteUnavailableModal />} />
            <Route path="/login" element={<LoginModal />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/creator/reset-password/:email"
              element={<ResetPassword />}
            />
            <Route
              path="/check-subscription-status/:email"
              element={<SuccessPage />}
            />
            <Route path="/creator/Email-Signin" element={<EmailSignIn />} />
            <Route
              path="/creator/PasswordCode-Verification/:email"
              element={<VerifyPasswordCode />}
            />
            {/* CREATOR DASHBOARD */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/creator/dashboard/overview"
                element={<Overview />}
              />
              <Route
                path="/creator/dashboard/payments"
                element={<Payments />}
              />
              <Route path="/creator/dashboard/booking" element={<Booking />} />
              <Route
                path="/creator/dashboard/booking-time-off"
                element={<BlockTime />}
              />
              <Route
                path="/creator/dashboard/manage-customer"
                element={<ManageCustomer />}
              />
              <Route path="/creator/dashboard/teams" element={<Teams />} />
              <Route
                path="/creator/dashboard/support-ticket"
                element={<SupportTicket />}
              />
              <Route
                path="/creator/dashboard/edit-template"
                element={<EditTemplate />}
              />
              <Route
                path="/creator/dashboard/edit-service"
                element={<EditService />}
              />
              <Route
                path="/creator/dashboard/create-service"
                element={<CreateNewService />}
              />
              <Route
                path="/creator/dashboard/created-service"
                element={<CreatedServices />}
              />
              <Route
                path="/creator/dashboard/watch-demo"
                element={<VideoGallery />}
              />
              <Route
                path="/creator/dashboard/notification"
                element={<Notification />}
              />
              <Route
                path="/creator/dashboard/profile"
                element={<CreatorProfile />}
              />
              <Route
                path="/creator/dashboard/Team-profile"
                element={<TeamMemberProfile />}
              />
              <Route
                path="/creator/dashboard/help-center"
                element={<HelpCenter />}
              />
              <Route
                path="/creator/dashboard/Subscription"
                element={<UpdateSubscription />}
              />
            </Route>
            {/* PERSONAL CARE TEMPLATES */}
            <Route
              path="/templates/barber-mordern"
              element={<BarberMordern />}
            />
            <Route path="/templates/barbergent" element={<BarberGents />} />
            <Route path="/templates/barbertwo" element={<Barber2 />} />
            <Route
              path="/templates/barberposh-template"
              element={<BarberPosh />}
            />
            <Route path="/templates/barberfour" element={<BarberFourth />} />
            <Route path="/templates/barberfresh" element={<BarberFresh />} />
            {/* MAKEUP TEMPLATE */}
            <Route
              path="/templates/makeup-template"
              element={<MakeupTemplate />}
            />
            <Route path="/templates/thirdmakeup" element={<ThirdMakeup />} />
            <Route path="/templates/fourthmakeup" element={<FourthMakeup />} />
            <Route path="/templates/fifthmakeup" element={<FifthMakeup />} />
            <Route path="/templates/secondmakeup" element={<SecondMakeup />} />
            <Route path="/bookings" element={<BookQuickServicesNew />} />
            {/* WEDDING TEMPLATE */}
            <Route
              path="/templates/wedding-template"
              element={<WeddingTemplate />}
            />
            <Route path="/templates/blank" element={<BlankTemplate />} />
            {/* HAIRSTYLIST TEMPLATE  */}
            <Route
              path="/templates/hair-template"
              element={<HairstylistTemplate />}
            />
            <Route
              path="/templates/secondstylist"
              element={<SecondStylist />}
            />
            <Route path="/templates/thirdstylist" element={<ThirdStylist />} />
            <Route
              path="/templates/fourthstylist"
              element={<FourthStylist />}
            />
            <Route path="/templates/fifthstylist" element={<FifthStylist />} />
            <Route path="/templates/sixthstylist" element={<SixthStylist />} />
            <Route
              path="/templates/seventhstylist"
              element={<SeventhStylist />}
            />
            <Route
              path="/templates/eighthstylist"
              element={<EighthStylist />}
            />
            {/* Nail Templates */}
            <Route path="/templates/firstnail" element={<FirstNail />} />
            <Route path="/templates/secondnail" element={<SecondNail />} />
            <Route path="/templates/thirdnail" element={<ThirdNail />} />
            <Route path="/templates/fourthnail" element={<FourthNail />} />
            <Route path="/templates/fifthnail" element={<FifthNail />} />
            <Route path="/templates/sixthnail" element={<SixthNail />} />
            {/* GYM TEMPLATE */}
            <Route path="/templates/firstgym" element={<GymTemplate />} />
            <Route path="/templates/secondgym" element={<SecondGym />} />
            <Route path="/templates/thirdgym" element={<ThirdGym />} />
            <Route path="/templates/fourthgym" element={<FourthGym />} />
            <Route path="/templates/fifthgym" element={<FifthGym />} />
            <Route path="/templates/sixthgym" element={<SixthGym />} />
            <Route path="/templates/seventhgym" element={<SeventhGym />} />
            {/* SPA TEMPLATE */}
            <Route path="/templates/seventhspa" element={<SeventhSpa />} />
            <Route path="/templates/eighthspa" element={<EighthSpa />} />
            <Route path="/templates/firstspa" element={<FirstSpa />} />
            <Route path="/templates/sixthspa" element={<SixthSpa />} />
            <Route path="/templates/secondspa" element={<SecondSpa />} />
            <Route path="/templates/thirdspa" element={<ThirdSpa />} />
            <Route path="/templates/fourthspa" element={<FourthSpa />} />
            <Route path="/templates/fifthspa" element={<FifthSpa />} />
            {/* DENTIST TEMPLATES */}
            <Route path="/templates/firstdentist" element={<FirstDentist />} />
            <Route
              path="/templates/seconddentist"
              element={<SecondDentist />}
            />
            <Route path="/templates/thirddentist" element={<ThirdDentist />} />
            <Route
              path="/templates/fourthdentist"
              element={<FourthDentist />}
            />
            <Route path="/templates/fifthdentist" element={<FifthDentist />} />
            {/* BLOG */}
            <Route path="/blog" element={<BlogLandingPage />} />
            <Route path="/all-blogs" element={<AllBlogsPage />} />
            {/* <Route path="/all-blogs/:id" element={<AllBlogsPage />} /> */}
            <Route path="/about-blog" element={<AboutBlog />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* <Route exact path="/single-blog" element={<SingleBlog />} /> */}
            <Route path="/blog/:id" element={<SingleBlogPage />} />
            <Route path="/error" element={<ErrorBlog />} />
            {/* AGENT/AFFLIATE PAGE */}
            <Route path="/affiliate/auth" element={<AgentPageAuthForm />} />
            <Route path="/affiliate" element={<AgentPage />} />
            <Route path="/affiliate/verify-email" element={<EmailVerify />} />
            <Route
              path="/affiliate/reset-password"
              element={<AffiliateResetPassword />}
            />
            <Route
              path="/registration-success"
              element={<RegistrationSuccess />}
            />
            <Route element={<AffliateDashboardIndex />}>
              {/* Affiliate Dashboard */}
              <Route
                path="/affiliate/dashboard/overview"
                element={<AffiliateOverview />}
              />
              <Route
                path="/affiliate/dashboard/my-user"
                element={<AffiliateMyUser />}
              />
              <Route
                path="/affiliate/dashboard/earning"
                element={<AffiliateContractPage />}
              />
              <Route
                path="/affiliate/dashboard/Withdraw"
                element={<AffiliateWithdrawPayment />}
              />
              <Route
                path="/affiliate/dashboard/onboard"
                element={<AffiliateOnboarding />}
              />
              <Route
                path="/affiliate/dashboard/profile"
                element={<ProfilePage />}
              />
            </Route>
            {/* Free Onboarding */}
            <Route path="/auth/landing" element={<FreeOnboardingLanding />} />
            <Route
              path="/free/auth/pre-signup"
              element={<FreeOnboardingPreSignup />}
            />
            <Route
              path="/free/auth/personal-Information"
              element={<FreeOnboardingPersonalInfo />}
            />
            <Route
              path="/free/auth/email-verification"
              element={<FreeOnboardingEmailVerification />}
            />
            <Route
              path="/free/auth/business-identity"
              element={<FreeOnboardingSetupOne />}
            />
            <Route
              path="/free/auth/availability"
              element={<FreeOnboardingSetupTwo />}
            />
            <Route
              path="/free/auth/service-payment"
              element={<FreeOnboardingSetupThree />}
            />
            <Route
              path="/free/auth/review"
              element={<FreeOnboardingReview />}
            />
            {/* Free Onboarding Dashboard */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/free/creator/dashboard/overview"
                element={<FreeOverview />}
              />
              <Route
                path="/free/creator/dashboard/bookings"
                element={<FreeAllBookings />}
              />
              <Route
                path="/free/creator/dashboard/profile"
                element={<FreeCreatorProfile />}
              />
              <Route
                path="/free/creator/dashboard/manage-service"
                element={<ManageServices />}
              />
            </Route>
            {/* Paid Onboarding */}
            <Route
              path="/paid/auth/pre-signup"
              element={<PaidOnboardingPreSignup />}
            />
            <Route
              path="/paid/auth/personal-Information"
              element={<PaidOnboardingPersonalInfo />}
            />
            <Route
              path="/paid/auth/email-verification"
              element={<PaidOnboardingEmailVerification />}
            />
            <Route
              path="/paid/auth/business-identity"
              element={<PaidOnboardingSetupOne />}
            />
            <Route
              path="/paid/auth/availability"
              element={<PaidOnboardingSetupTwo />}
            />
            <Route
              path="/paid/auth/service-payment"
              element={<PaidOnboardingSetupThree />}
            />
            <Route
              path="/paid/auth/review"
              element={<PaidOnboardingReview />}
            />
            <Route
              path="/paid/auth/select-template"
              element={<PaidSelectTemplate />}
            />
            <Route
              path="/paid/auth/preview-template"
              element={<PaidPreviewTemplate />}
            />
            <Route
              path="/paid/auth/subcription"
              element={<PaidSubscription />}
            />
          </Routes>
        </Suspense>
      </CountryProvider>
    </>
  );
};

export default AllRoutes;
