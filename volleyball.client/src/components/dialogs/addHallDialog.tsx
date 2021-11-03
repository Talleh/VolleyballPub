import React, { FocusEvent, useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Select, MenuItem } from '@material-ui/core/';
import { ContentComponentProps, DialogConfig, DialogResult } from './dialogComponent';
import localizationService from '../../services/localizationService';
import Hall from '../../entities/hall';
import HallTax from '../../entities/hallTax';
import { PlayerLevel } from '../../entities/playerLevel';
import HallModel from '../../models/hallModel';
import hallService from '../../services/hallService';
import HallCode from '../../entities/hallCode';
import { toast } from 'react-toastify';
let nameBusy=false;

async function validate(model:HallModel):Promise<DialogResult<Hall>>{
    
    const fieldsErrors = [];
    if (!model.Hall.name)
    fieldsErrors.push('Name is required');
    if (!model.Hall.address)
    fieldsErrors.push('Address is required');
    if(model.Hall.playersLevel == PlayerLevel.Unknown)
    fieldsErrors.push('Select players level');
    if(!model.Hall.isPublic && !model.Hall.code?.memberCode)
    fieldsErrors.push('Should enter a member code');
    if(!model.Hall.isPublic && !model.Hall.code?.specialGuestCode)
    fieldsErrors.push('Should enter a special guest code');
    if(!model.Hall.isPublic && model.Hall.code?.memberCode == model.Hall.code?.specialGuestCode)
    fieldsErrors.push("Codes should be diferint");
    if(!model.Hall.isPublic && (model.Hall.code?.guestReplacementHours ?? 0) < 2)
    fieldsErrors.push('A member can not replace a guest before 2 hours the game starts');
    if(fieldsErrors.length > 0 || nameBusy){
        return {succeeded:false, errors:fieldsErrors};
    }
    try {
        const hall = await hallService.add(model);
        return {succeeded:true, result:hall};
    } catch (error) {
        return {succeeded:false, errors:['Server error'], forceClose:true};
    }
}

const config: DialogConfig<HallModel, Hall> = {
    inputModel: {
        Hall: { minPlayers: 6, maxPlayers: 12, createGamesAutomatically:true, playersLevel:PlayerLevel.Unknown, isPublic:true } as Hall,
        HallTax: {
            gameRentTax: 0, isRegularTaxDinamic: false, isMemberTaxDinamic: false,
            monthRentTax: 0, regularPlayerTax: 0, memberPlayerTax: 0
        } as HallTax
    },
    cancelOnOutside:true,
    Content: dialogContent,
    OnCancel: () => nameBusy = false,
    resolvedResult: (model) => validate(model),
    title: 'Add Club',
    SubmitTitle: 'Add',
    CancelTitle: 'Cancel'
}

export const modify:(model:HallModel) => DialogConfig<HallModel, Hall> = (model) => {
    return {
        ...config,
        inputModel:model,
        title: 'Modify',
        SubmitTitle: 'Update',
        CancelTitle: 'Cancel'
    };
}

function dialogContent(props: ContentComponentProps<HallModel>): JSX.Element {
    return <div style={{ display: "flex" }}>
        <HallDetails {...props} />
        <TaxDetials {...props} />
        {!props.model.Hall.isPublic && <PrivateHallCodes {...props} />}
    </div>;
}

function HallDetails(props: ContentComponentProps<HallModel>) {
    const { name, address, isPublic, minPlayers, maxPlayers,
        createGamesAutomatically, playersLevel, id } = props.model.Hall;
        const [nameTaken, setNameTaken] = useState(nameBusy);
    const { onModalChange } = props;
    const onPlayerslevelChanged = async (event: React.ChangeEvent<{ name?: string; value: unknown }>) =>{
            const selectedLevel = event.target.value as PlayerLevel;
            onModalChange({
                HallTax: { ...props.model.HallTax },
                Hall: { ...props.model.Hall, playersLevel: selectedLevel }
            });
        }
    const onHallNameUpdated = async(event:FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const isFree = await hallService.hallNameFree(event.target.value, id);
        if(!isFree) toast.error("Hall with this name exists");
        nameBusy = !isFree;
        setNameTaken(nameBusy);
    }
    return <div style={{ display: "flex", margin: 10, flexDirection: "column" }}>
        <TextField
            label="Club Name"
            defaultValue={name}
            error={nameTaken}
            onBlur={onHallNameUpdated}
            placeholder="Enter name"
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(event) => onModalChange({
                HallTax: { ...props.model.HallTax },
                Hall: { ...props.model.Hall, name: event.target.value }
            })}
        />
        <TextField
            label="Club Address"
            placeholder="Enter address"
            defaultValue={address}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(event) => onModalChange({
                HallTax: { ...props.model.HallTax },
                Hall: { ...props.model.Hall, address: event.target.value }
            })}
        />
        <TextField
            label="Club Min players"
            defaultValue={minPlayers}
            InputLabelProps={{
                shrink: true,
            }}
            type="number"
            onChange={(event) => onModalChange({
                HallTax: { ...props.model.HallTax },
                Hall: { ...props.model.Hall, address: event.target.value }
            })}
        />
        <TextField
            label="Club Max Players"
            defaultValue={maxPlayers}
            InputLabelProps={{
                shrink: true,

            }}
            type="number"
            onChange={(event) => onModalChange({
                HallTax: { ...props.model.HallTax },
                Hall: { ...props.model.Hall, address: event.target.value }
            })}
        />
        <Select
        value={playersLevel}
        onChange={onPlayerslevelChanged}
        style={{marginBottom:10}}
        label="Club Players Level"
        >
            <MenuItem value={PlayerLevel.Unknown}> Players level</MenuItem>
            <MenuItem value={PlayerLevel.Beginner}>Beginner</MenuItem>
            <MenuItem value={PlayerLevel.Medium}>Medium</MenuItem>
            <MenuItem value={PlayerLevel.Advanced}>Advanced</MenuItem>
        </Select>

        <FormControlLabel
            control={
                <Checkbox
                    checked={createGamesAutomatically}
                    onChange={(event) => onModalChange({
                        HallTax: { ...props.model.HallTax },
                        Hall: { ...props.model.Hall, createGamesAutomatically: event.target.checked }
                    })}
                    color="primary"
                />
            }
            label="Create Games automatically"
        />

        <FormControlLabel
            control={
                <Checkbox
                    checked={isPublic}
                    onChange={(event) => 
                        {
                            const selectedValue = event.target.checked;
                            const code = !selectedValue ? {memberCode:'', specialGuestCode:'', guestReplacementHours:2} : undefined;
                        onModalChange({
                        HallTax: { ...props.model.HallTax },
                        Hall: { ...props.model.Hall, isPublic: selectedValue, code }
                    })}}
                    color="primary"
                />
            }
            label="Club is public"
        />
    </div>;
}

function TaxDetials(props: ContentComponentProps<HallModel>) {
    const { isRegularTaxDinamic, isMemberTaxDinamic, gameRentTax,
        memberPlayerTax, regularPlayerTax, monthRentTax } = props.model.HallTax;
    const { isPublic } = props.model.Hall;
    const { onModalChange } = props;

    return <div style={{ display: "flex", margin: 10, flexDirection: "column" }}>
        {!isRegularTaxDinamic && <TextField
            label={isPublic? "Member Player Tax" : "Guest Player Tax"}
            type="number"
            defaultValue={regularPlayerTax}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(event) => onModalChange({
                HallTax: { ...props.model.HallTax, regularPlayerTax: +event.target.value },
                Hall: { ...props.model.Hall } })}
        />}
        {isRegularTaxDinamic && <TextField
            label="Game rent Tax"
            type="number"
            defaultValue={gameRentTax}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(event) => onModalChange({
                HallTax: { ...props.model.HallTax, gameRentTax: +event.target.value },
                Hall: { ...props.model.Hall } })}
        />}
        {!isPublic && !isMemberTaxDinamic && <TextField
            label="Member Player Tax"
            defaultValue={memberPlayerTax}
            InputLabelProps={{
                shrink: true,
            }}
            type="number"
            onChange={(event) => onModalChange({
                HallTax: { ...props.model.HallTax, memberPlayerTax: +event.target.value },
                Hall: { ...props.model.Hall } })}
        />}
        {!isPublic && isMemberTaxDinamic && <TextField
            label="Month Rent Tax"
            defaultValue={monthRentTax}
            InputLabelProps={{
                shrink: true,

            }}
            type="number"
            onChange={(event) => onModalChange({
                HallTax: { ...props.model.HallTax, monthRentTax: +event.target.value },
                Hall: { ...props.model.Hall } })}
        />}
        <FormControlLabel
            control={
                <Checkbox
                    checked={isRegularTaxDinamic}
                    onChange={(event) => onModalChange({
                        HallTax: { ...props.model.HallTax, isRegularTaxDinamic: event.target.checked },
                        Hall: { ...props.model.Hall }
                    })}
                    color="primary"
                />
            }
            label="Is regular player Tax Dynamic"
        />
        {!isPublic && <FormControlLabel
            control={
                <Checkbox
                    checked={isMemberTaxDinamic}
                    onChange={(event) => onModalChange({
                        HallTax: { ...props.model.HallTax, isMemberTaxDinamic: event.target.checked },
                        Hall: { ...props.model.Hall }
                    })}
                    color="primary"
                />
            }
            label="Is subscription Dynamic"
        />}
    </div>;
}

function PrivateHallCodes(props: ContentComponentProps<HallModel>) {
    const privateHallCode:HallCode = props.model.Hall.code ?? {memberCode:'', specialGuestCode:'', guestReplacementHours:2};
    const { onModalChange } = props;

    return <div style={{ display: "flex", margin: 10, flexDirection: "column" }}>
        <TextField
            label="Enter member code"
            type="text"
            defaultValue={privateHallCode.memberCode}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(event) => onModalChange({
                HallTax: { ...props.model.HallTax },
                Hall: { ...props.model.Hall, code:{...privateHallCode, memberCode:event.target.value} } })}
        />
        <TextField
            label="Enter Special guest code"
            type="text"
            defaultValue={privateHallCode.specialGuestCode}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(event) => onModalChange({
                HallTax: { ...props.model.HallTax },
                Hall: { ...props.model.Hall, code:{...privateHallCode, specialGuestCode:event.target.value} } })}
        />
        <TextField
            label="Members replacement hour"
            defaultValue={privateHallCode.guestReplacementHours}
            InputLabelProps={{
                shrink: true,
            }}
            type="number"
            onChange={(event) => onModalChange({
                HallTax: { ...props.model.HallTax },
                Hall: { ...props.model.Hall, code:{...privateHallCode, guestReplacementHours:+event.target.value} } })}
        />
    </div>;
}

export default config;