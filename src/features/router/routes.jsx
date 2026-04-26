import StudentsPage from "../student/StudentPage";
import CyclesPage from "../cycles/CyclesPage";


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
        path: '/cycles',
        element: <CyclesPage />,
        layout: true,
        protected: false
    }
]


export default routes;
