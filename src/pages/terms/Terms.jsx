import { Helmet } from "react-helmet-async"; // ✅ FIXED
import "./terms.css";

const Terms = () => {

 const url = "https://studenttoolsng.com/terms";
 const title = "Terms and Conditions | StudentToolsNG";
 const description = "Read the terms and conditions for using StudentToolsNG academic tools, calculators, and educational resources.";

 const image = "https://studenttoolsng.com/logo.png";

 return(

 <div className="terms-page">

 <Helmet>

 {/* Primary SEO */}
 <title>{title}</title>

 <meta name="description" content={description} />

 <meta name="keywords" content="terms and conditions StudentToolsNG, user agreement student tools Nigeria, website terms Nigeria" />

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
  name: "Terms and Conditions",
  url: url,
  description: description,
  publisher: {
    "@type": "Organization",
    name: "StudentToolsNG"
  }
 })}
 </script>

 </Helmet>

 <h1>Terms and Conditions</h1>

 <p>
 Welcome to StudentToolsNG. By accessing and using this website, you agree to comply with the following terms and conditions.
 </p>

 <h2>Use of Our Tools</h2>

 <p>
 StudentToolsNG provides academic tools such as CGPA calculators, WAEC grade calculators, and JAMB score calculators for educational purposes only.
 </p>

 <p>
 While we strive to provide accurate calculations, users should verify their academic results with their respective institutions.
 </p>

 <h2>Educational Content</h2>

 <p>
 Tutorials and educational materials published on StudentToolsNG are intended to support students in their learning journey.
 </p>

 <p>
 We do not guarantee academic outcomes based on the use of our tools or tutorials.
 </p>

 <h2>User Responsibility</h2>

 <p>
 Users are responsible for ensuring the accuracy of the information they enter into any calculators or tools on this website.
 </p>

 <h2>External Links</h2>

 <p>
 StudentToolsNG may contain links to external websites. We are not responsible for the content or practices of these external sites.
 </p>

 <h2>Changes to These Terms</h2>

 <p>
 We reserve the right to update these terms at any time. Users are encouraged to review this page periodically.
 </p>

 <h2>Contact</h2>

 <p>
 If you have questions about these Terms and Conditions, please contact us through the contact page.
 </p>

 </div>

 );

};

export default Terms;