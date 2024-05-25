import {validateServerRes} from "./validateServerRes.ts";
import {array, z} from "zod";
import {useQuery} from "@tanstack/react-query";
import {queryClient} from "../App.tsx";


const schemaNote = z.object({
    id: z.string(),
    title: z.string(),
    text: z.string(),
    userId: z.string(),
    createdAt: z.number()
})
const schemaNoteList = z.object({
    list: array(schemaNote),
    pageCount: z.number()
})

export type TypeSchemaNote = z.infer<typeof schemaNote>
export type TypeSchemaNoteList = z.infer<typeof schemaNoteList>

export function fetchNoteList(url: string, params: string | null = null): Promise<TypeSchemaNoteList> {
    // 'api/notes/'
    return fetch(url + (params ? `?${params}` : ''))
        .then(validateServerRes)
        .then(res => res.json())
        .then(data => schemaNoteList.parse(data))
}

export const useGetNoteList = (url: string, params: string | null = null) => {
    const queryNoteList = useQuery({
        queryKey: ['note-list'],
        queryFn: () => fetchNoteList(url, params)
    }, queryClient)

    return {noteList: queryNoteList.data, status: queryNoteList.status}
}
