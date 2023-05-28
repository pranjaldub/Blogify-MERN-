import logo from "./logo.svg";
import "./App.css";
import Homepage from "./container/homepage/homepage";
import LoginSignup from "./container/loginSignup/loginSignup";

function App() {
  const intro = "Introducing Blogify";
  const heading = "Express the meaning of your blogs differently";
  const subHeading =
    "Our rewriting tool alters the syntax, structure, word/phrase arrangement, and incorporates relevant synonyms. This tool is compatible with all major languages, including English, German, Spanish, French, Arabic, Chinese, and many others.";
  return (
    <div className="App">
      <Homepage intro={intro} heading={heading} subHeading={subHeading} />
      <LoginSignup />
    </div>
  );
}

export default App;
