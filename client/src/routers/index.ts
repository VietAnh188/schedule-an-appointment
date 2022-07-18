import Home from "../pages/Home";
import Help from "../pages/Help";
import Property from "../pages/Property";
import Register from "../pages/Register";
import Login from "../pages/Login";
import SearchResult from "../pages/SearchResult";
import PropertySearch from "../pages/PropertySearch";

export const publicRouters = [
    {path: '/', component: Home},
    {path: '/help', component: Help},
    {path: '/property', component: Property},
    {path: '/register', component: Register},
    {path: '/login', component: Login},
    {path: '/search_result', component: SearchResult},
    {path: '/property_search', component: PropertySearch}
]

export const privateRouters = []