"use client"

import {
  Box,
  Container,
  Heading,
  VStack,
  Tabs,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { LuPalette, LuCoins, LuBell, LuSettings } from "react-icons/lu";
import {
  useSettings,
  AppearanceSettings,
  CurrencySettings,
  NotificationsSettings,
  SettingsManagement,
} from "../../features/settings";

const SettingsPage = () => {
  const {
    settings,
    isLoading,
    updateSetting,
    resetSettings,
    exportSettings,
    importSettings,
  } = useSettings();

  if (isLoading) {
    return (
      <Center h="400px" data-testid="settings-loading">
        <VStack gap={4}>
          <Spinner size="lg" />
          <Text>Загрузка настроек...</Text>
        </VStack>
      </Center>
    );
  }

  const tabItems = [
    {
      value: "appearance",
      label: "Внешний вид",
      icon: LuPalette,
      content: (
        <AppearanceSettings
          settings={settings}
          onUpdateSetting={updateSetting}
        />
      ),
    },
    {
      value: "currency",
      label: "Валюты",
      icon: LuCoins,
      content: (
        <CurrencySettings
          settings={settings}
          onUpdateSetting={updateSetting}
        />
      ),
    },
    {
      value: "notifications",
      label: "Уведомления",
      icon: LuBell,
      content: (
        <NotificationsSettings
          settings={settings}
          onUpdateSetting={updateSetting}
        />
      ),
    },
    {
      value: "management",
      label: "Управление",
      icon: LuSettings,
      content: (
        <SettingsManagement
          settings={settings}
          onExportSettings={exportSettings}
          onImportSettings={importSettings}
          onResetSettings={resetSettings}
        />
      ),
    },
  ];

  return (
    <Box w="100%" h="100%" p={4} data-testid="settings-page">
      <VStack gap={4} align="stretch" h="100%">
        <Box textAlign="center" flexShrink={0}>
          <Heading size="md" mb={1}>
            Настройки приложения
          </Heading>
          <Text color="gray.600" fontSize="sm">
            Настройте приложение под свои предпочтения
          </Text>
        </Box>

        <Tabs.Root defaultValue="appearance" variant="enclosed" flex="1" display="flex" flexDirection="column">
          <Tabs.List flexShrink={0}>
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              return (
                <Tabs.Trigger key={tab.value} value={tab.value} fontSize="sm" px={3} py={2}>
                  <Icon style={{ marginRight: '6px' }} size={16} />
                  {tab.label}
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>

          {tabItems.map((tab) => (
            <Tabs.Content
              key={tab.value}
              value={tab.value}
              pt={4}
              flex="1"
              overflow="auto"
              display="flex"
              flexDirection="column"
            >
              {tab.content}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </VStack>
    </Box>
  );
};

export default SettingsPage;