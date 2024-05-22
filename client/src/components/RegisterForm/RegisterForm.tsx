import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import {FC} from "react";

export const RegisterForm:FC = () => {
  return (
    <form className="register-form">
      <FormField label="Имя">
        <input />
      </FormField>
      <FormField label="Email">
        <input />
      </FormField>
      <FormField label="Пароль">
        <input type="password" />
      </FormField>
      <Button>Зарегистрироваться</Button>
    </form>
  );
};
