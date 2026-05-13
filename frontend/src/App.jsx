import ExcuseForm from "./components/ExcuseForm";

export default function App() {
  return (
    <div className="container">
      <h1>Excuse Generator</h1>

      <p>
        Turn messy situations into believable exit plans—fast, clean, and a little bit hilarious.
      </p>

      <p className="tagline">
        Need an excuse? We got commitment issues too.
      </p>

      <div className="how-it-works" aria-label="How it works">
        <div className="step">
          <div className="step-num">1</div>
          <div className="step-text">
            Pick a category
            <div className="step-sub">Make it feel context-aware</div>
          </div>
        </div>
        <div className="step">
          <div className="step-num">2</div>
          <div className="step-text">
            Describe what’s happening
            <div className="step-sub">The messier, the better</div>
          </div>
        </div>
        <div className="step">
          <div className="step-num">3</div>
          <div className="step-text">
            Generate + copy
            <div className="step-sub">Ready to use in seconds</div>
          </div>
        </div>
      </div>

      <ExcuseForm />
    </div>
  );
}
