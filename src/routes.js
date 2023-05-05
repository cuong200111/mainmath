import Home from "./page/Homepage"
import Login from "./page/Login"
import NotFoundPage from "./page/NotFoundPage"
import Content from "./page/Homepage/container"
import Topic from "./page/Topic"
import Exercise from "./page/Exercise"
import AddTopic from "./page/dasboard/addTopic"
import AddContentTopic from "./page/dasboard/addContentTopic"


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
        path: "/exercise",
        main: () => <Exercise />
    },
    {
        path: "/addcontenttopic",
        main: () => <AddContentTopic />
    },
    {
        path: "/addtopic",
        main: () => <AddTopic />
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