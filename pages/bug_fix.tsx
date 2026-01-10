import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface BugFixData {
  // Punchcard Meta
  punchcardTitle: string
  documentationDepth: number
  // Core
  observedBehavior: string
  expectedBehavior: string
  stepsToReproduce: string
  // Context
  errorMessages: string
  affectedFiles: string
  environment: string
  // Preferences
  urgency: number
  testingLevel: number
  creativityLevel: number
  filesToIgnore: string
  extraInfo: string
  // Advanced - Analysis
  codebaseVersion: string
  gitBranch: string
  lastWorkingCommit: string
  relatedIssues: string
  suspectedRootCause: string
  // Advanced - Environment
  osVersion: string
  nodeVersion: string
  browserVersion: string
  databaseVersion: string
  dockerConfig: string
  // Advanced - Reproduction
  frequencyOfBug: string
  dataConditions: string
  userPermissions: string
  networkConditions: string
  concurrencyScenario: string
  // Advanced - Fix Preferences
  preferredFixApproach: string
  avoidPatterns: string
  performanceConstraints: string
  memoryConstraints: string
  timeoutRequirements: string
  // Advanced - Testing
  existingTestFiles: string
  testFramework: string
  mockRequirements: string
  coverageTarget: string
  e2eConsiderations: string
  // Advanced - Output
  logVerbosity: number
  includeComments: boolean
  generateTypes: boolean
  updateDocs: boolean
  createChangelog: boolean
}

const defaultFormData: BugFixData = {
  punchcardTitle: '',
  documentationDepth: 3,
  observedBehavior: '',
  expectedBehavior: '',
  stepsToReproduce: '',
  errorMessages: '',
  affectedFiles: '',
  environment: '',
  urgency: 3,
  testingLevel: 3,
  creativityLevel: 2,
  filesToIgnore: '',
  extraInfo: '',
  codebaseVersion: '',
  gitBranch: '',
  lastWorkingCommit: '',
  relatedIssues: '',
  suspectedRootCause: '',
  osVersion: '',
  nodeVersion: '',
  browserVersion: '',
  databaseVersion: '',
  dockerConfig: '',
  frequencyOfBug: '',
  dataConditions: '',
  userPermissions: '',
  networkConditions: '',
  concurrencyScenario: '',
  preferredFixApproach: '',
  avoidPatterns: '',
  performanceConstraints: '',
  memoryConstraints: '',
  timeoutRequirements: '',
  existingTestFiles: '',
  testFramework: '',
  mockRequirements: '',
  coverageTarget: '',
  e2eConsiderations: '',
  logVerbosity: 3,
  includeComments: true,
  generateTypes: false,
  updateDocs: false,
  createChangelog: false,
}

export default function BugFix() {
  const router = useRouter()
  const [formData, setFormData] = useState<BugFixData>(defaultFormData)
  const [xmlOutput, setXmlOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [advancedSections, setAdvancedSections] = useState({
    analysis: false,
    environment: false,
    reproduction: false,
    fixPrefs: false,
    testing: false,
    output: false,
  })

  const toggleAdvanced = (section: keyof typeof advancedSections) => {
    setAdvancedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const getUrgencyLabel = (val: number) => {
    const labels = ['Low - whenever', 'Minor - soon', 'Normal', 'High - ASAP', 'Critical - NOW']
    return labels[val - 1]
  }

  const getTestingLabel = (val: number) => {
    const labels = ['Minimal - just verify fix', 'Light - basic tests', 'Standard', 'Thorough - edge cases', 'Exhaustive - full coverage']
    return labels[val - 1]
  }

  const getCreativityLabel = (val: number) => {
    const labels = ['Conservative - safest fix', 'Cautious', 'Balanced', 'Open to ideas', 'Creative - explore options']
    return labels[val - 1]
  }

  const getVerbosityLabel = (val: number) => {
    const labels = ['Silent - errors only', 'Quiet', 'Normal', 'Verbose', 'Debug - everything']
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
    const xml = `<task_card type="bug_fix" title="${formData.punchcardTitle || 'Untitled Bug Fix'}">
    <meta_instruction>
        DO NOT fix the code immediately. Follow this strict process:
        0. CONTEXT STUDY: Deeply analyze the provided codebase. Identify the files involved in the error, trace the execution flow, and understand the expected state vs actual state.
        1. ANALYZE: Read the provided stack trace/behavior in relation to your codebase study.
        2. REPRODUCE: Write a standalone reproduction script or test case that fails.
        3. CONFIRM: Wait for me to run the script and confirm the failure.
        4. FIX: Apply the fix to the codebase.
        5. VERIFY: Run the reproduction script again to prove it passes.
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

    <bug_details>
        <observed_behavior>${formData.observedBehavior}</observed_behavior>
        <expected_behavior>${formData.expectedBehavior}</expected_behavior>
        <steps_to_reproduce>${formData.stepsToReproduce}</steps_to_reproduce>
        <error_messages>${formData.errorMessages || 'N/A'}</error_messages>
        <affected_files>${formData.affectedFiles || 'Unknown - please investigate'}</affected_files>
        <environment>${formData.environment || 'Not specified'}</environment>
    </bug_details>

    <preferences>
        <urgency level="${formData.urgency}">${getUrgencyLabel(formData.urgency)}</urgency>
        <testing_level level="${formData.testingLevel}">${getTestingLabel(formData.testingLevel)}</testing_level>
        <creativity_level level="${formData.creativityLevel}">${getCreativityLabel(formData.creativityLevel)}</creativity_level>
        <files_to_ignore>${formData.filesToIgnore || 'None'}</files_to_ignore>
        <extra_info>${formData.extraInfo || 'None'}</extra_info>
    </preferences>

    <advanced_config>
        <analysis>
            <codebase_version>${formData.codebaseVersion || 'Not specified'}</codebase_version>
            <git_branch>${formData.gitBranch || 'Not specified'}</git_branch>
            <last_working_commit>${formData.lastWorkingCommit || 'Unknown'}</last_working_commit>
            <related_issues>${formData.relatedIssues || 'None'}</related_issues>
            <suspected_root_cause>${formData.suspectedRootCause || 'Unknown'}</suspected_root_cause>
        </analysis>
        <environment_details>
            <os_version>${formData.osVersion || 'Not specified'}</os_version>
            <node_version>${formData.nodeVersion || 'Not specified'}</node_version>
            <browser_version>${formData.browserVersion || 'Not specified'}</browser_version>
            <database_version>${formData.databaseVersion || 'Not specified'}</database_version>
            <docker_config>${formData.dockerConfig || 'None'}</docker_config>
        </environment_details>
        <reproduction_context>
            <frequency>${formData.frequencyOfBug || 'Not specified'}</frequency>
            <data_conditions>${formData.dataConditions || 'Not specified'}</data_conditions>
            <user_permissions>${formData.userPermissions || 'Not specified'}</user_permissions>
            <network_conditions>${formData.networkConditions || 'Not specified'}</network_conditions>
            <concurrency_scenario>${formData.concurrencyScenario || 'None'}</concurrency_scenario>
        </reproduction_context>
        <fix_preferences>
            <preferred_approach>${formData.preferredFixApproach || 'No preference'}</preferred_approach>
            <avoid_patterns>${formData.avoidPatterns || 'None'}</avoid_patterns>
            <performance_constraints>${formData.performanceConstraints || 'None'}</performance_constraints>
            <memory_constraints>${formData.memoryConstraints || 'None'}</memory_constraints>
            <timeout_requirements>${formData.timeoutRequirements || 'None'}</timeout_requirements>
        </fix_preferences>
        <testing_config>
            <existing_test_files>${formData.existingTestFiles || 'None specified'}</existing_test_files>
            <test_framework>${formData.testFramework || 'Use project default'}</test_framework>
            <mock_requirements>${formData.mockRequirements || 'None'}</mock_requirements>
            <coverage_target>${formData.coverageTarget || 'Not specified'}</coverage_target>
            <e2e_considerations>${formData.e2eConsiderations || 'None'}</e2e_considerations>
        </testing_config>
        <output_preferences>
            <log_verbosity level="${formData.logVerbosity}">${getVerbosityLabel(formData.logVerbosity)}</log_verbosity>
            <include_comments>${formData.includeComments ? 'Yes' : 'No'}</include_comments>
            <generate_types>${formData.generateTypes ? 'Yes' : 'No'}</generate_types>
            <update_docs>${formData.updateDocs ? 'Yes' : 'No'}</update_docs>
            <create_changelog>${formData.createChangelog ? 'Yes' : 'No'}</create_changelog>
        </output_preferences>
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
    const filename = `${sanitizeFilename(formData.punchcardTitle)}_bug_fix.xml`
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
        <title>Bug Fix - PunchCards</title>
      </Head>
      <main className="container">
        <button className="back-button" onClick={() => router.push('/')}>
          Back to Home
        </button>

        <div className="form-container">
          <div className="form-header">
            <h2 className="typewriter">BUG FIX TASK CARD</h2>
            <p className="typewriter-slow">
              Create a structured bug fix workflow with reproduction and verification steps
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); generateXML() }}>
            {/* PUNCHCARD TITLE */}
            <div className="form-section punchcard-title-section">
              <div className="form-group">
                <label htmlFor="punchcardTitle">Punchcard Title *</label>
                <input type="text" id="punchcardTitle" name="punchcardTitle" value={formData.punchcardTitle} onChange={handleInputChange} placeholder="e.g., fix-login-timeout, resolve-null-pointer" required />
                <span className="field-hint">Used for documentation filename and tracking</span>
              </div>
            </div>

            {/* CORE DETAILS */}
            <div className="form-section">
              <h3>Core Details</h3>
              
              <div className="form-group">
                <label htmlFor="observedBehavior">Observed Behavior *</label>
                <textarea id="observedBehavior" name="observedBehavior" value={formData.observedBehavior} onChange={handleInputChange} placeholder="Describe what's currently happening (the bug)..." required />
              </div>

              <div className="form-group">
                <label htmlFor="expectedBehavior">Expected Behavior *</label>
                <textarea id="expectedBehavior" name="expectedBehavior" value={formData.expectedBehavior} onChange={handleInputChange} placeholder="Describe what should happen instead..." required />
              </div>

              <div className="form-group">
                <label htmlFor="stepsToReproduce">Steps to Reproduce *</label>
                <textarea id="stepsToReproduce" name="stepsToReproduce" value={formData.stepsToReproduce} onChange={handleInputChange} placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..." required />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('analysis')}>
                {advancedSections.analysis ? '− ADVANCED ANALYSIS' : '+ ADVANCED ANALYSIS'}
              </button>
              
              {advancedSections.analysis && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="codebaseVersion">Codebase Version / Tag</label>
                    <input type="text" id="codebaseVersion" name="codebaseVersion" value={formData.codebaseVersion} onChange={handleInputChange} placeholder="e.g., v2.3.1, release-2024-01" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gitBranch">Git Branch</label>
                    <input type="text" id="gitBranch" name="gitBranch" value={formData.gitBranch} onChange={handleInputChange} placeholder="e.g., main, develop, feature/xyz" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastWorkingCommit">Last Known Working Commit</label>
                    <input type="text" id="lastWorkingCommit" name="lastWorkingCommit" value={formData.lastWorkingCommit} onChange={handleInputChange} placeholder="e.g., abc123f" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="relatedIssues">Related Issues / PRs</label>
                    <textarea id="relatedIssues" name="relatedIssues" value={formData.relatedIssues} onChange={handleInputChange} placeholder="Links to related GitHub issues or PRs..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="suspectedRootCause">Suspected Root Cause</label>
                    <textarea id="suspectedRootCause" name="suspectedRootCause" value={formData.suspectedRootCause} onChange={handleInputChange} placeholder="Any hunches about what might be causing this?" />
                  </div>
                </div>
              )}
            </div>

            {/* CONTEXT */}
            <div className="form-section">
              <h3>Additional Context</h3>

              <div className="form-group">
                <label htmlFor="errorMessages">Error Messages / Stack Trace</label>
                <textarea id="errorMessages" name="errorMessages" value={formData.errorMessages} onChange={handleInputChange} placeholder="Paste any error messages or stack traces here..." />
              </div>

              <div className="form-group">
                <label htmlFor="affectedFiles">Affected Files</label>
                <textarea id="affectedFiles" name="affectedFiles" value={formData.affectedFiles} onChange={handleInputChange} placeholder="List files you suspect are involved (if known)..." />
              </div>

              <div className="form-group">
                <label htmlFor="environment">Environment</label>
                <input type="text" id="environment" name="environment" value={formData.environment} onChange={handleInputChange} placeholder="e.g., Node 18, Chrome, macOS, Production..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('environment')}>
                {advancedSections.environment ? '− ADVANCED ENVIRONMENT' : '+ ADVANCED ENVIRONMENT'}
              </button>

              {advancedSections.environment && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="osVersion">OS Version</label>
                    <input type="text" id="osVersion" name="osVersion" value={formData.osVersion} onChange={handleInputChange} placeholder="e.g., macOS 14.2, Ubuntu 22.04, Windows 11" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nodeVersion">Node.js / Runtime Version</label>
                    <input type="text" id="nodeVersion" name="nodeVersion" value={formData.nodeVersion} onChange={handleInputChange} placeholder="e.g., Node 20.10.0, Bun 1.0.18" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="browserVersion">Browser Version</label>
                    <input type="text" id="browserVersion" name="browserVersion" value={formData.browserVersion} onChange={handleInputChange} placeholder="e.g., Chrome 120, Firefox 121, Safari 17" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="databaseVersion">Database Version</label>
                    <input type="text" id="databaseVersion" name="databaseVersion" value={formData.databaseVersion} onChange={handleInputChange} placeholder="e.g., PostgreSQL 16, MongoDB 7.0" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dockerConfig">Docker / Container Config</label>
                    <textarea id="dockerConfig" name="dockerConfig" value={formData.dockerConfig} onChange={handleInputChange} placeholder="Relevant Docker compose or container settings..." />
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('reproduction')}>
                {advancedSections.reproduction ? '− ADVANCED REPRODUCTION' : '+ ADVANCED REPRODUCTION'}
              </button>

              {advancedSections.reproduction && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="frequencyOfBug">Bug Frequency</label>
                    <input type="text" id="frequencyOfBug" name="frequencyOfBug" value={formData.frequencyOfBug} onChange={handleInputChange} placeholder="e.g., Always, 50% of time, Only on Mondays..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dataConditions">Data Conditions</label>
                    <textarea id="dataConditions" name="dataConditions" value={formData.dataConditions} onChange={handleInputChange} placeholder="Specific data states that trigger the bug..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="userPermissions">User Permissions / Roles</label>
                    <input type="text" id="userPermissions" name="userPermissions" value={formData.userPermissions} onChange={handleInputChange} placeholder="e.g., Admin only, Guest users, specific role..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="networkConditions">Network Conditions</label>
                    <input type="text" id="networkConditions" name="networkConditions" value={formData.networkConditions} onChange={handleInputChange} placeholder="e.g., Slow connection, offline, VPN..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="concurrencyScenario">Concurrency Scenario</label>
                    <textarea id="concurrencyScenario" name="concurrencyScenario" value={formData.concurrencyScenario} onChange={handleInputChange} placeholder="Race conditions, multiple users, parallel requests..." />
                  </div>
                </div>
              )}
            </div>

            {/* PREFERENCES */}
            <div className="form-section">
              <h3>Preferences</h3>

              <div className="form-group">
                <label>Urgency Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.urgency === val ? 'active' : ''}`} onClick={() => handleRatingChange('urgency', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getUrgencyLabel(formData.urgency)}</span>
              </div>

              <div className="form-group">
                <label>Testing Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.testingLevel === val ? 'active' : ''}`} onClick={() => handleRatingChange('testingLevel', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getTestingLabel(formData.testingLevel)}</span>
              </div>

              <div className="form-group">
                <label>Creativity Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.creativityLevel === val ? 'active' : ''}`} onClick={() => handleRatingChange('creativityLevel', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getCreativityLabel(formData.creativityLevel)}</span>
              </div>

              <div className="form-group">
                <label htmlFor="filesToIgnore">Files/Folders to Ignore</label>
                <textarea id="filesToIgnore" name="filesToIgnore" value={formData.filesToIgnore} onChange={handleInputChange} placeholder="List any files or folders that should NOT be modified..." />
              </div>

              <div className="form-group">
                <label htmlFor="extraInfo">Extra Info / Notes</label>
                <textarea id="extraInfo" name="extraInfo" value={formData.extraInfo} onChange={handleInputChange} placeholder="Any additional context, previous attempts, hunches..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('fixPrefs')}>
                {advancedSections.fixPrefs ? '− ADVANCED FIX PREFERENCES' : '+ ADVANCED FIX PREFERENCES'}
              </button>

              {advancedSections.fixPrefs && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="preferredFixApproach">Preferred Fix Approach</label>
                    <textarea id="preferredFixApproach" name="preferredFixApproach" value={formData.preferredFixApproach} onChange={handleInputChange} placeholder="e.g., Minimal change, refactor, add abstraction layer..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="avoidPatterns">Patterns to Avoid</label>
                    <textarea id="avoidPatterns" name="avoidPatterns" value={formData.avoidPatterns} onChange={handleInputChange} placeholder="Any code patterns or approaches you don't want used..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="performanceConstraints">Performance Constraints</label>
                    <textarea id="performanceConstraints" name="performanceConstraints" value={formData.performanceConstraints} onChange={handleInputChange} placeholder="e.g., Must run under 100ms, no blocking operations..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="memoryConstraints">Memory Constraints</label>
                    <textarea id="memoryConstraints" name="memoryConstraints" value={formData.memoryConstraints} onChange={handleInputChange} placeholder="e.g., Max 512MB heap, no memory leaks allowed..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="timeoutRequirements">Timeout Requirements</label>
                    <input type="text" id="timeoutRequirements" name="timeoutRequirements" value={formData.timeoutRequirements} onChange={handleInputChange} placeholder="e.g., API calls must timeout after 30s" />
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('testing')}>
                {advancedSections.testing ? '− ADVANCED TESTING' : '+ ADVANCED TESTING'}
              </button>

              {advancedSections.testing && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="existingTestFiles">Existing Test Files</label>
                    <textarea id="existingTestFiles" name="existingTestFiles" value={formData.existingTestFiles} onChange={handleInputChange} placeholder="List relevant existing test files to update..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="testFramework">Test Framework</label>
                    <input type="text" id="testFramework" name="testFramework" value={formData.testFramework} onChange={handleInputChange} placeholder="e.g., Jest, Vitest, Mocha, Playwright..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mockRequirements">Mock Requirements</label>
                    <textarea id="mockRequirements" name="mockRequirements" value={formData.mockRequirements} onChange={handleInputChange} placeholder="What needs to be mocked for testing..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="coverageTarget">Coverage Target</label>
                    <input type="text" id="coverageTarget" name="coverageTarget" value={formData.coverageTarget} onChange={handleInputChange} placeholder="e.g., 80% line coverage, 100% branch coverage" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="e2eConsiderations">E2E Considerations</label>
                    <textarea id="e2eConsiderations" name="e2eConsiderations" value={formData.e2eConsiderations} onChange={handleInputChange} placeholder="End-to-end testing requirements or scenarios..." />
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('output')}>
                {advancedSections.output ? '− ADVANCED OUTPUT' : '+ ADVANCED OUTPUT'}
              </button>

              {advancedSections.output && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label>Log Verbosity</label>
                    <div className="rating-buttons">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button key={val} type="button" className={`rating-btn ${formData.logVerbosity === val ? 'active' : ''}`} onClick={() => handleRatingChange('logVerbosity', val)}>{val}</button>
                      ))}
                    </div>
                    <span className="rating-label">{getVerbosityLabel(formData.logVerbosity)}</span>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="includeComments" checked={formData.includeComments} onChange={handleCheckboxChange} />
                      <span>Include explanatory comments in code</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="generateTypes" checked={formData.generateTypes} onChange={handleCheckboxChange} />
                      <span>Generate/update TypeScript types</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="updateDocs" checked={formData.updateDocs} onChange={handleCheckboxChange} />
                      <span>Update documentation</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="createChangelog" checked={formData.createChangelog} onChange={handleCheckboxChange} />
                      <span>Create changelog entry</span>
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
                <span className="file-name">{sanitizeFilename(formData.punchcardTitle)}_bug_fix.xml</span>
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
