import {FormField} from "../FormField";
import {Button} from "../Button";
import "./NoteForm.css";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {postNote} from "../../api/NoteList.ts";
import {Loader} from "../Loader";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../../App.tsx";
import {FC} from "react";

const schemaPostNote = z.object({
    title: z.string().min(5),
    text: z.string().min(10).max(300)
})
export type TypePostNote = z.infer<typeof schemaPostNote>

export const NoteForm: FC = () => {

    const mutation = useMutation({
        mutationKey: ['post-note'],
        mutationFn: postNote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['note-list']})
            reset()
        },
    }, queryClient)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<TypePostNote>({
        resolver: zodResolver(schemaPostNote),
    })

    const onSubmit = (data: TypePostNote) => {
        console.log(data)
        mutation.mutate(data)
    }

    return <form className="note-form" onSubmit={handleSubmit(onSubmit)}>

        <FormField label="Заголовок" errorMessage={errors.title?.message}>
            <input type="text" {...register("title")}/>
        </FormField>
        <FormField label="Текст" errorMessage={errors.text?.message}>
            <textarea {...register("text")}/>
        </FormField>
        {mutation.status === 'pending' && <Loader/>}
        <Button type={'submit'}>Сохранить</Button>
    </form>
}
