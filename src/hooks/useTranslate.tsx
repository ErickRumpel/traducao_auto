
export const useTranslate = () => {

    const makeTranslation = async (text: string, sourceLang: string, targetLang: string) => {
        try {
            const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${sourceLang}&tl=${targetLang}&q=${text}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            if (sourceLang === "auto") {
                return data[0][0];
            }
            return data[0];

        } catch (error) {
            console.log(error)
            return ""
        }
    }
    return { makeTranslation }
}