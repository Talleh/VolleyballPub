import React, { FunctionComponent, useContext, useState } from "react";
import { languages } from '../constants';
import LanguageContext from "../context/languageContext";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Localization: FunctionComponent = () => {
    const languageContext = useContext(LanguageContext);
    const [value, setValue] = useState(languages.indexOf(languageContext.currentLanguage));
    const handleTabChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const newValue = event.target.value as number;
        languageContext.updateLanguage(languages[newValue]);
        setValue(newValue);
    };

    return <Select
        value={value}
        onChange={handleTabChange}
    >
        {languages.map((l, index) => <MenuItem key={l} value={index}> <img src={require(`../assets/${l}.png`)} /></MenuItem>)}
    </Select>;
}

export default Localization;