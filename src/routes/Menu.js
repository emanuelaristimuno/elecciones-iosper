import { ExitToApp, GraphicEqRounded, Home, Logout, Person, PlaylistAddCheck, Poll, School } from '@mui/icons-material'

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
        label: "Cargar votos",
        logged: true,
    }, 
    {
        to: "/donde-voto",
        key: "donde-voto",
        icon: () => <School fontSize="small" />,
        label: "Donde voto"
    },
    {
        to: "/resultados",
        key: "resultados",
        icon: () => <Poll fontSize="small" />,
        label: "Resultados"
    }
]

export const BottomMenuList = [
    {
        to: "/signin",
        key: "login",
        icon: () => <ExitToApp/>,
        label: "Iniciar"
    },
    {
        to: "/signout",
        key: "Salir",
        icon: () => <ExitToApp/>,
        label: "Salir",
        logged: true,
    }
]

export const TopMenuList = [
    // {
    //     to: "/perfil",
    //     key: "Perfil",
    //     icon: () => <Person fontSize="small" />,
    //     label: "Perfil"
    // },
    // {
    //     to: "/signout",
    //     key: "Salir",
    //     icon: () => <Logout fontSize="small" />,
    //     label: "Salir"
    // }
]