import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import { Toaster } from "sonner"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import RegisterEvent from "./pages/RegisterEvent"
import ViewEvent from "./pages/ViewEvent"
import VisitEvent from "./pages/VisitEvent"
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/register" Component={RegisterEvent} />
          <Route path="/event/:id" Component={VisitEvent} />
          <Route path="/event/:id/edit" Component={ViewEvent} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </Provider>
  )
}

export default App