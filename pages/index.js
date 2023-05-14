import Head from "next/head";
import { useState, useRef } from "react";
import styles from "./index.module.css";
import jsPDF from "jspdf";

export default function Home() {
  const [topicInput, setTopicInput] = useState("");
  const [focusKeywordInput, setFocusKeywordInput] = useState("");
  const [lengthInput, setLengthInput] = useState("");
  const [targetAudienceInput, setTargetAudienceInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const contentRef = useRef();
  const metaDescriptionRef = useRef();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/apiCall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topicInput,
          focusKeyword: focusKeywordInput,
          length: lengthInput,
          targetAudience: targetAudienceInput,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTitle(topicInput);
      setTopicInput("");
      setFocusKeywordInput("");
      setLengthInput("");
      setTargetAudienceInput("");
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
    const content = text.replace(titleRegex, "").replace(metaDescriptionRegex, "");

    return { title, content, metaDescription };
  }

  const parsedResult = result ? parseGeneratedText(result) : null;

  return (
    <div>
      <Head>
        <title>Blog Post Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Blog Post Generator</h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="topic"
            placeholder="Enter a topic"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
          />
          <input
            type="text"
            name="focusKeyword"
            placeholder="Enter a focus keyword"
            value={focusKeywordInput}
            onChange={(e) => setFocusKeywordInput(e.target.value)}
          />
                    <input
            type="number"
            name="length"
            placeholder="Enter blog post length"
            value={lengthInput}
            onChange={(e) => setLengthInput(e.target.value)}
          />
          <input
            type="text"
            name="targetAudience"
            placeholder="Enter target audience"
            value={targetAudienceInput}
            onChange={(e) => setTargetAudienceInput(e.target.value)}
          />
          <input type="submit" value="Generate Blog Post" />
        </form>
        {loading ? (
          <div className={styles.loader}>Loading...</div>
        ) : (
          <>
            {parsedResult && (
              <div>
                <h1 className={styles.resultTitle}>{title}</h1>
                <div className={styles.resultContent} ref={contentRef} onClick={() => handleCopy(contentRef)}>{parsedResult.content}</div>
                <div className={styles.resultMetaDescription} ref={metaDescriptionRef} onClick={() => handleCopy(metaDescriptionRef)}><b>Meta Description:</b> {parsedResult.metaDescription}</div>
              </div>
            )}
          </>
        )}
        {result && (
          <button onClick={downloadPDF} className={styles.downloadButton}>
            Download PDF
          </button>
        )}
      </main>
    </div>
  );
}
