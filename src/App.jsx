import { useState } from "react";
import Auth from "./compoments/Auth/Auth";
import Email from "./compoments/Email/Email";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Auth />
        <Email />
      </div>
    </>
  );
};

export default App;
