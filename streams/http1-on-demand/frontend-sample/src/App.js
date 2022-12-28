import { useState } from "react";

function App() {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    fetch("http://localhost:3333/stream").then(async (response) => {
      // response.body is a ReadableStream

      const reader = response.body.getReader();
      const enc = new TextDecoder("utf-8");

      const processRow = async (reader) => {
        const chunk = await reader.read();
        const value = enc.decode(chunk.value);
        setContent((prev) => prev + value);

        return chunk;
      };

      setContent("");

      let chunk;
      do {
        chunk = await processRow(reader);
      } while (chunk.done === false);
      chunk = await processRow(reader);
    });
  };

  return (
    <div className="App">
      <h1>testing stream</h1>
      <button onClick={handleSubmit}>click to make request</button>

      <h3>response: </h3>
      <textarea style={{ width: "100%", minHeight: "300px" }} value={content} />
    </div>
  );
}

export default App;
