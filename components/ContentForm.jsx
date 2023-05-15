import { useState } from "react";

const ContentForm = ({ onSubmit }) => {
  const [topicInput, setTopicInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [lengthInput, setLengthInput] = useState("");
  const [audienceInput, setAudienceInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      topic: topicInput,
      focusKeyword: keywordInput, 
      length: lengthInput,
      targetAudience: audienceInput, 
    });
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="topic"
          className="form-control mb-3"
          placeholder="Enter a topic"
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="focusKeyword"
          className="form-control mb-3"
          placeholder="Enter a focus keyword"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="length"
          className="form-control mb-3"
          placeholder="Enter blog post length"
          value={lengthInput}
          onChange={(e) => setLengthInput(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="targetAudience"
          className="form-control mb-3"
          placeholder="Enter target audience"
          value={audienceInput}
          onChange={(e) => setAudienceInput(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Generate Blog Post"
          className="btn btn-primary"
        />
      </div>
    </form>
  );
};

export default ContentForm;
