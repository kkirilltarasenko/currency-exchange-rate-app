"use client";

import { Box, Text, Badge, VStack, HStack } from '@chakra-ui/react';
import { useSettingsQuery } from '../hooks/use-settings-query';
import { useTranslations } from '@/features/localization';

export function ServerStatus() {
  const { isLoading, error, isError } = useSettingsQuery();
  const { t } = useTranslations();

  const getStatusColor = () => {
    if (isLoading) return 'yellow';
    if (isError) return 'red';
    return 'green';
  };

  const getStatusText = () => {
    if (isLoading) return t('common.loading');
    if (isError) return t('settings.disconnected');
    return t('settings.connected');
  };

  const getStatusDescription = () => {
    if (isLoading) return t('settings.syncStatus');
    if (isError) return t('settings.syncError');
    return t('settings.synced');
  };

  return (
    <Box
      p={5}
      borderWidth={1}
      borderRadius="xl"
      bg="bg.surface"
      borderColor="border.subtle"
      boxShadow="sm"
    >
      <HStack justify="space-between" align="center">
        <VStack align="start" gap={1}>
          <Text fontSize="sm" fontWeight="semibold" color="fg.emphasized">
            {t('settings.serverStatus')}
          </Text>
          <Text fontSize="xs" color="fg.muted">
            {getStatusDescription()}
          </Text>
          {error && (
            <Text fontSize="xs" color="red.500">
              {t('common.error')}: {error.message}
            </Text>
          )}
        </VStack>
        <Badge
          colorScheme={getStatusColor()}
          variant="solid"
          px={3}
          py={1}
          borderRadius="full"
          fontSize="xs"
          fontWeight="medium"
        >
          {getStatusText()}
        </Badge>
      </HStack>
    </Box>
  );
}