"use client";

import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { DatePicker } from "../ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type FieldType = "text" | "date" | "select" | "number";

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

function formatLocalIsoDate(date: Date) {
  const pad = (value: number, length = 2) => String(value).padStart(length, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
}

export function buildSchema<T>(fields: FilterField<T>[]) {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    let schema;

    switch (field.type) {
      case "text":
        schema = z.string();
        break;

      case "number":
        schema = z.coerce.number();
        break;

      case "date":
        schema = z.date();
        break;

      case "select":
        schema = z.string();
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

      case "number":
        return (
          <FieldGroup key={field.name}>
            <Controller
              control={form.control}
              name={field.name as any}
              render={({ field: f, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-muted-foreground">{field.label}</FieldLabel>
                  <Input
                    type="text"
                    {...f}
                    value={f.value !== undefined ? String(f.value) : ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (schema.shape[field.name].safeParse(value).success) {
                        f.onChange(value);
                      }
                    }}
                  />
                </Field>
              )}
            />
          </FieldGroup>
        );

      case "text":
        return (
          <FieldGroup key={field.name}>
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
          <FieldGroup key={field.name}>
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

        case "select":
          return (
            <FieldGroup key={field.name}>
              <Controller
                control={form.control}
                name={field.name as any}
                render={({ field: f, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-muted-foreground">{field.label}</FieldLabel>
                    <Select 
                      value={f.value as string}
                      onValueChange={(value) => f.onChange(value.length > 0 ? value : undefined)}
                      
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn ..."/>
                        <SelectContent position="popper">
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                  </Field>
                )}
              />
            </FieldGroup>
          );
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit((data) => onFilter({
        ...data,
        // Convert Date objects to ISO strings for easier handling in the parent component
        ...Object.fromEntries(
          Object.entries(data).map(([key, value]) => [
            key,
            value instanceof Date ? formatLocalIsoDate(value) : value,
          ])
        ),
       } as T))
      }
      className="space-y-4"
    >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {config.map((field) => renderField(field))}
        </div>
      <Button type="submit" className="my-btn">Tìm kiếm</Button>
    </form>
  );
}
