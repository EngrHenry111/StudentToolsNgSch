import { Helmet } from "react-helmet-async"; // ✅ FIXED

import "./privacyPolicy.css";

const PrivacyPolicy = () => {

const url = "https://studenttoolsng.com/privacy-policy";
const title = "Privacy Policy | StudentToolsNG";
const description = "Learn how StudentToolsNG collects, uses, and protects your personal data while providing academic tools and educational resources.";
const image = "https://studenttoolsng.com/logo.png";

return (

<div className="privacy-container">

<Helmet>

{/* Primary SEO */}
<title>{title}</title>

<meta name="description" content={description} />

<meta name="keywords" content="privacy policy StudentToolsNG, data protection Nigeria, student tools privacy policy" />

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
 url: url,
 description: description,
 publisher: {
   "@type": "Organization",
   name: "StudentToolsNG"
 }
})}
</script>

</Helmet>

<h1>Privacy Policy</h1>

<p>
This Privacy Policy explains how StudentToolsNG collects,
uses, and protects information when you use our website.
</p>

<h2>1. Information We Collect</h2>

<p>
StudentToolsNG may collect limited information such as:
</p>

<ul>
<li>Name and email submitted through contact forms</li>
<li>Usage data such as pages visited</li>
<li>Device and browser information</li>
</ul>

<h2>2. How We Use Your Information</h2>

<p>
We use the information collected to:
</p>

<ul>
<li>Improve our academic tools</li>
<li>Respond to user inquiries</li>
<li>Analyze website performance</li>
<li>Provide better learning resources</li>
</ul>

<h2>3. Cookies</h2>

<p>
StudentToolsNG may use cookies to improve user experience,
analyze traffic, and remember user preferences.
</p>

<h2>4. Third-Party Services</h2>

<p>
We may use third-party services such as analytics
providers and hosting platforms to improve the
performance of the website.
</p>

<h2>5. External Links</h2>

<p>
Our website may contain links to external websites.
We are not responsible for the privacy practices of
those websites.
</p>

<h2>6. Data Security</h2>

<p>
We take reasonable steps to protect user information
from unauthorized access or disclosure.
</p>

<h2>7. Children's Information</h2>

<p>
StudentToolsNG is designed for educational purposes.
We do not knowingly collect personal data from children
without parental consent.
</p>

<h2>8. Changes to This Policy</h2>

<p>
We may update this privacy policy from time to time.
Updates will be posted on this page.
</p>

<h2>9. Contact Us</h2>

<p>
If you have questions about this Privacy Policy,
please contact us through the contact page.
</p>

<p className="policy-update">
Last updated: {new Date().getFullYear()}
</p>

</div>

);

};

export default PrivacyPolicy;