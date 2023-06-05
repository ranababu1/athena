import { useState } from "react";

const OnelinerForm = ({ onSubmit }) => {
  const [topicInput, setTopicInput] = useState("");
  const [lengthInput, setLengthInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      topic: topicInput,
      maxWordLimit: lengthInput,
    });
  }

  return (
    <div className="form-content">
    <div className="form-wrapper">
    <h1>Generate a One-liner</h1>
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
          type="number"
          name="length"
          className="form-control mb-3"
          placeholder="Enter max word limit"
          value={lengthInput}
          onChange={(e) => setLengthInput(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Generate One-liner"
          className="btn btn-primary"
        />
      </div>
    </form>
    </div>
    </div>
  );
};

export default OnelinerForm;
