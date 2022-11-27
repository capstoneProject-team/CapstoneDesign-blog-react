import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit"
import musicReducer from "./reducers/musicReducer"

const store=configureStore({
  reducer:{

  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
})

export default store;