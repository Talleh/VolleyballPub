import React from 'react';
export interface LanguageContextValue {
    currentLanguage: string;
    updateLanguage: (language: string) => void;
}
const LanguageContext = React.createContext({} as LanguageContextValue);
LanguageContext.displayName = "LanguageContext";

export default LanguageContext;