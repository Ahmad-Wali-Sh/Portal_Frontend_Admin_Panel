/**
 * overviewApi.js
 * API calls for the overview feature
 */
import api from '../../../utils/api'

/**
 * Get aggregated overview data (all classes with subjects and activation status)
 */
export const getOverview = async () => {
  const response = await api.get('/api/overview')
  return response.data
}

/**
 * Activate a subject
 * @param {number} id - subjectActivate ID
 */
export const activateSubject = async (id) => {
  const response = await api.patch(`/api/subject-activations/${id}/activate`)
  return response.data
}

/**
 * Deactivate a subject
 * @param {number} id - subjectActivate ID
 */
export const deactivateSubject = async (id) => {
  const response = await api.patch(`/api/subject-activations/${id}/deactivate`)
  return response.data
}

/**
 * Mark a subject as finished
 * @param {number} id - subjectActivate ID
 */
export const finishSubject = async (id) => {
  const response = await api.patch(`/api/subject-activations/${id}/finish`)
  return response.data
}
