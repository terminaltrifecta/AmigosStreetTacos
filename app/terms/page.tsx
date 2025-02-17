import React from 'react';
import './TermsPage.css'; // Import CSS file for styling

const TermsPage: React.FC = () => {
    return (
        <div className="terms-page-container">
            <div className="terms-content-wrapper">
                <h2 className="terms-main-heading">Amigos Street Tacos LLC – Online Ordering Terms of Use</h2>
                <p className="terms-last-updated">Last Updated: February 16, 2025</p>

                <div className="terms-section">
                    <h3 className="terms-section-heading">1. Acceptance of Terms</h3>
                    <p className="terms-paragraph">
                        Welcome to the online ordering website of Amigos Street Tacos LLC (&quot;Amigos Street Tacos,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
                        By accessing and using our website—including placing orders through our online ordering system (the &quot;Website&quot;)—you
                        agree to be bound by these Terms of Use (&quot;Terms&quot;). If you do not agree to these Terms, you must not use the Website.
                    </p>
                </div>

                <div className="terms-section">
                    <h3 className="terms-section-heading">2. Website Use and Access</h3>
                    <h4 className="terms-subsection-heading">Permitted Use</h4>
                    <p className="terms-paragraph">
                        The Website is provided by Zorgo LLC (&quot;Zorgo&quot;) under contract with Amigos Street Tacos. It is for your personal,
                        non-commercial use to browse our menu, place online orders for food and beverages offered by Amigos Street Tacos,
                        and access related information.
                    </p>
                    <h4 className="terms-subsection-heading">Data Storage for Order Fulfillment</h4>
                    <p className="terms-paragraph">
                        To facilitate online ordering and fulfill your orders, Zorgo LLC, our third-party service provider, will store and process
                        certain user data. This data may include your name, email address, phone number, order history, and delivery information
                        as necessary to process and manage your orders effectively. By using this Website and placing orders, you consent to the
                        storage and processing of your data by Zorgo LLC for the purpose of order fulfillment and related customer service.
                        Details about data handling practices are further described in our Privacy Policy.
                    </p>
                    <h4 className="terms-subsection-heading">Prohibited Uses</h4>
                    <ul className="terms-list">
                        <li className="terms-list-item">Use the Website for any unlawful purpose.</li>
                        <li className="terms-list-item">Attempt to gain unauthorized access to any portion of the Website, server, or related systems or networks.</li>
                        <li className="terms-list-item">Interfere with or disrupt the operation of the Website or the servers or networks used to make the Website available.</li>
                        <li className="terms-list-item">Use any robot, spider, scraper, or other automated means to access the Website without express written permission.</li>
                        <li className="terms-list-item">Transmit any viruses, worms, or other malicious code.</li>
                        <li className="terms-list-item">Misrepresent your identity or provide false information when using the Website.</li>
                    </ul>
                </div>

                <div className="terms-section">
                    <h3 className="terms-section-heading">3. Ordering System and Order Placement</h3>
                    <h4 className="terms-subsection-heading">Ordering Process</h4>
                    <p className="terms-paragraph">
                        You can place orders through the Website by selecting menu items, specifying quantities and options,
                        and proceeding through the online checkout process.
                    </p>
                    <h4 className="terms-subsection-heading">Order as Offer</h4>
                    <p className="terms-paragraph">
                        Your order placement through the Website constitutes an offer to purchase the selected items from Amigos Street Tacos.
                        All orders are subject to acceptance by us.
                    </p>
                    <h4 className="terms-subsection-heading">Order Confirmation</h4>
                    <p className="terms-paragraph">
                        After you place an order, you will receive an order confirmation, typically via email or on the Website.
                        This confirmation does not guarantee acceptance of your order but confirms that we have received it.
                        Acceptance of your order and the formation of a contract between you and Amigos Street Tacos will occur
                        when we begin preparing your order.
                    </p>
                    <h4 className="terms-subsection-heading">Order Modifications, Cancellations, and Refunds</h4>
                    <ul className="terms-list">
                        <li className="terms-list-item">You may be able to modify or cancel your order before it is prepared. Contact us immediately if you need changes.</li>
                        <li className="terms-list-item">Once preparation has begun, modifications or cancellations may not be possible.</li>
                        <li className="terms-list-item">
                            If an order is cancelled before preparation begins, you will receive a full refund via your original payment method.
                            For orders cancelled after preparation has started, refunds may be issued at our sole discretion.
                            If you are dissatisfied with your order, please contact us immediately.
                        </li>
                        <li className="terms-list-item">
                            Our policies on modifications, cancellations, and refunds are subject to change and will be communicated
                            at the time of order placement or confirmation.
                        </li>
                    </ul>
                </div>

                <div className="terms-section">
                    <h3 className="terms-section-heading">4. Pricing and Payment</h3>
                    <h4 className="terms-subsection-heading">Pricing Accuracy</h4>
                    <p className="terms-paragraph">
                        We strive to ensure that all prices displayed on the Website are accurate. However, errors may occur.
                        In the event of a pricing error, we reserve the right to refuse or cancel any orders placed at the incorrect price,
                        even if your order has been confirmed. If we discover a pricing error after confirmation, we will contact you for
                        instructions or cancel your order and provide a refund.
                    </p>
                    <h4 className="terms-subsection-heading">Payment Methods</h4>
                    <p className="terms-paragraph">
                        We accept online payments through major credit and debit cards. Payment processing is handled securely by Stripe,
                        a third-party payment processor. By placing an order, you authorize Stripe to charge your designated payment method
                        for the total order amount, including applicable taxes and fees.
                    </p>
                    <h4 className="terms-subsection-heading">Sales Tax and Fees</h4>
                    <p className="terms-paragraph">
                        Prices displayed on the Website do not include sales tax, and will be applied at checkout. Delivery fees or other service charges, if applicable, will be added to the total
                        during the checkout process.
                    </p>
                </div>

                <div className="terms-section">
                    <h3 className="terms-section-heading">5. Menu and Product Information</h3>
                    <h4 className="terms-subsection-heading">Menu Accuracy</h4>
                    <p className="terms-paragraph">
                        We make reasonable efforts to ensure that menu descriptions, photographs, ingredient lists, and other product
                        information on the Website are accurate and up-to-date. However, menu items, ingredients, and availability
                        are subject to change without notice.
                    </p>
                    <h4 className="terms-subsection-heading">Availability</h4>
                    <p className="terms-paragraph">
                        All menu items are subject to availability. If an item you order is out of stock, we will notify you and may
                        offer substitutions or remove the item from your order and adjust the total price.
                    </p>
                    <h4 className="terms-subsection-heading">Allergen and Dietary Information Disclaimer</h4>
                    <p className="terms-paragraph">
                        <b>IMPORTANT, PLEASE READ CAREFULLY:</b> We provide information about ingredients and potential allergens to the best
                        of our ability. However, our food preparation environment involves shared equipment and surfaces, and
                        cross-contamination is possible. <b>WE CANNOT GUARANTEE THE ABSENCE OF ANY ALLERGENS.</b> If you have severe allergies
                        or dietary restrictions, it is your responsibility to inform us <b>BEFORE</b> placing your order and to verify allergen
                        information upon pickup or delivery. Amigos Street Tacos LLC is not responsible for any adverse reactions
                        resulting from allergies or dietary restrictions.
                    </p>
                </div>

                <div className="terms-section">
                    <h3 className="terms-section-heading">6. Intellectual Property</h3>
                    <h4 className="terms-subsection-heading">Website Content Ownership</h4>
                    <p className="terms-paragraph">
                        The Website and its entire contents, features, and functionality are owned by Amigos Street Tacos LLC and/or Zorgo LLC
                        and are protected by applicable laws.
                    </p>
                    <h4 className="terms-subsection-heading">Limited License</h4>
                    <p className="terms-paragraph">
                        We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Website solely for
                        the purpose of browsing our menu and placing orders for personal, non-commercial use in accordance with these Terms.
                    </p>
                    <h4 className="terms-subsection-heading">Restrictions on Use</h4>
                    <p className="terms-paragraph">
                        You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish,
                        download, store, or transmit any of the material on our Website except as is incidental to normal Website browsing
                        and use. You must not use any Amigos Street Tacos trademarks, logos, or service marks without our prior written consent.
                    </p>
                </div>

                <div className="terms-section">
                    <h3 className="terms-section-heading">7. Disclaimers and Limitations of Liability</h3>
                    <h4 className="terms-subsection-heading">Website As Is&quot;</h4>
                    <p className="terms-paragraph">
                        <b>THE WEBSITE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS
                        OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                        AND NON-INFRINGEMENT.</b>
                    </p>
                    <h4 className="terms-subsection-heading">No Warranty of Accuracy</h4>
                    <p className="terms-paragraph">
                        <b>WE DO NOT WARRANT THAT THE WEBSITE OR ITS CONTENT WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT
                        DEFECTS WILL BE CORRECTED, OR THAT THE WEBSITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR
                        OTHER HARMFUL COMPONENTS.</b>
                    </p>
                    <h4 className="terms-subsection-heading">Limitation of Liability</h4>
                    <p className="terms-paragraph">
                        <b>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL AMIGOS STREET TACOS LLC OR ZORGO LLC BE LIABLE
                        FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES,
                        WHETHER INCURRED DIRECTLY OR INDIRECTLY, RESULTING FROM ANY USE OF OR INABILITY TO USE THE WEBSITE, UNAUTHORIZED
                        ACCESS, OR OTHER CAUSES DESCRIBED IN THESE TERMS.</b>
                    </p>
                    <h4 className="terms-subsection-heading">Maximum Liability</h4>
                    <p className="terms-paragraph">
                        <b>IN NO EVENT SHALL THE AGGREGATE LIABILITY OF AMIGOS STREET TACOS LLC AND ZORGO LLC EXCEED THE AMOUNT YOU PAID FOR THE
                        ORDER GIVING RISE TO THE CLAIM, OR FIFTY US DOLLARS ($50.00), WHICHEVER IS GREATER.</b>
                    </p>
                    <h4 className="terms-subsection-heading">Website Availability</h4>
                    <p className="terms-paragraph">
                        We do not guarantee continuous, uninterrupted, or secure access to our Website, and operation may be interfered with
                        by factors outside our control.
                    </p>
                </div>

                <div className="terms-section">
                    <h3 className="terms-section-heading">8. Governing Law and Dispute Resolution</h3>
                    <p className="terms-paragraph">
                        These Terms of Use and any dispute arising out of or in connection with them shall be governed by and construed in
                        accordance with the laws of the State of Michigan, without regard to its conflict of law principles. Disputes shall
                        first be attempted to be resolved through good-faith negotiation. If negotiation fails, the parties agree to
                        mediation in the state and federal courts located in Macomb County, Michigan.
                    </p>
                </div>

                <div className="terms-section">
                    <h3 className="terms-section-heading">9. Changes to Terms of Use</h3>
                    <p className="terms-paragraph">
                        We reserve the right to modify these Terms of Use at any time. We will notify you of any material changes by posting
                        the updated Terms on the Website and updating the &quot;Last Updated&quot; date. Your continued use of the Website after any
                        changes are posted constitutes acceptance of the modified Terms.
                    </p>
                </div>

                <div className="terms-section">
                    <h3 className="terms-section-heading">10. Contact Information</h3>
                    <p className="terms-paragraph">
                        If you have any questions or concerns about these Terms of Use or the Website, please contact us at any of the contact phone numbers listed in the footer of this website.
                    </p>
                </div>

                <div className="terms-section">
                    <h3 className="terms-section-heading">11. Indemnification</h3>
                    <p className="terms-paragraph">
                        You agree to indemnify, defend, and hold harmless Amigos Street Tacos LLC, Zorgo LLC, and their respective
                        officers, directors, employees, agents, licensors, and suppliers from and against any claims, liabilities,
                        damages, losses, and expenses arising out of or in any way connected with your access to or use of the Website,
                        any violation of these Terms, or any activity related to your account.
                    </p>
                </div>

                <div className="terms-section">
                    <h3 className="terms-section-heading">12. Severability</h3>
                    <p className="terms-paragraph">
                        If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in
                        full force and effect, and the invalid or unenforceable provision shall be replaced by a valid, enforceable provision
                        that most closely reflects the parties original intent.
                    </p>
                </div>

                <div className="terms-section">
                    <h3 className="terms-section-heading">13. Force Majeure</h3>
                    <p className="terms-paragraph">
                        Neither Amigos Street Tacos LLC, Zorgo LLC, nor their affiliates shall be liable for any delay or failure in
                        performance caused by events or circumstances beyond their reasonable control, including but not limited to acts
                        of God, natural disasters, labor disputes, or governmental actions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;