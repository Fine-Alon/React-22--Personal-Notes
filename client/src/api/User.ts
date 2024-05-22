import {z} from 'zod'
import {validateServerRes} from "./validateServerRes.ts";

const loginSchema = z.object({
    email: z.string(),
    password: z.string()
});

type LoginType = z.infer<typeof loginSchema>;


export function loginUser(data: LoginType): Promise<void> {
    return fetch('api/login/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": data.email,
            "password": data.password
        })
    }).then(validateServerRes).then(() => undefined)
}

const registerSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})

type RegisterType = z.infer<typeof registerSchema>

export function registerUser(data: RegisterType): Promise<void> {
    return fetch('api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": data.name,
            "email": data.email,
            "password": data.password
        })
    }).then(validateServerRes).then(() => undefined)
}


export function getMe(): Promise<RegisterType | Response> {
    return fetch('/users/me')
        .then(res => res.json())
        .then(res => registerSchema.parse(res))
}

export function logout(): Promise<RegisterType | Response> {
    return fetch('/logout').then(validateServerRes)
}
