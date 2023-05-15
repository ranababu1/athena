import Head from "next/head";
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../components/HeroSection";
import ContentForm from "../components/ContentForm";
import Hero2 from "../components/Hero2";

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
  
    const titleFontSize = 22;
    const contentFontSize = 12;
    const metaDescriptionFontSize = 12;
  
    const textWidth = doc.internal.pageSize.getWidth() - 20;
    const formattedContentText = doc.splitTextToSize(parsedResult.content, textWidth);
  
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
    const formattedMetaDescriptionText = doc.splitTextToSize(parsedResult.metaDescription, textWidth - 30);
    doc.text(formattedMetaDescriptionText, 10 + 30, lineY + 10);
  
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
    <div className="container p-5 text-center">
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>
      <Hero2 />
      {/* <HeroSection /> */}
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
