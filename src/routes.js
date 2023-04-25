import Home from "./page/Homepage"
import Login from "./page/Login"
import NotFoundPage from "./page/NotFoundPage"
import Content from "./page/Homepage/container"
import Topic from "./page/Topic"


const router = [
    {
        path: "/",
        main: () => <Home />
    }
    , {
        path: "/login",
        main: () => <Login />
    }, {
        path: "/content",
        main: () => <Content />
    }, {
        path: "/Topic/:id",
        main: () => <Topic.TopicParam />
    },
    {
        path: "/Topic",
        main: () => <Topic.Topic />
    }, {
        path: '*',
        main: () => <NotFoundPage />,
    }
]
export default router