import Home from "./page/Homepage"
import Login from "./page/Login"
import NotFoundPage from "./page/NotFoundPage"
import Content from "./page/Homepage/container"
import Topic from "./page/Topic"
<<<<<<< HEAD

=======
import Exercise from "./page/Exercise"
import AddTopic from "./page/dasboard/addTopic"
import AddContentTopic from "./page/dasboard/addContentTopic"
import DeleteContentTopic from "./page/dasboard/deleteContentTopic"
>>>>>>> mainmathnew

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
<<<<<<< HEAD
=======
        path: "/exercise",
        main: () => <Exercise pathName="exercise" />
    },
    {
        path: "/addcontenttopic",
        main: () => <AddContentTopic />
    },
    {
        path: "/deletecontenttopic",
        main: () => <DeleteContentTopic />
    },
    {
        path: "/addtopic",
        main: () => <AddTopic />
    },
    {
>>>>>>> mainmathnew
        path: "/Topic",
        main: () => <Topic.Topic />
    }, {
        path: '*',
        main: () => <NotFoundPage />,
    }
]
export default router