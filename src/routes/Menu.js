import { ExitToApp, Home, Logout, Person } from '@mui/icons-material'
import ListasPorMesa from '../components/Eleccion/ListasPorMesa'

export const SideMenuList = [
    {
        to: "/",
        key: "Inicio",
        icon: () => <Home/>,
        label: "Inicio"
    } ,
    {
        to: "/buscar-listas-por-mesa",
        key: "buscar",
        icon: () => <ListasPorMesa fontSize="small" />,
        label: "Salir"
    }
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