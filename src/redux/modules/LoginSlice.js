import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie ,setCookie, delCookie } from "../../cookie/cookie";

const initialState = {
  account : [],
  isLoading : false,
  error : null
};
// const params = {
//   key: process.env.REACT_APP_ACCOUNT,
// };
// const SERVICE_URL = params.key

const headers = {
  'Content-Type' : 'application/json',
  'Access_Token' : getCookie('Access_Token')
}

export const __userLogin = createAsyncThunk(
  "account/userLogin",
  // login : reducer name, 경로 정해줘야
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://3.39.72.234:8080/api/account/login", payload);
      const Access_Token = data.headers.access_token;
      if (data.status === 200 || data.status === 201) {
        setCookie("Access_Token", Access_Token);
        alert("로그인 성공");
        window.location.replace("/")
      }
      return thunkAPI.fulfillWithValue(payload)
    } catch (error) {
      if (error.response.data.status === 500) {
        window.location.reload();
        alert("로그인 정보를 다시 확인해주세요")
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __userLogout = createAsyncThunk(
  "account/userLogout",
  async(payload, thunkAPI) => {
    try {
      await axios.delete("http://3.39.72.234:8080/api/account/logout", {headers : headers})
      return thunkAPI.fulfillWithValue(payload)
    }catch(error){
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const  __userSignUp = createAsyncThunk(
  "account/userSignUp",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://3.39.72.234:8080/api/account/signup", payload)
      return thunkAPI.fulfillWithValue(data.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)


export const __userProfile = createAsyncThunk(
  "account/userProfile",
  async (payload,thunkAPI) => {
    try {
      const data = await axios.get("http://3.39.72.234:8080/api/account/myinfo", {headers : headers})
      // get이지만 token 담아서 보내준다.(요청이 있어야 답이 온다.)
      setCookie("nickname", data.data.data)
      return thunkAPI.fulfillWithValue(data.data.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const LoginSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: {
    [__userLogin.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__userLogin.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.account=action.payload; // 
    },
    [__userLogin.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__userLogout.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__userLogout.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.account=action.payload; // 
    },
    [__userLogout.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__userSignUp.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__userSignUp.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.account=action.payload; //
    },
    [__userSignUp.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__userProfile.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__userProfile.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.account.push(action.payload); 
      // 데이터에 필요한 값만 배열에 넣어준다.
      
    },
    [__userProfile.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    }
  }
})

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { userLogin, userSignUp, userSignUpGet, userProfile } = LoginSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default LoginSlice.reducer;

// export const  __checkEmail = createAsyncThunk(
//   "account/checkId",
//   // type
//   async (payload, thunkAPI) => {
//     try {
//     const data = await axios.post(`${SERVICE_URL}/checkid`, {userid: payload})
//       return thunkAPI.fulfillWithValue(data.data)
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error)
//     }
//   }
// )

// export const  __checkName = createAsyncThunk(
//   "account/checkName",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.post(`${SERVICE_URL}/checkname`, {nickname: payload})
//       // 415는 타입에러. {}로 감싸서 보낸다.
//       return thunkAPI.fulfillWithValue(data.data)
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error)
//     }
//   }
// )


    // [__checkEmail.pending]: (state) => {
    //   state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    // },
    // [__checkEmail.fulfilled]: (state, action) => {
    //   state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.isSuccess = false;
    //   state.idCheck=action.payload;
    // },
    // [__checkEmail.rejected]: (state, action) => {
    //   state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.isSuccess = false;
    //   state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    // },
    // [__checkName.pending]: (state) => {
    //   state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    // },
    // [__checkName.fulfilled]: (state, action) => {
    //   state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.isSuccess = false;
    //   state.nameCheck=action.payload;
    // },
    // [__checkName.rejected]: (state, action) => {
    //   state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.isSuccess = false;
    //   state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    // },