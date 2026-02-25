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
        bg="white"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="2xl"
        border="1px solid"
        borderColor="gray.200"
        position="relative"
        data-testid="main-layout"
      >
        <Sidebar />
        <Topbar />
        
        <Box
          ml="280px"
          mt="70px"
          p={3}
          h="calc(100% - 70px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="gray.50"
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}