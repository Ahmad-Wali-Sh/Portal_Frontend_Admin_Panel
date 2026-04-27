import EmployeesPage from "../employee/employeePage";
import ProfilePage from "../profile/ProfilePage";
import StudentsPage from "../student/StudentPage";
import SubjectPage from "../subjects/SubjectPage";


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
        path: '/profile',
        element: <ProfilePage/>,
        layout: true,
        protected: false,
    }
]


export default routes;