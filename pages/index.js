import Head from "next/head";
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import ContentForm from "../components/ContentForm";
import Hero2 from "../components/Hero2";
import Footer from "../components/Footer";
import Navigation from "../components/Nav";

export default function Home() {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(true);

  const contentRef = useRef();
  const metaDescriptionRef = useRef();
  const slugRef = useRef();

  async function onSubmit(formData) {
    setShowForm(false);
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

  function handleGenerateAgain() {
    setShowForm(true);
    setResult(null);
  }

  async function handleCopy(ref) {
    const text = ref.current.innerText;
    await navigator.clipboard.writeText(text);
    alert("Content copied");
  }

  function downloadPDF() {
    const doc = new jsPDF();

    const titleFontSize = 22;
    const contentFontSize = 12;
    const metaDescriptionFontSize = 12;

    const textWidth = doc.internal.pageSize.getWidth() - 20;
    const formattedContentText = doc.splitTextToSize(
      parsedResult.content,
      textWidth
    );

    doc.setFontSize(titleFontSize);
    doc.text(parsedResult.title, 10, 10);

    doc.setFontSize(contentFontSize);
    doc.text(formattedContentText, 10, 20);

    const lineWidth = doc.internal.pageSize.getWidth() - 20;
    const lineY = 20 + (formattedContentText.length * contentFontSize) / 2.5;
    doc.setLineWidth(0.5);
    doc.line(10, lineY, lineWidth, lineY);

    doc.setFontSize(metaDescriptionFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Meta Description: ", 10, lineY + 10);
    doc.setFont("helvetica", "normal");
    const formattedMetaDescriptionText = doc.splitTextToSize(
      parsedResult.metaDescription,
      textWidth - 30
    );
    doc.text(formattedMetaDescriptionText, 10 + 30, lineY + 10);

    doc.save("GeneratedBlogPost.pdf");
  }

  function parseGeneratedText(text) {
    const titleRegex = /^Title:(.*?)\n/;
    const slugRegex = /\nSlug:(.*?)\n/;
    const metaDescriptionRegex = /\nMeta Description:(.*)$/;

    const titleMatch = text.match(titleRegex);
    const slugMatch = text.match(slugRegex);
    const metaDescriptionMatch = text.match(metaDescriptionRegex);
    const title = titleMatch ? titleMatch[1].trim() : "";
    const slug = slugMatch ? slugMatch[1].trim() : "";
    const metaDescription = metaDescriptionMatch
      ? metaDescriptionMatch[1].trim()
      : "";
    const content = text
      .replace(titleRegex, "")
      .replace(slugRegex, "")
      .replace(metaDescriptionRegex, "");

    return { title, content, slug, metaDescription };
  }

  const parsedResult = result ? parseGeneratedText(result) : null;

  return (
    <div className="container-fluid p-0">
      <Head>
        <title>Athena</title>
      </Head>
      <Navigation />
      <Hero2 />
      <div className="card-block">
        <div className="z-container pt-4 card mnh500">
          {showForm ? <ContentForm onSubmit={onSubmit} /> : null}
          {loading ? (
            <span className="loader"></span>
          ) : (
            <>
              {result && (
                <div>
                  <h1 className="text-capitalize mb-3">{title}</h1>
                  <div
                    className="response-content"
                    ref={contentRef}
                    onClick={() => handleCopy(contentRef)}
                  >
                    {parsedResult.content}
                  </div>
                  <div
                    ref={metaDescriptionRef}
                    onClick={() => handleCopy(metaDescriptionRef)}
                    className="mt-3"
                  >
                    <b></b> {parsedResult.metaDescription}
                  </div>
                  <div
                    ref={slugRef}
                    onClick={() => handleCopy(slugRef)}
                    className="mt-3"
                  >
                    <b></b> {parsedResult.slug}
                  </div>
                  <button
                    onClick={downloadPDF}
                    className="btn btn-primary mr-2"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={handleGenerateAgain}
                    className="btn btn-secondary"
                  >
                    Generate Again
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
