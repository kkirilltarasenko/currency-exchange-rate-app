"use client";

import { Box, Text, VStack, Card, Select, createListCollection } from "@chakra-ui/react";
import { useTranslations, useLocalization, Locale } from "@/features/localization";

export function LanguageSettings() {
  const { t } = useTranslations();
  const { locale, setLocale } = useLocalization();

  const handleLanguageChange = (details: { value: string[] }) => {
    const newLocale = details.value[0] as Locale;
    setLocale(newLocale);
  };

  const languageOptions = createListCollection({
    items: [
      { value: "ru", label: t('settings.languages.ru') },
      { value: "en", label: t('settings.languages.en') },
    ],
  });

  return (
    <Card.Root w="100%">
      <Card.Header pb={3}>
        <Text fontSize="sm" fontWeight="semibold" color="fg.emphasized">
          {t('settings.language')}
        </Text>
      </Card.Header>
      <Card.Body pt={0}>
        <VStack align="stretch" gap={3}>
          <Select.Root
            collection={languageOptions}
            value={[locale]}
            onValueChange={handleLanguageChange}
            size="sm"
          >
            <Select.Trigger>
              <Select.ValueText placeholder="Select language" />
            </Select.Trigger>
            <Select.Content>
              {languageOptions.items.map((option) => (
                <Select.Item key={option.value} item={option}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          
          <Text fontSize="xs" color="fg.muted">
            {t('settings.language')} - {t(`settings.languages.${locale}`)}
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}