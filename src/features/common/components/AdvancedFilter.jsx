import React, { useState, useEffect } from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select, TextField, Stack, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MainCard from 'ui-component/cards/MainCard';
import { format, isAfter } from 'date-fns';

const AdvancedFilter = ({ onApplyFilters, onClearFilters }) => {
    const [createdFrom, setCreatedFrom] = useState(null);
    const [createdTo, setCreatedTo] = useState(null);
    const [updatedFrom, setUpdatedFrom] = useState(null);
    const [updatedTo, setUpdatedTo] = useState(null);
    const [active, setActive] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [validationError, setValidationError] = useState('');

    // Handle accordion toggle
    const handleToggleAccordion = () => {
        setExpanded((prev) => !prev);
    };

    // Validation function
    const validateDates = () => {
        if (isAfter(createdFrom, createdTo)) {
            setValidationError('Created To date should be equal to or later than Created From date.');
            return false;
        }
        if (isAfter(updatedFrom, updatedTo)) {
            setValidationError('Updated To date should be equal to or later than Updated From date.');
            return false;
        }
        setValidationError(''); // Clear the error if validation passes
        return true;
    };

    // Use useEffect to trigger validation whenever date fields change
    useEffect(() => {
        validateDates();
    }, [createdFrom, createdTo, updatedFrom, updatedTo]);

    // Handle applying filters
    const handleApplyFilters = () => {
        if (validateDates()) {
            onApplyFilters({
                created_from: createdFrom ? format(createdFrom, 'yyyy-MM-dd') : '',
                created_to: createdTo ? format(createdTo, 'yyyy-MM-dd') : '',
                updated_from: updatedFrom ? format(updatedFrom, 'yyyy-MM-dd') : '',
                updated_to: updatedTo ? format(updatedTo, 'yyyy-MM-dd') : '',
                active
            });
        }
    };

    // Handle clearing filters
    const handleClearFilters = () => {
        setCreatedFrom(null);
        setCreatedTo(null);
        setUpdatedFrom(null);
        setUpdatedTo(null);
        setActive('');
        setValidationError('');
        onClearFilters();
    };

    return (
        <MainCard>
            <Accordion expanded={expanded} onChange={handleToggleAccordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Advanced Filters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Grid container spacing={2}>
                            {/* Error Message */}
                            {validationError && (
                                <Grid item xs={12}>
                                    <Typography color="error">{validationError}</Typography>
                                </Grid>
                            )}

                            {/* Created From */}
                            <Grid item xs={12} sm={6} md={3} lg={2.4}>
                                <DatePicker
                                    label="Created From"
                                    value={createdFrom}
                                    onChange={(newValue) => setCreatedFrom(newValue)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true
                                        }
                                    }}
                                />
                            </Grid>

                            {/* Created To */}
                            <Grid item xs={12} sm={6} md={3} lg={2.4}>
                                <DatePicker
                                    label="Created To"
                                    value={createdTo}
                                    onChange={(newValue) => setCreatedTo(newValue)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true
                                        }
                                    }}
                                />
                            </Grid>

                            {/* Updated From */}
                            <Grid item xs={12} sm={6} md={3} lg={2.4}>
                                <DatePicker
                                    label="Updated From"
                                    value={updatedFrom}
                                    onChange={(newValue) => setUpdatedFrom(newValue)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true
                                        }
                                    }}
                                />
                            </Grid>

                            {/* Updated To */}
                            <Grid item xs={12} sm={6} md={3} lg={2.4}>
                                <DatePicker
                                    label="Updated To"
                                    value={updatedTo}
                                    onChange={(newValue) => setUpdatedTo(newValue)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true
                                        }
                                    }}
                                />
                            </Grid>

                            {/* Active Filter */}
                            <Grid item xs={12} sm={6} md={3} lg={2.4}>
                                <FormControl fullWidth>
                                    <InputLabel>Active</InputLabel>
                                    <Select
                                        value={active}
                                        onChange={(event) => setActive(event.target.value)}
                                        label="Active"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="true">True</MenuItem>
                                        <MenuItem value="false">False</MenuItem>
                                        <MenuItem value="both">Both</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Buttons */}
                            <Grid item xs={12}>
                                <Stack direction="row" spacing={2} justifyContent="flex-end">
                                    <Button variant="outlined" onClick={handleClearFilters}>
                                        Clear Filters
                                    </Button>
                                    <Button variant="contained" onClick={handleApplyFilters}>
                                        Apply Filters
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </LocalizationProvider>
                </AccordionDetails>
            </Accordion>
        </MainCard>
    );
};

export default AdvancedFilter;
