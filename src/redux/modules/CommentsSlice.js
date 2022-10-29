import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
   comments: []
};

export const __getComment = createAsyncThunk(
    "comments/__getComment",
    async (payload, thunkAPI) => {
      try {
       //console.log(typeof(payload));
        const data = await axios.get(
          `http://54.210.135.198:8080/api/${payload}/comment`
        );
        console.log(data)
        return thunkAPI.fulfillWithValue(data.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const __addComment = createAsyncThunk(
    "comments/__addComment",
    async (payload, thunkAPI) => {
      try {
        console.log(payload);
        const data = await axios.post(
          `http://54.210.135.198:8080/api/feed/${payload.id}/comment`,{comment : payload.comment},{
            headers: {
              "Content-Type": `application/json`,
              Access_Token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYnFqYWNobDk1QGdtYWlsLmNvbSIsImV4cCI6MTY2NzA1Mzk4MiwiaWF0IjoxNjY3MDQ3OTgyfQ.Ti9DI9pIsTlvQDpREgWtSOHK3apl7ODa26o6o8hOzyc",
              // RefreshToken: refreshToken, 생략 예정
              "Cache-Control": "no-cache",
            },
          }
        );
          console.log(data)
        return thunkAPI.fulfillWithValue(data.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const __deleteComment = createAsyncThunk(
    "comments/__deleteComment",
    async (payload, thunkAPI) => {
      try {
        console.log(payload);
        const data = await axios.delete(
          `http://54.210.135.198:8080/api/feed//${payload}`,
        );
        return thunkAPI.fulfillWithValue(payload);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  
const CommentsSlice = createSlice({
    name: "comments",
    initialState,
  
    reducers: {},
    extraReducers: {

    //__getComment
    [__getComment.pending]: (state) => {
        state.isLoading = true;
    },
    [__getComment.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
    },
    [__getComment.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    //__addComment
    [__addComment.pending]: (state) => {
        state.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.comments.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    //__deleteComment
    [__deleteComment.pending]: (state) => {
        state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
    },
    [__deleteComment.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    }})

export const { } = CommentsSlice.actions;
export default CommentsSlice.reducer;
