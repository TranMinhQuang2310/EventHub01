import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    id : string,
    email : string,
    accesstoken : string
}

const initialState : AuthState = {
    id : '',
    email : '',
    accesstoken : ''
}

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        authData : initialState
    },
    reducers : {
        //Hàm thêm User
        addAuth : (state,action) => {
            //Khi gọi tới hàm => thay đổi trạng thái state
            state.authData = action.payload
        },
        //Hàm xoá User
        removeAuth : (state,action) => {
            state.authData = initialState
        }
    }
})

export const authReducer = authSlice.reducer
export const {addAuth,removeAuth} = authSlice.actions

export const authSelector = (state : any) => state.authReducer.authData