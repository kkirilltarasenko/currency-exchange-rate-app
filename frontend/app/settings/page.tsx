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
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  AppearanceSettings,
  CurrencySettings,
  NotificationsSettings,
  SettingsManagement,
} from "../../features/settings";
import { ServerStatus } from "../../features/settings/components/server-status";
import { useSettingsContext } from "../../features/settings/context/settings-provider";

const SettingsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get('tab') || 'appearance';

  const {
    settings,
    isLoading,
    error,
    updateSetting,
    resetSettings,
    exportSettings,
    importSettings,
    isUpdating,
    isResetting,
  } = useSettingsContext();

  const handleTabChange = useCallback((details: { value: string }) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', details.value);
    router.push(`/settings?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

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
    <Box w="100%" h="100%" data-testid="settings-page">
      <VStack gap={4} align="stretch" h="100%" minH="0">
        <Box textAlign="left" flexShrink={0}>
          <Heading size="md" mb={1}>
            Настройки приложения
          </Heading>
          <Text color="gray.600" fontSize="sm">
            Настройте приложение под свои предпочтения
          </Text>
        </Box>

        {/* Статус сервера */}
        <ServerStatus />

        <Tabs.Root
          value={currentTab}
          onValueChange={handleTabChange}
          variant="enclosed"
          flex="1"
          display="flex"
          flexDirection="column"
          minHeight="0"
        >
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
              minHeight="0"
            >
              <Box flex="1" overflow="auto">
                {tab.content}
              </Box>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </VStack>
    </Box>
  );
};

export default SettingsPage;