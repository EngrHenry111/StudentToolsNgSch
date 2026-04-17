import { Helmet } from "react-helmet-async";
// import authorImg from "../../assets/images/Focused coder at work.png";
import profile from "../../../public/profile.png"
import "./author.css";

const Author = () => {
  const url = "https://studenttoolsng.com/author";
  const title = "Engr. Henry Akpan | Founder of StudentToolsNG | Full-Stack Developer";
  const description =
    "Engr. Henry Akpan is an Electrical Engineer, Full-Stack Web Developer, and founder of StudentToolsNG, building academic tools and tutorials for Nigerian students.";

  const image = "https://studenttoolsng.com/profile.png";

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
            image: "https://studenttoolsng.com/profile.png",
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
        src={profile}
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
<section className="auth">
<h2>About the Author</h2>

<p>
Engr. Henry Akpan is an Electrical Engineer and Full-Stack Developer 
with a passion for building educational tools that simplify learning 
for Nigerian students.
</p>

<p>
He is the founder of StudentToolsNG, a platform that provides free 
academic calculators, tutorials, and study resources.
</p>

<h2>Skills & Expertise</h2>

<ul>
  <li>Full-Stack Web Development (React, Node.js)</li>
  <li>Electrical and Electronics Engineer</li>
  <li>UI UX Designer</li>
  <li>Mathematics and Physics Tutoring</li>
  <li>Educational Technology Solutions</li>
</ul>

<p>
Explore tools created by Henry such as the 
<a href="/cgpa-calculator">CGPA Calculator</a>, 
<a href="/waec-grade-calculator">WAEC Calculator</a>, and 
<a href="/jamb-score-calculator">JAMB Calculator</a>.
</p>


</section>

<div className="arti">
<h2>Articles by Henry Akpan</h2>

<ul>
  <li><a href="/tutorial/how-to-calculate-cgpa">How to Calculate CGPA</a></li>
  <li><a href="/tutorial/waec-grading-system">WAEC Grading System</a></li>
</ul>
</div>
    </div>
  );
};

export default Author;