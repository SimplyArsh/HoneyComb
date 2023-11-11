import { useAuthContext } from "./use-auth-context"

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => { // All we need to do to logout is remove the token from local storage and update auth context to null user
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}