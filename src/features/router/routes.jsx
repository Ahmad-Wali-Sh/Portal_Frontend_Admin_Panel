import ClassesPage from "../classes/ClassesPage";
import EmployeesPage from "../employee/EmployeePage";
import ProfilePage from "../profile/ProfilePage";
import StudentsPage from "../student/StudentPage";
import SubjectPage from "../subjects/SubjectPage";
import CertificatePage from "../certificates/page/CertificatePage";
import CurriculumPage from "../curriculum/CurriculumPage";  
import ResourcePage from "../resources/ResourcePage"
import CyclePage from "../cycles/CyclePage"


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
    }, {
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
    },{
        path: '/certificates',
        element: <CertificatePage />,
        layout: true,
        protected: false
    },
    {
        path: '/curriculum',
        element: <CurriculumPage />,
        layout: true,
        protected: false
    },
    {
        path: '/resources',
        element: <ResourcePage />,
        layout: true,
        protected: false
    },
    {
        path: '/cycles',
        element: <CyclePage />,
        layout: true,
        protected: false
    }
]


export default routes;