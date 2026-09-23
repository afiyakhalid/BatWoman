export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-32">

      <div className="mx-auto max-w-4xl">

        <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
          Legal
        </p>

        <h1 className="mt-4 font-[var(--font-playfair)] text-5xl md:text-6xl">
          Privacy Policy
        </h1>

        <p className="mt-6 text-neutral-500">
          Last updated: September 2026
        </p>

        <div className="mt-16 space-y-12 leading-8 text-neutral-700">

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              1. Information We Collect
            </h2>

            <p className="mt-4">
              When you use BATWOMAN, we may collect information necessary
              to create and manage your account, process orders, provide
              customer support and deliver your purchases.
            </p>

            <p className="mt-4">
              This may include your name, email address, phone number,
              shipping address, billing information and order details.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              2. How We Use Your Information
            </h2>

            <p className="mt-4">
              We use the information we collect to process and fulfil
              orders, communicate with you about your purchases, provide
              customer support, maintain your account and improve our
              services.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              3. Payment Information
            </h2>

            <p className="mt-4">
              Payments are processed through our payment service provider.
              BATWOMAN does not store your complete card or banking
              credentials on its own servers.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              4. Shipping Information
            </h2>

            <p className="mt-4">
              To fulfil an order, relevant delivery information may be
              shared with our shipping and logistics partners. This
              information is limited to what is required to deliver your
              order.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              5. Cookies and Website Usage
            </h2>

            <p className="mt-4">
              BATWOMAN may use cookies and similar technologies to maintain
              sessions, remember preferences and improve the functionality
              of the website.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              6. Data Security
            </h2>

            <p className="mt-4">
              We take reasonable technical and organizational measures to
              protect information handled through our platform. However,
              no internet-based service can guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              7. Your Rights
            </h2>

            <p className="mt-4">
              You may contact us regarding your personal information,
              account information or questions about how your information
              is handled.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-playfair)] text-3xl text-black">
              8. Contact Us
            </h2>

            <p className="mt-4">
              For privacy-related questions, contact us at:
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