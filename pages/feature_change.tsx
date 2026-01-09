import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface FeatureChangeData {
  targetFunctionality: string
  desiredChange: string
  reasoning: string
}

export default function FeatureChange() {
  const router = useRouter()
  const [formData, setFormData] = useState<FeatureChangeData>({
    targetFunctionality: '',
    desiredChange: '',
    reasoning: '',
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
  </change_details>
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
          ← Back to Home
        </button>

        <div className="form-container">
          <div className="form-header">
            <h2>🔄 Feature Change Task Card</h2>
            <p>
              Safely refactor existing features with impact analysis and regression testing
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); generateXML() }}>
            <div className="form-group">
              <label htmlFor="targetFunctionality">
                Target Functionality *
              </label>
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
              <label htmlFor="desiredChange">
                Desired Change *
              </label>
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
              <label htmlFor="reasoning">
                Reasoning *
              </label>
              <textarea
                id="reasoning"
                name="reasoning"
                value={formData.reasoning}
                onChange={handleInputChange}
                placeholder="Why is this change necessary?"
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
                  {copied ? '✓ Copied!' : 'Copy XML'}
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
