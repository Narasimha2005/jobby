import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const jobStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class JobItemDetails extends Component {
  state = {
    jobStatus: jobStatusConstants.loading,
    jobData: '',
  }

  componentDidMount() {
    this.getJob()
  }

  getJob = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    this.setState({jobStatus: jobStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteurl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          title: data.job_details.title,
          skills: data.job_details.skills,
          lifeAtCompany: data.job_details.life_at_company,
        },
        similarJobs: data.similar_jobs,
      }
      this.setState({
        jobStatus: jobStatusConstants.success,
        jobData: updatedData,
      })
    } else {
      this.setState({jobStatus: jobStatusConstants.failure})
    }
  }

  renderJob = () => {
    const {jobData} = this.state
    const {jobDetails, similarJobs} = jobData
    const {
      companyLogoUrl,
      companyWebsiteurl,
      lifeAtCompany,
      employmentType,
      skills,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    const {imageUrl, description} = {
      imageUrl: lifeAtCompany.image_url,
      description: lifeAtCompany.description,
    }

    return (
      <>
        <div className="job-card">
          <div className="job-header">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="job-card-content">
              <h1 className="job-card-title">{title}</h1>
              <div className="job-card-rating-container">
                <FaStar className="star" />
                <p className="job-card-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-card-second-container">
            <div className="job-card-row-container">
              <div className="job-card-row-container">
                <MdLocationOn className="job-card-icon" />
                <p className="job-card-icon-label">{location}</p>
              </div>
              <div className="job-card-row-container">
                <BsBriefcaseFill className="job-card-icon" />
                <p className="job-card-icon-label">{employmentType}</p>
              </div>
            </div>
            <p className="job-card-package">{packagePerAnnum}</p>
          </div>
          <hr className="job-card-horizontal-line" />
          <div className="job-card-description-container">
            <h1 className="job-card-heading">Description</h1>
            <a href={companyWebsiteurl} className="company-website-url">
              <p className="company-website-url-content">Visit</p>
              <BsBoxArrowUpRight />
            </a>
          </div>
          <p className="job-card-description">{jobDescription}</p>
          <h1 className="job-item-sub-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(eachSkill => {
              const updatedDetails = {
                name: eachSkill.name,
                skillImageUrl: eachSkill.image_url,
              }
              const {name, skillImageUrl} = updatedDetails
              return (
                <li className="skill-container" key={eachSkill.name}>
                  <img src={skillImageUrl} alt={name} className="skill-image" />
                  <p className="skill-name">{name}</p>
                </li>
              )
            })}
          </ul>
          <div className="life-at-company-container">
            <div className="life-at-company-content">
              <h1 className="job-item-sub-heading">Life at Company</h1>
              <p className="job-card-description">{description}</p>
            </div>
            <img
              src={imageUrl}
              className="life-at-company-image"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="job-card-title">Similar Jobs</h1>
        <ul className="skills-container">
          {similarJobs.map(eachJob => {
            const updatedData = {
              companyLogoUrl: eachJob.company_logo_url,
              companyWebsiteurl: eachJob.company_website_url,
              employmentType: eachJob.employment_type,
              id: eachJob.id,
              jobDescription: eachJob.job_description,
              location: eachJob.location,
              packagePerAnnum: eachJob.package_per_annum,
              rating: eachJob.rating,
              title: eachJob.title,
              skills: eachJob.skills,
              lifeAtCompany: eachJob.life_at_company,
            }
            return <SimilarJobs details={updatedData} key={eachJob.id} />
          })}
        </ul>
      </>
    )
  }

  render() {
    const {jobStatus} = this.state
    return (
      <>
        <Header />
        <div className="job-items-page">
          {jobStatus === jobStatusConstants.loading && (
            <div className="job-item-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          )}
          {jobStatus === jobStatusConstants.success && this.renderJob()}
          {jobStatus === jobStatusConstants.failure && (
            <div className="jobs-failure-container">
              <img
                className="jobs-failure-image"
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
              />
              <h1 className="jobs-failure-heading">
                Oops! Something Went Wrong
              </h1>
              <p className="jobs-failure-paragraph">
                We cannot seem to find the page you are looking for.
              </p>
              <button
                type="button"
                onClick={this.getJob}
                className="retry-button"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </>
    )
  }
}
export default JobItemDetails
