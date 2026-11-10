import { Helmet } from "react-helmet-async";

import "./privacyPolicy.css";

const PrivacyPolicy = () => {
  const url = "https://studenttoolsng.com/privacy-policy";
  const title = "Privacy Policy | StudentToolsNG";
  const description =
    "What information StudentToolsNG collects, how it is used, the cookies and partners involved (Google AdSense and Analytics), and your rights over your data.";
  const image = "https://studenttoolsng.com/og-image.png";

  return (
    <div className="privacy-condition">
      <Helmet>
        {/* Primary SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Canonical */}
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            url,
            description,
            dateModified: "2026-11-10",
            publisher: {
              "@type": "Organization",
              name: "StudentToolsNG"
            }
          })}
        </script>
      </Helmet>

      <h1>Privacy Policy</h1>

      <p>
        This policy explains what information StudentToolsNG (studenttoolsng.com) collects, why we
        collect it, who we share it with, and the choices you have. We collect as little as we
        need: most of the site, including the calculators and tutorials, works without an account.
      </p>

      <h2>1. Information You Give Us</h2>

      <ul>
        <li>
          <strong>Account details:</strong> your name, email address and password (stored only in
          hashed form). If you sign in with Google, we receive your name, email address and profile
          picture from Google.
        </li>
        <li>
          <strong>Contact form:</strong> your name, email address and message.
        </li>
        <li>
          <strong>Study activity:</strong> quiz and CBT practice attempts and scores linked to your
          account, so you can track your progress.
        </li>
        <li>
          <strong>AI features:</strong> the questions you type into the AI tutor or course tutor, and
          any course material you upload to generate quizzes.
        </li>
        <li>
          <strong>Payments:</strong> when you subscribe to Pro or buy a guide, Paystack processes the
          payment. We receive your email address, the amount, and a payment reference. We never see
          or store your full card or bank login details.
        </li>
        <li>
          <strong>Publishers:</strong> publishers give us their name, contact details, the guides
          they upload, and bank details for payouts, which are passed to Paystack to set up payment.
        </li>
      </ul>

      <h2>2. Information Collected Automatically</h2>

      <ul>
        <li>
          Pages visited, time spent, the site that referred you, and approximate location (country
          or city), collected through Google Analytics.
        </li>
        <li>
          Device and browser type, and your IP address, which our hosting providers record in
          standard server logs for security and troubleshooting.
        </li>
        <li>
          View counts on tutorials and research library guides, counted without identifying you.
        </li>
      </ul>

      <h2>3. Information Stored on Your Device</h2>

      <p>
        Some tools save your data only in your own browser (local storage) and never send it to us:
        for example the study planner tasks, the age tracker, and the appliance list in the solar
        calculators. Clearing your browser data deletes it. When you log in, a sign-in token is also
        kept in local storage so you stay logged in.
      </p>

      <h2>4. How We Use Your Information</h2>

      <ul>
        <li>To run your account, save your progress and provide the features you ask for.</li>
        <li>To process subscriptions and purchases and pay publishers.</li>
        <li>To answer messages and send account emails, such as password resets and receipts.</li>
        <li>To understand which pages are useful and fix errors and slow pages.</li>
        <li>To show advertising that keeps the site free.</li>
        <li>To prevent fraud and abuse and keep the site secure.</li>
      </ul>

      <p>We do not sell your personal information.</p>

      <h2>5. Cookies</h2>

      <p>
        Cookies are small files stored by your browser. StudentToolsNG and its partners use them to
        keep the site working, to measure traffic with Google Analytics, and to serve and measure
        advertisements. You can block or delete cookies in your browser settings; the calculators
        and tutorials still work without them, but some features, such as staying signed in, may not.
      </p>

      <h2>6. Advertising (Google AdSense)</h2>

      <p>
        StudentToolsNG uses Google AdSense to display advertisements. Third-party vendors, including
        Google, use cookies to serve ads based on your previous visits to this website or other
        websites. Google's use of advertising cookies enables it and its partners to serve ads to
        you based on your visits to this site and/or other sites on the internet.
      </p>

      <p>
        You can opt out of personalised advertising by visiting{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        . You can also opt out of some third-party vendors' use of cookies for personalised
        advertising at{" "}
        <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
          www.aboutads.info
        </a>
        . To learn how Google uses information from sites that use its services, see{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          How Google uses information from sites or apps that use our services
        </a>
        .
      </p>

      <h2>7. Service Providers We Share Data With</h2>

      <p>
        We share information only with the companies that help us run the site, and only what each
        one needs:
      </p>

      <ul>
        <li><strong>Google:</strong> Analytics, AdSense advertising and Google sign-in.</li>
        <li><strong>Paystack:</strong> payments, subscriptions and publisher payouts.</li>
        <li><strong>Groq:</strong> processes AI tutor questions and uploaded course material to generate answers and quizzes.</li>
        <li><strong>Cloudinary:</strong> stores files uploaded by publishers to the research library.</li>
        <li><strong>Vercel, Render and Cloudflare:</strong> host the website and its server and protect it from attacks.</li>
        <li><strong>Our email provider:</strong> sends account emails such as password resets.</li>
      </ul>

      <p>
        Some of these providers process data outside Nigeria. We may also disclose information if
        the law requires it, or to protect the safety of our users or the site.
      </p>

      <h2>8. How Long We Keep Data</h2>

      <p>
        We keep account information for as long as your account is open. Payment records are kept
        for as long as tax and accounting rules require. Contact messages are kept only as long as
        needed to deal with them. Analytics data is kept according to Google Analytics retention
        settings.
      </p>

      <h2>9. Your Rights</h2>

      <p>
        Under the Nigeria Data Protection Act 2023, and similar laws in other countries, you can ask
        us to show you the personal information we hold about you, correct it, delete it, or stop
        using it for a particular purpose. You can also withdraw consent you have given and
        complain to the Nigeria Data Protection Commission. To make a request, contact us through
        the <a href="/contact">contact page</a> using the email address on your account.
      </p>

      <h2>10. Data Security</h2>

      <p>
        Connections to StudentToolsNG are encrypted with HTTPS, passwords are stored hashed, and
        access to our database is restricted. No online service is completely secure, so please use
        a strong password that you do not use elsewhere.
      </p>

      <h2>11. Children</h2>

      <p>
        StudentToolsNG is made for secondary school and university students. Children under 13
        should not create an account or send us personal information without a parent or
        guardian's permission. If you believe a child has given us personal information without
        consent, contact us and we will delete it.
      </p>

      <h2>12. External Links</h2>

      <p>
        Our pages link to other websites, such as WAEC, JAMB and scholarship providers. Their
        privacy practices are their own, so please read their policies.
      </p>

      <h2>13. Changes to This Policy</h2>

      <p>
        We will update this policy when the site or the law changes, and the date below will show
        the latest version.
      </p>

      <h2>14. Contact Us</h2>

      <p>
        Questions about this policy or your data can be sent through our{" "}
        <a href="/contact">contact page</a>. See also our <a href="/terms">terms of use</a>.
      </p>

      <p className="policy-update">Last updated: 10 November 2026</p>
    </div>
  );
};

export default PrivacyPolicy;
