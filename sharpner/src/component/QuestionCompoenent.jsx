import parse from "html-react-parser";
export default function QuestionCompoenent({ value }) {
  // const question = value;

  return (
    <>
      <h1 className="text-4xl my-3">{value?.title}</h1>
      <b className="text-amber-300"></b>
      {value && parse(value.content)}
    </>
  );
}
