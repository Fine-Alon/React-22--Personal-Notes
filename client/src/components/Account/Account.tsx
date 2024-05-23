import "./Account.css";
import {NoteForm} from "../NoteForm";
import {Button} from "../Button";
import {FC} from "react";
import { useMutation, useQuery} from "@tanstack/react-query";
import {getMe, logout, UserType} from "../../api/User.ts";
import {queryClient} from "../../App.tsx";
import {Loader} from "../Loader";
import {AuthForm} from "../AuthForm";
import {UserView} from "../UserView";
import {NotesListView} from "../NotesListView";
import {RegisterForm} from "../RegisterForm";

export const Account: FC = () => {

    const queryLogout = useMutation({
        mutationFn: logout,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['request-me']})
    }, queryClient)

    const queryMe = useQuery<UserType>({
        queryFn: getMe,
        queryKey: ['request-me'],
    }, queryClient)

    const handleExit = () => {
        queryLogout.mutate()
    }

    switch (queryMe.status) {
        case "pending":
            return <Loader/>
        case "error":
            return <AuthForm/>
        case "success":
            return (<div className='box'>
                <UserView username={queryMe.data.username}/>
                <NoteForm/>
                <NotesListView/>
                <Button onClick={handleExit} type={'button'} kind={"secondary"}>Exit</Button>
            </div>)
        default:
            return <RegisterForm/>
    }
};
