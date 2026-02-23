"use client";

import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { Currency } from "../types";

interface CurrencySelectProps {
  currencies: Currency[];
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  borderColor?: string;
  bg?: string;
  focusBorderColor?: string;
  placeholder?: string;
}

export const CurrencySelect = ({
  currencies,
  selectedCurrency,
  onCurrencyChange,
  borderColor = "gray.300",
  bg = "white",
  focusBorderColor = "blue.500",
  placeholder = "Выберите валюту"
}: CurrencySelectProps) => {
  const currencyCollection = createListCollection({
    items: currencies.map(currency => ({
      label: currency.code,
      value: currency.code,
      currency: currency
    }))
  });

  return (
    <Select.Root
      collection={currencyCollection}
      size="md"
      width="100%"
      value={[selectedCurrency.code]}
      onValueChange={(details) => {
        const selectedItem = currencyCollection.items.find(item => item.value === details.value[0]);
        if (selectedItem) {
          onCurrencyChange(selectedItem.currency);
        }
      }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger
          border="1px solid"
          borderColor={borderColor}
          bg={bg}
          _focus={{
            borderColor: focusBorderColor,
            boxShadow: `0 0 0 1px ${focusBorderColor}`
          }}
          fontSize="sm"
          h="40px"
        >
          <Select.ValueText placeholder={placeholder} />
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
  );
};