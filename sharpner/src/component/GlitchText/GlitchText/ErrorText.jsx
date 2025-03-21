import GlitchText from "./GlitchText";
export default function ErrorText() {
  return (
    <>
      <GlitchText
        speed={1}
        enableShadows={true}
        enableOnHover={true}
        className="custom-class"
      >
        🚫 This website does not open on mobile devices. Please use a desktop.
      </GlitchText>
    </>
  );
}
