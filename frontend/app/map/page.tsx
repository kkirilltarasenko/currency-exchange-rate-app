"use client";

import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { BankMap } from "@/features/map/components/bank-map";
import { useTranslations } from "@/features/localization";

const MapPage = () => {
  const { t } = useTranslations();

  return (
    <Box w="100%" h="100%" p={6} data-testid="map-page">
      <VStack align="stretch" gap={4} h="100%">
        <Box>
          <Heading size="lg" color="fg.emphasized">
            {t("navigation.map")}
          </Heading>
          <Text color="fg.muted">{t("map.description")}</Text>
        </Box>
        <Box
          flex="1"
          borderRadius="xl"
          overflow="hidden"
          border="1px solid"
          borderColor="border.subtle"
          bg="bg.surface"
          minH="420px"
        >
          <BankMap />
        </Box>
      </VStack>
    </Box>
  );
};

export default MapPage;
