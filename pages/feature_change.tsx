import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface FeatureChangeData {
  targetFunctionality: string
  desiredChange: string
  reasoning: string
  affectedAreas: string
  backwardCompatibility: string
  testingLevel: number
  riskTolerance: number
  scopeLevel: number
  breakingChangesOk: boolean
  filesToIgnore: string
  migrationNotes: string
  extraInfo: string
}

export default function FeatureChange() {
  const router = useRouter()
  const [formData, setFormData] = useState<FeatureChangeData>({
    targetFunctionality: '',
    desiredChange: '',
    reasoning: '',
    affectedAreas: '',
    backwardCompatibility: '',
    testingLevel: 3,
    riskTolerance: 2,
    scopeLevel: 3,
    breakingChangesOk: false,
    filesToIgnore: '',
    migrationNotes: '',
    extraInfo: '',
  })
  const [xmlOutput, setXmlOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
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

  const generateXML = () => {
    const xml = `<task_card type="feature_change">
  <meta_instruction>
    Perform a "Safe Refactor" workflow:
    0. CONTEXT STUDY: Map out the dependency graph for the target functionality. Identify all upstream callers and downstream dependencies.
    1. IMPACT ANALYSIS: List all files and functions that rely on the code I want to change.
    2. PLAN: Explain how you will handle backward compatibility or data migration.
    3. EXECUTE: Apply the changes.
    4. TEST: Suggest specific regression tests to ensure old features still work.
  </meta_instruction>

  <change_details>
    <target_functionality>
      ${formData.targetFunctionality}
    </target_functionality>
    <desired_change>
      ${formData.desiredChange}
    </desired_change>
    <reasoning>
      ${formData.reasoning}
    </reasoning>
    <affected_areas>
      ${formData.affectedAreas || 'Unknown - please analyze'}
    </affected_areas>
    <backward_compatibility_notes>
      ${formData.backwardCompatibility || 'Not specified'}
    </backward_compatibility_notes>
    <migration_notes>
      ${formData.migrationNotes || 'None'}
    </migration_notes>
  </change_details>

  <preferences>
    <testing_level level="${formData.testingLevel}">${getTestingLabel(formData.testingLevel)}</testing_level>
    <risk_tolerance level="${formData.riskTolerance}">${getRiskLabel(formData.riskTolerance)}</risk_tolerance>
    <scope_level level="${formData.scopeLevel}">${getScopeLabel(formData.scopeLevel)}</scope_level>
    <breaking_changes_allowed>${formData.breakingChangesOk ? 'Yes - breaking changes are acceptable' : 'No - maintain backward compatibility'}</breaking_changes_allowed>
    <files_to_ignore>
      ${formData.filesToIgnore || 'None'}
    </files_to_ignore>
    <extra_info>
      ${formData.extraInfo || 'None'}
    </extra_info>
  </preferences>
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

  const resetForm = () => {
    setFormData({
      targetFunctionality: '',
      desiredChange: '',
      reasoning: '',
      affectedAreas: '',
      backwardCompatibility: '',
      testingLevel: 3,
      riskTolerance: 2,
      scopeLevel: 3,
      breakingChangesOk: false,
      filesToIgnore: '',
      migrationNotes: '',
      extraInfo: '',
    })
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
            <div className="form-section">
              <h3>Core Details</h3>

              <div className="form-group">
                <label htmlFor="targetFunctionality">Target Functionality *</label>
                <textarea
                  id="targetFunctionality"
                  name="targetFunctionality"
                  value={formData.targetFunctionality}
                  onChange={handleInputChange}
                  placeholder="Which feature or component needs to be changed?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="desiredChange">Desired Change *</label>
                <textarea
                  id="desiredChange"
                  name="desiredChange"
                  value={formData.desiredChange}
                  onChange={handleInputChange}
                  placeholder="What changes do you want to make?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reasoning">Reasoning *</label>
                <textarea
                  id="reasoning"
                  name="reasoning"
                  value={formData.reasoning}
                  onChange={handleInputChange}
                  placeholder="Why is this change necessary?"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Impact Context</h3>

              <div className="form-group">
                <label htmlFor="affectedAreas">Known Affected Areas</label>
                <textarea
                  id="affectedAreas"
                  name="affectedAreas"
                  value={formData.affectedAreas}
                  onChange={handleInputChange}
                  placeholder="List any files, components, or systems you know will be impacted..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="backwardCompatibility">Backward Compatibility Notes</label>
                <textarea
                  id="backwardCompatibility"
                  name="backwardCompatibility"
                  value={formData.backwardCompatibility}
                  onChange={handleInputChange}
                  placeholder="Any existing APIs, data formats, or behaviors that must be preserved?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="migrationNotes">Migration Notes</label>
                <textarea
                  id="migrationNotes"
                  name="migrationNotes"
                  value={formData.migrationNotes}
                  onChange={handleInputChange}
                  placeholder="Any data migration or upgrade path considerations..."
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Preferences</h3>

              <div className="form-group">
                <label>Testing Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`rating-btn ${formData.testingLevel === val ? 'active' : ''}`}
                      onClick={() => handleRatingChange('testingLevel', val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <span className="rating-label">{getTestingLabel(formData.testingLevel)}</span>
              </div>

              <div className="form-group">
                <label>Risk Tolerance</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`rating-btn ${formData.riskTolerance === val ? 'active' : ''}`}
                      onClick={() => handleRatingChange('riskTolerance', val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <span className="rating-label">{getRiskLabel(formData.riskTolerance)}</span>
              </div>

              <div className="form-group">
                <label>Scope Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`rating-btn ${formData.scopeLevel === val ? 'active' : ''}`}
                      onClick={() => handleRatingChange('scopeLevel', val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <span className="rating-label">{getScopeLabel(formData.scopeLevel)}</span>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="breakingChangesOk"
                    checked={formData.breakingChangesOk}
                    onChange={handleCheckboxChange}
                  />
                  <span>Breaking changes are acceptable</span>
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="filesToIgnore">Files/Folders to Ignore</label>
                <textarea
                  id="filesToIgnore"
                  name="filesToIgnore"
                  value={formData.filesToIgnore}
                  onChange={handleInputChange}
                  placeholder="List any files or folders that should NOT be modified..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="extraInfo">Extra Info / Notes</label>
                <textarea
                  id="extraInfo"
                  name="extraInfo"
                  value={formData.extraInfo}
                  onChange={handleInputChange}
                  placeholder="Any additional context, concerns, or special considerations..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Generate XML
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Reset Form
              </button>
            </div>
          </form>

          {xmlOutput && (
            <>
              <div className="xml-output">
                <button
                  className={`copy-button ${copied ? 'copied' : ''}`}
                  onClick={copyToClipboard}
                >
                  {copied ? 'COPIED' : 'COPY XML'}
                </button>
                {xmlOutput}
              </div>
              {copied && (
                <div className="success-message">
                  XML copied to clipboard! Paste it into your AI assistant.
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}
