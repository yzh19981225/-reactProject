import { useEffect, useState } from "react"
import { List } from "./list"
import { SearchPanel } from "screens/project-list/search-panel"
import React from 'react';
import {cleanObject} from "utils/index";
import * as qs from "qs";
import {useMount} from "utils/index";
import {useDebounce} from "utils/index";



const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([]) //引入hook use
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param,2000)

    const [list, setList] = useState([])
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debouncedParam])// eslint-disable-line react-hooks/exhaustive-deps
    useMount(() => {
            fetch(`${apiUrl}/users`).then(async response => {
                if (response.ok) {
                    setUsers(await response.json())
                }
            })
        })
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List list={list} users={users} />
    </div>
}

