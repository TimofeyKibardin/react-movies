import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import {
  OutlinedInput,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Stack,
  SelectChangeEvent
} from '@mui/material';

// Тип пропсов
interface SearchProps {
  onHandleKeyDown?: (title: string) => void;
  onTypeChange?: (type: string) => void;
  selectedType?: string;
}

interface TypeOption {
  code: string;
  value: string;
}


export const Search: React.FC<SearchProps> = ({
  onHandleKeyDown = () => {},
  onTypeChange = () => {},
  selectedType = '',
}) => {
    const [search, setSearch] = useState<string>('');
    
    const typeOptions: TypeOption[] = [
        { code: 'all', value: 'All' },
        { code: 'movie', value: 'Movie' },
        { code: 'series', value: 'Series' },
    ];

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const trimmed = search.trim();
        if (event.key === 'Enter' && trimmed !== '') {
        onHandleKeyDown(trimmed);
        }
    };

    const handleButtonClick = () => {
        const trimmed = search.trim();
        if (trimmed !== '') {
        onHandleKeyDown(trimmed);
        }
    };

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        const selected = event.target.value;
        onTypeChange(selected === 'all' ? '' : selected);
    };

    return (
        <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="flex-end"
        mb="1rem"
        sx={{ width: '100%' }}
        >
        {/* Поле поиска */}
        <FormControl
            variant="outlined"
            sx={{
            minWidth: 180,
            maxWidth: 250,
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiOutlinedInput-root': {
                height: 40,
                display: 'flex',
                alignItems: 'center',
            },
            '& .MuiOutlinedInput-input': { padding: '8px 12px' },
            }}
        >
            <InputLabel htmlFor="title-input">Title</InputLabel>
            <OutlinedInput
            id="title-input"
            label="Title"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            />
        </FormControl>

        {/* Select типа */}
        <FormControl
            variant="outlined"
            sx={{
            minWidth: 180,
            maxWidth: 250,
            '& .MuiOutlinedInput-root': {
                height: 40,
                display: 'flex',
                alignItems: 'center',
            },
            '& .MuiOutlinedInput-input': { padding: '8px 12px' },
            }}
        >
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
            labelId="type-select-label"
            id="type-select"
            value={selectedType || 'all'}
            label="Type"
            onChange={handleTypeChange}
            >
            {typeOptions.map((typeOption) => (
                <MenuItem key={typeOption.code} value={typeOption.code}>
                {typeOption.value}
                </MenuItem>
            ))}
            </Select>
        </FormControl>

        {/* Кнопка поиска */}
        <Button
            variant="contained"
            onClick={handleButtonClick}
            sx={{
            height: 40,
            px: 3,
            fontWeight: 'bold',
            fontSize: '0.9rem',
            }}
        >
            Search
        </Button>
    </Stack>
  );
}