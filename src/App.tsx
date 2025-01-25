import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import { Toaster } from "sonner"
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Landing} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </div>
  )
}

export default App