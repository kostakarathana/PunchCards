import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface TestingData {
  // Punchcard Meta
  punchcardTitle: string
  documentationDepth: number
  // Core
  targetCode: string
  testingGoal: string
  testTypes: string
  // Context
  existingTests: string
  testingFramework: string
  codebaseContext: string
  // Preferences
  coverage: number
  thoroughness: number
  mockingLevel: number
  filesToIgnore: string
  extraInfo: string
  // Advanced - Unit Tests
  unitTestStyle: string
  assertionLibrary: string
  describeBlockStructure: boolean
  testNaming: string
  arrangeActAssert: boolean
  // Advanced - Integration
  integrationScope: string
  databaseStrategy: string
  apiMocking: string
  serviceIsolation: boolean
  transactionRollback: boolean
  // Advanced - E2E
  e2eFramework: string
  browserTargets: string
  headlessMode: boolean
  screenshotOnFailure: boolean
  videoRecording: boolean
  // Advanced - Mocking
  mockingFramework: string
  mockDepth: number
  spyFunctions: boolean
  stubExternalCalls: boolean
  mockTimers: boolean
  // Advanced - Coverage
  coverageThreshold: string
  branchCoverage: boolean
  lineCoverage: boolean
  functionCoverage: boolean
  excludeFromCoverage: string
  // Advanced - CI/CD
  parallelTests: boolean
  retryFlaky: boolean
  testTimeout: string
  reportFormat: string
  failFast: boolean
}

const defaultFormData: TestingData = {
  punchcardTitle: '',
  documentationDepth: 3,
  targetCode: '',
  testingGoal: '',
  testTypes: '',
  existingTests: '',
  testingFramework: '',
  codebaseContext: '',
  coverage: 3,
  thoroughness: 3,
  mockingLevel: 3,
  filesToIgnore: '',
  extraInfo: '',
  unitTestStyle: '',
  assertionLibrary: '',
  describeBlockStructure: true,
  testNaming: '',
  arrangeActAssert: true,
  integrationScope: '',
  databaseStrategy: '',
  apiMocking: '',
  serviceIsolation: true,
  transactionRollback: true,
  e2eFramework: '',
  browserTargets: '',
  headlessMode: true,
  screenshotOnFailure: true,
  videoRecording: false,
  mockingFramework: '',
  mockDepth: 3,
  spyFunctions: true,
  stubExternalCalls: true,
  mockTimers: false,
  coverageThreshold: '',
  branchCoverage: true,
  lineCoverage: true,
  functionCoverage: true,
  excludeFromCoverage: '',
  parallelTests: false,
  retryFlaky: false,
  testTimeout: '',
  reportFormat: '',
  failFast: false,
}

export default function Testing() {
  const router = useRouter()
  const [formData, setFormData] = useState<TestingData>(defaultFormData)
  const [xmlOutput, setXmlOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [advancedSections, setAdvancedSections] = useState({
    unit: false,
    integration: false,
    e2e: false,
    mocking: false,
    coverage: false,
    cicd: false,
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

  const getCoverageLabel = (val: number) => {
    const labels = ['Minimal - key paths only', 'Basic - happy paths', 'Standard - most cases', 'High - edge cases included', 'Comprehensive - 90%+ coverage']
    return labels[val - 1]
  }

  const getThoroughnessLabel = (val: number) => {
    const labels = ['Quick smoke tests', 'Basic validation', 'Standard testing', 'Thorough testing', 'Exhaustive - all scenarios']
    return labels[val - 1]
  }

  const getMockingLabel = (val: number) => {
    const labels = ['No mocking - real dependencies', 'Minimal mocking', 'Standard mocking', 'Heavy mocking', 'Full isolation - mock everything']
    return labels[val - 1]
  }

  const getMockDepthLabel = (val: number) => {
    const labels = ['Shallow - direct deps only', 'Basic', 'Standard', 'Deep', 'Complete - all layers']
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
    const xml = `<task_card type="testing" title="${formData.punchcardTitle || 'Untitled Testing'}">
  <meta_instruction>
    Follow this testing workflow:
    0. ANALYSIS: Understand the code to be tested. Identify functions, classes, edge cases, and dependencies.
    1. STRATEGY: Plan the testing approach based on the test types requested.
    2. SETUP: Configure test environment, mocks, and fixtures as needed.
    3. WRITE TESTS: Create tests following the specified patterns and conventions.
    4. VERIFY: Ensure tests pass and provide meaningful coverage.
    5. DOCUMENT: Add clear test descriptions and comments where helpful.
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

  <testing_details>
    <target_code>${formData.targetCode}</target_code>
    <testing_goal>${formData.testingGoal}</testing_goal>
    <test_types>${formData.testTypes}</test_types>
    <existing_tests>${formData.existingTests || 'None'}</existing_tests>
    <testing_framework>${formData.testingFramework || 'Auto-detect'}</testing_framework>
    <codebase_context>${formData.codebaseContext || 'Not specified'}</codebase_context>
  </testing_details>

  <preferences>
    <coverage_goal level="${formData.coverage}">${getCoverageLabel(formData.coverage)}</coverage_goal>
    <thoroughness level="${formData.thoroughness}">${getThoroughnessLabel(formData.thoroughness)}</thoroughness>
    <mocking_level level="${formData.mockingLevel}">${getMockingLabel(formData.mockingLevel)}</mocking_level>
    <files_to_ignore>${formData.filesToIgnore || 'None'}</files_to_ignore>
    <extra_info>${formData.extraInfo || 'None'}</extra_info>
  </preferences>

  <advanced_config>
    <unit_tests>
      <test_style>${formData.unitTestStyle || 'BDD style'}</test_style>
      <assertion_library>${formData.assertionLibrary || 'Framework default'}</assertion_library>
      <describe_block_structure>${formData.describeBlockStructure ? 'Yes' : 'No'}</describe_block_structure>
      <test_naming_convention>${formData.testNaming || 'should_X_when_Y'}</test_naming_convention>
      <arrange_act_assert>${formData.arrangeActAssert ? 'Yes' : 'No'}</arrange_act_assert>
    </unit_tests>
    <integration_tests>
      <scope>${formData.integrationScope || 'Not specified'}</scope>
      <database_strategy>${formData.databaseStrategy || 'In-memory/mock'}</database_strategy>
      <api_mocking>${formData.apiMocking || 'Mock external APIs'}</api_mocking>
      <service_isolation>${formData.serviceIsolation ? 'Yes' : 'No'}</service_isolation>
      <transaction_rollback>${formData.transactionRollback ? 'Yes' : 'No'}</transaction_rollback>
    </integration_tests>
    <e2e_tests>
      <framework>${formData.e2eFramework || 'Not specified'}</framework>
      <browser_targets>${formData.browserTargets || 'Chrome'}</browser_targets>
      <headless_mode>${formData.headlessMode ? 'Yes' : 'No'}</headless_mode>
      <screenshot_on_failure>${formData.screenshotOnFailure ? 'Yes' : 'No'}</screenshot_on_failure>
      <video_recording>${formData.videoRecording ? 'Yes' : 'No'}</video_recording>
    </e2e_tests>
    <mocking_config>
      <mocking_framework>${formData.mockingFramework || 'Framework default'}</mocking_framework>
      <mock_depth level="${formData.mockDepth}">${getMockDepthLabel(formData.mockDepth)}</mock_depth>
      <spy_functions>${formData.spyFunctions ? 'Yes' : 'No'}</spy_functions>
      <stub_external_calls>${formData.stubExternalCalls ? 'Yes' : 'No'}</stub_external_calls>
      <mock_timers>${formData.mockTimers ? 'Yes' : 'No'}</mock_timers>
    </mocking_config>
    <coverage_config>
      <coverage_threshold>${formData.coverageThreshold || 'No minimum'}</coverage_threshold>
      <branch_coverage>${formData.branchCoverage ? 'Yes' : 'No'}</branch_coverage>
      <line_coverage>${formData.lineCoverage ? 'Yes' : 'No'}</line_coverage>
      <function_coverage>${formData.functionCoverage ? 'Yes' : 'No'}</function_coverage>
      <exclude_from_coverage>${formData.excludeFromCoverage || 'None'}</exclude_from_coverage>
    </coverage_config>
    <ci_cd_config>
      <parallel_tests>${formData.parallelTests ? 'Yes' : 'No'}</parallel_tests>
      <retry_flaky_tests>${formData.retryFlaky ? 'Yes' : 'No'}</retry_flaky_tests>
      <test_timeout>${formData.testTimeout || 'Framework default'}</test_timeout>
      <report_format>${formData.reportFormat || 'Console + HTML'}</report_format>
      <fail_fast>${formData.failFast ? 'Yes' : 'No'}</fail_fast>
    </ci_cd_config>
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
    const filename = `${sanitizeFilename(formData.punchcardTitle)}_testing.xml`
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
        <title>Testing - PunchCards</title>
      </Head>
      <main className="container">
        <button className="back-button" onClick={() => router.push('/')}>
          Back to Home
        </button>

        <div className="form-container">
          <div className="form-header">
            <h2 className="typewriter">TESTING TASK CARD</h2>
            <p className="typewriter-slow">
              Generate comprehensive tests for your code
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); generateXML() }}>
            {/* PUNCHCARD TITLE */}
            <div className="form-section punchcard-title-section">
              <div className="form-group">
                <label htmlFor="punchcardTitle">Punchcard Title *</label>
                <input type="text" id="punchcardTitle" name="punchcardTitle" value={formData.punchcardTitle} onChange={handleInputChange} placeholder="e.g., test-auth-module, add-api-tests" required />
                <span className="field-hint">Used for documentation filename and tracking</span>
              </div>
            </div>

            {/* CORE DETAILS */}
            <div className="form-section">
              <h3>Core Details</h3>
              
              <div className="form-group">
                <label htmlFor="targetCode">Target Code / Files *</label>
                <textarea id="targetCode" name="targetCode" value={formData.targetCode} onChange={handleInputChange} placeholder="What code needs testing? List files, functions, classes, or modules..." required />
              </div>

              <div className="form-group">
                <label htmlFor="testingGoal">Testing Goal *</label>
                <textarea id="testingGoal" name="testingGoal" value={formData.testingGoal} onChange={handleInputChange} placeholder="What are you trying to validate? e.g., verify user auth flow works correctly..." required />
              </div>

              <div className="form-group">
                <label htmlFor="testTypes">Test Types *</label>
                <textarea id="testTypes" name="testTypes" value={formData.testTypes} onChange={handleInputChange} placeholder="e.g., unit tests, integration tests, e2e tests, snapshot tests..." required />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('unit')}>
                {advancedSections.unit ? '− ADVANCED UNIT TESTS' : '+ ADVANCED UNIT TESTS'}
              </button>

              {advancedSections.unit && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="unitTestStyle">Unit Test Style</label>
                    <input type="text" id="unitTestStyle" name="unitTestStyle" value={formData.unitTestStyle} onChange={handleInputChange} placeholder="e.g., BDD, TDD, describe/it, test()..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="assertionLibrary">Assertion Library</label>
                    <input type="text" id="assertionLibrary" name="assertionLibrary" value={formData.assertionLibrary} onChange={handleInputChange} placeholder="e.g., Jest, Chai, expect, assert..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="describeBlockStructure" checked={formData.describeBlockStructure} onChange={handleCheckboxChange} />
                      <span>Use describe() blocks for grouping</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="testNaming">Test Naming Convention</label>
                    <input type="text" id="testNaming" name="testNaming" value={formData.testNaming} onChange={handleInputChange} placeholder="e.g., should_X_when_Y, it does X..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="arrangeActAssert" checked={formData.arrangeActAssert} onChange={handleCheckboxChange} />
                      <span>Use Arrange-Act-Assert pattern</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* CONTEXT */}
            <div className="form-section">
              <h3>Context</h3>

              <div className="form-group">
                <label htmlFor="existingTests">Existing Tests</label>
                <textarea id="existingTests" name="existingTests" value={formData.existingTests} onChange={handleInputChange} placeholder="Any existing tests to reference or extend..." />
              </div>

              <div className="form-group">
                <label htmlFor="testingFramework">Testing Framework</label>
                <input type="text" id="testingFramework" name="testingFramework" value={formData.testingFramework} onChange={handleInputChange} placeholder="e.g., Jest, Mocha, Vitest, Pytest, JUnit..." />
              </div>

              <div className="form-group">
                <label htmlFor="codebaseContext">Codebase Context</label>
                <textarea id="codebaseContext" name="codebaseContext" value={formData.codebaseContext} onChange={handleInputChange} placeholder="Brief description of the project architecture..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('integration')}>
                {advancedSections.integration ? '− ADVANCED INTEGRATION' : '+ ADVANCED INTEGRATION'}
              </button>

              {advancedSections.integration && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="integrationScope">Integration Scope</label>
                    <textarea id="integrationScope" name="integrationScope" value={formData.integrationScope} onChange={handleInputChange} placeholder="What components/services to test together..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="databaseStrategy">Database Strategy</label>
                    <input type="text" id="databaseStrategy" name="databaseStrategy" value={formData.databaseStrategy} onChange={handleInputChange} placeholder="e.g., In-memory SQLite, Docker container, mocked..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apiMocking">API Mocking Approach</label>
                    <input type="text" id="apiMocking" name="apiMocking" value={formData.apiMocking} onChange={handleInputChange} placeholder="e.g., MSW, nock, WireMock..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="serviceIsolation" checked={formData.serviceIsolation} onChange={handleCheckboxChange} />
                      <span>Isolate services from each other</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="transactionRollback" checked={formData.transactionRollback} onChange={handleCheckboxChange} />
                      <span>Rollback DB transactions after tests</span>
                    </label>
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('e2e')}>
                {advancedSections.e2e ? '− ADVANCED E2E TESTS' : '+ ADVANCED E2E TESTS'}
              </button>

              {advancedSections.e2e && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="e2eFramework">E2E Framework</label>
                    <input type="text" id="e2eFramework" name="e2eFramework" value={formData.e2eFramework} onChange={handleInputChange} placeholder="e.g., Playwright, Cypress, Selenium, Puppeteer..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="browserTargets">Browser Targets</label>
                    <input type="text" id="browserTargets" name="browserTargets" value={formData.browserTargets} onChange={handleInputChange} placeholder="e.g., Chrome, Firefox, Safari, WebKit..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="headlessMode" checked={formData.headlessMode} onChange={handleCheckboxChange} />
                      <span>Run in headless mode</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="screenshotOnFailure" checked={formData.screenshotOnFailure} onChange={handleCheckboxChange} />
                      <span>Capture screenshot on failure</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="videoRecording" checked={formData.videoRecording} onChange={handleCheckboxChange} />
                      <span>Record video of test runs</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* PREFERENCES */}
            <div className="form-section">
              <h3>Preferences</h3>

              <div className="form-group">
                <label>Coverage Goal</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.coverage === val ? 'active' : ''}`} onClick={() => handleRatingChange('coverage', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getCoverageLabel(formData.coverage)}</span>
              </div>

              <div className="form-group">
                <label>Thoroughness</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.thoroughness === val ? 'active' : ''}`} onClick={() => handleRatingChange('thoroughness', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getThoroughnessLabel(formData.thoroughness)}</span>
              </div>

              <div className="form-group">
                <label>Mocking Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.mockingLevel === val ? 'active' : ''}`} onClick={() => handleRatingChange('mockingLevel', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getMockingLabel(formData.mockingLevel)}</span>
              </div>

              <div className="form-group">
                <label htmlFor="filesToIgnore">Files/Folders to Ignore</label>
                <textarea id="filesToIgnore" name="filesToIgnore" value={formData.filesToIgnore} onChange={handleInputChange} placeholder="Files that should not be tested..." />
              </div>

              <div className="form-group">
                <label htmlFor="extraInfo">Extra Info / Notes</label>
                <textarea id="extraInfo" name="extraInfo" value={formData.extraInfo} onChange={handleInputChange} placeholder="Any additional requirements or notes..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('mocking')}>
                {advancedSections.mocking ? '− ADVANCED MOCKING' : '+ ADVANCED MOCKING'}
              </button>

              {advancedSections.mocking && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="mockingFramework">Mocking Framework</label>
                    <input type="text" id="mockingFramework" name="mockingFramework" value={formData.mockingFramework} onChange={handleInputChange} placeholder="e.g., Jest mocks, Sinon, testdouble..." />
                  </div>
                  <div className="form-group">
                    <label>Mock Depth</label>
                    <div className="rating-buttons">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button key={val} type="button" className={`rating-btn ${formData.mockDepth === val ? 'active' : ''}`} onClick={() => handleRatingChange('mockDepth', val)}>{val}</button>
                      ))}
                    </div>
                    <span className="rating-label">{getMockDepthLabel(formData.mockDepth)}</span>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="spyFunctions" checked={formData.spyFunctions} onChange={handleCheckboxChange} />
                      <span>Use spy functions for call tracking</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="stubExternalCalls" checked={formData.stubExternalCalls} onChange={handleCheckboxChange} />
                      <span>Stub all external API calls</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="mockTimers" checked={formData.mockTimers} onChange={handleCheckboxChange} />
                      <span>Mock timers/dates</span>
                    </label>
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('coverage')}>
                {advancedSections.coverage ? '− ADVANCED COVERAGE' : '+ ADVANCED COVERAGE'}
              </button>

              {advancedSections.coverage && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="coverageThreshold">Coverage Threshold</label>
                    <input type="text" id="coverageThreshold" name="coverageThreshold" value={formData.coverageThreshold} onChange={handleInputChange} placeholder="e.g., 80%, 90%..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="branchCoverage" checked={formData.branchCoverage} onChange={handleCheckboxChange} />
                      <span>Track branch coverage</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="lineCoverage" checked={formData.lineCoverage} onChange={handleCheckboxChange} />
                      <span>Track line coverage</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="functionCoverage" checked={formData.functionCoverage} onChange={handleCheckboxChange} />
                      <span>Track function coverage</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="excludeFromCoverage">Exclude from Coverage</label>
                    <textarea id="excludeFromCoverage" name="excludeFromCoverage" value={formData.excludeFromCoverage} onChange={handleInputChange} placeholder="Files/patterns to exclude from coverage report..." />
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('cicd')}>
                {advancedSections.cicd ? '− ADVANCED CI/CD' : '+ ADVANCED CI/CD'}
              </button>

              {advancedSections.cicd && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="parallelTests" checked={formData.parallelTests} onChange={handleCheckboxChange} />
                      <span>Run tests in parallel</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="retryFlaky" checked={formData.retryFlaky} onChange={handleCheckboxChange} />
                      <span>Retry flaky tests automatically</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="testTimeout">Test Timeout</label>
                    <input type="text" id="testTimeout" name="testTimeout" value={formData.testTimeout} onChange={handleInputChange} placeholder="e.g., 5000ms, 30s..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reportFormat">Report Format</label>
                    <input type="text" id="reportFormat" name="reportFormat" value={formData.reportFormat} onChange={handleInputChange} placeholder="e.g., JUnit XML, HTML, JSON..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="failFast" checked={formData.failFast} onChange={handleCheckboxChange} />
                      <span>Fail fast - stop on first failure</span>
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
                <span className="file-name">{sanitizeFilename(formData.punchcardTitle)}_testing.xml</span>
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
