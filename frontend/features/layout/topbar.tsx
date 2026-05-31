"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useCurrentRouteInfo } from "@/shared/hooks/use-current-route-info";
import { useTranslations } from "@/features/localization";

export function Topbar() {
  const { getPageTitle } = useCurrentRouteInfo();
  const { t } = useTranslations();
  const pageTitle = getPageTitle();

  return (
    <Box
      w="calc(100% - 280px)"
      h="70px"
      bg="bg"
      borderBottom="1px solid"
      borderColor="border"
      position="absolute"
      top={0}
      left="280px"
      right={0}
      zIndex={5}
      px={8}
    >
      <Flex h="full" align="center" justify="space-between">
        <Box>
          <Text fontSize="xl" fontWeight="bold" color="fg">
            {pageTitle === "404"
              ? pageTitle
              : t(
                  pageTitle as
                    | "navigation.home"
                    | "navigation.exchangeRates"
                    | "navigation.history"
                    | "navigation.map"
                    | "navigation.settings",
                )}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
