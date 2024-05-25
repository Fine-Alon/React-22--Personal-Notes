import {FormField} from "../FormField";
import {Button} from "../Button";
import "./RegisterForm.css";
import {FC} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useMutation} from "@tanstack/react-query";
import {registerUser} from "../../api/User.ts";

const schemaRegisterForm = z.object({
    username: z.string().min(5),
    email: z.string().email().min(5),
    password: z.string().min(8)
})

type RegisterFormType = z.infer<typeof schemaRegisterForm>

export const RegisterForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterFormType>({
        resolver: zodResolver(schemaRegisterForm),
    })

    const mutation = useMutation({mutationFn: registerUser})

    return (
        <form className="register-form" onSubmit={handleSubmit((data) => mutation.mutate(data))}>
            <FormField label="Name" errorMessage={errors.username?.message}>
                <input {...register("username")} />
            </FormField>
            <FormField label="Email" errorMessage={errors.email?.message}>
                <input {...register("email")}/>
            </FormField>
            <FormField label="password" errorMessage={errors.password?.message}>
                <input type="password" {...register("password")}/>
            </FormField>
            <Button>Зарегистрироваться</Button>
        </form>
    );
};
