import Head from "next/head";
import { useState } from "react";
import OnelinerForm from "../components/OnelinerForm";
import Footer from "../components/Footer";
import Hero2 from "../components/Hero2";
import Navigation from "../components/Nav";

export default function Oneliner() {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  async function onSubmit(formData) {
    setShowForm(false);
    setLoading(true);
    try {
      const response = await fetch("/api/apiCallForOneliner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          action: "generateOneliner",
        }),
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

  function handleGenerateAgain() {
    setShowForm(true);
    setResult(null);
  }

  return (
    <>
      <Navigation />
      <Hero2 />
      <div className="z-container">
        {showForm ? <OnelinerForm onSubmit={onSubmit} /> : null}

        {loading ? (
          <span className="loader"></span>
        ) : (
          <>
            {result && (
              <div className="z-container">
                <p>{result}</p>
                <button onClick={handleGenerateAgain} className="btn btn-secondary">
                  Generate Again
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
