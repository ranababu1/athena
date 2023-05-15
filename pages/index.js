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
    const textWidth = doc.internal.pageSize.getWidth() - 20;
  
    doc.setFontSize(22);
    doc.text(title, 10, 30);
    doc.setFontSize(16);
  
    doc.setLineWidth(1);
    doc.line(10, 35, doc.internal.pageSize.getWidth() - 10, 35);
  
    const contentText = parsedResult.content;
    const formattedContentText = doc.splitTextToSize(contentText, textWidth);
    doc.text(formattedContentText, 10, 50);
  
    const lastLineY = doc.autoTable.previous.finalY || 0;
    doc.setLineWidth(1);
    doc.line(10, lastLineY + 20, doc.internal.pageSize.getWidth() - 10, lastLineY + 20);
  
    const metaDescriptionText = "Meta Description: " + parsedResult.metaDescription;
    doc.setFont("helvetica", "bold");
    doc.text(metaDescriptionText, 10, lastLineY + 35);
  
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
