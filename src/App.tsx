// DynamicInsuranceForm.tsx

import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  DatePicker,
  Button,
  Alert,
  Card,
} from "antd";

import dayjs from "dayjs";
import {
  getProviderInsurance,
  getAInsuranceFormComponents,
  getBInsuranceFormComponents,
  getCInsuranceFormComponents,
  Component,
} from "./server";

const { Option } = Select;

const providerMap: Record<string, () => Promise<Component[]>> = {
  insuranceA: () => Promise.resolve(getAInsuranceFormComponents()),
  insuranceB: () => Promise.resolve(getBInsuranceFormComponents()),
  insuranceC: () => Promise.resolve(getCInsuranceFormComponents()),
};

export default function DynamicInsuranceForm() {
  const [form] = Form.useForm();
  const [provider, setProvider] = useState<string | null>(null);
  const [components, setComponents] = useState<Component[]>([]);
  const [allowWebIntegration, setAllowWebIntegration] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleProviderChange = async (value: string) => {
    setProvider(value);
    const providerData = getProviderInsurance().find((p) => p.value === value);
    setAllowWebIntegration(providerData?.allowWebIntegration ?? true);
    const fetcher = providerMap[value];
    if (fetcher) {
      const comp = await fetcher();
      setComponents(comp);
      const defaultValues: Record<string, any> = {};
      comp.forEach((c) => {
        if (!c.isEditable && c.defaultValue !== undefined) {
          if (c.inputType === "date") {
            defaultValues[c.fieldName] = dayjs(c.defaultValue);
          } else {
            defaultValues[c.fieldName] = c.defaultValue;
          }
        }
      });
      form.setFieldsValue(defaultValues);
    }
  };

  const validateField = (field: Component, value: any): string | null => {
    if (!field.isSend || !field.isShow) return null;
    if (field.inputType === "number" && (value === undefined || value <= 0))
      return "Must be greater than 0";
    if (
      ["input", "text"].includes(field.inputType) &&
      (!value || value.trim() === "")
    )
      return "Cannot be empty";
    if (["select", "dropdown", "radio"].includes(field.inputType) && !value)
      return "Selection required";
    if (field.inputType === "date") {
      if (!value) return "Date required";
      if (dayjs(value).isAfter(dayjs())) return "Cannot be in the future";
    }
    return null;
  };

  const onFinish = (values: Record<string, any>) => {
    if (!allowWebIntegration) {
      setSubmitError("This provider does not support web submission");
      return;
    }

    const errors: Record<string, string> = {};
    components.forEach((field) => {
      const error = validateField(field, values[field.fieldName]);
      if (error) errors[field.fieldName] = error;
    });

    if (Object.keys(errors).length > 0) {
      form.setFields(
        Object.entries(errors).map(([name, error]) => ({
          name,
          errors: [error],
        }))
      );
      return;
    }

    const payload: Record<string, any> = {};
    components.forEach((field) => {
      if (field.isSend) {
        if (field.inputType === "date") {
          payload[field.fieldName] = dayjs(values[field.fieldName]).format(
            "MM-DD-YYYY"
          );
        } else {
          payload[field.fieldName] = values[field.fieldName];
        }
      }
    });
    console.log("Payload:", payload);
    setSubmitError(null);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card
        title="Insurance Quotation Form"
        bordered={false}
        className="shadow-lg"
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label="Select Insurance Provider" name="provider" required>
            <Select
              onChange={handleProviderChange}
              placeholder="Choose Insurance"
              style={{ width: "100%" }}
            >
              {getProviderInsurance().map((p) => (
                <Option key={p.value} value={p.value}>
                  {p.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {components
            .filter((c) => c.isShow)
            .map((field) => (
              <Form.Item
                key={field.fieldName}
                label={field.labelName}
                name={field.fieldName}
                rules={[
                  {
                    required: field.isSend,
                    message: `${field.labelName} is required`,
                  },
                ]}
              >
                {field.inputType === "input" && (
                  <Input
                    disabled={!allowWebIntegration || !field.isEditable}
                    style={{
                      backgroundColor:
                        !allowWebIntegration || !field.isEditable
                          ? "#f5f5f5"
                          : "white",
                    }}
                  />
                )}
                {field.inputType === "number" && (
                  <InputNumber
                    disabled={!allowWebIntegration || !field.isEditable}
                    style={{
                      width: "100%",
                      backgroundColor:
                        !allowWebIntegration || !field.isEditable
                          ? "#f5f5f5"
                          : "white",
                    }}
                  />
                )}
                {field.inputType === "select" && field.data && (
                  <Select
                    disabled={!allowWebIntegration || !field.isEditable}
                    style={{
                      backgroundColor:
                        !allowWebIntegration || !field.isEditable
                          ? "#f5f5f5"
                          : "white",
                    }}
                  >
                    {field.data.map((opt) => (
                      <Option key={opt.value} value={opt.value}>
                        {opt.label}
                      </Option>
                    ))}
                  </Select>
                )}
                {field.inputType === "radio" && field.data && (
                  <Radio.Group
                    disabled={!allowWebIntegration || !field.isEditable}
                    style={{
                      backgroundColor:
                        !allowWebIntegration || !field.isEditable
                          ? "#f5f5f5"
                          : "white",
                    }}
                  >
                    {field.data.map((opt) => (
                      <Radio key={opt.value} value={opt.value}>
                        {opt.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                )}
                {field.inputType === "date" && (
                  <DatePicker
                    disabled={!allowWebIntegration || !field.isEditable}
                    style={{
                      width: "100%",
                      backgroundColor:
                        !allowWebIntegration || !field.isEditable
                          ? "#f5f5f5"
                          : "white",
                    }}
                  />
                )}
              </Form.Item>
            ))}

          {!allowWebIntegration && (
            <Alert
              message="This provider does not support web submission"
              type="warning"
              showIcon
              style={{ marginBottom: "16px" }}
            />
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!allowWebIntegration}
              style={{
                width: "100%",
                backgroundColor: allowWebIntegration ? "#1890ff" : "#d9d9d9",
                borderColor: allowWebIntegration ? "#1890ff" : "#d9d9d9",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
