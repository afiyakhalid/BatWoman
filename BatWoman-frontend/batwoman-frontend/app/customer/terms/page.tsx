export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-32">

      <div className="mx-auto max-w-4xl">

        <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
          Legal
        </p>

        <h1 className="mt-4 font-[var(--font-playfair)] text-5xl md:text-6xl">
          Terms & Conditions
        </h1>

        <p className="mt-6 text-neutral-500">
          Last updated: September 2026
        </p>

        <div className="mt-16 space-y-12 leading-8 text-neutral-700">

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              1. General
            </h2>

            <p className="mt-4">
              By accessing or using the BATWOMAN website, you agree to
              comply with these Terms & Conditions. Please read them
              carefully before placing an order.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              2. Products and Pricing
            </h2>

            <p className="mt-4">
              Product descriptions, images, prices and availability are
              displayed on the website. Prices and product availability
              may change without prior notice.
            </p>

            <p className="mt-4">
              We make reasonable efforts to display product information
              accurately. Minor differences in colour or appearance may
              occur depending on your device display.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              3. Orders
            </h2>

            <p className="mt-4">
              An order is created when you complete the checkout process.
              An order becomes confirmed after successful payment
              verification or confirmation of the applicable payment
              method.
            </p>

            <p className="mt-4">
              We reserve the right to cancel an order in circumstances
              such as product unavailability, pricing errors, suspected
              fraudulent activity or other operational issues.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              4. Payments
            </h2>

            <p className="mt-4">
              Online payments are processed through our authorized payment
              provider. Payment information is handled according to the
              applicable payment provider's terms and security practices.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              5. Shipping and Delivery
            </h2>

            <p className="mt-4">
              Orders are prepared for shipment after successful order
              confirmation and payment verification.
            </p>

            <p className="mt-4">
              Standard deliveries may be handled through our logistics
              partner. Delivery times can vary depending on the
              destination, courier availability, weather, operational
              conditions and other circumstances outside our direct
              control.
            </p>

            <p className="mt-4">
              Tracking information may be provided once shipment details
              become available.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              6. Returns and Refunds
            </h2>

            <p className="mt-4">
              Return and refund eligibility depends on the condition of
              the product and the applicable BATWOMAN return policy.
            </p>

            <p className="mt-4">
              Products returned must meet the applicable return
              requirements. Items that have been used, damaged, altered
              or otherwise fail to meet the return requirements may not
              be eligible for return or refund.
            </p>

            <p className="mt-4">
              Approved refunds will be processed through the applicable
              payment method or payment channel.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              7. Order Cancellation
            </h2>

            <p className="mt-4">
              Cancellation availability may depend on the current status
              of the order. Once an order has entered processing or
              shipment, cancellation may no longer be possible.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              8. Account Responsibility
            </h2>

            <p className="mt-4">
              Customers are responsible for providing accurate account,
              contact and delivery information. Incorrect delivery
              information may affect successful delivery.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              9. Changes to These Terms
            </h2>

            <p className="mt-4">
              BATWOMAN may update these Terms & Conditions when necessary.
              Updated terms will be published on this page.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              10. Contact
            </h2>

            <p className="mt-4">
              If you have questions regarding orders, shipping, returns or
              these Terms & Conditions, contact our support team.
            </p>

            <a
              href="mailto:support@batwoman.com"
              className="mt-3 inline-block text-black underline underline-offset-4"
            >
              support@batwoman.com
            </a>
          </section>

        </div>

      </div>

    </main>
  );
}