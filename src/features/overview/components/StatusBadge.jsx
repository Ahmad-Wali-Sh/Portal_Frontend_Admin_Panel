/**
 * StatusBadge.jsx
 * Colored badge for displaying subject activation status
 */
const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'ACTIVE':
        return { color: 'bg-green-100 text-green-800', label: 'Active' }
      case 'INACTIVE':
        return { color: 'bg-gray-100 text-gray-800', label: 'Inactive' }
      case 'FINISHED':
        return { color: 'bg-blue-100 text-blue-800', label: 'Finished' }
      default:
        return { color: 'bg-gray-100 text-gray-800', label: 'Unknown' }
    }
  }

  const { color, label } = getStatusConfig(status)

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}

export default StatusBadge
