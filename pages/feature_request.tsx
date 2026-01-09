import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface FeatureRequestData {
  goal: string
  userStory: string
  constraints: string
  referenceFiles: string
}

export default function FeatureRequest() {
  const router = useRouter()
  const [formData, setFormData] = useState<FeatureRequestData>({
    goal: '',
    userStory: '',
    constraints: '',
    referenceFiles: '',
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
    const xml = `<task_card type="feature_request">
  <meta_instruction>
    Adopt a "Skeleton-of-Thought" approach:
    0. CONTEXT STUDY: Review the existing project structure, design patterns, and utility libraries. Ensure new additions align with established coding conventions.
    1. ARCHITECTURE: Summarize the files you need to create or modify based on your study.
    2. CONTRACTS: Write the Interfaces, Types, or DB Schemas FIRST.
    3. STOP: Ask for my approval on the interfaces before writing logic.
    4. IMPLEMENT: Once approved, write the implementation logic.
  </meta_instruction>

  <feature_details>
    <goal>
      ${formData.goal}
    </goal>
    <user_story>
      ${formData.userStory}
    </user_story>
    <constraints>
      ${formData.constraints}
    </constraints>
    <reference_files>
      ${formData.referenceFiles}
    </reference_files>
  </feature_details>
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
      goal: '',
      userStory: '',
      constraints: '',
      referenceFiles: '',
    })
    setXmlOutput('')
    setCopied(false)
  }

  return (
    <>
      <Head>
        <title>Feature Request - PunchCards</title>
      </Head>
      <main className="container">
        <button className="back-button" onClick={() => router.push('/')}>
          ← Back to Home
        </button>

        <div className="form-container">
          <div className="form-header">
            <h2>✨ Feature Request Task Card</h2>
            <p>
              Build new features with a Skeleton-of-Thought architecture review process
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); generateXML() }}>
            <div className="form-group">
              <label htmlFor="goal">
                Goal *
              </label>
              <textarea
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                placeholder="What is the main objective of this feature?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="userStory">
                User Story *
              </label>
              <textarea
                id="userStory"
                name="userStory"
                value={formData.userStory}
                onChange={handleInputChange}
                placeholder="As a [user type], I want to [action] so that [benefit]..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="constraints">
                Constraints
              </label>
              <textarea
                id="constraints"
                name="constraints"
                value={formData.constraints}
                onChange={handleInputChange}
                placeholder="Any technical constraints, dependencies, or requirements? (Optional)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="referenceFiles">
                Reference Files
              </label>
              <textarea
                id="referenceFiles"
                name="referenceFiles"
                value={formData.referenceFiles}
                onChange={handleInputChange}
                placeholder="List any relevant files or modules for reference (Optional)"
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
