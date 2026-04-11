import { Helmet } from "react-helmet-async";
import authorImg from "../../assets/images/Focused coder at work.png";
import "./author.css";

const Author = () => {
  const url = "https://studenttoolsng.com/author";
  const title = "Engr. Henry Akpan | Founder of StudentToolsNG | Full-Stack Developer";
  const description =
    "Engr. Henry Akpan is an Electrical Engineer, Full-Stack Web Developer, and founder of StudentToolsNG, building academic tools and tutorials for Nigerian students.";

  const image = "https://studenttoolsng.com/logo.png";

  return (
    <div className="author-page">
      <Helmet>
        {/* Primary SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Henry Akpan, StudentToolsNG founder, full stack developer Nigeria, software engineer Nigeria" />

        {/* Canonical */}
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Person Schema (VERY IMPORTANT) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Henry Akpan",
            url: "https://studenttoolsng.com/author",
            image: "https://studenttoolsng.com/logo.png",
            jobTitle: "Full-Stack Web Developer",
            worksFor: {
              "@type": "Organization",
              name: "StudentToolsNG",
            },
            description:
              "Electrical Engineer, Full-Stack Developer, and founder of StudentToolsNG helping students with academic tools.",
            sameAs: [
              "https://linkedin.com/",
              "https://facebook.com/",
              "https://twitter.com/"
            ],
          })}
        </script>
      </Helmet>

      <img
        src={authorImg}
        alt="Henry Akpan - Full Stack Developer"
        className="author-photo"
      />

      <h1>Engr. Henry Akpan</h1>

      <p>
        Electrical and Electronics Engineer, Full-Stack Web Developer and Mathematics & Physics Tutor.
        Founder of StudentToolsNG.
      </p>

      <p>
        Passionate about building technology solutions that help students succeed academically.
      </p>
    </div>
  );
};

export default Author;