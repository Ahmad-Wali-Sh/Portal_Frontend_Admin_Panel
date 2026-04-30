/**
 * SubjectActions.jsx
 * Teacher action buttons for subject activation/deactivation/finish
 */
import { useState } from 'react'
import { activateSubject, deactivateSubject, finishSubject } from '../api/overviewApi'

const SubjectActions = ({ subjectActivateId, currentStatus, onActionComplete }) => {
  const [loading, setLoading] = useState(false)

  if (!subjectActivateId) return <span className="text-gray-400 text-sm">Not activated</span>

  const handleAction = async (action) => {
    setLoading(true)
    try {
      switch (action) {
        case 'activate':
          await activateSubject(subjectActivateId)
          break
        case 'deactivate':
          await deactivateSubject(subjectActivateId)
          break
        case 'finish':
          await finishSubject(subjectActivateId)
          break
      }
      if (onActionComplete) onActionComplete()
    } catch (error) {
      console.error('Action failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      {currentStatus !== 'ACTIVE' && (
        <button
          onClick={() => handleAction('activate')}
          disabled={loading}
          className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200 disabled:opacity-50"
        >
          Activate
        </button>
      )}
      {currentStatus === 'ACTIVE' && (
        <button
          onClick={() => handleAction('deactivate')}
          disabled={loading}
          className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Deactivate
        </button>
      )}
      {currentStatus !== 'FINISHED' && (
        <button
          onClick={() => handleAction('finish')}
          disabled={loading}
          className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 disabled:opacity-50"
        >
          Finish
        </button>
      )}
    </div>
  )
}

export default SubjectActions
