import GradientText from "./GradientText";

export default function Button({ value, onClick = () => {} }) {
  return (
    <div onClick={onClick}>
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={true}
        className="custom-class text-sm p-3"
      >
        {value}
      </GradientText>
    </div>
  );
}
