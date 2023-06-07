import Navigation from "../components/Nav";
import Hero2 from "../components/Hero2";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <>
      <Navigation />
      <Hero2
        heading="Our Terms of Service"
        subheading="Discover Our Terms and Conditions"
        listItems={[
          "Using Our Services",
          "Your Account",
          "Privacy and Copyright Protection",
          "Modifications to Services",
          "Ending our Relationship",
        ]}
      />
      <div className="card-block">
        <div className="z-container p-50 card">
          <h1>Terms of Service</h1>
          <p>
            These terms of service explain the rules and regulations for using our app. Please read these terms carefully.
          </p>

          <h2>2. Accepting the Terms</h2>
          <p>
            By using our app, you confirm that you accept these terms of service and agree to comply with them.
          </p>

          <h3>Account Registration</h3>
          <p>
            You may need to register an account to access some services of our app. You must provide accurate and complete information while registering an account.
          </p>

          <h3>Privacy and Copyright Protection</h3>
          <p>
            Our privacy policy explains how we treat your personal data and protect your privacy while using our app. By using our services, you agree that we can use such data in accordance with our privacy policy.
          </p>

          <h2>3. Modifying and Terminating our Services</h2>
          <p>
            We are constantly changing and improving our services. We may add or remove functionalities or features, and we may suspend or stop a service altogether.
          </p>

          <h2>4. Liability for our Services</h2>
          <p>
            Our app and the content within it are provided without any guarantees, conditions or warranties as to its accuracy.
          </p>

          <h2>5. Changes to the Terms</h2>
          <p>
            We may modify these terms or any additional terms that apply to a service to reflect changes to the law or changes to our services.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about these terms of service, please contact us at <a href="mailto:hello@imraan.in">hello@imraan.in</a>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
