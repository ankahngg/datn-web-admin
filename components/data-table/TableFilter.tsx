"use client";

import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { DatePicker } from "../ui/date-picker";

type FieldType = "text" | "date" | "multi-select" | "number";

interface FilterField<T> {
  name: Extract<keyof T, string>;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  required: boolean;
}

type TableFilterProps<T> = {
  config: FilterField<T>[];
  onFilter: (data: T) => void;
};

export function buildSchema<T>(fields: FilterField<T>[]) {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    let schema;

    switch (field.type) {
      case "text":
        schema = z.string();
        break;

      case "number":
        schema = z.number();
        break;

      case "date":
        schema = z.date();
        break;

      case "multi-select":
        schema = z.array(z.string());
        break;

      default:
        schema = z.any();
    }

    shape[field.name] = field.required ? schema : schema.optional();
  });

  return z.object(shape);
}

export function TableFilter<T>({ config, onFilter }: TableFilterProps<T>) {
  const schema = buildSchema(config);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const renderField = (field: FilterField<T>,) => {
    switch (field.type) {

      case "text":
        return (
          <FieldGroup>
            <Controller
              control={form.control}
              name={field.name as any}
              render={({ field: f, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-muted-foreground">{field.label}</FieldLabel>
                  <Input
                    type="text"
                    {...f}
                    value={(f.value as string) ?? ""}
                    onChange={(e) => f.onChange(e.target.value || undefined)}
                  />
                </Field>
              )}
            />
          </FieldGroup>
        );

      case "date":
        return (
          <FieldGroup>
            <Controller
              control={form.control}
              name={field.name as any}
              render={({ field: f, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-muted-foreground">{field.label}</FieldLabel>
                  <DatePicker  
                    value={f.value as Date}
                    onChange={f.onChange}
                    />
                </Field>
              )} 
            />
          </FieldGroup>
        );
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit((data) => onFilter(data as T))}
      className="space-y-4"
    >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {config.map((field) => renderField(field))}
        </div>
      <Button type="submit" className="my-btn">Tìm kiếm</Button>
    </form>
  );
}
