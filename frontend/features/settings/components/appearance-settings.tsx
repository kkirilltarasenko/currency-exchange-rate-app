"use client"

import {
  Box,
  Card,
  Heading,
  VStack,
  HStack,
  Text,
  Switch,
  Select,
  Portal,
  createListCollection,
  Checkbox,
} from "@chakra-ui/react";
import { LuMoon, LuSun, LuMonitor } from "react-icons/lu";
import { useColorMode } from "../../../components/ui/color-mode";
import { AppSettings } from "../types";
import { useTranslations } from "@/features/localization";

interface AppearanceSettingsProps {
  settings: AppSettings;
  onUpdateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}


export function AppearanceSettings({ settings, onUpdateSetting }: AppearanceSettingsProps) {
  const { colorMode, setColorMode } = useColorMode();
  const { t } = useTranslations();

  const handleThemeChange = (theme: AppSettings['theme']) => {
    onUpdateSetting('theme', theme);
    // Chakra UI не поддерживает 'system', используем логику определения темы
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setColorMode(prefersDark ? 'dark' : 'light');
    } else {
      setColorMode(theme);
    }
  };

  const themeOptions = [
    { value: 'light', label: t('settings.themes.light'), icon: LuSun },
    { value: 'dark', label: t('settings.themes.dark'), icon: LuMoon },
    { value: 'system', label: t('settings.themes.system'), icon: LuMonitor },
  ];

  return (
    <Card.Root w="100%" boxShadow="sm" borderColor="border.subtle">
      <Card.Header pb={4}>
        <Heading size="sm" color="fg.emphasized">{t('settings.appearance')}</Heading>
      </Card.Header>
      <Card.Body pt={0}>
        <VStack gap={6} align="stretch">
          {/* Тема */}
          <Box>
            <Text fontWeight="semibold" mb={3} fontSize="sm" color="fg.emphasized">
              {t('settings.theme')}
            </Text>
            <HStack gap={3}>
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = settings.theme === option.value;
                return (
                  <Box
                    key={option.value}
                    p={4}
                    borderRadius="lg"
                    border="2px solid"
                    borderColor={isSelected ? "blue.500" : "border.subtle"}
                    bg={isSelected ? "blue.50" : "bg.surface"}
                    cursor="pointer"
                    onClick={() => handleThemeChange(option.value as AppSettings['theme'])}
                    transition="all 0.2s"
                    _hover={{
                      borderColor: isSelected ? "blue.600" : "blue.300",
                      transform: "translateY(-1px)",
                      boxShadow: "sm"
                    }}
                    textAlign="center"
                    minW="90px"
                    flex="1"
                    position="relative"
                  >
                    <Icon size={24} style={{ margin: '0 auto 8px', color: isSelected ? '#3182ce' : undefined }} />
                    <Text fontSize="sm" fontWeight={isSelected ? "semibold" : "medium"} color={isSelected ? "blue.600" : "fg"}>
                      {option.label}
                    </Text>
                  </Box>
                );
              })}
            </HStack>
          </Box>

          {/* Дополнительные настройки внешнего вида */}
          <Box
            p={4}
            borderRadius="lg"
            bg="bg.muted"
            border="1px solid"
            borderColor="border.subtle"
          >
            <HStack justify="space-between" align="center">
              <VStack align="start" gap={1} flex="1">
                <Text fontWeight="semibold" fontSize="sm" color="fg.emphasized">
                  {t('settings.showBankLogos')}
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  {t('settings.showBankLogosDescription')}
                </Text>
              </VStack>
              <Checkbox.Root
                checked={settings.showBankLogos}
                onCheckedChange={(e) => onUpdateSetting('showBankLogos', Boolean(e.checked))}
                size="lg"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox.Root>
            </HStack>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}