
import { ThemeProvider } from './hooks/use-theme'
import { ComponentDemo } from './components/ComponentDemo'

const App = () => {
  return (
    <ThemeProvider>
      <ComponentDemo />
    </ThemeProvider>
  )
}

export default App