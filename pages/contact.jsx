import Navigation from "../components/Nav";
import Hero2 from "../components/Hero2";
import Footer from "../components/Footer";

const Oneliner = () => {
  return (
    <>
      <Navigation />
      <Hero2
        heading="Like the Tool?"
        listItems={[
          "Unleash Your Content Potential",
          "Transform Your Content Strategy",
          "Start Crafting Superior Content",
          "We're Here to Help!",
          "Got Questions? ",
        ]}
      />      <h1 className="z-container minh500">This page in being built...</h1>
      <Footer />
    </>
  );
};

export default Oneliner;
