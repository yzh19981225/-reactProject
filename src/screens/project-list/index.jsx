import { useEffect, useState } from "react"
import { List } from "./list"
import { SearchPanel } from "screens/project-list/search-panel"
import React from 'react';
import {cleanObject} from "utils";
import * as qs from "qs";
import {useMount} from "utils";
import {useDebounce} from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL
export const ProjctListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param,2000)

    const [list, setList] = useState([])
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async resPonse => {
            if (resPonse.ok) {
                setList(await resPonse.json())
            }
        })
    }, [debouncedParam])// eslint-disable-line react-hooks/exhaustive-deps
    // useEffect(() => {
    //     fetch(`${apiUrl}/users`).then(async resPonse => {
    //         if (resPonse.ok) {
    //             setUsers(await resPonse.json())
    //         }
    //     })
    // }, [])
    useMount(() => {
            fetch(`${apiUrl}/users`).then(async resPonse => {
                if (resPonse.ok) {
                    setUsers(await resPonse.json())
                }
            })
        })
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List list={list} users={users} />
    </div>
}