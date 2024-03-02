import { useState } from "react";
import Auth from "./compoments/Auth/Auth";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Auth />
      </div>
    </>
  );
};

export default App;
