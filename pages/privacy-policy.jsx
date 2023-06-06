import Navigation from "../components/Nav";
import Hero2 from "../components/Hero2";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <>
      <Navigation />
      <Hero2
        heading="Privacy is Important"
        subheading="Discover Our Policies"
        listItems={[
          "We Respect Your Privacy",
          "Transparency in Data Handling",
          "Your Control, Your Data",
          "Secure Information Practices",
          "Understanding Your Rights",
        ]}
      />
      <div className="card-block">
        <div className="z-container p-50 card">
          <h1>Privacy Policy</h1>
          <p>
            This privacy policy explains how we collect, use, disclose and
            protect your information when you visit our app. Please read this
            policy carefully.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect personal information and non-personal information through
            the app.
          </p>

          <h3>Personal Information</h3>
          <p>
            We collect personal information which you provide to us while using
            our app. This may include your name, email address, phone number,
            etc.
          </p>

          <h3>Non-Personal Information</h3>
          <p>
            We collect non-personal information such as device information, log
            information, location information and other information that cannot
            be used to personally identify you.
          </p>

          <h2>3. Use of Your Information</h2>
          <p>
            We use your personal information to provide, maintain and improve
            our services, to develop new services and to protect ourselves and
            our users.
          </p>

          <h2>4. Sharing of Your Information</h2>
          <p>
            We do not sell or share your personal information with third parties
            except as described in this policy.
          </p>

          <h2>5. Security of Your Information</h2>
          <p>
            We are committed to protecting your personal information and have
            implemented appropriate security measures to protect it.
          </p>

          <h2>6. Changes to this Policy</h2>
          <p>
            We may periodically update this privacy policy. We will notify you
            of any changes by posting the new privacy policy on this page.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact
            us at <a href="mailto:hello@imraan.in">hello@imraan.in</a>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
