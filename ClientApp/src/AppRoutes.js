import { Counter } from "./components/Counter";
import CriaArt from "./components/FetchCriacaoArt";
import { FetchData } from "./components/FetchData";
import Login from "./components/FetchLogin";
import Registro from "./components/FetchResgistro";
import { Home } from "./components/Home";

const AppRoutes = [
    {
        index: true,
        element: <Login />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/fetch-login',
        element: <Login />
    },
    {
        path: '/fetch-registro',
        element: <Registro />
    },
    {
        path: '/fetch-cria-art',
        element: < CriaArt />
    },
];

export default AppRoutes;
