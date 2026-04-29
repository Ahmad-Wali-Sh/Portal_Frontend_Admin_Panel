import { auditLogConfig } from '../shared/components/MasterComponent/masterConfigs.jsx'
import MasterComponent from '../shared/components/MasterComponent/MasterComponent.jsx'
import { useThemeStore } from '../shared/store/useThemeStore.js'

export default function AuditLogPage() {
  const isDark = useThemeStore(s => s.isDark)
  return (
    <MasterComponent
      config={auditLogConfig}
      isDark={isDark}
      title="Audit Log"
      subtitle="Immutable, read‑only trail of all system changes"
    />
  )
}
