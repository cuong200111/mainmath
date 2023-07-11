
import AddTopic from "./page/dasboard/addTopic"
import AddContentTopic from "./page/dasboard/addContentTopic"
import DeleteContentTopic from "./page/dasboard/deleteContentTopic"
import RegisterPrivate from "./page/dasboard/regiterPrivate"
import AddTopicSingle from "./page/dasboard/AddTopicSingle"
import AddContentTopicSingle from "./page/dasboard/addContentTopicSingle"
import NotFoundPage from "./page/NotFoundPage"
import DeleteSingleTopic from "./page/dasboard/deleteSingleTopic"
const routesAdmin = [
    {
        path: "/addcontenttopic",
        main: () => <AddContentTopic />
    },
    {
        path: "/",
        main: () => <RegisterPrivate />
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
        path: "/registerprivate",
        main: () => <RegisterPrivate />
    }, {
        path: '*',
        main: () => <NotFoundPage />,
    },
    {
        path: '/addTopicSingle',
        main: () => <AddTopicSingle />
    },
    {
        path: `addContentTopicSingle`,
        main: () => <AddContentTopicSingle />
    }, {
        path: "/registerprivate",
        main: () => <RegisterPrivate />
    },
    {
        path: "/deletesingletopic",
        main: () => <DeleteSingleTopic />
        
    }
    
]
export default routesAdmin