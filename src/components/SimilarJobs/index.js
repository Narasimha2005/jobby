import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  return (
    <div className="similar-job-card">
      <div className="job-header">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="job-card-content">
          <h1 className="similar-job-card-title">{title}</h1>
          <div className="job-card-rating-container">
            <FaStar className="star" />
            <p className="job-card-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-card-heading">Description</h1>
      <p className="job-card-description">{jobDescription}</p>
      <div className="similar-job-card-second-container">
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
    </div>
  )
}
export default SimilarJobs
