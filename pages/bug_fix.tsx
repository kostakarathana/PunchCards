import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface BugFixData {
  observedBehavior: string
  expectedBehavior: string
  stepsToReproduce: string
}

export default function BugFix() {
  const router = useRouter()
  const [formData, setFormData] = useState<BugFixData>({
    observedBehavior: '',
    expectedBehavior: '',
    stepsToReproduce: '',
  })
  const [xmlOutput, setXmlOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
    </bug_details>
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
            <div className="form-group">
              <label htmlFor="observedBehavior">
                Observed Behavior *
              </label>
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
              <label htmlFor="expectedBehavior">
                Expected Behavior *
              </label>
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
              <label htmlFor="stepsToReproduce">
                Steps to Reproduce *
              </label>
              <textarea
                id="stepsToReproduce"
                name="stepsToReproduce"
                value={formData.stepsToReproduce}
                onChange={handleInputChange}
                placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                required
              />
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
