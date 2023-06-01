import { useState } from "react";

const SummarizerForm = ({ onSubmit }) => {
  const [textInput, setTextInput] = useState("");
  const [maxWordsInput, setMaxWordsInput] = useState("");
  const [summaryType, setSummaryType] = useState("paragraph");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      text: textInput,
      maxWordLimit: maxWordsInput,
      summaryType,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          name="text"
          className="form-control mb-3"
          placeholder="Enter text to be summarized"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="maxWords"
          className="form-control mb-3"
          placeholder="Enter max word limit"
          value={maxWordsInput}
          onChange={(e) => setMaxWordsInput(e.target.value)}
        />
      </div>
      <div className="form-group">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="summaryType"
            id="paragraph"
            value="paragraph"
            checked={summaryType === "paragraph"}
            onChange={(e) => setSummaryType(e.target.value)}
          />
          <label className="form-check-label" htmlFor="paragraph">
            Paragraph
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="summaryType"
            id="pointwise"
            value="pointwise"
            checked={summaryType === "pointwise"}
            onChange={(e) => setSummaryType(e.target.value)}
          />
          <label className="form-check-label" htmlFor="pointwise">
            Pointwise
          </label>
        </div>
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Summarize Text"
          className="btn btn-primary"
        />
      </div>
    </form>
  );
};

export default SummarizerForm;
