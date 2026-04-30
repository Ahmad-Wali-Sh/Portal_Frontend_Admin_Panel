import ClassesPage from "../classes/ClassesPage";
import EmployeesPage from "../employee/EmployeePage";
import ProfilePage from "../profile/ProfilePage";
import StudentsPage from "../student/StudentPage";
import SubjectPage from "../subjects/SubjectPage";
import CertificatePage from "../certificates/page/CertificatePage";
import CurriculumPage from "../curriculum/CurriculumPage";
import CurriculumDetailsPage from "../curriculum/CurriculumDetailsPage";
import ResourcePage from "../resources/ResourcePage"
import AuditLogPage from "../audit_log/AuditLogPage";
import CyclePage from "../cycles/CyclePage"
import DashboardPage from "../dashboard/DashboardPage"
import {
    TeachersDashboardPage,
    StudentsDashboardPage,
    CoursesDashboardPage,
    OverallDashboardPage,
    TeacherAttendancePage,
    StudentDroppedPage,
    StudentDowngradeScoresPage,
    TopStudentsPage,
    StudentOverallAbsentPage,
    CourseNewStudentsPage,
    CourseOverallStudentsPage,
    CourseOverallAbsentPage,
    OverallStudentsPage,
    OverallTeachersPage,
    OverallCoursesPage,
} from "../dashboard/DashboardPages"
import AnnouncementsPage from "../announcements/AnnouncementsPage";
import OverviewPage from "../overview/pages/OverviewPage";


const routes = [
    {
        path: '/',
        element: <DashboardPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard',
        element: <DashboardPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/teachers',
        element: <TeachersDashboardPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/teachers/attendance',
        element: <TeacherAttendancePage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/students',
        element: <StudentsDashboardPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/students/dropped',
        element: <StudentDroppedPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/students/downgrade-scores',
        element: <StudentDowngradeScoresPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/students/top-students',
        element: <TopStudentsPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/students/overall-absent',
        element: <StudentOverallAbsentPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/courses',
        element: <CoursesDashboardPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/courses/new-students',
        element: <CourseNewStudentsPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/courses/overall-students',
        element: <CourseOverallStudentsPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/courses/overall-absent',
        element: <CourseOverallAbsentPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/overall',
        element: <OverallDashboardPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/overall/students',
        element: <OverallStudentsPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/overall/teachers',
        element: <OverallTeachersPage />,
        layout: true,
        protected: false
    },
    {
        path: '/dashboard/overall/courses',
        element: <OverallCoursesPage />,
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
        path: '/curriculum/:id/details',
        element: <CurriculumDetailsPage />,
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
        path: 'audit',
        element: <AuditLogPage />,
        layout: true,
        protected: false
    },
    {
        path: '/cycles',
        element: <CyclePage />,
        layout: true,
        protected: false
    },
    {
        path: '/announcements',
        element: <AnnouncementsPage />,
        layout: true,
        protected: false  
    },
    {
        path: '/overview',
        element: <OverviewPage />,
        layout: true,
        protected: false
    }
]


export default routes;
