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
import { AppSettings, SUPPORTED_LANGUAGES } from "../types";

interface AppearanceSettingsProps {
  settings: AppSettings;
  onUpdateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

interface LanguageSelectProps {
  value: AppSettings['language'];
  onChange: (language: AppSettings['language']) => void;
}

function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  const languageCollection = createListCollection({
    items: SUPPORTED_LANGUAGES.map(lang => ({
      label: `${lang.flag} ${lang.name}`,
      value: lang.code,
    }))
  });

  return (
    <Select.Root
      collection={languageCollection}
      value={[value]}
      onValueChange={(details) => {
        const selectedValue = details.value[0] as AppSettings['language'];
        onChange(selectedValue);
      }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {languageCollection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}

export function AppearanceSettings({ settings, onUpdateSetting }: AppearanceSettingsProps) {
  const { colorMode, setColorMode } = useColorMode();

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
    { value: 'light', label: 'Светлая', icon: LuSun },
    { value: 'dark', label: 'Темная', icon: LuMoon },
    { value: 'system', label: 'Системная', icon: LuMonitor },
  ];

  return (
    <Card.Root w="100%">
      <Card.Header pb={3}>
        <Heading size="sm">Внешний вид</Heading>
      </Card.Header>
      <Card.Body pt={0}>
        <VStack gap={4} align="stretch">
          {/* Тема */}
          <Box>
            <Text fontWeight="medium" mb={2} fontSize="sm">Тема оформления</Text>
            <HStack gap={3}>
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = settings.theme === option.value;
                return (
                  <Box
                    key={option.value}
                    p={2}
                    borderRadius="md"
                    border="2px solid"
                    borderColor={isSelected ? "blue.500" : "border"}
                    bg={isSelected ? "blue.subtle" : "bg"}
                    cursor="pointer"
                    onClick={() => handleThemeChange(option.value as AppSettings['theme'])}
                    transition="all 0.2s"
                    _hover={{ borderColor: "blue.300" }}
                    textAlign="center"
                    minW="70px"
                    flex="1"
                  >
                    <Icon size={20} style={{ margin: '0 auto 6px' }} />
                    <Text fontSize="xs">{option.label}</Text>
                  </Box>
                );
              })}
            </HStack>
          </Box>

          {/* Язык */}
          <Box>
            <Text fontWeight="medium" mb={2} fontSize="sm">Язык интерфейса</Text>
            <LanguageSelect
              value={settings.language}
              onChange={(language: AppSettings['language']) => onUpdateSetting('language', language)}
            />
          </Box>

          {/* Дополнительные настройки внешнего вида */}
          <VStack gap={3} align="stretch">
            <HStack justify="space-between" align="center">
              <VStack align="start" gap={0} flex="1">
                <Text fontWeight="medium" fontSize="sm">Показывать логотипы банков</Text>
                <Text fontSize="xs" color="fg.muted">
                  Отображение логотипов в списке банков
                </Text>
              </VStack>
              <Checkbox.Root
                checked={settings.showBankLogos}
                onCheckedChange={(e) => onUpdateSetting('showBankLogos', Boolean(e.checked))}
                size="sm"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox.Root>
            </HStack>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}