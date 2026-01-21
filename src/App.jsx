import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider
        autoHideDuration={2500}
        maxSnack={1}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
      <AppRoutes />
    </>
  );
}

export default App;
