"use client"

import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { LINKS } from "@/shared/router/router.types";
import { useCurrentRouteInfo } from "@/shared/hooks/use-current-route-info";
import { CurrencyExchangeLogo } from "@/features/logo";
import { useTranslations } from "@/features/localization";
import Link from "next/link";

export function Sidebar() {
  const { getIsActiveRoute } = useCurrentRouteInfo();
  const { t } = useTranslations();

  return (
    <Box
      w="280px"
      h="100%"
      bg="bg"
      borderRight="1px solid"
      borderColor="border"
      position="absolute"
      left={0}
      top={0}
      zIndex={10}
      data-testid="sidebar"
    >
      <Box p={6} borderBottom="2px" borderColor="blue.400">
        <HStack gap={2}>
          <CurrencyExchangeLogo size={48} data-testid="logo" />
          <Text fontSize="lg" fontWeight="bold" color="fg" data-testid="app-title">
            {t('navigation.currencyConverter')}
          </Text>
        </HStack>
      </Box>
      
      <VStack align="start" gap={1} p={4} data-testid="nav-links">
        {LINKS.map(({ titleKey, path, icon, disabled }) => !disabled && (
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
            color="fg.muted"
            _hover={{ bg: "blue.subtle", color: "blue.fg" }}
            w="full"
            fontWeight="medium"
            {...(getIsActiveRoute(path) && {
              bg: "blue.subtle",
              color: "blue.fg",
            })}
            data-testid={`nav-link-${path.replace('/', '')}`}
            className={getIsActiveRoute(path) ? 'active' : ''}
          >
            <Icon as={icon} boxSize={4} />
            <Text fontSize="sm">{t(titleKey as "navigation.home" | "navigation.exchangeRates" | "navigation.history" | "navigation.settings")}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}