import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { MarketingComponent } from './marketing/marketing.component';
import { TechnicalComponent } from './technical/technical.component';
import { LoginComponent } from './login/login.component';
import { CreateviewComponent } from './createview/createview.component';
import { OrcreateComponent } from './orcreate/orcreate.component';
import { JobformComponent } from './jobform/jobform.component';
import { OrviewComponent } from './orview/orview.component';
import { ResumeComponent } from './resume/resume.component';
import { CandiviewComponent } from './candiview/candiview.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SelectProfileComponent } from './select-profile/select-profile.component';
import { UserComponent } from './user/user.component';
import { OrgcreateComponent } from './orgcreate/orgcreate.component';
import { UniversityComponent } from './university/university.component';
import { UniversityReadComponent } from './university-read/university-read.component';
import { CandidateComponent } from './candidate/candidate.component';
import { JobApplyComponent } from './job-apply/job-apply.component';
import { JobSearchComponent } from './job-search/job-search.component';
import { JobsAppliedComponent } from './candidate-ops/jobs-applied/jobs-applied.component';
import { ApplicantListComponent } from './organization-ops/applicant-list/applicant-list.component';
import { QuizResultsComponent } from './quiz-ops/quiz-results/quiz-results.component';
import { RoundThreeComponent } from './quiz-ops/round-three/round-three.component';
import { RecommendedJobsComponent } from './job-ops/recommended-jobs/recommended-jobs.component';
import { InstructionsPageComponent } from './quiz-ops/instructions-page/instructions-page.component';
import { FaqPageComponent } from './shared/faq-page/faq-page.component';
import { ContactPageComponent } from './shared/contact-page/contact-page.component';
import { from } from 'rxjs';
import { AboutUsComponent } from './about-us/about-us.component';
import { CanDeactivateService } from './shared/can-deactivate.service';
import { CourseListComponent } from './resources/course-list/course-list.component';
import { BlogListComponent } from './resources/blog-list/blog-list.component';
import { SchemeListComponent } from './resources/scheme-list/scheme-list.component';
import { DeactivateProfileComponent } from './candidate-ops/deactivate-profile/deactivate-profile.component';
import { EditProfileComponent } from './candidate-ops/edit-profile/edit-profile.component';
import { FlowDecideComponent } from './quiz-ops/flow-decide/flow-decide.component';
import { OrganizationSignupComponent } from './organization-ops/organization-signup/organization-signup.component';
import { JobListingsComponent } from './organization-ops/job-listings/job-listings.component';
import { UploadQaCustomquizComponent } from './organization-ops/upload-qa-customquiz/upload-qa-customquiz.component';
import { OrgPrefComponent } from './organization-ops/org-pref/org-pref.component';
import { CustomQuizComponent } from './organization-ops/custom-quiz/custom-quiz.component';


const routes: Routes = [
  {path: '', redirectTo: '/home' , pathMatch: 'full' },
  {path: 'home' , component: LandingPageComponent},
  {path: 'quiz' , component: QuizComponent, canDeactivate: [CanDeactivateService]},
  {path: 'tech' , component: TechnicalComponent, canDeactivate: [CanDeactivateService]},
  {path: 'mark' , component: MarketingComponent, canDeactivate: [CanDeactivateService]},
  {path: 'create', component: CreateviewComponent},
  {path: 'login', component: LoginComponent},
  {path: 'organ', component: OrcreateComponent},
  {path: 'candidate', component: CandidateComponent},
  {path: 'jobForm', component: JobformComponent},
  {path: 'orview', component: OrviewComponent},
  {path: 'resume', component: ResumeComponent},
  {path: 'canview', component: CandiviewComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profiles', component: SelectProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'university', component: UniversityComponent},
  {path: 'universityread', component: UniversityReadComponent},
  {path: 'jobapply', component: JobApplyComponent},
  {path: 'job-search', component: JobSearchComponent},
  {path: 'applied-jobs', component: JobsAppliedComponent},
  {path: 'applicant-list', component: ApplicantListComponent},
  {path: 'quiz-results', component: QuizResultsComponent},
  {path: 'round-three', component: RoundThreeComponent, canDeactivate: [CanDeactivateService]},
  {path: 'get-recommended-jobs', component: RecommendedJobsComponent},
  {path: 'instructions', component: InstructionsPageComponent},
  {path: 'faq-page', component: FaqPageComponent},
  {path: 'contact-page', component:ContactPageComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'course-list', component: CourseListComponent},
  {path: 'blog-list', component: BlogListComponent},
  {path: 'scheme-list', component: SchemeListComponent},
  {path: 'deactivate-profile', component: DeactivateProfileComponent},
  {path: 'edit-profile', component: EditProfileComponent},
  {path: 'select-preference', component: FlowDecideComponent},
  {path: 'organization', component: OrganizationSignupComponent},
  {path: 'job-listings', component: JobListingsComponent},
  {path: 'custom-quiz', component: UploadQaCustomquizComponent},
  {path: 'org-pref', component: OrgPrefComponent},
  {path: 'preview-custom-quiz', component: CustomQuizComponent},
  



{
    path: 'signup', component: UserComponent,
},
  {path: '', redirectTo: '/quiz' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
