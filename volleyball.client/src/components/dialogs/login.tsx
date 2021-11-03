import React from 'react';
import Joi from 'joi';
import {ContentComponentProps, DialogConfig, DialogResult} from './dialogComponent';
import FacebookComponent from '..//forms/FacebookComponent';
import { TextField, Typography } from '@material-ui/core';
import RegistrationModel from '../../models/registrationModel';
import authService from '../../services/authService';

function fieldsValidation(model:RegistrationModel) {
  const shema = Joi.object({email:Joi.string().required().email({ tlds: { allow: false } }),
    password:Joi.string().required()});
      /*shema.messages({
        'string.base': `"a" should be a type of 'text'`,
        'string.empty': `"a" cannot be an empty field`,
        'string.min': `"a" should have a minimum length of {#limit}`,
        'any.required': `Test mes`
      });*/
    const erros = shema.validate(model);
    
    return erros.error?.details.map(e => e.message) ?? [];
}

const LoginDialog:DialogConfig<RegistrationModel, boolean> = {
resolvedResult: async (model) =>{

  const fieldsErrors = fieldsValidation(model);
  if(fieldsErrors.length > 0)
  return {succeeded:false, errors:fieldsErrors};
  try {
    const authResult = await authService.emailLogin(model);
    return {succeeded:authResult.succeeded, errors:[authResult.error], result:authResult.succeeded};
  } catch (error) {
    return {succeeded:false, errors:['Server error'], forceClose:true};
  }
},
Content:Login,
title:"Log in",
SubmitTitle:"Login",
CancelTitle:'Cancel'
}


function Login(props:ContentComponentProps<RegistrationModel>){
    const {email, password} = props.model;
    const {onModalChange} = props;
    return <div style={{ display: "flex", flexDirection: "column", margin:20 }}>
        <FacebookComponent />
        <Typography style={{ marginTop: 15, marginBottom: 15, alignSelf:"center" }}>Or</Typography>
        <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField type="email" placeholder="email@example.com" style={{ marginBottom: 15 }} value={email} onChange={(e) => onModalChange({ email:e.target.value})} />
            <TextField type="password" placeholder="Enter password" style={{ marginBottom: 15 }} value={password} onChange={(e) => onModalChange({ password:e.target.value})} />
         </div>
    </div>;
}

export default LoginDialog;