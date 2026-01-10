import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface FeatureChangeData {
  // Punchcard Meta
  punchcardTitle: string
  enableDocumentation: boolean
  documentationDepth: number
  // Core
  targetFunctionality: string
  desiredChange: string
  reasoning: string
  // Impact
  affectedAreas: string
  backwardCompatibility: string
  migrationNotes: string
  // Preferences
  testingLevel: number
  riskTolerance: number
  scopeLevel: number
  breakingChangesOk: boolean
  filesToIgnore: string
  extraInfo: string
  // Advanced - Impact Analysis
  upstreamDependencies: string
  downstreamConsumers: string
  sharedUtilities: string
  affectedTests: string
  affectedDocs: string
  // Advanced - Migration
  migrationStrategy: string
  rollbackPlan: string
  dataTransformation: string
  featureFlagStrategy: string
  gradualRollout: boolean
  // Advanced - Refactoring
  refactorDepth: number
  deadCodeRemoval: boolean
  extractComponents: boolean
  consolidateDuplicates: boolean
  improveNaming: boolean
  // Advanced - Compatibility
  apiVersioning: string
  deprecationStrategy: string
  legacySupport: string
  browserSupport: string
  mobileSupport: string
  // Advanced - Testing
  regressionTestScope: string
  integrationTests: string
  performanceBenchmarks: string
  snapshotUpdates: boolean
  manualTestCases: string
  // Advanced - Communication
  notifyTeams: string
  documentationUpdates: string
  changelogEntry: string
  releaseNotes: string
  userCommunication: string
}

const defaultFormData: FeatureChangeData = {
  punchcardTitle: '',
  enableDocumentation: true,
  documentationDepth: 3,
  targetFunctionality: '',
  desiredChange: '',
  reasoning: '',
  affectedAreas: '',
  backwardCompatibility: '',
  migrationNotes: '',
  testingLevel: 3,
  riskTolerance: 2,
  scopeLevel: 3,
  breakingChangesOk: false,
  filesToIgnore: '',
  extraInfo: '',
  upstreamDependencies: '',
  downstreamConsumers: '',
  sharedUtilities: '',
  affectedTests: '',
  affectedDocs: '',
  migrationStrategy: '',
  rollbackPlan: '',
  dataTransformation: '',
  featureFlagStrategy: '',
  gradualRollout: false,
  refactorDepth: 2,
  deadCodeRemoval: false,
  extractComponents: false,
  consolidateDuplicates: false,
  improveNaming: false,
  apiVersioning: '',
  deprecationStrategy: '',
  legacySupport: '',
  browserSupport: '',
  mobileSupport: '',
  regressionTestScope: '',
  integrationTests: '',
  performanceBenchmarks: '',
  snapshotUpdates: false,
  manualTestCases: '',
  notifyTeams: '',
  documentationUpdates: '',
  changelogEntry: '',
  releaseNotes: '',
  userCommunication: '',
}

export default function FeatureChange() {
  const router = useRouter()
  const [formData, setFormData] = useState<FeatureChangeData>(defaultFormData)
  const [xmlOutput, setXmlOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [advancedSections, setAdvancedSections] = useState({
    impact: false,
    migration: false,
    refactoring: false,
    compatibility: false,
    testing: false,
    communication: false,
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

  const getTestingLabel = (val: number) => {
    const labels = ['Minimal - trust the change', 'Light - spot check', 'Standard', 'Thorough - regression tests', 'Exhaustive - full test suite']
    return labels[val - 1]
  }

  const getRiskLabel = (val: number) => {
    const labels = ['Very cautious - safest approach', 'Conservative', 'Balanced', 'Open to moderate risk', 'Bold - willing to refactor heavily']
    return labels[val - 1]
  }

  const getScopeLabel = (val: number) => {
    const labels = ['Minimal - only what\'s needed', 'Focused', 'Standard', 'Broader - related improvements', 'Comprehensive - full cleanup']
    return labels[val - 1]
  }

  const getRefactorLabel = (val: number) => {
    const labels = ['Surface - cosmetic only', 'Shallow', 'Moderate', 'Deep', 'Complete rewrite if needed']
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
    const documentationBlock = formData.enableDocumentation ? `
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
` : ''

    const xml = `<task_card type="feature_change" title="${formData.punchcardTitle || 'Untitled Feature Change'}">
  <meta_instruction>
    Perform a "Safe Refactor" workflow:
    0. CONTEXT STUDY: Map out the dependency graph for the target functionality. Identify all upstream callers and downstream dependencies.
    1. IMPACT ANALYSIS: List all files and functions that rely on the code I want to change.
    2. PLAN: Explain how you will handle backward compatibility or data migration.
    3. EXECUTE: Apply the changes.
    4. TEST: Suggest specific regression tests to ensure old features still work.
  </meta_instruction>
${documentationBlock}
  <change_details>
    <target_functionality>${formData.targetFunctionality}</target_functionality>
    <desired_change>${formData.desiredChange}</desired_change>
    <reasoning>${formData.reasoning}</reasoning>
    <affected_areas>${formData.affectedAreas || 'Unknown - please analyze'}</affected_areas>
    <backward_compatibility_notes>${formData.backwardCompatibility || 'Not specified'}</backward_compatibility_notes>
    <migration_notes>${formData.migrationNotes || 'None'}</migration_notes>
  </change_details>

  <preferences>
    <testing_level level="${formData.testingLevel}">${getTestingLabel(formData.testingLevel)}</testing_level>
    <risk_tolerance level="${formData.riskTolerance}">${getRiskLabel(formData.riskTolerance)}</risk_tolerance>
    <scope_level level="${formData.scopeLevel}">${getScopeLabel(formData.scopeLevel)}</scope_level>
    <breaking_changes_allowed>${formData.breakingChangesOk ? 'Yes - breaking changes are acceptable' : 'No - maintain backward compatibility'}</breaking_changes_allowed>
    <files_to_ignore>${formData.filesToIgnore || 'None'}</files_to_ignore>
    <extra_info>${formData.extraInfo || 'None'}</extra_info>
  </preferences>

  <advanced_config>
    <impact_analysis>
      <upstream_dependencies>${formData.upstreamDependencies || 'Not specified'}</upstream_dependencies>
      <downstream_consumers>${formData.downstreamConsumers || 'Not specified'}</downstream_consumers>
      <shared_utilities>${formData.sharedUtilities || 'Not specified'}</shared_utilities>
      <affected_tests>${formData.affectedTests || 'Not specified'}</affected_tests>
      <affected_docs>${formData.affectedDocs || 'Not specified'}</affected_docs>
    </impact_analysis>
    <migration>
      <migration_strategy>${formData.migrationStrategy || 'Not specified'}</migration_strategy>
      <rollback_plan>${formData.rollbackPlan || 'Not specified'}</rollback_plan>
      <data_transformation>${formData.dataTransformation || 'None'}</data_transformation>
      <feature_flag_strategy>${formData.featureFlagStrategy || 'None'}</feature_flag_strategy>
      <gradual_rollout>${formData.gradualRollout ? 'Yes' : 'No'}</gradual_rollout>
    </migration>
    <refactoring>
      <refactor_depth level="${formData.refactorDepth}">${getRefactorLabel(formData.refactorDepth)}</refactor_depth>
      <dead_code_removal>${formData.deadCodeRemoval ? 'Yes' : 'No'}</dead_code_removal>
      <extract_components>${formData.extractComponents ? 'Yes' : 'No'}</extract_components>
      <consolidate_duplicates>${formData.consolidateDuplicates ? 'Yes' : 'No'}</consolidate_duplicates>
      <improve_naming>${formData.improveNaming ? 'Yes' : 'No'}</improve_naming>
    </refactoring>
    <compatibility>
      <api_versioning>${formData.apiVersioning || 'Not applicable'}</api_versioning>
      <deprecation_strategy>${formData.deprecationStrategy || 'Not specified'}</deprecation_strategy>
      <legacy_support>${formData.legacySupport || 'Not specified'}</legacy_support>
      <browser_support>${formData.browserSupport || 'Current standards'}</browser_support>
      <mobile_support>${formData.mobileSupport || 'Not specified'}</mobile_support>
    </compatibility>
    <testing>
      <regression_test_scope>${formData.regressionTestScope || 'Standard'}</regression_test_scope>
      <integration_tests>${formData.integrationTests || 'Not specified'}</integration_tests>
      <performance_benchmarks>${formData.performanceBenchmarks || 'None'}</performance_benchmarks>
      <snapshot_updates>${formData.snapshotUpdates ? 'Yes - update snapshots' : 'No'}</snapshot_updates>
      <manual_test_cases>${formData.manualTestCases || 'None'}</manual_test_cases>
    </testing>
    <communication>
      <notify_teams>${formData.notifyTeams || 'None'}</notify_teams>
      <documentation_updates>${formData.documentationUpdates || 'As needed'}</documentation_updates>
      <changelog_entry>${formData.changelogEntry || 'Auto-generate'}</changelog_entry>
      <release_notes>${formData.releaseNotes || 'Not specified'}</release_notes>
      <user_communication>${formData.userCommunication || 'None'}</user_communication>
    </communication>
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
    const filename = `${sanitizeFilename(formData.punchcardTitle)}_feature_change.xml`
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
        <title>Feature Change - PunchCards</title>
      </Head>
      <main className="container">
        <button className="back-button" onClick={() => router.push('/')}>
          Back to Home
        </button>

        <div className="form-container">
          <div className="form-header">
            <h2 className="typewriter">FEATURE CHANGE TASK CARD</h2>
            <p className="typewriter-slow">
              Safely refactor existing features with impact analysis and regression testing
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); generateXML() }}>
            {/* PUNCHCARD TITLE */}
            <div className="form-section punchcard-title-section">
              <div className="form-group">
                <label htmlFor="punchcardTitle">Punchcard Title *</label>
                <input type="text" id="punchcardTitle" name="punchcardTitle" value={formData.punchcardTitle} onChange={handleInputChange} placeholder="e.g., refactor-auth-flow, update-payment-api" required />
                <span className="field-hint">Used for documentation filename and tracking</span>
              </div>
            </div>

            {/* CORE DETAILS */}
            <div className="form-section">
              <h3>Core Details</h3>

              <div className="form-group">
                <label htmlFor="targetFunctionality">Target Functionality *</label>
                <textarea id="targetFunctionality" name="targetFunctionality" value={formData.targetFunctionality} onChange={handleInputChange} placeholder="Which feature or component needs to be changed?" required />
              </div>

              <div className="form-group">
                <label htmlFor="desiredChange">Desired Change *</label>
                <textarea id="desiredChange" name="desiredChange" value={formData.desiredChange} onChange={handleInputChange} placeholder="What changes do you want to make?" required />
              </div>

              <div className="form-group">
                <label htmlFor="reasoning">Reasoning *</label>
                <textarea id="reasoning" name="reasoning" value={formData.reasoning} onChange={handleInputChange} placeholder="Why is this change necessary?" required />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('impact')}>
                {advancedSections.impact ? '− ADVANCED IMPACT ANALYSIS' : '+ ADVANCED IMPACT ANALYSIS'}
              </button>

              {advancedSections.impact && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="upstreamDependencies">Upstream Dependencies</label>
                    <textarea id="upstreamDependencies" name="upstreamDependencies" value={formData.upstreamDependencies} onChange={handleInputChange} placeholder="What does this code depend on?" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="downstreamConsumers">Downstream Consumers</label>
                    <textarea id="downstreamConsumers" name="downstreamConsumers" value={formData.downstreamConsumers} onChange={handleInputChange} placeholder="What depends on this code?" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sharedUtilities">Shared Utilities</label>
                    <textarea id="sharedUtilities" name="sharedUtilities" value={formData.sharedUtilities} onChange={handleInputChange} placeholder="Any shared utils, hooks, or helpers involved?" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="affectedTests">Affected Tests</label>
                    <textarea id="affectedTests" name="affectedTests" value={formData.affectedTests} onChange={handleInputChange} placeholder="Which test files will need updates?" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="affectedDocs">Affected Documentation</label>
                    <textarea id="affectedDocs" name="affectedDocs" value={formData.affectedDocs} onChange={handleInputChange} placeholder="Which docs will need updates?" />
                  </div>
                </div>
              )}
            </div>

            {/* IMPACT CONTEXT */}
            <div className="form-section">
              <h3>Impact Context</h3>

              <div className="form-group">
                <label htmlFor="affectedAreas">Known Affected Areas</label>
                <textarea id="affectedAreas" name="affectedAreas" value={formData.affectedAreas} onChange={handleInputChange} placeholder="List any files, components, or systems you know will be impacted..." />
              </div>

              <div className="form-group">
                <label htmlFor="backwardCompatibility">Backward Compatibility Notes</label>
                <textarea id="backwardCompatibility" name="backwardCompatibility" value={formData.backwardCompatibility} onChange={handleInputChange} placeholder="Any existing APIs, data formats, or behaviors that must be preserved?" />
              </div>

              <div className="form-group">
                <label htmlFor="migrationNotes">Migration Notes</label>
                <textarea id="migrationNotes" name="migrationNotes" value={formData.migrationNotes} onChange={handleInputChange} placeholder="Any data migration or upgrade path considerations..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('migration')}>
                {advancedSections.migration ? '− ADVANCED MIGRATION' : '+ ADVANCED MIGRATION'}
              </button>

              {advancedSections.migration && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="migrationStrategy">Migration Strategy</label>
                    <textarea id="migrationStrategy" name="migrationStrategy" value={formData.migrationStrategy} onChange={handleInputChange} placeholder="e.g., Big bang, phased, parallel running..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rollbackPlan">Rollback Plan</label>
                    <textarea id="rollbackPlan" name="rollbackPlan" value={formData.rollbackPlan} onChange={handleInputChange} placeholder="How to revert if something goes wrong..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dataTransformation">Data Transformation</label>
                    <textarea id="dataTransformation" name="dataTransformation" value={formData.dataTransformation} onChange={handleInputChange} placeholder="Any data format changes or migrations needed..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="featureFlagStrategy">Feature Flag Strategy</label>
                    <input type="text" id="featureFlagStrategy" name="featureFlagStrategy" value={formData.featureFlagStrategy} onChange={handleInputChange} placeholder="e.g., Use existing flag system, create new flag..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="gradualRollout" checked={formData.gradualRollout} onChange={handleCheckboxChange} />
                      <span>Plan for gradual rollout</span>
                    </label>
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('compatibility')}>
                {advancedSections.compatibility ? '− ADVANCED COMPATIBILITY' : '+ ADVANCED COMPATIBILITY'}
              </button>

              {advancedSections.compatibility && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="apiVersioning">API Versioning</label>
                    <input type="text" id="apiVersioning" name="apiVersioning" value={formData.apiVersioning} onChange={handleInputChange} placeholder="e.g., v1 -> v2, semantic versioning..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="deprecationStrategy">Deprecation Strategy</label>
                    <textarea id="deprecationStrategy" name="deprecationStrategy" value={formData.deprecationStrategy} onChange={handleInputChange} placeholder="How to handle deprecated code/APIs..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="legacySupport">Legacy Support Requirements</label>
                    <textarea id="legacySupport" name="legacySupport" value={formData.legacySupport} onChange={handleInputChange} placeholder="Any legacy systems that must continue working..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="browserSupport">Browser Support</label>
                    <input type="text" id="browserSupport" name="browserSupport" value={formData.browserSupport} onChange={handleInputChange} placeholder="e.g., Last 2 versions, IE11, Safari 14+..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobileSupport">Mobile Support</label>
                    <input type="text" id="mobileSupport" name="mobileSupport" value={formData.mobileSupport} onChange={handleInputChange} placeholder="e.g., iOS 14+, Android 10+, React Native..." />
                  </div>
                </div>
              )}
            </div>

            {/* PREFERENCES */}
            <div className="form-section">
              <h3>Preferences</h3>

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
                <label>Risk Tolerance</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.riskTolerance === val ? 'active' : ''}`} onClick={() => handleRatingChange('riskTolerance', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getRiskLabel(formData.riskTolerance)}</span>
              </div>

              <div className="form-group">
                <label>Scope Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.scopeLevel === val ? 'active' : ''}`} onClick={() => handleRatingChange('scopeLevel', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getScopeLabel(formData.scopeLevel)}</span>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="breakingChangesOk" checked={formData.breakingChangesOk} onChange={handleCheckboxChange} />
                  <span>Breaking changes are acceptable</span>
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="filesToIgnore">Files/Folders to Ignore</label>
                <textarea id="filesToIgnore" name="filesToIgnore" value={formData.filesToIgnore} onChange={handleInputChange} placeholder="List any files or folders that should NOT be modified..." />
              </div>

              <div className="form-group">
                <label htmlFor="extraInfo">Extra Info / Notes</label>
                <textarea id="extraInfo" name="extraInfo" value={formData.extraInfo} onChange={handleInputChange} placeholder="Any additional context, concerns, or special considerations..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('refactoring')}>
                {advancedSections.refactoring ? '− ADVANCED REFACTORING' : '+ ADVANCED REFACTORING'}
              </button>

              {advancedSections.refactoring && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label>Refactor Depth</label>
                    <div className="rating-buttons">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button key={val} type="button" className={`rating-btn ${formData.refactorDepth === val ? 'active' : ''}`} onClick={() => handleRatingChange('refactorDepth', val)}>{val}</button>
                      ))}
                    </div>
                    <span className="rating-label">{getRefactorLabel(formData.refactorDepth)}</span>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="deadCodeRemoval" checked={formData.deadCodeRemoval} onChange={handleCheckboxChange} />
                      <span>Remove dead code while refactoring</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="extractComponents" checked={formData.extractComponents} onChange={handleCheckboxChange} />
                      <span>Extract reusable components if found</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="consolidateDuplicates" checked={formData.consolidateDuplicates} onChange={handleCheckboxChange} />
                      <span>Consolidate duplicate code</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="improveNaming" checked={formData.improveNaming} onChange={handleCheckboxChange} />
                      <span>Improve variable/function naming</span>
                    </label>
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('testing')}>
                {advancedSections.testing ? '− ADVANCED TESTING' : '+ ADVANCED TESTING'}
              </button>

              {advancedSections.testing && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="regressionTestScope">Regression Test Scope</label>
                    <textarea id="regressionTestScope" name="regressionTestScope" value={formData.regressionTestScope} onChange={handleInputChange} placeholder="Which areas need regression testing?" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="integrationTests">Integration Tests</label>
                    <textarea id="integrationTests" name="integrationTests" value={formData.integrationTests} onChange={handleInputChange} placeholder="Integration tests to run or create..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="performanceBenchmarks">Performance Benchmarks</label>
                    <textarea id="performanceBenchmarks" name="performanceBenchmarks" value={formData.performanceBenchmarks} onChange={handleInputChange} placeholder="Any performance baselines to maintain..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="snapshotUpdates" checked={formData.snapshotUpdates} onChange={handleCheckboxChange} />
                      <span>Update test snapshots as needed</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="manualTestCases">Manual Test Cases</label>
                    <textarea id="manualTestCases" name="manualTestCases" value={formData.manualTestCases} onChange={handleInputChange} placeholder="Manual testing scenarios to verify..." />
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('communication')}>
                {advancedSections.communication ? '− ADVANCED COMMUNICATION' : '+ ADVANCED COMMUNICATION'}
              </button>

              {advancedSections.communication && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="notifyTeams">Teams to Notify</label>
                    <input type="text" id="notifyTeams" name="notifyTeams" value={formData.notifyTeams} onChange={handleInputChange} placeholder="e.g., Frontend team, DevOps, QA..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="documentationUpdates">Documentation Updates</label>
                    <textarea id="documentationUpdates" name="documentationUpdates" value={formData.documentationUpdates} onChange={handleInputChange} placeholder="What docs need updating?" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="changelogEntry">Changelog Entry</label>
                    <textarea id="changelogEntry" name="changelogEntry" value={formData.changelogEntry} onChange={handleInputChange} placeholder="Draft changelog entry for this change..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="releaseNotes">Release Notes</label>
                    <textarea id="releaseNotes" name="releaseNotes" value={formData.releaseNotes} onChange={handleInputChange} placeholder="User-facing release notes..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="userCommunication">User Communication</label>
                    <textarea id="userCommunication" name="userCommunication" value={formData.userCommunication} onChange={handleInputChange} placeholder="Do users need to be notified? How?" />
                  </div>
                </div>
              )}
            </div>

            {/* DOCUMENTATION */}
            <div className="form-section documentation-depth-section">
              <h3>Documentation</h3>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="enableDocumentation" checked={formData.enableDocumentation} onChange={handleCheckboxChange} />
                  <span>Generate punchcard documentation</span>
                </label>
                <span className="field-hint">Creates a markdown file in punchcards/ folder documenting this task</span>
              </div>
              {formData.enableDocumentation && (
                <div className="form-group">
                  <label>Documentation Depth</label>
                  <div className="rating-buttons">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button key={val} type="button" className={`rating-btn ${formData.documentationDepth === val ? 'active' : ''}`} onClick={() => handleRatingChange('documentationDepth', val)}>{val}</button>
                    ))}
                  </div>
                  <span className="rating-label">{getDocDepthLabel(formData.documentationDepth)}</span>
                </div>
              )}
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
                <span className="file-name">{sanitizeFilename(formData.punchcardTitle)}_feature_change.xml</span>
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
