import Home from "./page/Homepage"
import Login from "./page/Login"
import NotFoundPage from "./page/NotFoundPage"
import Content from "./page/Homepage/container"
import Topic from "./page/Topic"
import Exercise from "./page/Exercise"
import DeleteContentTopic from "./page/dasboard/deleteContentTopic"

import SingleTopic from "./page/SingleTopic/SingleTopic"

import SingleExercise from "./page/SingleExercise"
const router = [
    {
        path: "/",
        main: () => <Home />
    }
    , {
        path: "/login",
        main: () => {
            if (Boolean(localStorage.getItem("online"))) {
                return window.location.href = '/'
            } else {
                return <Login />
            }
        }
    }, {
        path: "/content",
        main: () => <Content />
    }, {
        path: "/Topic/:id",
        main: () => <Topic.TopicParam />
    },
    {
        path: "/exercise",
        main: () => <Exercise pathName="exercise" />
    },
    {
        path: "/deletecontenttopic",
        main: () => <DeleteContentTopic />
    },
    {
        path: "/Topic",
        main: () => <Topic.Topic />
    }, {
        path: '*',
        main: () => <NotFoundPage />,
    },
    {
        path: '/singletopic',
        main: () => <SingleTopic />
    },

    {
        path: '/singleExercise',
        main: () => <SingleExercise />
    }
]
export default router