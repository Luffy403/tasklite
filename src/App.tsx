import { ThemeProvider } from '@emotion/react'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/global'
import { TasksPage } from './pages/task-pages'

export default function App() {
  return (
      <ThemeProvider theme={theme}>
          <GlobalStyles />
          <TasksPage />
    </ThemeProvider>
  )
}


