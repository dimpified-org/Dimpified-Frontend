import { useEffect, useState } from "react";
import axios from "axios";

import Template10 from "./PersonalCare/Barber/Template10";
import Template11 from "../UserTemplate/Template11";
import Template12 from "../UserTemplate/PersonalCare/MakeUp/Template12";
import Template13 from "../UserTemplate/PersonalCare/Barber/Template13";
import Template14 from "../UserTemplate/PersonalCare/Barber/Template14";
import Template15 from "../UserTemplate/Blank-Template/BlankTemplate";
import Template16 from "../UserTemplate/PersonalCare/HairStylelist/Template16";
import Template17 from "../UserTemplate/PersonalCare/MakeUp/Template17";
import Template18 from "../UserTemplate/PersonalCare/HairStylelist/Template18";
import Template19 from "../UserTemplate/PersonalCare/Nail/Template19";
import Template20 from "../UserTemplate/PersonalCare/Nail/Template20";
import Template21 from "../UserTemplate/PersonalCare/Barber/Template21";
import Template22 from "../UserTemplate/PersonalCare/Barber/Template22";
import Template23 from "../UserTemplate/PersonalCare/Gym/Template23";
import Template24 from "../UserTemplate/PersonalCare/Gym/Template24";
import Template25 from "../UserTemplate/PersonalCare/spa/Template25";
import Template26 from "../UserTemplate/PersonalCare/dental/Template26";
import Template27 from "../UserTemplate/PersonalCare/Gym/Template27";
import Template28 from "../UserTemplate/PersonalCare/spa/Template28";
import Template29 from "../UserTemplate/PersonalCare/spa/Template29";
import Template30 from "../UserTemplate/PersonalCare/dental/Template30";
import Template31 from "../UserTemplate/PersonalCare/spa/Template31";
import Template32 from "../UserTemplate/PersonalCare/Gym/Template32";
import Template33 from "../UserTemplate/PersonalCare/Gym/Template33";
import Template34 from "../UserTemplate/PersonalCare/dental/Template34";
import Template35 from "../UserTemplate/PersonalCare/dental/Template35";
import Template36 from "../UserTemplate/PersonalCare/spa/Template36";
import Template37 from "../UserTemplate/PersonalCare/dental/Template37";

import Template47 from "../UserTemplate/PersonalCare/HairStylelist/Template47";
import Template48 from "../UserTemplate/PersonalCare/HairStylelist/Template48";
import Template51 from "../UserTemplate/GeneralTemplate/Template51";
import Template52 from "../UserTemplate/PaidTemplates/Template52";
const MainTemplate = ({ subdomain }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ecosystemDetails, setEcosystemDetails] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/getTemplate/${subdomain}`
        );

        setDetails(response.data.templateDetails);
        setEcosystemDetails(response.data.aboutUsDetails);

        sessionStorage.setItem(
          "ecoLogo",
          response.data.templateDetails.navbar.logo
        );
        sessionStorage.setItem(
          "brand",
          response.data.templateDetails.navbar.brand
        );
      } catch (error) {
        console.error("Error fetching template details:", error);
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [subdomain]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!details) {
    return <div>Error: Unable to load template details</div>;
  }

  // Parse and debug the template ID
  const templateNumber = parseInt(details.templateId, 10);

  switch (templateNumber) {
    case 10:
      return (
        <Template10
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 11:
      return (
        <Template11
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 12:
      return (
        <Template12
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 13:
      return (
        <Template13
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 14:
      return (
        <Template14
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 15:
      return (
        <Template15
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 16:
      return (
        <Template16
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 17:
      return (
        <Template17
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 18:
      return (
        <Template18
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 19:
      return (
        <Template19
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 20:
      return (
        <Template20
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 21:
      return (
        <Template21
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 22:
      return (
        <Template22
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 23:
      return (
        <Template23
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 24:
      return (
        <Template24
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 25:
      return (
        <Template25
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 26:
      return (
        <Template26
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 27:
      return (
        <Template27
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 28:
      return (
        <Template28
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 29:
      return (
        <Template29
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 30:
      return (
        <Template30
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 31:
      return (
        <Template31
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 32:
      return (
        <Template32
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 33:
      return (
        <Template33
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 34:
      return (
        <Template34
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 35:
      return (
        <Template35
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 36:
      return (
        <Template36
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 37:
      return (
        <Template37
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 47:
      return (
        <Template47
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 48:
      return (
        <Template48
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 51:
      return (
        <Template51
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    case 52:
      return (
        <Template52
          details={details}
          subdomain={subdomain}
          userDetails={ecosystemDetails}
        />
      );
    default:
      console.error("Unknown template ID:", templateNumber);
      return <div>Error: Unknown template ID</div>;
  }
};

export default MainTemplate;
