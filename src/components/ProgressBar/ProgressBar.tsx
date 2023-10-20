import './style.scss'
interface ProgressBarProps {
  percent: number
  title: string
}
export const ProgressBar: React.FC<ProgressBarProps> = ({
  percent = 0,
  title,
}) => {
  const getColor = (percent: number) => {
    const red = Math.min(250, Math.floor(percent * 2.55))
    const green = Math.min(255, Math.floor((100 - percent) * 2.55))
    return `rgb(${red},${green},0)`
  }

  const fillStyle = {
    width: `${percent}%`,
    backgroundColor: getColor(percent),
  }

  return (
    <div className="progress-bar__container">
      <h6>{title}</h6>
      <div className="progress-bar">
        <div className="progress-fill" style={fillStyle}>
          {percent}%
        </div>
      </div>
    </div>
  )
}
