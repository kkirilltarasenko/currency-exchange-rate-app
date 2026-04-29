"use client"

import {
  Box,
  Card,
  Heading,
  VStack,
  HStack,
  Text,
  Select,
  Portal,
  createListCollection,
  Input,
  Switch,
  Checkbox,
} from "@chakra-ui/react";
import { AppSettings, SUPPORTED_CURRENCIES, REFRESH_INTERVALS } from "../types";

interface CurrencySettingsProps {
  settings: AppSettings;
  onUpdateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

function CurrencySelect({ 
  value, 
  onChange, 
  label 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  label: string;
}) {
  const currencyCollection = createListCollection({
    items: SUPPORTED_CURRENCIES.map(currency => ({
      label: `${currency.symbol} ${currency.code} - ${currency.name}`,
      value: currency.code,
    }))
  });

  return (
    <Box>
      <Text fontWeight="medium" mb={2} fontSize="sm">{label}</Text>
      <Select.Root
        collection={currencyCollection}
        value={[value]}
        onValueChange={(details) => onChange(details.value[0])}
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
              {currencyCollection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Box>
  );
}

function RefreshIntervalSelect({ 
  value, 
  onChange 
}: { 
  value: number; 
  onChange: (value: number) => void; 
}) {
  const intervalCollection = createListCollection({
    items: REFRESH_INTERVALS.map(interval => ({
      label: interval.label,
      value: interval.value.toString(),
    }))
  });

  return (
    <Select.Root
      collection={intervalCollection}
      value={[value.toString()]}
      onValueChange={(details) => onChange(parseInt(details.value[0]))}
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
            {intervalCollection.items.map((item) => (
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

export function CurrencySettings({ settings, onUpdateSetting }: CurrencySettingsProps) {
  return (
    <Card.Root w="100%">
      <Card.Header pb={3}>
        <Heading size="sm">Настройки валют</Heading>
      </Card.Header>
      <Card.Body pt={0}>
        <VStack gap={4} align="stretch">
          {/* Валюты по умолчанию */}
          <Box>
            <Text fontSize="xs" color="fg.muted" mb={3}>
              Эти валюты будут выбраны по умолчанию в конвертере
            </Text>
            <HStack gap={4} align="end">
              <Box flex="1">
                <CurrencySelect
                  value={settings.defaultBaseCurrency}
                  onChange={(value) => {
                    console.log('Changing base currency to:', value);
                    onUpdateSetting('defaultBaseCurrency', value);
                  }}
                  label="Базовая валюта (отдаю)"
                />
              </Box>
              <Box flex="1">
                <CurrencySelect
                  value={settings.defaultTargetCurrency}
                  onChange={(value) => {
                    console.log('Changing target currency to:', value);
                    onUpdateSetting('defaultTargetCurrency', value);
                  }}
                  label="Целевая валюта (получаю)"
                />
              </Box>
            </HStack>
          </Box>

          {/* Точность отображения */}
          <Box>
            <Text fontWeight="medium" mb={2} fontSize="sm">Количество знаков после запятой</Text>
            <Input
              type="number"
              value={settings.decimalPlaces}
              onChange={(e) => onUpdateSetting('decimalPlaces', parseInt(e.target.value) || 2)}
              min={0}
              max={8}
              size="sm"
            />
            <Text fontSize="xs" color="fg.muted" mt={1}>
              От 0 до 8 знаков после запятой
            </Text>
          </Box>

          {/* Формат чисел */}
          <Box>
            <Text fontWeight="medium" mb={2} fontSize="sm">Формат отображения чисел</Text>
            <HStack gap={3}>
              <Box
                p={2}
                borderRadius="md"
                border="2px solid"
                borderColor={settings.numberFormat === 'standard' ? "blue.500" : "border"}
                bg={settings.numberFormat === 'standard' ? "blue.subtle" : "bg"}
                cursor="pointer"
                onClick={() => onUpdateSetting('numberFormat', 'standard')}
                transition="all 0.2s"
                _hover={{ borderColor: "blue.300" }}
                textAlign="center"
                flex="1"
              >
                <Text fontWeight="medium" fontSize="sm">Стандартный</Text>
                <Text fontSize="xs" color="fg.muted">1,234.56</Text>
              </Box>
              <Box
                p={2}
                borderRadius="md"
                border="2px solid"
                borderColor={settings.numberFormat === 'compact' ? "blue.500" : "border"}
                bg={settings.numberFormat === 'compact' ? "blue.subtle" : "bg"}
                cursor="pointer"
                onClick={() => onUpdateSetting('numberFormat', 'compact')}
                transition="all 0.2s"
                _hover={{ borderColor: "blue.300" }}
                textAlign="center"
                flex="1"
              >
                <Text fontWeight="medium" fontSize="sm">Компактный</Text>
                <Text fontSize="xs" color="fg.muted">1.23K</Text>
              </Box>
            </HStack>
          </Box>

          {/* Автообновление */}
          <VStack gap={3} align="stretch">
            <HStack justify="space-between" align="center">
              <VStack align="start" gap={0} flex="1">
                <Text fontWeight="medium" fontSize="sm">Автообновление курсов</Text>
                <Text fontSize="xs" color="fg.muted">
                  Автоматическое обновление данных о курсах валют
                </Text>
              </VStack>
              <Checkbox.Root
                checked={settings.autoRefresh}
                onCheckedChange={(e) => onUpdateSetting('autoRefresh', Boolean(e.checked))}
                size="sm"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox.Root>
            </HStack>

            {settings.autoRefresh && (
              <Box>
                <Text fontWeight="medium" mb={2} fontSize="sm">Интервал обновления</Text>
                <RefreshIntervalSelect
                  value={settings.refreshInterval}
                  onChange={(value) => onUpdateSetting('refreshInterval', value)}
                />
              </Box>
            )}
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}