import {Link, withRouter} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="job-card">
      <div>
        <div className="job-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="job-card-heading">Description</h1>
        <p className="job-card-description">{jobDescription}</p>
      </div>
    </Link>
  )
}
export default withRouter(JobItem)
