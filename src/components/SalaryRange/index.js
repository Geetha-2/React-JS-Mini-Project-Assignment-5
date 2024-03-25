import './index.css'

const SalaryRange = props => {
  const {eachSalaryRangesList, onChangeSalaryRange} = props
  const {label, salaryRangeId} = eachSalaryRangesList

  const onClickSalary = () => onChangeSalaryRange(salaryRangeId)

  return (
    <div className="salary-list-cont">
      <input
        type="radio"
        id={label}
        className="radio"
        name="salary"
        onChange={onClickSalary}
      />
      <label htmlFor={label} className="label">
        {label}
      </label>
    </div>
  )
}

export default SalaryRange
