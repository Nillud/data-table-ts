import { useEffect } from 'react'

export function useDebouncedEffect(callback: () => void, deps: unknown[], delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => callback(), delay)

    return () => clearTimeout(handler) // Очистка при новом вызове
  }, [...deps, delay])
}
