import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getItems, getItem, createItem, updateItem, deleteItem } from '../../api/api';

// Thunk for fetching items
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await getItems();
    return response.data;
});

// Thunk for fetching a single item
export const fetchItem = createAsyncThunk('items/fetchItem', async (id) => {
    const response = await getItem(id);
    return response.data;
});

// Thunk for adding an item
export const addItem = createAsyncThunk('items/addItem', async (newItem) => {
    const response = await createItem(newItem);
    return response.data;
});

// Thunk for updating an item
export const editItem = createAsyncThunk('items/editItem', async ({ id, updatedItem }) => {
    const response = await updateItem(id, updatedItem);
    return response.data;
});

// Thunk for deleting an item
export const removeItem = createAsyncThunk('items/removeItem', async (id) => {
    await deleteItem(id);
    return id;
});

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        // Define reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchItem.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                } else {
                    state.items.push(action.payload);
                }
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(editItem.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    },
});

export default itemsSlice.reducer;
