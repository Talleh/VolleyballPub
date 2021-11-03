import React from 'react';
import { Typography } from '@material-ui/core/';
import { ContentComponentProps, DialogConfig } from './dialogComponent';
import open from './dialogComponent';

export async function Confirmation(message:string):Promise<boolean>{
    return Dialog(message, true);
}

export async function Info(message:string){
    await Dialog(message);
}

async function Dialog(message:string, awaitConfirmation?:boolean){
    const config: DialogConfig<string, boolean> = {
        inputModel: message,
        resolvedResult:() => Promise.resolve({succeeded:true, result:true}),
        Content: ConfirmationDialogContent,
        title: awaitConfirmation ? 'Confirmation' : 'Info',
        SubmitTitle: awaitConfirmation ? 'Yes' : 'Ok',
        CancelTitle: awaitConfirmation ? 'No' : undefined
    }

    const result = await open(config);
    return result !== undefined;
}

function ConfirmationDialogContent(props: ContentComponentProps<string>): JSX.Element {
    return <Typography>{props.model}</Typography>;
}