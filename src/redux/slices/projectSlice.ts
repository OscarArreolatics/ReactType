import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectI } from '@/api/project';

interface ProjectState{
    projects: ProjectI[]
}

const initialState: ProjectState = {
    projects: []
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers:{
        setProjects: (state, action: PayloadAction<ProjectI[]>) => {
            state.projects = action.payload;
          },
    }
})

export const { setProjects } = projectsSlice.actions;

export default  projectsSlice.reducer;