import ClassesPage from "../classes/ClassesPage";
import StudentsPage from "../student/StudentPage";


const routes = [
    {
        path: '/',
        element: <h1>Hello</h1>,
        layout: true,
        protected: false
    },
    {
        path: '/students',
        element: <StudentsPage />,
        layout: true,
        protected: false
    },
    {
        path: '/classes',
        element: <ClassesPage />,
        layout: true,
        protected: false
    }
]


export default routes;