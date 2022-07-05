import { ExitToApp, GraphicEqRounded, Home, Logout, Person, PlaylistAddCheck, School } from '@mui/icons-material'

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
        icon: () => <PlaylistAddCheck fontSize="small" />,
        label: "Cargar votos"
    }, 
    {
        to: "/donde-voto",
        key: "donde-voto",
        icon: () => <School fontSize="small" />,
        label: "Donde voto"
    },
    {
        to: "/grafico-seguimiento",
        key: "grafico-seguimiento",
        icon: () => <GraphicEqRounded fontSize="small" />,
        label: "Seguimiento"
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