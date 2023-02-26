import {
  adminSearchReducuer,
  userLoginReducuer,
  userRegisterReducuer,
  userUpdateReducuer,
} from './reducers/userReducers'
import {
  certListReducuer,
  certCreateReducuer,
  certUpdateReducuer,
  certDeleteReducuer,
} from './reducers/certsReducers'
import { configureStore } from '@reduxjs/toolkit'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

export default configureStore({
  reducer: {
    userLogin: userLoginReducuer,
    userRegister: userRegisterReducuer,
    userUpdate: userUpdateReducuer,
    certList: certListReducuer,
    certCreate: certCreateReducuer,
    certUpdate: certUpdateReducuer,
    certDelete: certDeleteReducuer,
    adminSearchReducuer: adminSearchReducuer,
  },
  preloadedState: initialState,
})
