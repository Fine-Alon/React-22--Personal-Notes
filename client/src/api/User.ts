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
    username: z.string(),
    email: z.string(),
    password: z.string()
})

export type RegisterType = z.infer<typeof registerSchema>

export function registerUser(data: RegisterType): Promise<void> {
    console.log(data)
    return fetch('api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": data.username,
            "email": data.email,
            "password": data.password
        })
    }).then(validateServerRes).then(() => undefined)
}

const userSchema = z.object({
    id: z.string(),
    email: z.string(),
    username: z.string()

})

export type UserType = z.infer<typeof userSchema>

export function getMe(): Promise<UserType> {
    return fetch('api/users/me')
        .then(validateServerRes)
        .then(res => res.json())
        .then(res => userSchema.parse(res))
}

export function logout() {
    return fetch('api/logout',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
