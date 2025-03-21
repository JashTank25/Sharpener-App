import TrueFocus from "./TrueFocus";

export default function AnimationText() {
  return (
    <>
      <TrueFocus
        sentence="Shape Sharp"
        manualMode={true}
        blurAmount={5}
        borderColor="rgb(0,216,255)"
        animationDuration={2}
        pauseBetweenAnimations={1}
      />
    </>
  );
}
