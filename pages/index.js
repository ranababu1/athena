import Head from "next/head";
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../components/HeroSection";
import ContentForm from "../components/ContentForm";

export default function Home() {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const contentRef = useRef();
  const metaDescriptionRef = useRef();

  async function onSubmit(formData) {
    setLoading(true);
    try {
      const response = await fetch("/api/apiCall", {
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
      setTitle(formData.topic);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(ref) {
    const text = ref.current.innerText;
    await navigator.clipboard.writeText(text);
    alert("Content copied");
  }

  function downloadPDF() {
    const doc = new jsPDF();
    const textWidth = doc.internal.pageSize.getWidth() - 20;
    const formattedText = doc.splitTextToSize(result, textWidth);

    doc.text(formattedText, 10, 10);
    doc.save("GeneratedBlogPost.pdf");
  }

  function parseGeneratedText(text) {
    const titleRegex = /^(.*?)\n/;
    const metaDescriptionRegex = /\nMeta Description:(.*)$/;

    const titleMatch = text.match(titleRegex);
    const metaDescriptionMatch = text.match(metaDescriptionRegex);
    const title = titleMatch ? titleMatch[1] : "";
    const metaDescription = metaDescriptionMatch ? metaDescriptionMatch[1] : "";
    const content = text
      .replace(titleRegex, "")
      .replace(metaDescriptionRegex, "");

    return { title, content, metaDescription };
  }

  const parsedResult = result ? parseGeneratedText(result) : null;

  return (
    <div className="container-fluid p-5 text-center">
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>
      <HeroSection />
      <main className="text-center py-5">
        <h3 className="mb-4">Generate a Blog Post</h3>
        <ContentForm onSubmit={onSubmit} />

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {parsedResult && (
              <div>
                <h1 className="text-capitalize mb-3">{title}</h1>
                <div ref={contentRef} onClick={() => handleCopy(contentRef)}>
                  {parsedResult.content}
                </div>
                <div
                  ref={metaDescriptionRef}
                  onClick={() => handleCopy(metaDescriptionRef)}
                  className="mt-3"
                >
                  <b>Meta Description:</b> {parsedResult.metaDescription}
                </div>
              </div>
            )}
          </>
        )}
        {result && (
          <button onClick={downloadPDF} className="btn btn-primary">
            Download PDF
          </button>
        )}
      </main>
    </div>
  );
}
