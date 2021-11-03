import React, { useState } from 'react';
import {TableContainer, TableBody, TablePagination, TextField, Table, Button, IconButton} from '@material-ui/core';
import { Search, NavigateBefore, NavigateNext } from '@material-ui/icons';

export interface TableProps<TItem>{
    itemTemplate:(item:TItem) => JSX.Element
    items:TItem[],
    onSearch?:(searchTerm:string) => void
}

export default function AppTable<TItem>(props:TableProps<TItem>){
    const {items, itemTemplate, onSearch} = props;
    const [search, setSearch] = useState('');
    const handleSearch = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>{
        setSearch(e.target.value);
        onSearch?.(e.target.value);
    }
    return <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"start", marginBottom:10, backgroundColor:"AppWorkspace"}}>
                <Search color="primary"/>
            <TextField placeholder="Enter Search Term" value={search} onChange={handleSearch}></TextField>
            </div>
        <TableBody>
            {items.map(itemTemplate)}
        </TableBody>
    {items.length !== 0 && <div style={{backgroundColor:"AppWorkspace", display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
        <IconButton>
        <NavigateBefore color="action"/>
        </IconButton>
        <IconButton>
            <NavigateNext color="action" />
            </IconButton>
        </div>}
    </div>;
}