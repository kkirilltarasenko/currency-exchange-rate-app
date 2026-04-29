"use client";

import { Box, Text, Spinner } from '@chakra-ui/react';
import { useSettingsQuery } from '../hooks/use-settings-query';

export function SettingsSyncIndicator() {
  const { isLoading, error, isError } = useSettingsQuery();

  // Не показываем индикатор, если все в порядке
  if (!isLoading && !isError) {
    return null;
  }

  return (
    <Box
      position="fixed"
      top={4}
      right={4}
      zIndex={1000}
      bg={isError ? 'red.500' : 'blue.500'}
      color="white"
      px={3}
      py={2}
      borderRadius="md"
      fontSize="sm"
      display="flex"
      alignItems="center"
      gap={2}
      boxShadow="lg"
    >
      {isLoading && <Spinner size="sm" />}
      <Text>
        {isLoading 
          ? 'Синхронизация настроек...' 
          : 'Настройки сохраняются локально'
        }
      </Text>
    </Box>
  );
}