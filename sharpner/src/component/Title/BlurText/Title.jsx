import AnimationText from "../../AnimationText/TrueFocus/AnimationText";
import BlurText from "./BlurText";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export default function Title() {
  return (
    <>
      <BlurText
        text="Welcome to Sharpener"
        delay={150}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="text-8xl mb-8 z-20"
      />
      {/* <AnimationText /> */}
    </>
  );
}
