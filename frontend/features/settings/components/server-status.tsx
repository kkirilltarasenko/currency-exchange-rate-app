"use client";

import { Box, Text, Badge, VStack, HStack } from '@chakra-ui/react';
import { useSettingsQuery } from '../hooks/use-settings-query';

export function ServerStatus() {
  const { isLoading, error, isError } = useSettingsQuery();

  const getStatusColor = () => {
    if (isLoading) return 'yellow';
    if (isError) return 'red';
    return 'green';
  };

  const getStatusText = () => {
    if (isLoading) return 'Подключение...';
    if (isError) return 'Офлайн';
    return 'Онлайн';
  };

  const getStatusDescription = () => {
    if (isLoading) return 'Проверяем подключение к серверу';
    if (isError) return 'Настройки сохраняются только локально';
    return 'Настройки синхронизируются с сервером';
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" bg="gray.50" _dark={{ bg: "gray.800" }}>
      <VStack align="start" p={2}>
        <HStack>
          <Text fontSize="sm" fontWeight="medium">
            Статус сервера:
          </Text>
          <Badge colorScheme={getStatusColor()} variant="solid">
            {getStatusText()}
          </Badge>
        </HStack>
        <Text fontSize="xs" color="gray.600" _dark={{ color: "gray.400" }}>
          {getStatusDescription()}
        </Text>
        {error && (
          <Text fontSize="xs" color="red.500">
            Ошибка: {error.message}
          </Text>
        )}
      </VStack>
    </Box>
  );
}