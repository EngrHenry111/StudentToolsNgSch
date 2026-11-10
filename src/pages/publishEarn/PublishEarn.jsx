import { useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../contextQuiz/AuthContext";
import "../about/about.css";
import "./publishEarn.css";

// Public explainer for the publisher programme. The workspace itself
// (/publisher/...) is login-only and blocked in robots.txt, so this is the
// page visitors and search engines see when they click "Publish & Earn".
const PublishEarn = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const url = "https://studenttoolsng.com/publish-and-earn";
  const title = "Sell Project Guides and Study Materials Online in Nigeria";
  const description =
    "Sell your project guides and study notes on StudentToolsNG. Students preview chapters 1 and 2 free, and you are paid to your bank through Paystack.";

  // Logged-in users go straight to onboarding (it sends existing publishers
  // on to their dashboard); everyone else logs in or signs up first (the
  // login page links to registration and Google sign-in).
  const startLink = isAuthenticated ? "/publisher/onboarding" : "/login?next=/publisher/onboarding";

  return (
    <div className="about-page publish-earn">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://studenttoolsng.com/og-image.png" />
        <meta property="og:url" content={url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://studenttoolsng.com/og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            url,
            description,
            publisher: { "@type": "Organization", name: "StudentToolsNG" }
          })}
        </script>
      </Helmet>

      <h1>Publish and Earn on StudentToolsNG</h1>

      <p>
        If you have written a strong project guide, research framework or study material,
        thousands of Nigerian students are looking for exactly that kind of help. The
        StudentToolsNG <Link to="/marketplace">Research Library</Link> lets you sell your work to
        them. Students read chapters 1 and 2 free before they buy, and every sale is paid straight
        into your own Nigerian bank account through Paystack.
      </p>

      <div className="pe-cta">
        <Link to={startLink} className="pe-button">
          Become a publisher
        </Link>
        <span className="pe-cta-note">Free to join. You keep 85% of every sale.</span>
      </div>

      <h2>How It Works</h2>

      <ol className="pe-steps">
        <li>
          <strong>Create your free account</strong> and open your publisher workspace with a
          business or pen name.
        </li>
        <li>
          <strong>Add your bank account.</strong> Your account number is checked with your bank
          through Paystack, and your workspace opens as soon as it is verified. There is no
          waiting for approval.
        </li>
        <li>
          <strong>Create a listing.</strong> Give it a clear title and field of study, paste in a
          free preview (chapters 1 and 2) and the full document, and set your price.
        </li>
        <li>
          <strong>Publish.</strong> Your guide appears on your own storefront page and in the
          Research Library, where students can search by topic and department.
        </li>
        <li>
          <strong>Get paid.</strong> When a student pays, Paystack splits the payment
          automatically: 85% is settled to your bank account, and the platform keeps a flat 15%
          commission.
        </li>
      </ol>

      <h2>What You Can Publish</h2>

      <ul>
        <li>Project guides and research frameworks for final-year students in any department.</li>
        <li>Model chapter one, literature review maps and methodology plans.</li>
        <li>Questionnaire templates and data analysis guides.</li>
        <li>Study guides, revision notes and summaries that you wrote yourself.</li>
        <li>Practical guides, such as programming or engineering workbooks.</li>
      </ul>

      <h2>What You Cannot Publish</h2>

      <ul>
        <li>Anything you did not write or do not have the right to sell, including other people's projects and copied textbooks.</li>
        <li>Completed projects meant to be submitted as a student's own work.</li>
        <li>Leaked examination questions or answers.</li>
        <li>Misleading titles or previews that do not match the full document.</li>
      </ul>

      <p>
        Listings that break these rules are removed, and repeated breaches lead to the workspace
        being suspended. The full rules are in our <Link to="/terms">terms of use</Link>.
      </p>

      <h2>What Makes a Guide Sell</h2>

      <ul>
        <li>
          <strong>A specific topic.</strong> "Effect of POS adoption on small businesses in Uyo"
          is easier to find and more useful than "banking project".
        </li>
        <li>
          <strong>A generous preview.</strong> A full, well-written chapter one shows students the
          quality they are paying for, and it is what search engines index.
        </li>
        <li>
          <strong>Practical content.</strong> Students value worked sample-size calculations,
          ready questionnaires and clear guidance on chapters four and five.
        </li>
        <li>
          <strong>A fair price.</strong> Students pay from their own pocket, so a reasonable
          price usually brings more sales.
        </li>
      </ul>

      <h2>Your Publisher Dashboard</h2>

      <p>
        Once you are set up, your dashboard shows each listing's views and sales, your orders and
        your commission rate. You can edit a listing, change its price, or move it back to draft
        at any time. Students can rate guides they have bought, and good ratings help your guides
        stand out.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Does it cost anything to become a publisher?</h3>
      <p>
        No. Joining and listing are free. The platform only earns a commission when you make a
        sale.
      </p>

      <h3>How much commission does StudentToolsNG keep?</h3>
      <p>
        A flat 15% of each sale, and nothing else: no sign-up fee, no listing fee and no monthly
        charge. On a ₦2,000 guide, you receive ₦1,700 and the platform keeps ₦300. Your rate is
        fixed when you join, shown on your dashboard, and does not change for your account
        afterwards.
      </p>

      <h3>When do I receive my money?</h3>
      <p>
        Paystack settles your share to your bank account on its normal settlement schedule. Your
        very first payout can take a little longer while Paystack completes its one-time check of
        your account.
      </p>

      <h3>Who can buy my guides?</h3>
      <p>
        Any visitor can read the free preview. Buyers pay securely through Paystack, and the
        full document unlocks in their account as soon as the payment is confirmed.
      </p>

      <h3>Can I see an example?</h3>
      <p>
        Yes. Browse the <Link to="/marketplace">Research Library</Link> to see how published
        guides look, how previews are laid out and how they are priced.
      </p>

      <div className="pe-cta">
        <Link to={startLink} className="pe-button">
          Start publishing
        </Link>
        <span className="pe-cta-note">
          Questions first? <Link to="/contact">Contact us</Link>.
        </span>
      </div>
    </div>
  );
};

export default PublishEarn;
