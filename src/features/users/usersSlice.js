import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { id: '0', name: 'Penny the spaniel' },
    { id: '1', name: 'Leshenci' },
    { id: '2', name: 'Mashenci' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export default usersSlice.reducer