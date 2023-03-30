import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',//theme
    user: null,
    token: null,
    posts: []
}
//yeh states saari app me available hongi

export const authSlice = createSlice({
    name: 'auth',//is slice ka name
    initialState,
    reducers: {
        //actions/functions hai
        //state purani state hai 
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state, action) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.log('user friends non-existent :{')
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id)
                    return action.payload.post
                return post;
            })
            state.posts = updatedPosts;
        }

    }
})

//same actions ko export kr rhe hai to use them in other components

export const {
    setMode,
    setLogin,
    setLogout,
    setFriends,
    setPosts,
    setPost } = authSlice.actions

export default authSlice.reducer //imported as authReducer in index.js
// ihioh