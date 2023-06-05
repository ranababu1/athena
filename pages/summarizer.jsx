// File: pages/Summarizer.jsx

import { useState } from "react";
import SummarizerForm from "../components/SummarizerForm";
import Footer from "../components/Footer";
import Hero2 from "../components/Hero2";
import Navigation from "../components/Nav";

const Summarizer = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData) {
    setLoading(true);
    try {
      const response = await fetch("/api/apiCallForSummarizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navigation />
      <Hero2 />
      <div className="container">
        <h3 className="mb-4">Summarize your text</h3>
        <SummarizerForm onSubmit={onSubmit} />

        {loading ? (
          <div>Loading...</div>
        ) : (
          result && (
            <div>
              <h1>Summarized Text</h1>
              <p>{result}</p>
            </div>
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default Summarizer;
