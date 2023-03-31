import { CopySVG, LoadingSVG } from "../components/icons";
import { functions } from "../service/firebase";
import { useState } from "react";
import Navbar from "./navbar";
import "../App.css";
import Alert from './Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

export default function HomePage() {
  const [results, setResult] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const handleChange = (e) => {
    setFetchError(false);
    setPrompt(e.target.value);
  };
  const handleClear = () => {
    setPrompt("");
  };

  const handleFixAgain = (prev_prompt) => {
    if (prompt === "" || loading) return;
    setLoading(true);
    functions
      .httpsCallable("fix")({
        prompt: prev_prompt,
      })
      .then((response) => {

        setResult([...results, { prompt, response: response.data }]);
      })
      .catch(() => {
        setFetchError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFix = () => {
    if (prompt === "" || loading) return;
    setLoading(true);
    functions
      .httpsCallable("fix")({
        prompt: prompt,
      })
      .then((response) => {

        setResult([...results, { prompt, response: response.data }]);
      })
      .catch(() => {
        setFetchError(true);
      })
      .finally(() => {
        setLoading(false);

      })
  };

  return (
    <div className="bg-gray-50" style={{ minHeight: "90vh" }}>
      <div className="fixed top-0 z-20 left-1/2 -translate-x-1/2 w-full bg-white">
        <Navbar />
      </div>

      <div className=" p-4 rounded-lg   max-w-4xl mx-auto ">


        <Alert type="error" message="There was an error processing your request." fetchError={fetchError} setFetchError={setFetchError} />

        <div className="fixed bottom-0 z-20 left-1/2 -translate-x-1/2 w-full pb-2 px-5  max-w-4xl">
          <div className=" rounded-lg bg-white border-gray-400  ">
            {/* <textarea
              onChange={handleChange}
              type="text"
              value={prompt}
              placeholder="Paste Text Here"
              className="w-full  rounded-lg  p-4 text-lg focus:outline-none"
              cols="30"
              rows="3"
            ></textarea> */}
            <TextField
              id="outlined-multiline-static"
              className="w-full  rounded-lg  p-4 text-lg focus:outline-none"
              label="Paste Text Here"
              value={prompt}
              onChange={handleChange}
              multiline
              rows={4}
              defaultValue="Default Value"
            />
            <div className="flex bg-[#334155] py-2">

              <Button variant="contained" color="inherit" endIcon={!loading ? <SettingsIcon /> : <></>}
                style={{ marginLeft: '10px' }}
                onClick={handleFix}
              >
                {loading ? <LoadingSVG /> : "Fix Everything"}
              </Button>

              {/* <button
                onClick={handleFix}
                className="bg-gray-50 flex items-center justify-center font-bold py-1 h-9 text-gray-700  text-center px-4 ml-2 rounded"
              >
                {" "}
                Translate
              </button>
              <button
                onClick={handleFix}
                className="bg-gray-50 flex items-center justify-center font-bold py-1 h-9 text-gray-700  text-center px-4 ml-2 rounded"
              >
                {" "}
                Fix Grammer
              </button> */}
              <Button variant="contained" color="inherit" endIcon={<ClearIcon />}
                style={{ marginLeft: '10px' }}
                onClick={handleClear}
              >
                Clear Input
              </Button>
              <Button variant="contained" color="inherit" endIcon={<DeleteSweepIcon />}
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  setResult([]);
                  
                }}
              >
                Clear Chat
              </Button>

      
            </div>
          </div>
        </div>
        <div
          className=" p-4 rounded-lg text-center  my-4 flex flex-col min-h-full overflow-auto bg-white mb-56"
          style={{ minHeight: "70vh" }}
        >
          {results.map((result, ind) => {
            return (
              <div
                className="bg-gray-50 rounded-lg my-8 shadow-md p-4 mb-3 fade-in"
                key={ind}
              >
                <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
                  <p
                    id={"captionID-" + ind}
                    className="text-gray-700"
                    aria-label="copy-text"
                  >
                    {result.response}
                  </p>
                </div>
                {/* COPY BUTTON */}
                <div className="text-right mt-2">
                  <div className="ml-auto w-fit flex  cursor-pointer">
                    <div
                      onClick={() => handleFixAgain(result.prompt)}
                      className="pb-2 mx-2 bg-gray-200 rounded-lg  py-1 px-3 "
                    >
                      Regenerate
                    </div>{" "}
                    <div
                      className="rounded-lg flex bg-gray-200"
                      onClick={(e) => {
                        var text = document.querySelector(
                          "#captionID-" + ind
                        ).textContent;
                        navigator.clipboard.writeText(text);
                        document.querySelector("#copybtn-" + ind).textContent =
                          "Copied!";
                        setTimeout(() => {
                          document.querySelector(
                            "#copybtn-" + ind
                          ).textContent = "Copy";
                        }, 2000);
                      }}
                    >
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

                {/* --------------- */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
