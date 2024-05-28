import {validateServerRes} from "./validateServerRes.ts";
import {array, z} from "zod";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {queryClient} from "../App.tsx";
import {TypePostNote} from "../components/NoteForm";
import {useEffect, useState} from "react";


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

    return fetch(url + (params ? `?${params}` : ''))
        .then(validateServerRes)
        .then(res => res.json())
        .then(data => schemaNoteList.parse(data))
}

export const useGetNoteList = (url: string, pageSize: string | null) => {
    const [page, setPage] = useState(0)

    const queryNoteList = useQuery({
        queryKey: ['note-list'],
        queryFn: () => fetchNoteList(url, `page=${page}&pageSize=${pageSize}`),
        placeholderData: keepPreviousData
    }, queryClient)

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ['note-list']})
    }, [page])

    const handlePrevPage = () => {
        if (page > 0) {
            setPage((old) => Math.max(old - 1, 0))
        }
    }

    const handleNextPage = () => {
        if (!queryNoteList.isPlaceholderData && queryNoteList.data?.pageCount) {
            setPage((old) => old + 1)
        }
    }

    return {noteList: queryNoteList.data, status: queryNoteList.status, handlePrevPage, handleNextPage, page}
}


export function postNote(data: TypePostNote): Promise<void> {
    return fetch('api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: data.title, text: data.text})
    })
        .then(validateServerRes).then(() => undefined)
}
