import Head from "next/head";
import { useState } from "react";
import OnelinerForm from "../components/OnelinerForm";
import Footer from "../components/Footer";
import Hero2 from "../components/Hero2";
import Navigation from "../components/Nav";

export default function Oneliner() {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData) {
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

  return (
    <>
      <Navigation />
      <Hero2 />
      <div className="z-container">
        <h3 className="mb-4">Generate a One-liner</h3>
        <OnelinerForm onSubmit={onSubmit} />

        {loading ? (
                      <span className="loader"></span>

        ) : (
          result && (
            <div>
              <h1>Generated One-liner</h1>
              <p>{result}</p>
            </div>
          )
        )}
      </div>
      <Footer />
    </>
  );
}
