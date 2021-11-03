import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core/';
import { ContentComponentProps, DialogConfig } from './dialogComponent';
import localizationService from '../../services/localizationService';
import Player from '../../entities/player';
import playerServices from '../../services/playerServices';

function config(model: Player): DialogConfig<Player, string> {
    return {
        Content: UpdatePhone,
        inputModel: model,
        resolvedResult: async (model) => {
            if (!model.contactNumber)
                return {succeeded:false, errors: ['Phone number is reqiured']};
            try {
                await playerServices.updateProfile(model);
                return {succeeded:true, result:model.contactNumber};
            } catch (error) {
                return {succeeded:false, errors:['Server error'], forceClose:true};
            }
        },
        title: "Update Phone number",
        SubmitTitle: "Update",
        CancelTitle: "Cancel"
    }
}

function UpdatePhone(props: ContentComponentProps<Player>) {

    const { onModalChange } = props;
    const { contactNumber } = props.model;

    const onPhoneChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newModel = { ...props.model } as Player;
        newModel.contactNumber = event.target.value.trim();
        onModalChange(newModel);
    }

    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <TextField
            label="Phone number"
            type="number"
            defaultValue={contactNumber}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={onPhoneChange}
        />
    </div>;
}

export default config;