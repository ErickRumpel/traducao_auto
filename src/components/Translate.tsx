import React, { useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Box, Button, Divider, IconButton, TextField, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CustomSelect } from './CustomSelect';
import { languages } from '../utils/constants';
import { searchLanguageInLanguages } from '../utils/functions';

const Translate = () => {
    const { makeTranslation } = useTranslate();
    const [translateResults, setTranslateResults] = useState<any>([]);
    const [langOrigin, setLangOrigin] = useState("");
    const [langTranslate, setLangTranslate] = useState([]);

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const translateText = async (text: string) => {
        setLoading(true);
        let translations: any = [];
        for (let index = 0; index < langTranslate.length; index++) {
            let translatedText = await makeTranslation(text, langOrigin, langTranslate[index]);

            translations.push({ language: langTranslate[index], text: translatedText })
        }
        setTranslateResults(translations);
        setLoading(false);
    }

    const copyText = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    const reset = () => {
        setText("");
        setTranslateResults([]);
    }

    const textBox = (text: string, label: string) => {
        return (
            <Box sx={{ width: "100%", minHeight: "100px" }} >
                <h1>
                    {label}
                    <Tooltip title="Copiar"><IconButton onClick={() => copyText(text)}><ContentCopyIcon /></IconButton></Tooltip>
                </h1>
                <TextField multiline value={text} label="Texto" disabled sx={{ width: "90%" }} />
            </Box>
        )
    }

    console.log(translateResults)

    return (
        <Box sx={{ padding: 5 }}>
            <CustomSelect
                label="Idioma entrada"
                required
                itemsInfo={[{ label: "Detecção automática", value: "auto" }, ...languages]}
                value={langOrigin}
                onChange={(e: any) => setLangOrigin(e.target.value)}
            />

            <TextField multiline sx={{ margin: 3, minWidth: "500px" }} value={text} label="Texto" onChange={(e) => setText(e.target.value)} /> <Button sx={{ mt: 3 }} onClick={reset}>limpar</Button>
            <br />

            <CustomSelect
                value={langTranslate}
                label="Idiomas desejados"
                required
                multiple
                itemsInfo={[{ label: "Detecção automática", value: "auto" }, ...languages]}
                onChange={(e: any) => setLangTranslate(e.target.value)}
            />

            <Button sx={{ margin: 3 }} onClick={() => translateText(text)} variant='contained' disabled={loading || langOrigin[0] === ""}>Traduzir</Button>
            <Divider />
            <Box sx={{ display: "grid", gridTemplateColumns: "40% 40%", justifyContent: "space-around" }}>
                {translateResults.map((result: any) => (
                    textBox(result.text, searchLanguageInLanguages(result.language))
                ))}
            </Box>
        </Box>
    )
}

export default Translate