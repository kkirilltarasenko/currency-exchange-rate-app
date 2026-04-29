"use client"

import {
  Box,
  Card,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Table,
  SimpleGrid,
} from "@chakra-ui/react";
import { LuDownload, LuUpload, LuRotateCcw, LuFileText } from "react-icons/lu";
import { useRef } from "react";
import { AppSettings, AVAILABLE_BANKS } from "../types";

interface SettingsManagementProps {
  settings: AppSettings;
  onExportSettings: () => void;
  onImportSettings: (file: File) => Promise<void>;
  onResetSettings: () => void;
}

export function SettingsManagement({ 
  settings, 
  onExportSettings, 
  onImportSettings, 
  onResetSettings 
}: SettingsManagementProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await onImportSettings(file);
        // Сбрасываем значение input для возможности повторного выбора того же файла
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Ошибка импорта настроек:', error);
        // Здесь можно добавить toast уведомление об ошибке
      }
    }
  };

  const handleResetClick = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все настройки к значениям по умолчанию?')) {
      onResetSettings();
    }
  };

  return (
    <Card.Root w="100%">
      <Card.Header pb={3}>
        <Heading size="sm">Управление настройками</Heading>
      </Card.Header>
      <Card.Body pt={0} pb={4}>
        <VStack gap={4} align="stretch" >
          <Box>
            <Text fontSize="sm" color="fg" mb={2}>
              Управление конфигурацией приложения
            </Text>
            <Text fontSize="xs" color="fg.muted">
              Экспортируйте настройки для резервного копирования, импортируйте ранее сохраненные настройки или сбросьте все к значениям по умолчанию.
            </Text>
          </Box>

          <HStack gap={1} align="stretch">
            {/* Экспорт настроек */}
            <Box>
              <Button
                onClick={onExportSettings}
                variant="outline"
                colorScheme="blue"
                size="sm"
                w="full"
              >
                <LuDownload style={{ marginRight: '6px' }} size={14} />
                Экспортировать настройки
              </Button>
            </Box>

            {/* Импорт настроек */}
            <Box>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                display="none"
              />
              <Button
                onClick={handleImportClick}
                variant="outline"
                colorScheme="green"
                size="sm"
                w="full"
              >
                <LuUpload style={{ marginRight: '6px' }} size={14} />
                Импортировать настройки
              </Button>
            </Box>

            {/* Сброс настроек */}
            <Box>
              <Button
                onClick={handleResetClick}
                variant="outline"
                colorScheme="red"
                size="sm"
                w="full"
              >
                <LuRotateCcw style={{ marginRight: '6px' }} size={14} />
                Сбросить к настройкам по умолчанию
              </Button>
            </Box>
          </HStack>

          {/* Информация о текущих настройках */}
          <Box
            p={3}
            mb={2}
            bg="bg.subtle"
            borderRadius="md"
            border="1px solid"
            borderColor="border"
          >
            <HStack mb={2}>
              <LuFileText size={14} />
              <Text fontWeight="medium" fontSize="xs">Информация о настройках</Text>
            </HStack>
            
            <SimpleGrid columns={2} gap={3} fontSize="2xs">
              {/* Левая колонка */}
              <VStack gap={2} align="stretch">
                {/* Внешний вид */}
                <Box>
                  <Text fontWeight="semibold" color="blue.fg" mb={1}>🎨 Внешний вид</Text>
                  <VStack gap={0.5} align="start" color="fg.muted">
                    <Text>Тема: {settings.theme === 'light' ? '☀️ Светлая' : settings.theme === 'dark' ? '🌙 Темная' : '🖥️ Системная'}</Text>
                    <Text>Язык: {settings.language === 'ru' ? '🇷🇺 RU' : settings.language === 'en' ? '🇺🇸 EN' : '🇧🇾 BE'}</Text>
                    <Text>Логотипы: {settings.showBankLogos ? '✅' : '❌'}</Text>
                    <Text>Компактно: {settings.compactMode ? '✅' : '❌'}</Text>
                    <Text>Анимации: {settings.animationsEnabled ? '✅' : '❌'}</Text>
                  </VStack>
                </Box>

                {/* Валютные настройки */}
                <Box>
                  <Text fontWeight="semibold" color="green.fg" mb={1}>💱 Валюты</Text>
                  <VStack gap={0.5} align="start" color="fg.muted">
                    <Text>Базовая: {settings.defaultBaseCurrency}</Text>
                    <Text>Целевая: {settings.defaultTargetCurrency}</Text>
                    <Text>Знаков: {settings.decimalPlaces}</Text>
                    <Text>Формат: {settings.numberFormat === 'standard' ? '📊' : '📈'}</Text>
                    <Text>Обновление: {settings.autoRefresh ? `✅ ${Math.floor(settings.refreshInterval / 60)}м` : '❌'}</Text>
                  </VStack>
                </Box>
              </VStack>

              {/* Правая колонка */}
              <VStack gap={2} align="stretch">
                {/* Уведомления */}
                <Box>
                  <Text fontWeight="semibold" color="orange.fg" mb={1}>🔔 Уведомления</Text>
                  <VStack gap={0.5} align="start" color="fg.muted">
                    <Text>Уведомления: {settings.notifications ? '✅' : '❌'}</Text>
                    <Text>Звук: {settings.soundEnabled ? '🔊' : '🔇'}</Text>
                    <Text>Банков: {settings.favoriteBanks.length}/{AVAILABLE_BANKS.length}</Text>
                    <Text>История: {settings.saveHistory ? `✅ (${settings.historyLimit})` : '❌'}</Text>
                  </VStack>
                </Box>

                {/* Системная информация */}
                <Box>
                  <Text fontWeight="semibold" color="purple.fg" mb={1}>⚙️ Система</Text>
                  <VStack gap={0.5} align="start" color="fg.muted">
                    <Text>Версия: 1.0</Text>
                    <Text>Дата: {new Date().toLocaleDateString('ru-RU')}</Text>
                    <Text>Размер: {Math.round(JSON.stringify(settings).length / 1024)}KB</Text>
                    <Text>Браузер: {typeof window !== 'undefined' ? window.navigator.userAgent.includes('Chrome') ? 'Chrome' : window.navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Other' : 'N/A'}</Text>
                  </VStack>
                </Box>
              </VStack>
            </SimpleGrid>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}