import { Helmet } from "react-helmet-async";
import "./about.css";

const About = () => {
  const url = "https://studenttoolsng.com/about";
  const title = "About StudentToolsNG - Free Academic Tools for Nigerian Students";
  const description =
    "StudentToolsNG provides free academic tools like CGPA calculator, WAEC and JAMB score calculators, tutorials, and study resources for Nigerian students.";

  return (
    <div className="about-page">
      <Helmet>
        {/* Primary SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="CGPA calculator Nigeria, WAEC calculator, JAMB score calculator, student tools Nigeria" />

        {/* Canonical */}
        <link rel="canonical" href={url} />

        {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://studenttoolsng.com/logo.png" />
        <meta property="og:url" content={url} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://studenttoolsng.com/logo.png" />

        {/* Schema (Improved) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "StudentToolsNG",
            url: "https://studenttoolsng.com",
            logo: "https://studenttoolsng.com/logo.png",
            sameAs: [
              "https://facebook.com/",
              "https://instagram.com/",
              "https://linkedin.com/"
            ],
            description:
              "Free academic tools and tutorials for Nigerian students.",
            founder: {
              "@type": "Person",
              name: "Henry Akpan",
            },
          })}
        </script>
      </Helmet>

      <h1>About StudentToolsNG</h1>

      <p>
        StudentToolsNG is an educational platform designed to help students
        easily calculate their academic results and access helpful learning resources.
      </p>

      <p>
        Our platform provides free tools such as CGPA calculators, WAEC grade calculators,
        and JAMB score calculators to simplify academic planning for Nigerian students.
      </p>

      <p>
        In addition to academic tools, StudentToolsNG also provides tutorials,
        study guides, and scholarship opportunities to help students succeed in school.
      </p>

      <h2>Our Mission</h2>

      <p>
        Our mission is to make academic tools and educational resources easily
        accessible to every Nigerian student.
      </p>

      <h2>What We Offer</h2>

      <ul>
        <li>CGPA Calculator for university students</li>
        <li>WAEC grade calculator</li>
        <li>JAMB score calculator</li>
        <li>Study tutorials and guides</li>
        <li>Scholarship opportunities</li>
        <li>Study planning tools</li>
      </ul>

      <h2>Contact Us</h2>

      <p>
        If you have questions, suggestions, or feedback, feel free to reach out through our
        contact page.
      </p>
    </div>
  );
};

export default About;