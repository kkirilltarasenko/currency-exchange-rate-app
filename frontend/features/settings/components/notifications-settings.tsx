"use client"

import {
  Box,
  Card,
  Heading,
  VStack,
  HStack,
  Text,
  Switch,
  Input,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { AppSettings, AVAILABLE_BANKS } from "../types";

interface NotificationsSettingsProps {
  settings: AppSettings;
  onUpdateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

export function NotificationsSettings({ settings, onUpdateSetting }: NotificationsSettingsProps) {
  const handleFavoriteBanksChange = (bankId: string, checked: boolean) => {
    const currentFavorites = settings.favoriteBanks;
    if (checked) {
      onUpdateSetting('favoriteBanks', [...currentFavorites, bankId]);
    } else {
      onUpdateSetting('favoriteBanks', currentFavorites.filter(id => id !== bankId));
    }
  };

  return (
    <Card.Root w="100%" flex="1">
      <Card.Header pb={3}>
        <Heading size="sm">Уведомления и банки</Heading>
      </Card.Header>
      <Card.Body pt={0}>
        <VStack gap={4} align="stretch">
          {/* Уведомления */}
          <VStack gap={3} align="stretch">
            <HStack justify="space-between" align="center">
              <VStack align="start" gap={0} flex="1">
                <Text fontWeight="medium" fontSize="sm">Уведомления</Text>
                <Text fontSize="xs" color="gray.600">
                  Показывать уведомления об изменениях курсов
                </Text>
              </VStack>
              <Checkbox.Root
                checked={settings.notifications}
                onCheckedChange={(e) => onUpdateSetting('notifications', Boolean(e.checked))}
                size="sm"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox.Root>
            </HStack>

            <HStack justify="space-between" align="center">
              <VStack align="start" gap={0} flex="1">
                <Text fontWeight="medium" fontSize="sm">Звуковые уведомления</Text>
                <Text fontSize="xs" color="gray.600">
                  Воспроизводить звук при уведомлениях
                </Text>
              </VStack>
              <Checkbox.Root
                checked={settings.soundEnabled}
                onCheckedChange={(e) => onUpdateSetting('soundEnabled', Boolean(e.checked))}
                disabled={!settings.notifications}
                size="sm"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox.Root>
            </HStack>
          </VStack>

          {/* Избранные банки */}
          <Box>
            <Text fontWeight="medium" mb={2} fontSize="sm">Избранные банки</Text>
            <Text fontSize="xs" color="gray.600" mb={3}>
              Выберите банки, курсы которых вы хотите отслеживать в первую очередь
            </Text>
            <VStack gap={2} align="stretch">
              {AVAILABLE_BANKS.map((bank) => (
                <HStack key={bank.id} justify="space-between" align="center">
                  <Text fontSize="sm">{bank.name}</Text>
                  <Checkbox.Root
                    checked={settings.favoriteBanks.includes(bank.id)}
                    onCheckedChange={(e) => handleFavoriteBanksChange(bank.id, Boolean(e.checked))}
                    size="sm"
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox.Root>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* История */}
          <VStack gap={3} align="stretch">
            <HStack justify="space-between" align="center">
              <VStack align="start" gap={0} flex="1">
                <Text fontWeight="medium" fontSize="sm">Сохранять историю конвертаций</Text>
                <Text fontSize="xs" color="gray.600">
                  Сохранение истории ваших конвертаций валют
                </Text>
              </VStack>
              <Checkbox.Root
                checked={settings.saveHistory}
                onCheckedChange={(e) => onUpdateSetting('saveHistory', Boolean(e.checked))}
                size="sm"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox.Root>
            </HStack>

            {settings.saveHistory && (
              <Box>
                <Text fontWeight="medium" mb={2} fontSize="sm">Лимит записей в истории</Text>
                <Input
                  type="number"
                  value={settings.historyLimit}
                  onChange={(e) => onUpdateSetting('historyLimit', parseInt(e.target.value) || 100)}
                  min={10}
                  max={1000}
                  size="sm"
                />
                <Text fontSize="xs" color="gray.600" mt={1}>
                  От 10 до 1000 записей
                </Text>
              </Box>
            )}
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}