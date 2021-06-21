import { useEffect, useState } from "react"
import { List } from "./list"
import { SearchPanel } from "screens/project-list/search-panel"
import {cleanObject} from "utils/index";
import {useMount} from "utils/index";
import {useDebounce} from "utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";



// const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([]) //引入hook use
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param,2000)

    const [list, setList] = useState([])
    const client = useHttp()
    useEffect(() => {
        console.log(cleanObject(debouncedParam),"3");
        client('projects',{data:cleanObject(debouncedParam)}).then(setList)
    }, [debouncedParam])// eslint-disable-line react-hooks/exhaustive-deps
    //页面加载完渲染
    useMount(() => {
        client('users').then(setUsers)
        })
    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List list={list} users={users} />
    </Container>
}

const Container = styled.div`
    padding: 3.2rem;
`