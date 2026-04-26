import EmployeesPage from "../employee/employeePage";
import StudentsPage from "../student/StudentPage";
import SubjectPage from "../subjects/SubjectPage";
import CurriculumPage from "../curriculum/CurriculumPage";  


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
        path: '/curriculum',
        element: <CurriculumPage />,
        layout: true,
        protected: false
    }
]


export default routes;