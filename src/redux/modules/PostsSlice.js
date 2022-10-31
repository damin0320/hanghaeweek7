import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    posts : [
      
    ]
}

export const __addPost = createAsyncThunk(
    "melon/__addPost",
    async (payload, thunkAPI) => {
      try {
        await axios
          .post(`http://3.39.72.234:8080/api/feed`, payload, {
            headers: {
              enctype: "multipart/form-data",
              Access_Token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsp4DrgpgyIiwiZXhwIjoxNjY3MjY4MDc1LCJpYXQiOjE2NjcxODE2NzV9.vrryl31o6iGfntDHspVycmEoaphf7yAtPMl4rACbqX4",
              // RefreshToken: refreshToken, 생략 예정
              "Cache-Control": "no-cache",
            },
          })
          .then((response) => {
            console.log("response", response.data);
          });
      } catch (error) {
        console.log("error", error);
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

    // 사진 여러장 올리기 방법
    //   for (let i = 0; i < fileList.length; i++) {
    //     formData.append("files", fileList[i]);
    //   }

export const __getPost = createAsyncThunk(
    "posts/__getPost",
    async (payload, thunkAPI) => {
      try {
        const data = await axios.get("http://3.39.72.234:8080/api/feed/show", 
        );
        //console.log(data);
        return thunkAPI.fulfillWithValue(data.data.feeds);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const __deletePost = createAsyncThunk(
    "posts/__deletePost",
    async (payload, thunkAPI) => {
      try {
        const data = await axios.delete(
          `http://3.39.72.234:8080/api/feed/${payload}`,  {
            headers: {
              Access_Token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsp4DrgpgyIiwiZXhwIjoxNjY3MjY4MDc1LCJpYXQiOjE2NjcxODE2NzV9.vrryl31o6iGfntDHspVycmEoaphf7yAtPMl4rACbqX4",
              // RefreshToken: refreshToken, 생략 예정
              "Cache-Control": "no-cache",
            },
          }
        );
        return thunkAPI.fulfillWithValue(payload);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const __getPost2 = createAsyncThunk(
    "posts/__getPost",
    async (payload, thunkAPI) => {
      try {
        //console.log(payload)
        const data = await axios.get(`http://3.39.72.234:8080/api/feed/show/${payload}`, 
        );
        console.log(data.data);
        return thunkAPI.fulfillWithValue(data.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const __editPost = createAsyncThunk(
    "posts/__editPost",
    async (payload, thunkAPI) => {
      console.log("payload",payload)
      try {
        const data = await axios.patch(`http://3.39.72.234:8080/${payload.id}`, {content:payload.target});
        // const data = await axios.get("http://localhost:3001/comment");
        return thunkAPI.fulfillWithValue(data.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );  

// 수정 삭제 => 나중에하기


export const __addComment = createAsyncThunk(
  "comments/__addComment",
  async (payload, thunkAPI) => {
    try {
      //console.log(payload);
      const data = await axios.post(
        `http://3.39.72.234:8080/api/feed/${payload.id}/comment`,{comment : payload.comment},{
          headers: {
            "Content-Type": `application/json`,
            Access_Token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsp4DrgpgyIiwiZXhwIjoxNjY3MjY4MDc1LCJpYXQiOjE2NjcxODE2NzV9.vrryl31o6iGfntDHspVycmEoaphf7yAtPMl4rACbqX4",
            // RefreshToken: refreshToken, 생략 예정
            "Cache-Control": "no-cache",
          },
        }
      );
      //console.log(data.data);
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
      //console.log(payload);
      const data = await axios.delete(
        `http://3.39.72.234:8080/api/feed/comment/${payload}`,{
          headers: {
            "Content-Type": `application/json`,
            Access_Token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsp4DrgpgyIiwiZXhwIjoxNjY3MjY4MDc1LCJpYXQiOjE2NjcxODE2NzV9.vrryl31o6iGfntDHspVycmEoaphf7yAtPMl4rACbqX4",
            // RefreshToken: refreshToken, 생략 예정
            "Cache-Control": "no-cache",
          },
        }
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const PostsSlice = createSlice({
    name : "posts",
    initialState,
    extraReducers : {

      //__getPost
      [__getPost.pending]: (state) => {
            state.isLoading = true;
      },
      [__getPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
      },
      [__getPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
      },

      //__addPost
      [__addPost.pending]: (state) => {
            state.isLoading = true; 
      },
      [__addPost.fulfilled]: (state, action) => {
            state.isLoading = false; 
            state.posts = action.payload; 
      },
      [__addPost.rejected]: (state, action) => {
            state.isLoading = false; 
            state.error = action.payload; 
      },

      //__deletePost
      [__deletePost.pending]: (state) => {
        state.isLoading = true;
      },
      [__deletePost.fulfilled]: (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      },
      [__deletePost.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },

      //__editPost
      [__editPost.pending]: (state) => {
        state.isLoading = true;
      },
      [__editPost.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.melon = action.payload; 
      },
      [__editPost.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },

      //__addComment
      [__addComment.pending]: (state) => {
        state.isLoading = true;
      },
      [__addComment.fulfilled]: (state, action) => {
          state.isLoading = false;
          state.posts.comments.push(action.payload);
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
          state.posts.comments = state.posts.comments.filter(
            (comment) => comment.commentid!== action.payload);
      },
      [__deleteComment.rejected]: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
      },

      }

})

export const {} = PostsSlice.actions;
export default PostsSlice.reducer;