import { useState } from "react";

const SocialForm = ({ onSubmit }) => {
  const [noOfWords, setNoOfWords] = useState("");
  const [urlOfPage, setUrlOfPage] = useState("");
  const [whichSocial, setWhichSocial] = useState("");
  const [geo, setGeo] = useState("");
  const [tonality, setTonality] = useState("");
  const [keywords, setKeywords] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [addGoalHere, setAddGoalHere] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    
    if (!noOfWords || !urlOfPage || !whichSocial || !geo || !tonality || !keywords || !targetAudience || !addGoalHere) {
      alert('Please fill all fields');
      return;
    }
    
    onSubmit({
      noOfWords,
      urlOfPage,
      whichSocial,
      geo,
      tonality,
      keywords,
      targetAudience,
      addGoalHere,
    });
  }
  

  return (
    <div className="form-content">
    <div className="form-wrapper">
      <h3 className="head3">Generate an article</h3>
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={noOfWords}
        onChange={(e) => setNoOfWords(e.target.value)}
        placeholder="Enter Number of Words"
      />

      <input
        type="text"
        value={urlOfPage}
        onChange={(e) => setUrlOfPage(e.target.value)}
        placeholder="Enter URL of the Page"
      />

      <select
        value={whichSocial}
        onChange={(e) => setWhichSocial(e.target.value)}
      >
        <option value="">Select Social Network</option>
        <option value="Facebook">Facebook</option>
        <option value="Twitter">Twitter</option>
        <option value="LinkedIn">LinkedIn</option>
      </select>

      <select value={geo} onChange={(e) => setGeo(e.target.value)}>
        <option value="">Select Geography</option>
        <option value="US">US</option>
        <option value="UK">UK</option>
        <option value="AU">AU</option>
        <option value="CA">CA</option>
      </select>

      <input
        type="text"
        value={tonality}
        onChange={(e) => setTonality(e.target.value)}
        placeholder="Enter Tonality"
      />

      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Enter Keywords"
      />

      <input
        type="text"
        value={targetAudience}
        onChange={(e) => setTargetAudience(e.target.value)}
        placeholder="Enter Target Audience"
      />

      <input
        type="text"
        value={addGoalHere}
        onChange={(e) => setAddGoalHere(e.target.value)}
        placeholder="Enter Goal"
      />

      <button type="submit">Generate Post</button>
    </form>
    </div>
    </div>
  );
};

export default SocialForm;
