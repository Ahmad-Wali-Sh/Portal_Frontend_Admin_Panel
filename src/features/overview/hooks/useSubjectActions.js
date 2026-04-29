/**
 * useSubjectActions.js
 * Custom hook for handling subject activation/deactivation/finish actions
 */
import { useState, useCallback } from 'react'
import { activateSubject, deactivateSubject, finishSubject } from '../api/overviewApi'

const useSubjectActions = (onSuccess) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAction = useCallback(async (action, subjectActivateId) => {
    if (!subjectActivateId) return

    setLoading(true)
    setError(null)

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
        default:
          throw new Error(`Unknown action: ${action}`)
      }

      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err.message || 'Action failed')
    } finally {
      setLoading(false)
    }
  }, [onSuccess])

  return {
    loading,
    error,
    activate: (id) => handleAction('activate', id),
    deactivate: (id) => handleAction('deactivate', id),
    finish: (id) => handleAction('finish', id),
    clearError: () => setError(null),
  }
}

export default useSubjectActions
