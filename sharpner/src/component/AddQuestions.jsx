import { useState, useRef } from "react";
import Title from "./Title/BlurText/Title";
import Button from "./Button/GradientText/Button";

function AddQuestions() {
  const [text, setText] = useState("");
  const [questionName, setQuestionName] = useState("");
  const textareaRef = useRef(null);

  const handleBold = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      alert("Please select some text to bold.");
      return;
    }

    const selectedText = text.slice(start, end);
    const before = text.slice(0, start);
    const after = text.slice(end);

    const updated =
      before + `<b className='text-amber-300'>${selectedText}</b>` + after;
    setText(updated);
  };

  return (
    <div className="flex flex-col w-full mx-20">
      <div>
        <Title title="Add Questions" />
      </div>

      <div className="bg-black opacity-75 text-white text-start px-5 py-4 rounded mt-4 ">
        <textarea
          value={questionName}
          onChange={(e) => setQuestionName(e.target.value)}
          rows={1}
          className="w-full p-3 text-white text-base rounded border border-gray-300"
          placeholder="Write your question name here..."
        />
      </div>
      <div className="bg-black opacity-75 text-white text-start px-5 py-4 rounded mt-4 ">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full p-3 text-white text-base rounded border border-gray-300"
          placeholder="Write your question here..."
        />
        <Button value="Bold" onClick={handleBold} />
      </div>

      <div className="bg-black opacity-75 text-white text-start px-5 py-4 rounded mt-4">
        <h3 className="text-lg font-semibold mb-2">Live Preview:</h3>
        <div
          className="border border-gray-300 p-3 bg-inherit rounded min-h-[50px]"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
}

export default AddQuestions;
