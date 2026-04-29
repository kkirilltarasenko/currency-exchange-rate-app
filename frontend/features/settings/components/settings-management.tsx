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
import { useTranslations } from "@/features/localization";

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
  const { t } = useTranslations();

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
    if (window.confirm(t('settings.resetSettings'))) {
      onResetSettings();
    }
  };

  return (
    <Card.Root w="100%" boxShadow="sm" borderColor="border.subtle">
      <Card.Header pb={4}>
        <Heading size="sm" color="fg.emphasized">{t('settings.advanced')}</Heading>
      </Card.Header>
      <Card.Body pt={0} pb={4}>
        <VStack gap={6} align="stretch">
          <Box>
            <Text fontSize="sm" color="fg.emphasized" mb={2} fontWeight="medium">
              {t('settings.advancedDescription')}
            </Text>
            <Text fontSize="xs" color="fg.muted">
              {t('settings.advancedManageDescription')}
            </Text>
          </Box>

          <SimpleGrid columns={3} gap={3}>
            {/* Экспорт настроек */}
            <Box>
              <Button
                onClick={onExportSettings}
                variant="outline"
                colorScheme="blue"
                size="md"
                w="full"
                h="auto"
                py={4}
                flexDirection="column"
                gap={2}
              >
                <LuDownload size={20} />
                <Text fontSize="sm" fontWeight="medium">{t('settings.exportSettings')}</Text>
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
                size="md"
                w="full"
                h="auto"
                py={4}
                flexDirection="column"
                gap={2}
              >
                <LuUpload size={20} />
                <Text fontSize="sm" fontWeight="medium">{t('settings.importSettings')}</Text>
              </Button>
            </Box>

            {/* Сброс настроек */}
            <Box>
              <Button
                onClick={handleResetClick}
                variant="outline"
                colorScheme="red"
                size="md"
                w="full"
                h="auto"
                py={4}
                flexDirection="column"
                gap={2}
              >
                <LuRotateCcw size={20} />
                <Text fontSize="sm" fontWeight="medium">{t('settings.resetSettings')}</Text>
              </Button>
            </Box>
          </SimpleGrid>

          {/* Информация о текущих настройках */}
          <Box
            p={5}
            bg="bg.muted"
            borderRadius="xl"
            border="1px solid"
            borderColor="border.subtle"
            boxShadow="sm"
          >
            <HStack mb={4}>
              <LuFileText size={18} />
              <Text fontWeight="semibold" fontSize="sm" color="fg.emphasized">
                {t('settings.currentSettingsOverview')}
              </Text>
            </HStack>
            
            <SimpleGrid columns={2} gap={6} fontSize="sm">
              {/* Левая колонка */}
              <VStack gap={4} align="stretch">
                {/* Внешний вид */}
                <Box>
                  <Text fontWeight="semibold" color="blue.600" mb={2} fontSize="sm">
                    🎨 {t('settings.appearance')}
                  </Text>
                  <VStack gap={1} align="start" color="fg.muted" fontSize="xs">
                    <Text>{t('settings.theme')}: {settings.theme === 'light' ? '☀️ ' + t('settings.themes.light') : settings.theme === 'dark' ? '🌙 ' + t('settings.themes.dark') : '🖥️ ' + t('settings.themes.system')}</Text>
                    <Text>{t('settings.language')}: {settings.language === 'ru' ? '🇷🇺 RU' : settings.language === 'en' ? '🇺🇸 EN' : '🇧🇾 BE'}</Text>
                    <Text>{t('settings.bankLogos')}: {settings.showBankLogos ? '✅ ' + t('settings.enabled') : '❌ ' + t('settings.disabled')}</Text>
                    <Text>{t('settings.compactModeShort')}: {settings.compactMode ? '✅ ' + t('settings.enabled') : '❌ ' + t('settings.disabled')}</Text>
                    <Text>{t('settings.animationsShort')}: {settings.animationsEnabled ? '✅ ' + t('settings.enabled') : '❌ ' + t('settings.disabled')}</Text>
                  </VStack>
                </Box>

                {/* Валютные настройки */}
                <Box>
                  <Text fontWeight="semibold" color="green.600" mb={2} fontSize="sm">
                    💱 {t('settings.currency')}
                  </Text>
                  <VStack gap={1} align="start" color="fg.muted" fontSize="xs">
                    <Text>{t('settings.baseCurrency')}: {settings.defaultBaseCurrency}</Text>
                    <Text>{t('settings.targetCurrency')}: {settings.defaultTargetCurrency}</Text>
                    <Text>{t('settings.decimalPlacesShort')}: {settings.decimalPlaces}</Text>
                    <Text>{t('settings.numberFormatShort')}: {settings.numberFormat === 'standard' ? '📊 ' + t('settings.numberFormats.standard') : '📈 ' + t('settings.numberFormats.compact')}</Text>
                    <Text>{t('settings.autoRefreshShort')}: {settings.autoRefresh ? `✅ ${t('settings.every')} ${Math.floor(settings.refreshInterval / 60)}${t('settings.minutes')}` : '❌ ' + t('settings.disabled')}</Text>
                  </VStack>
                </Box>
              </VStack>

              {/* Правая колонка */}
              <VStack gap={4} align="stretch">
                {/* Системная информация */}
                <Box>
                  <Text fontWeight="semibold" color="purple.600" mb={2} fontSize="sm">
                    ⚙️ {t('settings.systemInfo')}
                  </Text>
                  <VStack gap={1} align="start" color="fg.muted" fontSize="xs">
                    <Text>{t('settings.version')}: 1.0.0</Text>
                    <Text>{t('settings.lastUpdated')}: {new Date().toLocaleDateString()}</Text>
                    <Text>{t('settings.settingsSize')}: {Math.round(JSON.stringify(settings).length / 1024)}KB</Text>
                    <Text>{t('settings.browser')}: {typeof window !== 'undefined' ? window.navigator.userAgent.includes('Chrome') ? 'Chrome' : window.navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Other' : 'N/A'}</Text>
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