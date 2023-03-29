import { useEffect, useState } from "react";
import { getPreviousResults } from "../service/databse";
import { CopySVG } from "../components/icons";
import Navbar from "./navbar";
export default function PreviousResults() {
  const [prevResults, setPrevResults] = useState([]);

  useEffect(() => {
    getPreviousResults().then((results) => {
      setPrevResults(results);
    });
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="fixed top-0 z-20 left-1/2 -translate-x-1/2 w-full bg-white">
        <Navbar />
      </div>
      <div className=" p-4 rounded-lg   max-w-4xl mx-auto ">
        <h1 className="text-xl text-center fixed">Last 50 results</h1>
        <div
          className=" p-4 rounded-lg text-center my-4 flex flex-col min-h-full overflow-auto bg-white "
          style={{ minHeight: "90vh" }}
        >
          {prevResults.map((result, ind) => {
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
                    {result.response}{" "}
                  </p>
                </div>
                <div className="text-left">{result.time}</div>
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
                  <div className="ml-auto w-fit flex  cursor-pointer">
                    <div className="rounded-lg flex bg-gray-200">
                      <div
                        id={"copybtn-" + ind}
                        className="pb-2   w-20  py-1 px-3 "
                      >
                        Copy
                      </div>{" "}
                      <div className="  py-2 px-3 ">
                        <CopySVG />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
