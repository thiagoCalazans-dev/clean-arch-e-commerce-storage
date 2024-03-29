"use client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./commander";
import { cn } from "@/client/lib/utils";
import { useState } from "react";

interface Data {
  id: string;
  name: string;
}

interface ComboboxProps {
  form: any;
  name: string;
  label: string;
  data: Data[];
}

export function Combobox({ form, name, data, label }: ComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1 w-full">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? data.find((item) => item.id === field.value)?.name
                    : "Select an item"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[23rem]   p-0" align="start">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandEmpty>No resource found.</CommandEmpty>
                <CommandGroup>
                  {data.map((item) => (
                    <CommandItem
                      value={item.name}
                      key={item.id}
                      onSelect={() => {
                        form.setValue(name, item.id);
                        setOpen(false);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          item.id === field.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
