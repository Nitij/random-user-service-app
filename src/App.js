import Auth from "./Components/Auth";
import User from "./Components/User";

function App() {
  return (
    <div className="flex flex-col gap-y-4 p-4">
      <Auth />
      <User />
    </div>
  );
}

export default App;
