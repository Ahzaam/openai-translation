import { SendSVG, CopySVG } from "../components/icons";
import { functions } from "../service/firebase";
import { useState } from "react";
import "../App.css";
export default function HomePage() {
  const [results, setResult] = useState([]);
  const [prompt, setPrompt] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    setPrompt(e.target.value);
  };

  const handleFix = () => {
    functions
      .httpsCallable("fix")({
        prompt: prompt,
      })
      .then((response) => {
        setResult([...results, response.data]);
        console.log(response.data);
      });
  };

  return (
    <div className="bg-gray-50" style={{ minHeight: "90vh" }}>
      <div className=" p-4 rounded-lg   max-w-4xl mx-auto ">
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full pb-9 px-5  max-w-4xl">
          <div className="flex items-center rounded-lg border bg-white border-gray-400 pl-3 pr-1  py-1">
            <textarea
              onChange={handleChange}
              type="text"
              placeholder="Type a prompt"
              className="w-full focus:outline-none"
              cols="30"
              rows="5"
            ></textarea>

            <button
              onClick={handleFix}
              className="bg-blue-600 flex items-center justify-center font-bold py-1 h-9 w-14 text-center px-4 ml-2 rounded"
            >
              {" "}
              <SendSVG />
            </button>
          </div>
        </div>
        <div
          className=" p-4 rounded-lg text-center my-4 flex flex-col min-h-full bg-white mb-56"
          style={{ minHeight: "70vh" }}
        >
          <h2 className="font-bold mb-2 text-2xl">
            AI Social Media Caption Writing
          </h2>
          {results.map((result, ind) => {
            return (
              <div
                className="bg-gray-50 rounded-lg shadow-md p-4 mb-3 fade-in"
                key={ind}
              >
                <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
                  <p
                    id={"captionID-" + ind}
                    className="text-gray-700"
                    aria-label="copy-text"
                  >
                    {result}
                  </p>
                </div>
                {/* COPY BUTTON */}
                <div
                  className="text-right mt-2"
                  onClick={(e) => {
                    var text = document.querySelector(
                      "#captionID-" + ind
                    ).textContent;
                    navigator.clipboard.writeText(text);
                    document.querySelector("#copybtn-" + ind).textContent =
                      "Copied!";
                    setTimeout(() => {
                      document.querySelector("#copybtn-" + ind).textContent =
                        "Copy";
                    }, 2000);
                  }}
                >
                  <div className="ml-auto w-fit flex bg-gray-100 py-1 px-3 rounded-lg cursor-pointer">
                    <div id={"copybtn-" + ind} className="pb-2 mx-2">
                      Copy
                    </div>{" "}
                    <div className=" mt-1  ">
                      <CopySVG />
                    </div>
                  </div>
                </div>

                {/* --------------- */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
