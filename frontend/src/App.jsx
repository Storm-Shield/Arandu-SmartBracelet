import Routers from "./Routes"
import { ThemeProvider } from "./context/ThemeContext.jsx"

function App() {
  return (
    <>
      <ThemeProvider>
        <div className="bg-light-bg dark:bg-dark-bg">
          <Routers/>
        </div>
      </ThemeProvider> 
    </>
  )
}

export default App