import { useEffect, useState } from "react";
import "./App.css";
import { fetch } from "./services/ApiRequest";

function App() {
  const [link, setLink] = useState("");
  const [id, setId] = useState(null);
  const [response, setResponse] = useState(null);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const res = await fetch(id);

        if (res.status === 200 && res.data.status === "ok") {
          setDisabled(false);
          setResponse(res.data);
        } else if (res.status === 200 && res.data.status === "fail") {
          alert("Invalid video ID");
          setDisabled(false);
        } else {
          alert("Error");
          setDisabled(false);
        }
      };

      fetchData();
    }
  }, [id]);

  return (
    <div className="App">
      <div id="logo">
        <h2>YOUTUBE a MP3</h2>
      </div>

      <div id="body">
        <input
          type="text"
          placeholder="YouTube link here"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
      </div>

      <button
        onClick={() => {
          const text = link.split("=")[1];
          if (text) {
            setId(text);
          }
        }}
        className={!disabled ? "btn-disabled" : ""}
      >
        Buscar
      </button>
      {response && (
        <button
          onClick={() => {
            window.location.href = response.link;
            setDisabled(true);
          }}
          style={{
            backgroundColor: "green",
            color: "white",
            cursor: "pointer",
          }}
          className={disabled ? "btn-disabled" : ""}
        >
          Descargar
        </button>
      )}
    </div>
  );
}

export default App;
