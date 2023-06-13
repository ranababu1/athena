import Navigation from "../components/Nav";
import Hero2 from "../components/Hero2";
import Footer from "../components/Footer";

const Metadata = () => {
  return (
    <>
      <Navigation />
      <Hero2
        heading="Metadata for your blog"
        listItems={[
          "Better Titles & Descriptions",
          "Write Better Meta Data",
          "Rank better in Search Results",
          "Write Better Meta Data",
          "Better Meta Titles & Descriptions",
        ]}
      />{" "}
      <h1 className="z-container minh500">This page in being built...</h1>
      <Footer />
    </>
  );
};

export default Metadata;
