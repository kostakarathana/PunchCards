import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface FeatureRequestData {
  goal: string
  userStory: string
  acceptanceCriteria: string
  constraints: string
  referenceFiles: string
  techStack: string
  creativityLevel: number
  scopeLevel: number
  documentationLevel: number
  filesToIgnore: string
  stylingGuidelines: string
  extraInfo: string
}

export default function FeatureRequest() {
  const router = useRouter()
  const [formData, setFormData] = useState<FeatureRequestData>({
    goal: '',
    userStory: '',
    acceptanceCriteria: '',
    constraints: '',
    referenceFiles: '',
    techStack: '',
    creativityLevel: 3,
    scopeLevel: 3,
    documentationLevel: 3,
    filesToIgnore: '',
    stylingGuidelines: '',
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

  const getCreativityLabel = (val: number) => {
    const labels = ['Conservative - follow patterns strictly', 'Cautious - minimal innovation', 'Balanced', 'Open - suggest improvements', 'Creative - propose best solutions']
    return labels[val - 1]
  }

  const getScopeLabel = (val: number) => {
    const labels = ['MVP - bare minimum', 'Lean - essential only', 'Standard', 'Complete - polish included', 'Comprehensive - full bells & whistles']
    return labels[val - 1]
  }

  const getDocumentationLabel = (val: number) => {
    const labels = ['None - just code', 'Minimal - key comments', 'Standard', 'Detailed - inline docs', 'Extensive - full documentation']
    return labels[val - 1]
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
    <acceptance_criteria>
      ${formData.acceptanceCriteria || 'Not specified - use your judgment'}
    </acceptance_criteria>
    <constraints>
      ${formData.constraints || 'None specified'}
    </constraints>
    <reference_files>
      ${formData.referenceFiles || 'None specified - explore codebase'}
    </reference_files>
    <tech_stack>
      ${formData.techStack || 'Follow existing project patterns'}
    </tech_stack>
  </feature_details>

  <preferences>
    <creativity_level level="${formData.creativityLevel}">${getCreativityLabel(formData.creativityLevel)}</creativity_level>
    <scope_level level="${formData.scopeLevel}">${getScopeLabel(formData.scopeLevel)}</scope_level>
    <documentation_level level="${formData.documentationLevel}">${getDocumentationLabel(formData.documentationLevel)}</documentation_level>
    <files_to_ignore>
      ${formData.filesToIgnore || 'None'}
    </files_to_ignore>
    <styling_guidelines>
      ${formData.stylingGuidelines || 'Follow existing patterns'}
    </styling_guidelines>
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
      goal: '',
      userStory: '',
      acceptanceCriteria: '',
      constraints: '',
      referenceFiles: '',
      techStack: '',
      creativityLevel: 3,
      scopeLevel: 3,
      documentationLevel: 3,
      filesToIgnore: '',
      stylingGuidelines: '',
      extraInfo: '',
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
          Back to Home
        </button>

        <div className="form-container">
          <div className="form-header">
            <h2 className="typewriter">FEATURE REQUEST TASK CARD</h2>
            <p className="typewriter-slow">
              Build new features with a Skeleton-of-Thought architecture review process
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); generateXML() }}>
            <div className="form-section">
              <h3>Core Details</h3>

              <div className="form-group">
                <label htmlFor="goal">Goal *</label>
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
                <label htmlFor="userStory">User Story *</label>
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
                <label htmlFor="acceptanceCriteria">Acceptance Criteria</label>
                <textarea
                  id="acceptanceCriteria"
                  name="acceptanceCriteria"
                  value={formData.acceptanceCriteria}
                  onChange={handleInputChange}
                  placeholder="How do we know when this is done? List specific conditions..."
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Technical Context</h3>

              <div className="form-group">
                <label htmlFor="constraints">Constraints</label>
                <textarea
                  id="constraints"
                  name="constraints"
                  value={formData.constraints}
                  onChange={handleInputChange}
                  placeholder="Any technical constraints, dependencies, or requirements?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="referenceFiles">Reference Files</label>
                <textarea
                  id="referenceFiles"
                  name="referenceFiles"
                  value={formData.referenceFiles}
                  onChange={handleInputChange}
                  placeholder="List any relevant files or modules for reference..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="techStack">Preferred Tech Stack / Libraries</label>
                <input
                  type="text"
                  id="techStack"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleInputChange}
                  placeholder="e.g., React, TailwindCSS, Prisma..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="stylingGuidelines">Styling Guidelines</label>
                <textarea
                  id="stylingGuidelines"
                  name="stylingGuidelines"
                  value={formData.stylingGuidelines}
                  onChange={handleInputChange}
                  placeholder="Any specific styling requirements, design system to follow..."
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Preferences</h3>

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
                <label>Documentation Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`rating-btn ${formData.documentationLevel === val ? 'active' : ''}`}
                      onClick={() => handleRatingChange('documentationLevel', val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <span className="rating-label">{getDocumentationLabel(formData.documentationLevel)}</span>
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
                  placeholder="Any additional context, inspiration, or notes..."
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
