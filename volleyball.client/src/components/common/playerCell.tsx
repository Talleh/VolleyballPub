import { TableCell, TableRow } from '@material-ui/core';
import React, {PropsWithChildren} from 'react';
import Player from '../../entities/player';

export interface PlayerCellProps{
    item:Player,
    selectedPlayer?:number,
    onClick:(p:Player) => void;
}

export default function PlayerCell({item: p, selectedPlayer, onClick}:PlayerCellProps) {
    return <TableRow key={p.id} style={{ backgroundColor: p.id === selectedPlayer ? "ActiveCaption" : "" }} onClick={() => onClick(p)} >
    <TableCell style={{ width: 60, height: 60 }} align="right">
        <img src={p.picture} style={{ borderRadius: 30 }} />
    </TableCell>
    <TableCell component="th" scope="row">
        {p.name}
    </TableCell>

</TableRow>;
}
