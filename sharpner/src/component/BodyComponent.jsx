import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import QuestionCompoenent from "./QuestionCompoenent";
import Title from "./Title/BlurText/Title";
import Loading from "./Loading/MetaBalls/Loading";

export default function BodyComponent() {
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/get-todays-question")
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setQuestion(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching today's question:", error);
        setError("Failed to load question");
      });
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Title title="Welcome to Sharpener" />
      </div>
      <div>
        <h1 className="text-start text-3xl text-amber-200">
          Zero bug, Just vibes - let's start coding! 👍🏽
        </h1>
      </div>
      <div className="flex flex-row gap-2 justify-center h-150 max-w-300">
        <div className="w-full bg-black opacity-75 text-white text-start px-5">
          <QuestionCompoenent value={question} />
        </div>
        <div className="w-full bg-black opacity-75">
          <CodeEditor value={question} />
        </div>
      </div>
    </div>
  );
}
