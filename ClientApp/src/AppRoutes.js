import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Login from "./components/FetchLogin";
import RegistrationForm from "./components/FetchResgistro";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
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
    element: <RegistrationForm />
}
];

export default AppRoutes;
