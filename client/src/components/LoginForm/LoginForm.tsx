import "./LoginForm.css";
import {FormField} from "../FormField";
import {Button} from "../Button";
import {z} from "zod";
import {FC} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {loginUser} from "../../api/User.ts";
import {Loader} from "../Loader";
import {Account} from "../Account";

const schemaLoginForm = z.object({
    email: z.string().email().min(5),
    password: z.string().min(8)
})
type LoginFormType = z.infer<typeof schemaLoginForm>

export const LoginForm: FC = () => {

    const mutation = useMutation({
        mutationFn: loginUser,
        // onSuccess:
    })
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormType>({
        resolver: zodResolver(schemaLoginForm),
    })

    {
        switch (mutation.status) {
            case "pending":
                return <Loader/>
            case "success":
                return <Account />
            default:
                return (
                    <form className="login-form" onSubmit={handleSubmit(data => mutation.mutate(data))}>
                        <FormField label="Email" errorMessage={errors.email?.message}>
                            <input {...register("email")}/>
                        </FormField>
                        <FormField label="password" errorMessage={errors.password?.message}>
                            <input type="password" {...register("password")}/>
                        </FormField>
                        {mutation.error && <span>{mutation.error.message}</span>}
                        {/*==========================*/}
                        {/*{mutation.status === 'pending' && <Loader/>}*/}
                        <Button>Войти</Button>
                    </form>
                );
        }
    }

};
