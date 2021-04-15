import { useEffect, useState } from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import React from 'react';

const apiUrl = process.env.REACT_APP_API_URL
export const ProjctListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [list, setList] = useState([])
    useEffect(() => {
        fetch(`${apiUrl}/projects`).then(async resPonse => {
            if (resPonse.ok) {
                setList(await resPonse.json())
            }
        })
    }, [param])
    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async resPonse => {
            if (resPonse.ok) {
                setUsers(await resPonse.json())
            }
        })
    }, [])
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List list={list} users={users} />
    </div>
}