import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TagI } from "@/api/tag";

interface TagState {
  Tags: TagI[];
}

const initialState: TagState = {
  Tags: [],
};

const TagsSlice = createSlice({
  name: "Tags",
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<TagI[]>) => {
      state.Tags = action.payload;
    },
  },
});

export const { setTags } = TagsSlice.actions;

export default TagsSlice.reducer;
