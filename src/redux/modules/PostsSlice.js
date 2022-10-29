import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    posts : []
}

//form data로 사진을 보낼 수 없어 우선 content로만 소통한다!
// export const __addPost = createAsyncThunk(
//     "posts/__addPost",
//     async (payload, thunkAPI) =>{
//         try{
//             //console.log(payload)
//             const data = await axios.post("http://localhost:3001/posts", payload)
//             //console.log("data", data.data)
//             return thunkAPI.fulfillWithValue(payload.content);
//         }catch (error) {
//             return thunkAPI.rejectWithValue(error);}
//     }

// )

//form data로 정보를 보낼 수 없어서 우선 작성했던 방식으로 작성
export const __addPost = createAsyncThunk(
    "melon/__addPost",
    async (payload, thunkAPI) => {
      try {
        await axios
          .post(`http://54.210.135.198:8080/api/feed`, payload, {
            headers: {
              enctype: "multipart/form-data",
              Access_Token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYnFqYWNobDk1QGdtYWlsLmNvbSIsImV4cCI6MTY2NzA1Mzk4MiwiaWF0IjoxNjY3MDQ3OTgyfQ.Ti9DI9pIsTlvQDpREgWtSOHK3apl7ODa26o6o8hOzyc",
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
        const data = await axios.get("http://54.210.135.198:8080/api/feed/show", 
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
        console.log(typeof(payload));
        const data = await axios.delete(
          `http://54.210.135.198:8080/api/feed/${payload}`,  {
            headers: {
              Access_Token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYnFqYWNobDk1QGdtYWlsLmNvbSIsImV4cCI6MTY2NzA1Mzk4MiwiaWF0IjoxNjY3MDQ3OTgyfQ.Ti9DI9pIsTlvQDpREgWtSOHK3apl7ODa26o6o8hOzyc",
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

// 수정 삭제 => 나중에하기


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
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      },
      [__deletePost.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      }

})

export const {} = PostsSlice.actions;
export default PostsSlice.reducer;