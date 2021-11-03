import React, { FunctionComponent } from 'react';
import Joi from 'joi';
import {ContentComponentProps, DialogConfig, DialogResult} from './dialogComponent';
import FacebookComponent from '..//forms/FacebookComponent';
import { toast } from 'react-toastify';
import RegistrationModel from '../../models/registrationModel';
import { TextField, Typography } from '@material-ui/core';
import authService from '../../services/authService';

function fieldsValidation(model:RegistrationModel) {
    const hasUpper = /[A-Z]/;
        const hasLower = /[a-z]/
        const hasDigit = /\d/
        const hasNonalphas = /\W/
        const shema = Joi.object({name:Joi.string().required().regex(/^\D*$/).messages({
            'string.base': `"a" should be a type of 'text'`,
            'string.empty': `"a" cannot be an empty field`,
            'string.pattern.base': `Trebuie litere`,
            'any.required': `Nume obligatoriu`
          }),
            email:Joi.string().email({ tlds: { allow: false } }).required(),
            password:Joi.string().required().regex(hasDigit).regex(hasLower).regex(hasUpper).regex(hasNonalphas).min(8),
            repeatedPassword:Joi.string().required()
        });
        const erros = shema.validate(model);
        var result = erros.error?.details.map(e => e.message) ?? [];
        console.log(erros);
        if(model.password != model.repeatedPassword)
        result.push("Pereate passwrod not match");

        return result;
}

const RegistrationDialog:DialogConfig<RegistrationModel, string> = {
resolvedResult:async (model) => {
    const fieldsErrors = fieldsValidation(model);
    if(fieldsErrors.length > 0) return {succeeded:false, errors:fieldsErrors};
    try {
        var authResult = await authService.emailRegistration(model);
        return {succeeded:authResult.succeeded, errors:[authResult.error], result:authResult.accessToken}
    } catch (error) {
        return {succeeded:false, errors:['Server Error'], forceClose:true};
    }
},
Content:Registration,
title:"Register",
SubmitTitle:"Submmit",
CancelTitle:'Cancel'
}

function Registration(props:ContentComponentProps<RegistrationModel>){
    const {name, email, password, repeatedPassword} = props.model;
    const {onModalChange} = props;
    return <div style={{ display: "flex", flexDirection: "column", margin:20 }}>
        <FacebookComponent />
        <Typography style={{ marginTop: 15, marginBottom: 15, alignSelf:"center" }}>Or</Typography>
        <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField type="text" placeholder="John Smith" style={{ marginBottom: 15 }} value={name} onChange={(e) => onModalChange({ name:e.target.value})} />
            <TextField type="text" placeholder="email@example.com" style={{ marginBottom: 15 }} value={email} onChange={(e) => onModalChange({ email:e.target.value})} />
            <TextField type="password" placeholder="Enter password" style={{ marginBottom: 15 }} value={password} onChange={(e) => onModalChange({ password:e.target.value})} />
            <TextField type="password" placeholder="Repeat password" style={{ marginBottom: 15 }} value={repeatedPassword} onChange={(e) => onModalChange({ repeatedPassword:e.target.value})} />
        </div>
    </div>;
}

export default RegistrationDialog;