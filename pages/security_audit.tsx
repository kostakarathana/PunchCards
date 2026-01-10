import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface SecurityAuditData {
  // Punchcard Meta
  punchcardTitle: string
  documentationDepth: number
  // Core
  targetCode: string
  auditScope: string
  securityConcerns: string
  // Context
  appType: string
  sensitiveData: string
  existingMeasures: string
  // Preferences
  severity: number
  thoroughness: number
  complianceLevel: number
  filesToIgnore: string
  extraInfo: string
  // Advanced - Vulnerabilities
  checkInjection: boolean
  checkXss: boolean
  checkCsrf: boolean
  checkAuth: boolean
  checkCrypto: boolean
  // Advanced - Data Security
  checkDataExposure: boolean
  checkSensitiveLogging: boolean
  checkEncryption: boolean
  checkPii: boolean
  checkSecretManagement: boolean
  // Advanced - Access Control
  checkRbac: boolean
  checkPrivilegeEscalation: boolean
  checkSessionManagement: boolean
  checkApiSecurity: boolean
  checkInputValidation: boolean
  // Advanced - Infrastructure
  checkDependencies: boolean
  checkConfig: boolean
  checkHeaders: boolean
  checkCors: boolean
  checkTls: boolean
  // Advanced - Compliance
  owaspTop10: boolean
  sansTop25: boolean
  gdprCompliance: boolean
  hipaaCompliance: boolean
  pciDss: boolean
  // Advanced - Output
  reportFormat: string
  includeCwe: boolean
  includeCvss: boolean
  includeRemediation: boolean
  prioritizeBySeverity: boolean
}

const defaultFormData: SecurityAuditData = {
  punchcardTitle: '',
  documentationDepth: 3,
  targetCode: '',
  auditScope: '',
  securityConcerns: '',
  appType: '',
  sensitiveData: '',
  existingMeasures: '',
  severity: 3,
  thoroughness: 3,
  complianceLevel: 3,
  filesToIgnore: '',
  extraInfo: '',
  checkInjection: true,
  checkXss: true,
  checkCsrf: true,
  checkAuth: true,
  checkCrypto: true,
  checkDataExposure: true,
  checkSensitiveLogging: true,
  checkEncryption: true,
  checkPii: true,
  checkSecretManagement: true,
  checkRbac: true,
  checkPrivilegeEscalation: true,
  checkSessionManagement: true,
  checkApiSecurity: true,
  checkInputValidation: true,
  checkDependencies: true,
  checkConfig: true,
  checkHeaders: true,
  checkCors: true,
  checkTls: true,
  owaspTop10: true,
  sansTop25: false,
  gdprCompliance: false,
  hipaaCompliance: false,
  pciDss: false,
  reportFormat: '',
  includeCwe: true,
  includeCvss: false,
  includeRemediation: true,
  prioritizeBySeverity: true,
}

export default function SecurityAudit() {
  const router = useRouter()
  const [formData, setFormData] = useState<SecurityAuditData>(defaultFormData)
  const [xmlOutput, setXmlOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [advancedSections, setAdvancedSections] = useState({
    vulnerabilities: false,
    dataSecurity: false,
    accessControl: false,
    infrastructure: false,
    compliance: false,
    output: false,
  })

  const toggleAdvanced = (section: keyof typeof advancedSections) => {
    setAdvancedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRatingChange = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getSeverityLabel = (val: number) => {
    const labels = ['Critical only', 'Critical + High', 'Medium and above', 'Low and above', 'All including informational']
    return labels[val - 1]
  }

  const getThoroughnessLabel = (val: number) => {
    const labels = ['Quick scan - obvious issues', 'Basic review', 'Standard audit', 'Deep analysis', 'Exhaustive - pentester level']
    return labels[val - 1]
  }

  const getComplianceLabel = (val: number) => {
    const labels = ['No compliance needed', 'Basic standards', 'Industry standards', 'Strict compliance', 'Regulatory audit ready']
    return labels[val - 1]
  }

  const getDocDepthLabel = (val: number) => {
    const labels = ['Minimal - snappy dot points', 'Brief - key points only', 'Standard - balanced detail', 'Detailed - thorough coverage', 'Deep - comprehensive documentation']
    return labels[val - 1]
  }

  const sanitizeFilename = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '_')
      .replace(/-+/g, '_')
      .substring(0, 50) || 'untitled'
  }

  const generateXML = () => {
    const xml = `<task_card type="security_audit" title="${formData.punchcardTitle || 'Untitled Security Audit'}">
  <meta_instruction>
    Follow this security audit workflow:
    0. RECONNAISSANCE: Map the codebase structure, entry points, and data flows.
    1. THREAT MODEL: Identify potential threat vectors based on app type and data handled.
    2. STATIC ANALYSIS: Review code for security vulnerabilities and anti-patterns.
    3. CONFIGURATION REVIEW: Check security configurations, headers, and settings.
    4. DEPENDENCY CHECK: Audit third-party dependencies for known vulnerabilities.
    5. REPORT: Document findings with severity, CWE references, and remediation steps.
  </meta_instruction>

  <documentation_requirement>
    <instruction>After completing this task, create a markdown file documenting the work done.</instruction>
    <output_path>punchcards/${sanitizeFilename(formData.punchcardTitle)}.md</output_path>
    <detail_level level="${formData.documentationDepth}">${getDocDepthLabel(formData.documentationDepth)}</detail_level>
    <format>
      Level 1: Task title, one-line summary, files changed (bullet list)
      Level 2: Above + brief problem/solution description
      Level 3: Above + key decisions made, testing notes
      Level 4: Above + detailed reasoning, edge cases considered, related issues
      Level 5: Above + full context, alternative approaches considered, future considerations
    </format>
  </documentation_requirement>

  <audit_details>
    <target_code>${formData.targetCode}</target_code>
    <audit_scope>${formData.auditScope}</audit_scope>
    <security_concerns>${formData.securityConcerns || 'General security review'}</security_concerns>
    <application_type>${formData.appType || 'Not specified'}</application_type>
    <sensitive_data_handled>${formData.sensitiveData || 'Not specified'}</sensitive_data_handled>
    <existing_security_measures>${formData.existingMeasures || 'None documented'}</existing_security_measures>
  </audit_details>

  <preferences>
    <minimum_severity level="${formData.severity}">${getSeverityLabel(formData.severity)}</minimum_severity>
    <thoroughness level="${formData.thoroughness}">${getThoroughnessLabel(formData.thoroughness)}</thoroughness>
    <compliance_level level="${formData.complianceLevel}">${getComplianceLabel(formData.complianceLevel)}</compliance_level>
    <files_to_ignore>${formData.filesToIgnore || 'None'}</files_to_ignore>
    <extra_info>${formData.extraInfo || 'None'}</extra_info>
  </preferences>

  <advanced_config>
    <vulnerability_checks>
      <injection_attacks>${formData.checkInjection ? 'Check' : 'Skip'}</injection_attacks>
      <xss_vulnerabilities>${formData.checkXss ? 'Check' : 'Skip'}</xss_vulnerabilities>
      <csrf_protection>${formData.checkCsrf ? 'Check' : 'Skip'}</csrf_protection>
      <authentication_issues>${formData.checkAuth ? 'Check' : 'Skip'}</authentication_issues>
      <cryptographic_failures>${formData.checkCrypto ? 'Check' : 'Skip'}</cryptographic_failures>
    </vulnerability_checks>
    <data_security>
      <sensitive_data_exposure>${formData.checkDataExposure ? 'Check' : 'Skip'}</sensitive_data_exposure>
      <sensitive_logging>${formData.checkSensitiveLogging ? 'Check' : 'Skip'}</sensitive_logging>
      <encryption_at_rest_transit>${formData.checkEncryption ? 'Check' : 'Skip'}</encryption_at_rest_transit>
      <pii_handling>${formData.checkPii ? 'Check' : 'Skip'}</pii_handling>
      <secret_management>${formData.checkSecretManagement ? 'Check' : 'Skip'}</secret_management>
    </data_security>
    <access_control>
      <rbac_implementation>${formData.checkRbac ? 'Check' : 'Skip'}</rbac_implementation>
      <privilege_escalation>${formData.checkPrivilegeEscalation ? 'Check' : 'Skip'}</privilege_escalation>
      <session_management>${formData.checkSessionManagement ? 'Check' : 'Skip'}</session_management>
      <api_security>${formData.checkApiSecurity ? 'Check' : 'Skip'}</api_security>
      <input_validation>${formData.checkInputValidation ? 'Check' : 'Skip'}</input_validation>
    </access_control>
    <infrastructure>
      <dependency_vulnerabilities>${formData.checkDependencies ? 'Check' : 'Skip'}</dependency_vulnerabilities>
      <security_configuration>${formData.checkConfig ? 'Check' : 'Skip'}</security_configuration>
      <security_headers>${formData.checkHeaders ? 'Check' : 'Skip'}</security_headers>
      <cors_policy>${formData.checkCors ? 'Check' : 'Skip'}</cors_policy>
      <tls_configuration>${formData.checkTls ? 'Check' : 'Skip'}</tls_configuration>
    </infrastructure>
    <compliance_frameworks>
      <owasp_top_10>${formData.owaspTop10 ? 'Apply' : 'Skip'}</owasp_top_10>
      <sans_top_25>${formData.sansTop25 ? 'Apply' : 'Skip'}</sans_top_25>
      <gdpr_compliance>${formData.gdprCompliance ? 'Apply' : 'Skip'}</gdpr_compliance>
      <hipaa_compliance>${formData.hipaaCompliance ? 'Apply' : 'Skip'}</hipaa_compliance>
      <pci_dss>${formData.pciDss ? 'Apply' : 'Skip'}</pci_dss>
    </compliance_frameworks>
    <output_config>
      <report_format>${formData.reportFormat || 'Markdown with sections'}</report_format>
      <include_cwe_references>${formData.includeCwe ? 'Yes' : 'No'}</include_cwe_references>
      <include_cvss_scores>${formData.includeCvss ? 'Yes' : 'No'}</include_cvss_scores>
      <include_remediation_steps>${formData.includeRemediation ? 'Yes' : 'No'}</include_remediation_steps>
      <prioritize_by_severity>${formData.prioritizeBySeverity ? 'Yes' : 'No'}</prioritize_by_severity>
    </output_config>
  </advanced_config>
</task_card>`
    setXmlOutput(xml)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(xmlOutput)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadXML = () => {
    const filename = `${sanitizeFilename(formData.punchcardTitle)}_security_audit.xml`
    const blob = new Blob([xmlOutput], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetForm = () => {
    setFormData(defaultFormData)
    setXmlOutput('')
    setCopied(false)
  }

  return (
    <>
      <Head>
        <title>Security Audit - PunchCards</title>
      </Head>
      <main className="container">
        <button className="back-button" onClick={() => router.push('/')}>
          Back to Home
        </button>

        <div className="form-container">
          <div className="form-header">
            <h2 className="typewriter">SECURITY AUDIT TASK CARD</h2>
            <p className="typewriter-slow">
              Comprehensive security review for your codebase
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); generateXML() }}>
            {/* PUNCHCARD TITLE */}
            <div className="form-section punchcard-title-section">
              <div className="form-group">
                <label htmlFor="punchcardTitle">Punchcard Title *</label>
                <input type="text" id="punchcardTitle" name="punchcardTitle" value={formData.punchcardTitle} onChange={handleInputChange} placeholder="e.g., audit-auth-system, review-api-security" required />
                <span className="field-hint">Used for documentation filename and tracking</span>
              </div>
            </div>

            {/* CORE DETAILS */}
            <div className="form-section">
              <h3>Core Details</h3>
              
              <div className="form-group">
                <label htmlFor="targetCode">Target Code / Files *</label>
                <textarea id="targetCode" name="targetCode" value={formData.targetCode} onChange={handleInputChange} placeholder="What code needs auditing? List files, modules, or entire codebase..." required />
              </div>

              <div className="form-group">
                <label htmlFor="auditScope">Audit Scope *</label>
                <textarea id="auditScope" name="auditScope" value={formData.auditScope} onChange={handleInputChange} placeholder="What's in scope? e.g., authentication flow, API endpoints, data handling..." required />
              </div>

              <div className="form-group">
                <label htmlFor="securityConcerns">Specific Security Concerns</label>
                <textarea id="securityConcerns" name="securityConcerns" value={formData.securityConcerns} onChange={handleInputChange} placeholder="Any specific vulnerabilities or areas you're worried about..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('vulnerabilities')}>
                {advancedSections.vulnerabilities ? '− ADVANCED VULNERABILITY CHECKS' : '+ ADVANCED VULNERABILITY CHECKS'}
              </button>

              {advancedSections.vulnerabilities && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkInjection" checked={formData.checkInjection} onChange={handleCheckboxChange} />
                      <span>Check for injection attacks (SQL, NoSQL, Command, LDAP)</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkXss" checked={formData.checkXss} onChange={handleCheckboxChange} />
                      <span>Check for XSS vulnerabilities (Stored, Reflected, DOM)</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkCsrf" checked={formData.checkCsrf} onChange={handleCheckboxChange} />
                      <span>Check CSRF protection</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkAuth" checked={formData.checkAuth} onChange={handleCheckboxChange} />
                      <span>Check authentication mechanisms</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkCrypto" checked={formData.checkCrypto} onChange={handleCheckboxChange} />
                      <span>Check cryptographic implementations</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* CONTEXT */}
            <div className="form-section">
              <h3>Context</h3>

              <div className="form-group">
                <label htmlFor="appType">Application Type</label>
                <input type="text" id="appType" name="appType" value={formData.appType} onChange={handleInputChange} placeholder="e.g., Web app, API, Mobile backend, Microservice..." />
              </div>

              <div className="form-group">
                <label htmlFor="sensitiveData">Sensitive Data Handled</label>
                <textarea id="sensitiveData" name="sensitiveData" value={formData.sensitiveData} onChange={handleInputChange} placeholder="What sensitive data does the app process? PII, financial, health..." />
              </div>

              <div className="form-group">
                <label htmlFor="existingMeasures">Existing Security Measures</label>
                <textarea id="existingMeasures" name="existingMeasures" value={formData.existingMeasures} onChange={handleInputChange} placeholder="What security measures are already in place?..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('dataSecurity')}>
                {advancedSections.dataSecurity ? '− ADVANCED DATA SECURITY' : '+ ADVANCED DATA SECURITY'}
              </button>

              {advancedSections.dataSecurity && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkDataExposure" checked={formData.checkDataExposure} onChange={handleCheckboxChange} />
                      <span>Check for sensitive data exposure</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkSensitiveLogging" checked={formData.checkSensitiveLogging} onChange={handleCheckboxChange} />
                      <span>Check for sensitive data in logs</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkEncryption" checked={formData.checkEncryption} onChange={handleCheckboxChange} />
                      <span>Check encryption at rest and in transit</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkPii" checked={formData.checkPii} onChange={handleCheckboxChange} />
                      <span>Check PII handling practices</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkSecretManagement" checked={formData.checkSecretManagement} onChange={handleCheckboxChange} />
                      <span>Check secret/credential management</span>
                    </label>
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('accessControl')}>
                {advancedSections.accessControl ? '− ADVANCED ACCESS CONTROL' : '+ ADVANCED ACCESS CONTROL'}
              </button>

              {advancedSections.accessControl && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkRbac" checked={formData.checkRbac} onChange={handleCheckboxChange} />
                      <span>Check RBAC implementation</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkPrivilegeEscalation" checked={formData.checkPrivilegeEscalation} onChange={handleCheckboxChange} />
                      <span>Check for privilege escalation paths</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkSessionManagement" checked={formData.checkSessionManagement} onChange={handleCheckboxChange} />
                      <span>Check session management security</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkApiSecurity" checked={formData.checkApiSecurity} onChange={handleCheckboxChange} />
                      <span>Check API authentication/authorization</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkInputValidation" checked={formData.checkInputValidation} onChange={handleCheckboxChange} />
                      <span>Check input validation practices</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* PREFERENCES */}
            <div className="form-section">
              <h3>Preferences</h3>

              <div className="form-group">
                <label>Minimum Severity to Report</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.severity === val ? 'active' : ''}`} onClick={() => handleRatingChange('severity', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getSeverityLabel(formData.severity)}</span>
              </div>

              <div className="form-group">
                <label>Audit Thoroughness</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.thoroughness === val ? 'active' : ''}`} onClick={() => handleRatingChange('thoroughness', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getThoroughnessLabel(formData.thoroughness)}</span>
              </div>

              <div className="form-group">
                <label>Compliance Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.complianceLevel === val ? 'active' : ''}`} onClick={() => handleRatingChange('complianceLevel', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getComplianceLabel(formData.complianceLevel)}</span>
              </div>

              <div className="form-group">
                <label htmlFor="filesToIgnore">Files/Folders to Ignore</label>
                <textarea id="filesToIgnore" name="filesToIgnore" value={formData.filesToIgnore} onChange={handleInputChange} placeholder="Files that should be excluded from audit..." />
              </div>

              <div className="form-group">
                <label htmlFor="extraInfo">Extra Info / Notes</label>
                <textarea id="extraInfo" name="extraInfo" value={formData.extraInfo} onChange={handleInputChange} placeholder="Any additional security context or requirements..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('infrastructure')}>
                {advancedSections.infrastructure ? '− ADVANCED INFRASTRUCTURE' : '+ ADVANCED INFRASTRUCTURE'}
              </button>

              {advancedSections.infrastructure && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkDependencies" checked={formData.checkDependencies} onChange={handleCheckboxChange} />
                      <span>Check dependencies for known CVEs</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkConfig" checked={formData.checkConfig} onChange={handleCheckboxChange} />
                      <span>Check security configurations</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkHeaders" checked={formData.checkHeaders} onChange={handleCheckboxChange} />
                      <span>Check security headers</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkCors" checked={formData.checkCors} onChange={handleCheckboxChange} />
                      <span>Check CORS policy</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkTls" checked={formData.checkTls} onChange={handleCheckboxChange} />
                      <span>Check TLS configuration</span>
                    </label>
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('compliance')}>
                {advancedSections.compliance ? '− ADVANCED COMPLIANCE' : '+ ADVANCED COMPLIANCE'}
              </button>

              {advancedSections.compliance && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="owaspTop10" checked={formData.owaspTop10} onChange={handleCheckboxChange} />
                      <span>Apply OWASP Top 10 checklist</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="sansTop25" checked={formData.sansTop25} onChange={handleCheckboxChange} />
                      <span>Apply SANS Top 25 checklist</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="gdprCompliance" checked={formData.gdprCompliance} onChange={handleCheckboxChange} />
                      <span>Check GDPR compliance</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="hipaaCompliance" checked={formData.hipaaCompliance} onChange={handleCheckboxChange} />
                      <span>Check HIPAA compliance</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="pciDss" checked={formData.pciDss} onChange={handleCheckboxChange} />
                      <span>Check PCI-DSS compliance</span>
                    </label>
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('output')}>
                {advancedSections.output ? '− ADVANCED OUTPUT' : '+ ADVANCED OUTPUT'}
              </button>

              {advancedSections.output && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="reportFormat">Report Format</label>
                    <input type="text" id="reportFormat" name="reportFormat" value={formData.reportFormat} onChange={handleInputChange} placeholder="e.g., Markdown, JSON, HTML..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="includeCwe" checked={formData.includeCwe} onChange={handleCheckboxChange} />
                      <span>Include CWE references</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="includeCvss" checked={formData.includeCvss} onChange={handleCheckboxChange} />
                      <span>Include CVSS scores</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="includeRemediation" checked={formData.includeRemediation} onChange={handleCheckboxChange} />
                      <span>Include remediation steps</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="prioritizeBySeverity" checked={formData.prioritizeBySeverity} onChange={handleCheckboxChange} />
                      <span>Prioritize findings by severity</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* DOCUMENTATION DEPTH */}
            <div className="form-section documentation-depth-section">
              <h3>Documentation</h3>
              <div className="form-group">
                <label>Documentation Depth</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.documentationDepth === val ? 'active' : ''}`} onClick={() => handleRatingChange('documentationDepth', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getDocDepthLabel(formData.documentationDepth)}</span>
                <span className="field-hint">How detailed should the punchcard documentation be?</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Generate XML</button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>Reset Form</button>
            </div>
          </form>

          {xmlOutput && (
            <div className="file-card">
              <div className="file-card-header">
                <span className="file-icon">[ ]</span>
                <span className="file-name">{sanitizeFilename(formData.punchcardTitle)}_security_audit.xml</span>
              </div>
              <div className="file-card-actions">
                <button className="file-btn" onClick={downloadXML}>DOWNLOAD</button>
                <button className={`file-btn ${copied ? 'copied' : ''}`} onClick={copyToClipboard}>
                  {copied ? 'COPIED' : 'COPY'}
                </button>
              </div>
              {copied && <div className="file-card-message">Copied to clipboard</div>}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
