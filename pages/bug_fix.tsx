import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface BugFixData {
  observedBehavior: string
  expectedBehavior: string
  stepsToReproduce: string
  errorMessages: string
  affectedFiles: string
  environment: string
  urgency: number
  testingLevel: number
  creativityLevel: number
  filesToIgnore: string
  extraInfo: string
}

export default function BugFix() {
  const router = useRouter()
  const [formData, setFormData] = useState<BugFixData>({
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

  const generateXML = () => {
    const xml = `<task_card type="bug_fix">
    <meta_instruction>
        DO NOT fix the code immediately. Follow this strict process:
        0. CONTEXT STUDY: Deeply analyze the provided codebase. Identify the files involved in the error, trace the execution flow, and understand the expected state vs actual state.
        1. ANALYZE: Read the provided stack trace/behavior in relation to your codebase study.
        2. REPRODUCE: Write a standalone reproduction script or test case that fails.
        3. CONFIRM: Wait for me to run the script and confirm the failure.
        4. FIX: Apply the fix to the codebase.
        5. VERIFY: Run the reproduction script again to prove it passes.
    </meta_instruction>

    <bug_details>
        <observed_behavior>
            ${formData.observedBehavior}
        </observed_behavior>
        <expected_behavior>
            ${formData.expectedBehavior}
        </expected_behavior>
        <steps_to_reproduce>
            ${formData.stepsToReproduce}
        </steps_to_reproduce>
        <error_messages>
            ${formData.errorMessages || 'N/A'}
        </error_messages>
        <affected_files>
            ${formData.affectedFiles || 'Unknown - please investigate'}
        </affected_files>
        <environment>
            ${formData.environment || 'Not specified'}
        </environment>
    </bug_details>

    <preferences>
        <urgency level="${formData.urgency}">${getUrgencyLabel(formData.urgency)}</urgency>
        <testing_level level="${formData.testingLevel}">${getTestingLabel(formData.testingLevel)}</testing_level>
        <creativity_level level="${formData.creativityLevel}">${getCreativityLabel(formData.creativityLevel)}</creativity_level>
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
    })
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
            <div className="form-section">
              <h3>Core Details</h3>
              
              <div className="form-group">
                <label htmlFor="observedBehavior">Observed Behavior *</label>
                <textarea
                  id="observedBehavior"
                  name="observedBehavior"
                  value={formData.observedBehavior}
                  onChange={handleInputChange}
                  placeholder="Describe what's currently happening (the bug)..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="expectedBehavior">Expected Behavior *</label>
                <textarea
                  id="expectedBehavior"
                  name="expectedBehavior"
                  value={formData.expectedBehavior}
                  onChange={handleInputChange}
                  placeholder="Describe what should happen instead..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="stepsToReproduce">Steps to Reproduce *</label>
                <textarea
                  id="stepsToReproduce"
                  name="stepsToReproduce"
                  value={formData.stepsToReproduce}
                  onChange={handleInputChange}
                  placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Additional Context</h3>

              <div className="form-group">
                <label htmlFor="errorMessages">Error Messages / Stack Trace</label>
                <textarea
                  id="errorMessages"
                  name="errorMessages"
                  value={formData.errorMessages}
                  onChange={handleInputChange}
                  placeholder="Paste any error messages or stack traces here..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="affectedFiles">Affected Files</label>
                <textarea
                  id="affectedFiles"
                  name="affectedFiles"
                  value={formData.affectedFiles}
                  onChange={handleInputChange}
                  placeholder="List files you suspect are involved (if known)..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="environment">Environment</label>
                <input
                  type="text"
                  id="environment"
                  name="environment"
                  value={formData.environment}
                  onChange={handleInputChange}
                  placeholder="e.g., Node 18, Chrome, macOS, Production..."
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Preferences</h3>

              <div className="form-group">
                <label>Urgency Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`rating-btn ${formData.urgency === val ? 'active' : ''}`}
                      onClick={() => handleRatingChange('urgency', val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <span className="rating-label">{getUrgencyLabel(formData.urgency)}</span>
              </div>

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
                <label>Creativity Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`rating-btn ${formData.creativityLevel === val ? 'active' : ''}`}
                      onClick={() => handleRatingChange('creativityLevel', val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <span className="rating-label">{getCreativityLabel(formData.creativityLevel)}</span>
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
                  placeholder="Any additional context, previous attempts, hunches..."
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
