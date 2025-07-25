import React from "react";
import {
  OutlinedInput,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Stack
} from "@mui/material";

class Search extends React.Component {
  state = {
    typeOptions: [
      { code: 'all', value: 'All' },
      { code: 'movie', value: 'Movie' },
      { code: 'series', value: 'Series' }
    ],
    search: ''
  };

  handleKeyDown = (event) => {
    const trimmed = this.state.search.trim();
    if (
      event.key === "Enter" &&
      this.props.onHandleKeyDown &&
      trimmed !== ''
    ) {
      this.props.onHandleKeyDown(this.state.search);
    }
  };

  handleButtonClick = () => {
    const trimmed = this.state.search.trim();
    if (this.props.onHandleKeyDown && trimmed !== '')
      this.props.onHandleKeyDown(this.state.search);
  };

  handleTypeChange = (e) => {
    const selected = e.target.value;
    if (this.props.onTypeChange) {
      this.props.onTypeChange(selected === 'all' ? '' : selected);
    }
  };

  render() {
    const { selectedType = '' } = this.props;

    return (
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="flex-end"
        mb={'1rem'}
        sx={{ width: '100%' }}
      >
        <FormControl
          variant="outlined"
          sx={{
            minWidth: 180,
            maxWidth: 250,
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiOutlinedInput-root': {
              height: 40,
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiOutlinedInput-input': {
              padding: '8px 12px',
            }
          }}
        >
          <InputLabel htmlFor="title-input">Title</InputLabel>
          <OutlinedInput
            id="title-input"
            label="Title"
            value={this.state.search}
            onChange={(e) => this.setState({ search: e.target.value })}
            onKeyDown={this.handleKeyDown}
          />
        </FormControl>

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
            '& .MuiOutlinedInput-input': {
              padding: '8px 12px',
            }
          }}
        >
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            value={selectedType || 'all'}
            label="Type"
            onChange={this.handleTypeChange}
          >
            {this.state.typeOptions.map((typeOption) => (
              <MenuItem key={typeOption.code} value={typeOption.code}>
                {typeOption.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={this.handleButtonClick}
          sx={{
            height: 40,
            px: 3,
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}
        >
          Search
        </Button>
      </Stack>
    );
  }
}

export { Search };