'use client'

import { createContext, useState, useContext, ReactNode, useEffect } from 'react'

interface SidebarContextType {
  isOpen: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-state')
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState))
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isOpen
    setIsOpen(newState)
    localStorage.setItem('sidebar-state', JSON.stringify(newState))
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
} 