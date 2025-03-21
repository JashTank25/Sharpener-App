import BodyComponent from "../../BodyComponent";
import Squares from "./Squares";

export default function Background() {
  return (
    <>
      <Squares
        speed={0.5}
        squareSize={30}
        direction="diagonal"
        borderColor="#fff"
        hoverFillColor="#222"
      />
    </>
  );
}
