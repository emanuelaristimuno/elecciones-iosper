import { ExitToApp, Home, Logout, Person } from '@mui/icons-material'

export const SideMenuList = [
    {
        to: "/",
        key: "Inicio",
        icon: () => <Home/>,
        label: "Inicio"
    },
]

export const BottomMenuList = [
    {
        to: "/signout",
        key: "Salir",
        icon: () => <ExitToApp/>,
        label: "Salir"
    }
]

export const TopMenuList = [
    {
        to: "/perfil",
        key: "Perfil",
        icon: () => <Person fontSize="small" />,
        label: "Perfil"
    },
    {
        to: "/signout",
        key: "Salir",
        icon: () => <Logout fontSize="small" />,
        label: "Salir"
    }
]