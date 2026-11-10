import { Helmet } from "react-helmet-async";
import "./terms.css";

const Terms = () => {
  const url = "https://studenttoolsng.com/terms";
  const title = "Terms of Use | StudentToolsNG";
  const description =
    "The terms for using StudentToolsNG: calculators and tutorials, accounts, the Pro plan, research library purchases, publishers, acceptable use and liability.";
  const image = "https://studenttoolsng.com/og-image.png";

  return (
    <div className="terms-mean">
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
            name: "Terms of Use",
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

      <h1>Terms of Use for StudentToolsNG</h1>

      <p>
        These terms apply to everyone who uses studenttoolsng.com ("StudentToolsNG", "we", "us").
        By using the website you agree to them. If you do not agree, please do not use the site.
        If you are under 18, please read these terms with a parent or guardian.
      </p>

      <h2>1. What StudentToolsNG Provides</h2>

      <p>
        StudentToolsNG offers free academic calculators (such as CGPA, WAEC grade, JAMB score and
        aggregate score calculators), exam practice, tutorials, project topics, everyday and
        engineering calculators, an AI tutor, and a research library of project guides. Most of the
        site is free and needs no account. Some features need an account, an active Pro plan or a
        one-off purchase.
      </p>

      <h2>2. Calculators and Results</h2>

      <p>
        Our calculators apply the grading rules they describe to the numbers you enter. Schools,
        WAEC, NECO and JAMB can change their rules, and some formulas, such as certain Post-UTME
        aggregate formulas, are not officially published; where that is the case, the page says
        so. Results from StudentToolsNG are estimates for planning only. Your official result is
        always the one issued by your school or examination body, and admission decisions are
        made only by institutions and JAMB.
      </p>

      <h2>3. Tutorials and Educational Content</h2>

      <p>
        Tutorials and study materials are written to help you understand topics and prepare for
        examinations. We work to keep them accurate, but they are not a guarantee of any exam
        result and do not replace your teachers, lecturers or official syllabuses. If you find an
        error, please report it through the <a href="/contact">contact page</a>.
      </p>

      <h2>4. AI Tutor and AI Quizzes</h2>

      <p>
        The AI tutor, course tutor and AI-generated quizzes produce answers automatically. They can
        be wrong or incomplete, so check important answers against your textbook or lecturer. Do not
        enter sensitive personal information into AI features. You must not use them to cheat in a
        live test or examination.
      </p>

      <h2>5. Accounts</h2>

      <p>
        You can create an account with an email address and password or with Google sign-in. Give
        accurate information, keep your password private, and tell us if you think someone else
        has used your account. You are responsible for activity on your account. We may suspend or
        close accounts that break these terms.
      </p>

      <h2>6. The Pro Plan</h2>

      <p>
        The Pro plan is a monthly subscription paid through Paystack. The current price is shown on
        the billing page before you pay. The subscription renews automatically each month until you
        cancel it. You can cancel at any time from your billing page; cancelling stops future
        payments and ends Pro access. Payments already made are not refunded, except where the law
        requires it or where you were charged in error.
      </p>

      <h2>7. Research Library Purchases</h2>

      <p>
        Project guides in the research library are sold by StudentToolsNG and by independent
        publishers. The price is shown before checkout, and payment is processed by Paystack. Each
        guide is a study and research aid. It is not a finished project for submission: you must
        collect your own data and write your project in your own words, following your
        institution's rules on plagiarism and academic integrity.
      </p>

      <p>
        Because guides are digital and available as soon as payment is confirmed, purchases are
        not normally refundable. If a guide fails to open, is not delivered, or is clearly
        different from its description, contact us within 7 days of purchase and we will fix the
        problem or refund you.
      </p>

      <h2>8. Publishers</h2>

      <p>
        Publishers who sell in the research library must own, or have permission to sell,
        everything they upload, and must describe their guides honestly. StudentToolsNG keeps the
        commission agreed at onboarding from each sale and pays the remainder through Paystack. We
        may review, edit the listing details of, or remove any guide that breaks these terms or
        infringes someone else's rights.
      </p>

      <h2>9. Acceptable Use</h2>

      <ul>
        <li>Do not copy, republish or sell our tutorials, tools or guides without written permission.</li>
        <li>Do not scrape the site, overload it, or try to get around paid features or security.</li>
        <li>Do not upload anything unlawful, harmful, misleading, or that you have no right to share.</li>
        <li>Do not use the site to harass others or to commit examination malpractice.</li>
      </ul>

      <h2>10. Intellectual Property</h2>

      <p>
        The text, tutorials, calculators, design and code of StudentToolsNG belong to StudentToolsNG
        or its licensors, and publishers keep ownership of the guides they upload. You may use the
        site for your own personal study, and you may share links to any page. Short quotations
        with a link back are fine.
      </p>

      <h2>11. Advertising and External Links</h2>

      <p>
        StudentToolsNG shows advertisements served by Google AdSense, and some pages link to other
        websites such as WAEC, JAMB or scholarship providers. We do not control and are not
        responsible for the content, products or privacy practices of advertisers or external
        sites. How advertising cookies work is explained in our{" "}
        <a href="/privacy-policy">privacy policy</a>.
      </p>

      <h2>12. Limitation of Liability</h2>

      <p>
        StudentToolsNG is provided "as is". We do not promise that the site will always be
        available or free of errors. To the extent the law allows, we are not liable for any loss
        that comes from relying on a calculation, tutorial, AI answer or guide, including missed
        admission, a lower grade or a lost opportunity. Nothing in these terms limits a liability
        that cannot be limited under Nigerian law.
      </p>

      <h2>13. Governing Law</h2>

      <p>
        These terms are governed by the laws of the Federal Republic of Nigeria. We will try to
        resolve any complaint informally first, so please contact us before taking any other step.
      </p>

      <h2>14. Changes to These Terms</h2>

      <p>
        We may update these terms as the site changes. The date below shows the latest version.
        Continuing to use the site after a change means you accept the updated terms.
      </p>

      <h2>15. Contact</h2>

      <p>
        Questions about these terms can be sent through our <a href="/contact">contact page</a>.
        See also our <a href="/privacy-policy">privacy policy</a> and{" "}
        <a href="/about">about page</a>.
      </p>

      <p className="planLink">Last updated: 10 November 2026</p>
    </div>
  );
};

export default Terms;
