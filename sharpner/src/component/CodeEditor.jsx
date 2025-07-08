import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Button from "./Button/GradientText/Button";

export default function CodeEditor({ value }) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("java");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCooldown, setSubmitCooldown] = useState(0);
  const [initialJavaCode, setInitialJavaCode] = useState("");
  const [initialPythonCode] = useState(
    `def example_function(a, b):\n    # Write code here...\n \t`
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const question = value;

  useEffect(() => {
    if (question) {
      const template = `public static ${question.return_type} ${question.function_name} {\n \t //Write code here... \n}`;
      setInitialJavaCode(template);
      setCode(template);
    }
  }, [question]);

  const runCode = async () => {
    if (isRunning || cooldown > 0) return;

    setIsRunning(true);
    setOutput("");
    setError("");

    try {
      const response = await fetch(`${backendUrl}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, testType: "initial" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to execute code");
      }

      setOutput(data.output);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRunning(false);
      startCooldown();
    }
  };

  const submitCode = async () => {
    if (isSubmitting || submitCooldown > 0) return;

    setIsSubmitting(true);
    setOutput("");
    setError("");

    try {
      const response = await fetch(`${backendUrl}/submit-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit code");
      }

      setOutput(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
      startSubmitCooldown();
    }
  };

  const startCooldown = () => {
    setCooldown(30);
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startSubmitCooldown = () => {
    setSubmitCooldown(30);
    const interval = setInterval(() => {
      setSubmitCooldown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(selectedLanguage === "java" ? initialJavaCode : initialPythonCode);
  };

  return (
    <div className="p-4 rounded-lg text-white">
      {/* Language Selector */}
      <div className="flex items-center justify-between mb-2 ">
        <div>
          <label className="mr-2">Language:</label>
          <select
            className="bg-black text-white p-1 rounded"
            onChange={handleLanguageChange}
            value={language}
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>
        <button
          className="px-2"
          onClick={() => {
            setCode(initialJavaCode);
          }}
        >
          <Button value={"Reset Code"} />
        </button>
      </div>

      {/* Monaco Code Editor */}
      <Editor
        height="300px"
        language={language}
        theme="hc-black"
        value={code}
        onChange={(value) => setCode(value || "")}
      />

      {/* Run and Submit Buttons */}
      <div className="flex flex-row justify-end space-x-2 items-center my-2">
        <button onClick={runCode} disabled={isRunning || cooldown > 0}>
          <Button value={`Run Code ${cooldown > 0 ? `(${cooldown}s)` : ""}`} />
        </button>
        <button
          onClick={submitCode}
          disabled={isSubmitting || submitCooldown > 0}
        >
          <Button
            value={`Submit ${submitCooldown > 0 ? `(${submitCooldown}s)` : ""}`}
          />
        </button>
      </div>

      {/* Output Section */}
      <div className="mt-4 p-2 text-white rounded">
        <h3 className="text-lg text-start">Output:</h3>
        {output && <pre className="text-green-400 text-start">{output}</pre>}
        {error && <pre className="text-red-400 text-start">{error}</pre>}
      </div>
    </div>
  );
}
