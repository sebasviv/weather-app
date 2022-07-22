import { FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    handleSearch(city: string): void
    valueSearch: string
    handleClick(value: string): void
    handleSelectApi(value: string): void
    valueApi: number
}

const BrowserComponent = ({ handleSearch, valueSearch, handleClick, handleSelectApi, valueApi }: Props) => {


    return (
        <div className='browser-container'>
            <TextField
                id="input-with-icon-textfield"
                label="City"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleClick(valueSearch)}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>

                    ),
                    onKeyDown: ((e) => e.key == 'Enter' && handleClick(valueSearch))
                }}
                onChange={(e) => handleSearch(e.currentTarget.value)}
                variant="standard"
                value={valueSearch}
                className={'browser'}
            />
            <FormControl style={{marginTop: 20}}>
                <FormLabel id="demo-radio-buttons-group-label">Select Api </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onChange={(e) =>  handleSelectApi(e.currentTarget.value)}
                    value={valueApi}
                >
                    <FormControlLabel value="1" control={<Radio />} label="Api 1" />
                    <FormControlLabel value="2" control={<Radio />} label="Api 2" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default BrowserComponent