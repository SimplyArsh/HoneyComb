import { useAuthContext } from "./use-auth-context"
import { useUserContext } from "./use-user-context"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: userDispatch } = useUserContext() // also a dispatch function but named differently to avoid namespace collision

    const logout = () => { // All we need to do to logout is remove the token from local storage and update auth context to null user
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
        userDispatch({ type: 'SET_USER', payload: null })
    }

    return { logout }
}