

import { Routes, Route } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";

import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
// import DashboardPage from "../pages/dashboard/DashboardPage";
import JobsPage from "../pages/jobs/JobsPage";
import CategoriesSection from "../components/homes/CategoriesSection";
import CreateJobPage from "../pages/employer/CreateJobPage";
import EmployerJobsPage from "../pages/employer/EmployerJobsPage";
import CandidateDashboardPage from "../pages/candidate/CandidateDashboardPage";
import EmployerDashboardPage from "../pages/employer/EmployerDashboardPage";
import CreateCompanyPage from "../pages/employer/CreateCompanyPage";
import MyCompaniesPage from "../pages/employer/MyCompaniesPage";
import MyApplicationsPage from "../pages/candidate/MyApplicationsPage";
import JobApplicantsPage from "../pages/employer/JobApplicantsPage";
import ApplyJobPage from "../pages/jobs/ApplyJobPage";
// import CandidateApplicationsPage from "../pages/candidate/CandidateApplicationsPage";
import JobDetailsPage from "../pages/jobs/JobDetailsPage";
import CandidateProfilePage from "../pages/candidate/CandidateProfilePage";
import EditJobPage from "../pages/employer/EditJobPage";
import EmployerProfilePage from "../pages/employer/EmployerProfilePage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminUserDetailsPage from "../pages/admin/AdminUserDetailsPage";
import CompanyProfilePage from "../pages/company/CompanyProfilePage";
import EditCompanyPage from "../pages/employer/EditCompanyPage";
// import CategoryManagementPage from "../pages/admin/CategoryManagementPage";
import CategoryManagementPage from "../pages/admin/CategoryManagementPage";
import SkillManagementPage from "../pages/admin/SkillManagementPage";
import EducationPage from "../pages/candidate/EducationPage";
import ExperiencePage from "../pages/candidate/ExperiencePage";
import ProjectPage from "../pages/candidate/ProjectPage";
import CertificationPage from "../pages/candidate/CertificationPage";
import LanguagePage from "../pages/candidate/LanguagePage";
import ResumePage from "../pages/resume/ResumePage";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyResetOTP from "../pages/auth/VerifyResetOTP";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import SavedJobsPage from "../pages/candidate/SavedJobsPage";
import RecentlyViewedJobsPage from "../pages/candidate/RecentlyViewedJobsPage";
import EmployerResumeViewerPage from "../pages/employer/EmployerResumeViewerPage";
import ResumeViewerPage from "../pages/employer/ResumeViewerPage";
import EmployerCandidateProfilePage from "../pages/employer/EmployerCandidateProfilePage";
// import settings


function AppRoutes() {
  return (
    // <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}

        <Route path="/jobs" element={<JobsPage />} />

        <Route path="/categories" element={<CategoriesSection />} />

        <Route path="/employer/create-job" element={<CreateJobPage />} />

        <Route path="/employer/jobs" element={<EmployerJobsPage />} />

        <Route path="/candidate/dashboard" element={<CandidateDashboardPage />} />

        <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />

        <Route path="/employer/create-company" element={<CreateCompanyPage />} />

        {/* <Route path="/employer/companies" element={<MyCompaniesPage />} />   */}

        <Route path="/employer/company" element={<MyCompaniesPage />} />

        <Route path="/applications" element={<MyApplicationsPage />} />

        <Route path="/employer/job/:jobId/applicants" element={<JobApplicantsPage />} />

        <Route path="/apply/:jobId" element={<ApplyJobPage />} />

        {/* <Route path="/applications" element={<CandidateApplicationsPage />} /> */}

        <Route path="/jobs/:id" element={<JobDetailsPage />} />

        <Route path="/candidate/profile" element={<CandidateProfilePage />} />

        <Route path="/employer/jobs/:id/edit" element={<EditJobPage />} />

        <Route path="/employer/profile" element={<EmployerProfilePage /> } />

        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

        <Route path="/admin/users" element={<AdminUsersPage />} />

        <Route path="/admin/users/:id" element={<AdminUserDetailsPage />} />

        <Route path="/company/:id" element={<CompanyProfilePage />} />

        {/* <Route path="/employer/company/edit" element={<EditCompanyPage />} /> */}
        <Route path="/employer/company/edit/:id" element={<EditCompanyPage />} />

        <Route path="/admin/categories" element={<CategoryManagementPage />} />

        <Route path="/admin/skills" element={<SkillManagementPage />} />

        {/* <Route path="/settings" element={</>} /> */}

        <Route path="/candidate/education" element={<EducationPage />} />

        <Route path="/candidate/experience" element={<ExperiencePage />} />

        <Route path="/candidate/projects" element={<ProjectPage />} />

        <Route path="/candidate/certifications" element={<CertificationPage />} />

        <Route path="/candidate/languages" element={<LanguagePage />} />

        <Route path="/resume" element={<ResumePage />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />
        
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/saved-jobs" element={<SavedJobsPage />} />

        <Route path="/recent-jobs" element={<RecentlyViewedJobsPage />} />

        <Route path="/employer/resume/:userId" element={<EmployerResumeViewerPage />} />

        <Route path="/employer/resume" element={<ResumeViewerPage />} />

        <Route path="/employer/candidate/:candidateId" element={<EmployerCandidateProfilePage />} />

      </Routes>
    // </BrowserRouter>
  );
}

export default AppRoutes;

