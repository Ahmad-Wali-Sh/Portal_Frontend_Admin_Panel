import EmployeesPage from "../employee/EmployeePage";
import StudentsPage from "../student/StudentPage";
import SubjectPage from "../subjects/SubjectPage";
import ResourcePage from "../resources/ResourcePage";


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
        path:'/employees',
        element: <EmployeesPage/>,
        layout:true,
        protected:false
    },
    {
        path: '/subjects',
        element: <SubjectPage />,
        layout: true,
        protected: false
    },
    {
        path: '/resources',
        element: <ResourcePage />,
        layout: true,
        protected: false
    }
]


export default routes;