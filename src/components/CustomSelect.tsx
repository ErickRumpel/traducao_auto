import { Box, FormControl, InputLabel, MenuItem, Select, SelectProps, SxProps, Theme } from '@mui/material';

type TypeCustomSelectProps = {
    label: string,
    required?: boolean,
    itemsInfo: any[]
    sx?: SxProps<Theme>,
    onChange?: Function,
    multiple?: boolean
    value: any,
} & SelectProps;

export function CustomSelect({ label, required, itemsInfo, multiple, onChange = () => { }, sx = [], value, ...props }: TypeCustomSelectProps) {
    const defaultValue = multiple ? [""] : "";
    return (
        <Box sx={[...(Array.isArray(sx) ? sx : [sx]),]}>
            <FormControl>
                <InputLabel id="customSelect_label" shrink={true}>{label}{required ? "*" : ""}</InputLabel>
                <Select
                    displayEmpty
                    defaultValue={multiple ? [] : ""}
                    labelId='customSelect_label'
                    label={label}
                    value={value || defaultValue}
                    {...props}
                    autoWidth={false}
                    sx={{ maxWidth: "260px", minWidth:"260px" }}
                    onChange={onChange}
                    size="small"
                    multiple={multiple}
                >
                    <MenuItem value="" disabled>Selecione uma opção</MenuItem>
                    {itemsInfo.map((item) => (<MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>))}
                </Select >
            </FormControl>
        </Box>
    );
}