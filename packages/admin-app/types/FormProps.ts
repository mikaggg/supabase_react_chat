import { Control } from "react-hook-form";
import { FormValues } from "../src/pages/Login/Login";

type InputFiledType = "text" | "password" | "email";

export type InputTextProps = {
  name: string;
  id?: string;
  label: string;
  control: Control<FormValues>;
  setValue?: FormValues;
  required?: boolean;
  type?: InputFiledType;
  autoComplete?: string;
  autoFocus?: boolean;
  error?: boolean;
  helperText?: string | undefined;
  rules: {
    required?: string;
    pattern?: { value: RegExp; message: string };
    maxLength?: { value: number; message: string };
    minLength?: { value: number; message: string };
  };
};

export type SingUpForm = {
  email?: string;
  password?: string;
};

export type messagesType = {
  chat_room_id: string;
  content: string;
  content_type: string;
  created_at: string;
  id: string;
  user_id: string;
};

export type chatListType = {
  id: string;
  name: string | null;
  email: string | null;
  created_at: string;
};

export type userType = {
  id: string;
  name: string;
};

export type authUserType = {
  id: string | null;
  email?: string | null;
};
