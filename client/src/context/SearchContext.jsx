import { createContext, useReducer } from "react"

const INITIAL_STATE = {
  city: null,
  dates: [],
  options: {
    adult: null,
    children: null,
    room: null
  }
}

export const SearchContext = createContext(INITIAL_STATE)


const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload
    case "RESET_SEARCH":
      return INITIAL_STATE
    default:
      return state
  }
}

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)
  const { city, dates, options } = state
  const value = {
    dispatch,
    city,
    dates,
    options,
  }
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}