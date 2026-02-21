import Logo from "../../../../src/pages/LandingPages/images/dimp-blue.png";
import banner from "../../../../src/assets/affliate-img/isp-agreement.png";

export const AgreementModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleUnderstand = () => {
    onClose(true); // User clicked "I Understand"
  };

  const handleClose = () => {
    onClose(false); // User closed without agreeing
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-3xl rounded-lg shadow-lg relative overflow-hidden">
        {/* --- Close Button --- */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-semibold"
        >
          ×
        </button>

        {/* --- Header Banner --- */}
        <div className="flex flex-col items-center gap-4 px-6 py-4">
          <img
            src={Logo}
            alt="Dimpified"
            className="h-8 w-auto object-contain place-self-start"
          />
          <img
            src={banner}
            alt="Isp agreement banner"
            className=" object-contain"
          />
        </div>

        {/* --- Scrollable Content --- */}
        <div className="p-6 max-h-[50vh] overflow-y-auto text-gray-700 text-sm leading-relaxed space-y-4">
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">1. Appointment</h3>
            <p>
              Dimpified hereby appoints the ISP to market and promote its
              products and services to potential customers in accordance with
              the terms and conditions set forth in this Agreement. The ISP
              accepts such appointment and agrees to represent the Company on a
              non-exclusive, independent contractor basis.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              2. Nature of Relationship
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                The ISP is an independent contractor, not an employee, partner,
                agent, or representative of Dimpified.
              </li>
              <li>
                The Agreement does not establish a joint venture, agency, or
                employment relationship.
              </li>
              <li>
                The ISP shall be solely responsible for any applicable taxes,
                levies, or obligations associated with income earned under this
                Agreement.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              3. Duties and Obligations
            </h3>
            <p>The ISP agrees to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Promote Dimpified services ethically and accurately.</li>
              <li>Use only approved marketing materials.</li>
              <li>Avoid false or misleading representations.</li>
              <li>
                Maintain professional behavior when engaging with prospects or
                customers.
              </li>
              <li>
                Refrain from making commitments or claims on behalf of
                Dimpified.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              4. Commission Structure
            </h3>
            <p> Subscription Commission</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                The ISP shall receive 30% of the monthly subscription fee paid
                by each active customer they refer to Dimpified.
              </li>
              <li>
                Commissions are recurring and continue for as long as the
                referred customer maintains an active paid subscription, and the
                ISP remains in good standing.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              5. Payment Terms
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Commissions are calculated monthly and paid between the 1st and
                5th day of the following month.
              </li>
              <li>
                Minimum payout threshold is $10 USD or its equivalent; unpaid
                balances roll over.
              </li>
              <li>
                Payments will be made via [Bank Transfer / PayPal / Mobile
                Wallet], as designated by the ISP.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              6. Tools and Tracking
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Dimpified will provide the ISP with a unique referral code or
                link and access to a dashboard to track referrals, earnings, and
                customer status.
              </li>
              <li>
                It is the ISP's responsibility to ensure referrals are correctly
                attributed using their provided tools.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              7. Inactivity and Deactivation
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                ISPs with no new sign-ups or active referrals for 60 consecutive
                days may be marked inactive.
              </li>
              <li>
                Inactive ISPs may lose access to dashboards and recurring
                commissions unless reactivated at the Company's discretion.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              8. Confidentiality
            </h3>
            <p>
              The ISP agrees to keep all information regarding Dimpified's
              systems, pricing, operations, customers, and internal processes
              confidential, both during and after the term of this Agreement.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              9. Term and Termination
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                This Agreement is effective as of the Effective Date and shall
                continue until terminated by either party with seven (7) days'
                written notice.
              </li>
              <li>
                Dimpified reserves the right to terminate this Agreement
                immediately for:
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li>Breach of policy or misconduct,</li>
                  <li>Misrepresentation,</li>
                  <li>Fraud,</li>
                  <li>Inactivity exceeding 60 days.</li>
                </ul>
              </li>
              <li>
                Upon termination, the ISP shall cease all use of Dimpified
                branding and materials, and access to tools may be revoked.
              </li>
              <li>
                Valid commissions accrued before termination (excluding
                termination for misconduct) will be paid
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              10. Limitation of Liability
            </h3>
            <p>
              Dimpified shall not be liable for any indirect, incidental, or
              consequential damages incurred by the ISP. The maximum liability
              of Dimpified under this Agreement shall not exceed the total
              commissions paid to the ISP in the preceding 60 days.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              11. Governing Law and Jurisdiction
            </h3>
            <p>
              This Agreement shall be governed by the laws of Nigeria, without
              regard to conflict of law principles. Any disputes shall be
              resolved exclusively in the courts of Nigeria.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              12. Entire Agreement
            </h3>
            <p>
              This Agreement constitutes the entire understanding between the
              parties and supersedes all prior agreements, whether oral or
              written. Any modifications must be in writing and signed by both
              parties.
            </p>
          </section>
        </div>

        {/* --- Footer --- */}
        <div className="border-t p-4 flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-5 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUnderstand}
            className="px-5 py-2 text-sm font-medium bg-primary3 text-white rounded hover:bg-primary4 transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};