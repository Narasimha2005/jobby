import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileCard from '../ProfileCard'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const jobsStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class Jobs extends Component {
  state = {
    typeFilters: [],
    rangeFilter: '',
    searchQuery: '',
    jobsStatus: jobsStatusConstants.loading,
    jobsData: [],
    jobsCount: 0,
  }

  componentDidMount() {
    this.getJobs()
  }

  onChangeEmploymentType = event => {
    const {typeFilters} = this.state
    if (event.target.checked === true) {
      this.setState(
        prevState => ({
          typeFilters: [...prevState.typeFilters, event.target.id],
        }),
        this.getJobs,
      )
    } else {
      const newTypeFilters = typeFilters.filter(eachType => {
        if (eachType === event.target.id) {
          return false
        }
        return true
      })
      this.setState(
        {
          typeFilters: newTypeFilters,
        },
        this.getJobs,
      )
    }
  }

  onChangeRadio = event => {
    this.setState({rangeFilter: event.target.id}, this.getJobs)
  }

  onChaneSearchQuery = event => {
    this.setState({searchQuery: event.target.value})
  }

  getJobs = async () => {
    const {typeFilters, rangeFilter, searchQuery} = this.state
    const typeFiltersString = typeFilters.join(',')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${typeFiltersString}&minimum_package=${rangeFilter}&search=${searchQuery}`
    this.setState({jobsStatus: jobsStatusConstants.loading})
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
      this.setState({
        jobsStatus: jobsStatusConstants.success,
        jobsData: data.jobs,
        jobsCount: data.total,
      })
    } else {
      this.setState({jobsStatus: jobsStatusConstants.failure})
    }
  }

  onRetryGetJobs = () => {
    this.getJobs()
  }

  renderJobfailureView = () => (
    <div className="jobs-failure-container">
      <img
        className="jobs-failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-paragraph">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.onRetryGetJobs}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-contianer">
      <img
        alt="no jobs"
        className="no-jobs-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-paragraph">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobs = () => {
    const {jobsStatus, jobsData, jobsCount} = this.state

    switch (jobsStatus) {
      case jobsStatusConstants.success:
        if (jobsCount > 0) {
          return (
            <ul className="filters-list-container">
              {jobsData.map(eachJob => {
                const details = {
                  companyLogoUrl: eachJob.company_logo_url,
                  employmentType: eachJob.employment_type,
                  id: eachJob.id,
                  jobDescription: eachJob.job_description,
                  location: eachJob.location,
                  packagePerAnnum: eachJob.package_per_annum,
                  rating: eachJob.rating,
                  title: eachJob.title,
                }
                return <JobItem details={details} key={details.id} />
              })}
            </ul>
          )
        }
        return this.renderNoJobsView()
      case jobsStatusConstants.loading:
        return (
          <div className="jobs-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case jobsStatusConstants.failure:
        return this.renderJobfailureView()
      default:
        return null
    }
  }

  render() {
    const {searchQuery} = this.state
    return (
      <>
        <Header />
        <div className="jobs-page">
          <div className="jobs-filters-part">
            <div className="search-box-small">
              <input
                type="search"
                className="search-bar"
                placeholder="Search"
                value={searchQuery}
                onChange={this.onChaneSearchQuery}
              />
              <button
                type="button"
                className="search-button"
                data-testid="searchButton"
                onClick={this.getJobs}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ProfileCard />
            <hr className="jobs-horizontal-line" />
            <h1 className="filter-heading">Type of Employment</h1>
            <ul className="filters-list-container">
              {employmentTypesList.map(eachType => (
                <li className="filter-item" key={eachType.employmentTypeId}>
                  <input
                    type="checkbox"
                    id={eachType.employmentTypeId}
                    onChange={this.onChangeEmploymentType}
                    className="filter-input"
                  />
                  <label
                    htmlFor={eachType.employmentTypeId}
                    className="filter-label"
                  >
                    {eachType.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="jobs-horizontal-line" />
            <h1 className="filter-heading">Salary Range</h1>
            <ul className="filters-list-container">
              {salaryRangesList.map(eachType => (
                <li className="filter-item" key={eachType.salaryRangeId}>
                  <input
                    type="radio"
                    id={eachType.salaryRangeId}
                    onChange={this.onChangeRadio}
                    name="salaryRange"
                    className="filter-input"
                  />
                  <label
                    htmlFor={eachType.salaryRangeId}
                    className="filter-label"
                  >
                    {eachType.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobs-part">
            <div className="search-box-large">
              <input
                type="search"
                className="search-bar"
                placeholder="Search"
                value={searchQuery}
                onChange={this.onChaneSearchQuery}
                data-testid="searchButton"
              />
              <button
                type="button"
                className="search-button"
                onClick={this.getJobs}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
