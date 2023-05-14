import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import jsPDF from "jspdf";

export default function Home() {
  const [topicInput, setTopicInput] = useState("");
  const [focusKeywordInput, setFocusKeywordInput] = useState("");
  const [lengthInput, setLengthInput] = useState("");
  const [targetAudienceInput, setTargetAudienceInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("api/apiCall", {
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
      setTopicInput("");
      setFocusKeywordInput("");
      setLengthInput("");
      setTargetAudienceInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  function downloadPDF() {
    const doc = new jsPDF();
    doc.text(result, 10, 10);
    doc.save("GeneratedBlogPost.pdf");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Blog Post Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>Generate a Blog Post</h3>
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
            placeholder="Enter the blog length (words)"
            value={lengthInput}
            onChange={(e) => setLengthInput(e.target.value)}
          />
          <input
            type="text"
            name="targetAudience"
            placeholder="Enter the target audience"
            value={targetAudienceInput}
            onChange={(e) => setTargetAudienceInput(e.target.value)}
          />
          <input type="submit" value="Generate blog post" />
        </form>
        <div className={styles.result}>{result}</div>
        {result && (
          <button onClick={downloadPDF} className={styles.downloadButton}>
            Download as PDF
          </button>
        )}
      </main>
    </div>
  );
}
