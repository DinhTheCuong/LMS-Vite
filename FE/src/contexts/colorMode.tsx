import { App, ConfigProvider, theme } from 'antd'
import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react'

type ColorModeContextType = {
  mode: string
  setMode: (mode: string) => void
}

export const ColorModeContext = createContext<ColorModeContextType>({} as ColorModeContextType)

const ColorModeContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const colorModeFromLocalStorage = localStorage.getItem('theme')
  const isSystemPreferenceDark = window?.matchMedia('(prefers-color-scheme: dark)').matches

  const systemPreference = isSystemPreferenceDark ? 'dark' : 'light'
  const [mode, setMode] = useState(colorModeFromLocalStorage || systemPreference)

  useEffect(() => {
    window.localStorage.setItem('theme', mode)
  }, [mode])

  const setColorMode = useCallback(() => {
    if (mode === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }, [mode])

  const { darkAlgorithm, defaultAlgorithm } = theme

  const foo = useMemo(() => ({ setMode: setColorMode, mode }), [mode, setColorMode])

  return (
    <ColorModeContext.Provider value={foo}>
      <ConfigProvider
        theme={{
          algorithm: mode === 'light' ? defaultAlgorithm : darkAlgorithm,
          token: {
            colorPrimaryText: mode === 'light' ? '#4b5563' : '#f3f4f6',
            colorLink: '#4b5563',
            colorLinkHover: '#3b82f6',
          },
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </ColorModeContext.Provider>
  )
}

export default ColorModeContextProvider
