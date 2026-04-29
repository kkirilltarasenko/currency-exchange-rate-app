"use client"

import { Box } from "@chakra-ui/react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box minH="100vh" bg="transparent" display="flex" justifyContent="center" alignItems="center" p={4}>
      <Box
        w="85vw"
        h="85vh"
        bg="bg"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="2xl"
        border="1px solid"
        borderColor="border"
        position="relative"
        data-testid="main-layout"
      >
        <Sidebar />
        
        <Box
          ml="280px"
          p={3}
          h="100%"
          overflow="auto"
          bg="bg.subtle"
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}