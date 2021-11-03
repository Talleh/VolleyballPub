import React, { ChangeEvent } from 'react';
import { TextField, Select, MenuItem } from '@material-ui/core/';
import GameAgenda, { DayOfWeek } from '../../entities/gameAgenda';
import { ContentComponentProps, DialogConfig, DialogResult } from './dialogComponent';
import localizationService from '../../services/localizationService';

const config: DialogConfig<GameAgenda, GameAgenda> = {
    Content: AddAgendaDialog,
    inputModel: { Day: 1, Start: new Date(2020, 10, 1, 19), End: new Date(2020, 10, 1, 21) } as GameAgenda,
    resolvedResult : async (model) =>{
        if(model.Start > model.End)
            return {succeeded:false, errors:['Start time should be less then time ']};
        return {succeeded:true, result:model};
    },
    title: "Add new Agenda",
    SubmitTitle: "Add",
    CancelTitle: "Cancel"
}

function AddAgendaDialog(props: ContentComponentProps<GameAgenda>) {

    const { onModalChange } = props;
    const { Day, Start, End } = props.model;

    const onStartDateChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const start = new Date();
        const hours = event.target.value.split(':');
        start.setHours(+hours[0], +hours[1]);
        const newModel = { ...props.model, Start: start } as GameAgenda
        onModalChange(newModel);
    }
    const onEndDateChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const start = new Date();
        const hours = event.target.value.split(':');
        start.setHours(+hours[0], +hours[1]);
        const newModel = { ...props.model, End: start } as GameAgenda
        onModalChange(newModel);
    }

    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <Select
            value={Day}
            placeholder='Select Day of week'
            onChange={(event) => onModalChange({ ...props.model, Day: event.target.value as DayOfWeek })}
        >
            {localizationService.daysOfWeek.map((value, id) => <MenuItem key={id} value={id}>{value}</MenuItem>)}
        </Select>
        <TextField
            label={localizationService.StartAt}
            type="time"
            defaultValue={Start.toLocaleTimeString(undefined, { hour12: false, hour: "2-digit", minute: "2-digit" })}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={onStartDateChange}
        />
        <TextField
            label={localizationService.EndAt}
            type="time"
            defaultValue={End.toLocaleTimeString(undefined, { hour12: false, hour: "2-digit", minute: "2-digit" })}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={onEndDateChange}
        />
    </div>;
}

export default config;