"use client";

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
  onResetSettings,
}: SettingsManagementProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslations();

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await onImportSettings(file);
        // Сбрасываем значение input для возможности повторного выбора того же файла
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Ошибка импорта настроек:", error);
        // Здесь можно добавить toast уведомление об ошибке
      }
    }
  };

  const handleResetClick = () => {
    if (window.confirm(t("settings.resetSettings"))) {
      onResetSettings();
    }
  };

  return (
    <Card.Root w="100%" boxShadow="sm" borderColor="border.subtle">
      <Card.Header pb={4}>
        <Heading size="sm" color="fg.emphasized">
          {t("settings.advanced")}
        </Heading>
      </Card.Header>
      <Card.Body pt={0} pb={4}>
        <VStack gap={6} align="stretch">
          <Box>
            <Text
              fontSize="sm"
              color="fg.emphasized"
              mb={2}
              fontWeight="medium"
            >
              {t("settings.advancedDescription")}
            </Text>
            <Text fontSize="xs" color="fg.muted">
              {t("settings.advancedManageDescription")}
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
                <Text fontSize="sm" fontWeight="medium">
                  {t("settings.exportSettings")}
                </Text>
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
                <Text fontSize="sm" fontWeight="medium">
                  {t("settings.importSettings")}
                </Text>
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
                <Text fontSize="sm" fontWeight="medium">
                  {t("settings.resetSettings")}
                </Text>
              </Button>
            </Box>
          </SimpleGrid>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
