import React, { PropsWithChildren, useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core/';
import { render, unmountComponentAtNode } from 'react-dom';
import { toast } from 'react-toastify';


interface DialogComponentProps<TModel, TResult> extends DialogConfig<TModel, TResult> {
    resolve: (value?: TResult | PromiseLike<TResult> | undefined) => void,
    parent:HTMLDivElement
}
export interface DialogConfig<TModel, TResult> {
    title?: string,
    cancelOnOutside?:boolean,
    SubmitTitle?: string,
    CancelTitle?: string,
    dialogColor?:string,
    OnCancel?:() => void,
    resolvedResult:(model:TModel) => Promise<DialogResult<TResult>>,
    inputModel?: TModel,
    Content: React.ComponentType<ContentComponentProps<TModel>> | React.ComponentType<any>,
}

export interface DialogResult<T>{
    succeeded:boolean,
    forceClose?:boolean,
    result?:T,
    errors?:string[]
}

export interface ContentComponentProps<TModel> {
    model: TModel,
    onModalChange: (newModel: TModel) => void
}

let parent: HTMLDivElement;

function getParent() {
    if(!parent){
        parent = document.createElement('div');
        parent.onblur = () => console.log("Parent");
        document.body.appendChild(parent);
    }
    
    return parent.firstElementChild ?? parent;
}

function open<TModel, TResult>(Config: DialogConfig<TModel, TResult>): Promise<TResult | undefined> {
    let dialog = new Promise<TResult | undefined>((resolve) => {
         const _p = document.createElement('div');
         document.body.appendChild(_p);
        render(<DialogComponent resolve={resolve} parent={_p}
            {...Config}
             />, _p);
    });

    return dialog;
}

function DialogComponent<TModel, TResult>(props: PropsWithChildren<DialogComponentProps<TModel, TResult>>) {
    const [open, setOpen] = useState(true);
    const [model, setModel] = useState(props.inputModel ?? {} as TModel);

    const { title, SubmitTitle, CancelTitle, resolvedResult, parent } = props;

    const remove = () =>{
        setOpen(false);
        unmountComponentAtNode(parent);
        document.body.removeChild(parent);
    };

    const cancel = () =>{
        props.OnCancel?.();
        props.resolve(undefined);
        remove();
    }
    

    const close = async (model: TModel) => {        
        const dialogResult = await resolvedResult(model);
        if(!dialogResult.succeeded)
            dialogResult.errors?.map(e => toast.error(e));
        else
            props.resolve(dialogResult.result);

        if(dialogResult.forceClose || dialogResult.succeeded)
        remove();
    }

    const handleModalChange = (newModel:TModel) =>{
        const _model = {...model, ...newModel};
        setModel(_model);
    }

    return <Dialog open={open} color="primary">
        {title && <DialogTitle style={{backgroundColor:props.dialogColor}}>{title}</DialogTitle>}
        <props.Content model={model} onModalChange={handleModalChange}/>
        <DialogActions style={{backgroundColor:props.dialogColor}}>
            {CancelTitle && <Button onClick={cancel}>{CancelTitle}</Button>}
            {SubmitTitle && <Button onClick={() => close(model)}>{SubmitTitle}</Button>}
        </DialogActions>
    </Dialog>;
}


export default open;