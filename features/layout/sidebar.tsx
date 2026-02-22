"use client"

import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { LINKS } from "@/shared/router/router.types";
import { useCurrentRouteInfo } from "@/shared/hooks/use-current-route-info";
import Link from "next/link";

export function Sidebar() {
  const { getIsActiveRoute } = useCurrentRouteInfo();

  return (
    <Box
      w="280px"
      h="100%"
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      position="absolute"
      left={0}
      top={0}
      zIndex={10}
    >
      <Box p={6} borderBottom="2px" borderColor="blue.400">
        <HStack gap={2}>
          <Box w={8} h={8} bg="blue.500" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
            <Text color="white" fontWeight="bold" fontSize="sm">CE</Text>
          </Box>
          <Text fontSize="lg" fontWeight="bold" color="gray.900">
            Currency Exchange
          </Text>
        </HStack>
      </Box>
      
      <VStack align="start" gap={1} p={4}>
        {LINKS.map(({ title, path, icon }) => (
          <Box
            as={Link}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            //@ts-expect-error
            href={path}
            key={path}
            display="flex"
            alignItems="center"
            gap={3}
            p={3}
            borderRadius="lg"
            cursor="pointer"
            _hover={{ bg: "blue.50", color: "blue.600" }}
            w="full"
            fontWeight="medium"
            {...(getIsActiveRoute(path) && {
              bg: "blue.50",
              color: "blue.600",
            })}
          >
            <Icon as={icon} boxSize={4} />
            <Text fontSize="sm">{title}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}