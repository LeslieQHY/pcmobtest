import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";	
import {  API_STATUS } from "../constants";	
import { db } from "../firebase";

const initialState = {
    posts: [],
    status: API_STATUS.idle,
    error: null,
  };

  export const fetchPosts = createAsyncThunk("bucks/fetchPosts", async () => {	
    const querySnapshot = await getDocs(collection(db, "bucks"));	
    const bucks = querySnapshot.docs.map((doc) => {	
      return { id: doc.id, ...doc.data() };	
    });	
    return bucks;	
  });
  
  export const addNewPost = createAsyncThunk(
    "bucks/addNewPost",
    async (newPost) => {
      await setDoc(doc(db, "bucks", newPost.id), newPost);
      return newPost;
    }
  );
  export const updatePostThunk = createAsyncThunk(	
    "posts/updatePost",	
    async (updatedPost) => {	
      await updateDoc(doc(db, "bucks", updatedPost.id), updatedPost);
      return updatedPost;
    }	
  );	
  export const deletePostThunk = createAsyncThunk(	
    "posts/deletePost",	
    async (id) => {	
      await deleteDoc(doc(db, "bucks", id));
      return id;	
    }	
  );
  
  const bucksSlice = createSlice({
    name: "bucks",
    initialState,
    extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = API_STATUS.pending;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = API_STATUS.fulfilled;
          // Add any fetched posts to the array
          state.posts = state.posts.concat(action.payload);
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = API_STATUS.rejected;
          state.error = action.error.message;
          console.log("Failed to fetch posts. Error:", action.error.message);
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
          state.posts.push(action.payload);
        })
        .addCase(updatePostThunk.fulfilled, (state, action) => {	
          const { id } = action.payload;	
          const posts = state.posts;	
          const post = posts.find((post) => post.id === id);	
          const postIndex = posts.indexOf(post);	
          if (~postIndex) posts[postIndex] = action.payload;	
        })
        .addCase(deletePostThunk.fulfilled, (state, action) => {	
          const id = action.payload;	
          const updatedPosts = state.posts.filter((item) => item.id !== id);	
          state.posts = updatedPosts;	
        });	
    },	
  });
  export const { buckAdded } = bucksSlice.actions;
  
  export default bucksSlice.reducer;
  