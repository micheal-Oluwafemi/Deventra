import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import { Toaster } from "sonner"
import { Provider } from "react-redux"
import { store } from "./redux/store"
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Landing} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </Provider>
  )
}

export default App