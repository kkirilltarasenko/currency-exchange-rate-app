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
import { useCallback, Suspense } from "react";
import {
  AppearanceSettings,
  CurrencySettings,
  NotificationsSettings,
  SettingsManagement,
} from "../../features/settings";
import { ServerStatus } from "../../features/settings/components/server-status";
import { LanguageSettings } from "../../features/settings/components/language-settings";
import { useSettingsContext } from "../../features/settings/context/settings-provider";
import { useTranslations } from "@/features/localization";

const SettingsContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get('tab') || 'appearance';
  const { t } = useTranslations();

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
          <Text>{t('common.loading')}</Text>
        </VStack>
      </Center>
    );
  }

  const tabItems = [
    {
      value: "appearance",
      label: t('settings.appearance'),
      icon: LuPalette,
      content: (
        <VStack gap={6} align="stretch">
          <AppearanceSettings
            settings={settings}
            onUpdateSetting={updateSetting}
          />
          <LanguageSettings />
        </VStack>
      ),
    },
    {
      value: "currency",
      label: t('settings.currency'),
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
      label: t('settings.advanced'),
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
    <Box w="100%" h="100%" data-testid="settings-page" p={6}>
      {/* White Card Container */}
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="xl"
        border="1px solid"
        borderColor="gray.200"
        h="100%"
        overflow="hidden"
        _dark={{
          bg: "gray.800",
          borderColor: "gray.700"
        }}
      >
        <Box p={8} h="100%">
          <VStack gap={6} align="stretch" h="100%" minH="0">
            {/* Header Section */}
            <Box textAlign="left" flexShrink={0}>
              <Heading size="lg" mb={2} color="fg.emphasized">
                {t('settings.title')}
              </Heading>
              <Text color="fg.muted" fontSize="md">
                {t('settings.description')}
              </Text>
            </Box>

            {/* Server Status Card */}
            <Box flexShrink={0}>
              <ServerStatus />
            </Box>

            {/* Main Content Area */}
            <Box
              flex="1"
              bg="bg.surface"
              borderRadius="xl"
              border="1px solid"
              borderColor="border.subtle"
              overflow="hidden"
              boxShadow="sm"
            >
              <Tabs.Root
                value={currentTab}
                onValueChange={handleTabChange}
                variant="enclosed"
                h="100%"
                display="flex"
                flexDirection="column"
              >
                <Box
                  borderBottom="1px solid"
                  borderColor="border.subtle"
                  bg="bg.muted"
                  px={6}
                  py={4}
                >
                  <Tabs.List gap={1} bg="transparent">
                    {tabItems.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <Tabs.Trigger
                          key={tab.value}
                          value={tab.value}
                          fontSize="sm"
                          px={4}
                          py={3}
                          borderRadius="lg"
                          fontWeight="medium"
                          color="fg.muted"
                          _selected={{
                            bg: "bg.emphasized",
                            color: "fg.emphasized",
                            boxShadow: "sm"
                          }}
                          _hover={{
                            bg: "bg.subtle",
                            color: "fg"
                          }}
                          transition="all 0.2s"
                        >
                          <Icon style={{ marginRight: '8px' }} size={18} />
                          {tab.label}
                        </Tabs.Trigger>
                      );
                    })}
                  </Tabs.List>
                </Box>

                {tabItems.map((tab) => (
                  <Tabs.Content
                    key={tab.value}
                    value={tab.value}
                    flex="1"
                    overflow="auto"
                    p={6}
                  >
                    <Box maxW="6xl" mx="auto">
                      {tab.content}
                    </Box>
                  </Tabs.Content>
                ))}
              </Tabs.Root>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

const SettingsPage = () => {
  return (
    <Suspense fallback={
      <Center h="400px" data-testid="settings-loading">
        <VStack gap={4}>
          <Spinner size="lg" />
          <Text>Loading...</Text>
        </VStack>
      </Center>
    }>
      <SettingsContent />
    </Suspense>
  );
};

export default SettingsPage;