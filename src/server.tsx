export interface IComponentSelectDropdownData {
  value: string;
  label: string;
}

export interface Component {
  labelName: string;
  fieldName: string;
  inputType:
    | "input"
    | "select"
    | "radio"
    | "date"
    | "text"
    | "dropdown"
    | "number";
  isShow: boolean;
  isEditable: boolean;
  isSend: boolean;
  data?: IComponentSelectDropdownData[];
  defaultValue?: any;
}

export const getProviderInsurance = () => [
  { value: "insuranceA", label: "A Insurance", allowWebIntegration: true },
  { value: "insuranceB", label: "B Insurance", allowWebIntegration: true },
  { value: "insuranceC", label: "C Insurance", allowWebIntegration: false },
];

export const getAInsuranceFormComponents = (): Component[] => [
  {
    labelName: "Full Name",
    fieldName: "fullName",
    inputType: "input",
    isShow: true,
    isEditable: true,
    isSend: true,
  },
  {
    labelName: "Gender",
    fieldName: "gender",
    inputType: "radio",
    isShow: true,
    isEditable: false,
    isSend: true,
    data: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
    defaultValue: "male",
  },
  {
    labelName: "Coverage Plan",
    fieldName: "coveragePlan",
    inputType: "select",
    isShow: true,
    isEditable: true,
    isSend: true,
    data: [
      { value: "basic", label: "Basic" },
      { value: "premium", label: "Premium" },
    ],
  },
  {
    labelName: "Is a smoker?",
    fieldName: "isSmoker",
    inputType: "radio",
    isShow: true,
    isEditable: true,
    isSend: true,
    data: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    labelName: "Height (cm)",
    fieldName: "height",
    inputType: "number",
    isShow: true,
    isEditable: false,
    isSend: true,
    defaultValue: 190,
  },
];

export const getBInsuranceFormComponents = (): Component[] => [
  {
    labelName: "Full Name",
    fieldName: "fullName",
    inputType: "input",
    isShow: true,
    isEditable: true,
    isSend: true,
  },
  {
    labelName: "Gender",
    fieldName: "gender",
    inputType: "radio",
    isShow: true,
    isEditable: false,
    isSend: false,
    data: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
    defaultValue: "other",
  },
  {
    labelName: "Vehicle Type",
    fieldName: "vehicleType",
    inputType: "select",
    isShow: true,
    isEditable: true,
    isSend: true,
    data: [
      { value: "car", label: "Car" },
      { value: "motorcycle", label: "Motorcycle" },
      { value: "truck", label: "Truck" },
    ],
  },
  {
    labelName: "License Plate Number",
    fieldName: "licensePlate",
    inputType: "input",
    isShow: true,
    isEditable: true,
    isSend: true,
  },
  {
    labelName: "Purchase Date",
    fieldName: "purchaseDate",
    inputType: "date",
    isShow: true,
    isEditable: true,
    isSend: true,
  },
];

export const getCInsuranceFormComponents = (): Component[] => [
  {
    labelName: "Pet Name",
    fieldName: "petName",
    inputType: "input",
    isShow: true,
    isEditable: true,
    isSend: true,
  },
  {
    labelName: "Gender",
    fieldName: "gender",
    inputType: "radio",
    isShow: true,
    isEditable: true,
    isSend: false,
    data: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  {
    labelName: "Animal Type",
    fieldName: "animalType",
    inputType: "select",
    isShow: true,
    isEditable: true,
    isSend: true,
    data: [
      { value: "dog", label: "Dog" },
      { value: "cat", label: "Cat" },
      { value: "bird", label: "Bird" },
    ],
  },
  {
    labelName: "Date of Birth",
    fieldName: "petDob",
    inputType: "date",
    isShow: true,
    isEditable: false,
    isSend: true,
    defaultValue: "2002-12-1",
  },
  {
    labelName: "Vaccination Status",
    fieldName: "vaccinated",
    inputType: "radio",
    isShow: true,
    isEditable: true,
    isSend: true,
    data: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
];
