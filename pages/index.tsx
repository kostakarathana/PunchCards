import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

type CardType = 'bug_fix' | 'feature_request' | 'feature_change'

export default function Home() {
  const router = useRouter()

  const handleCardSelect = (type: CardType) => {
    router.push(`/${type}`)
  }

  return (
    <>
      <Head>
        <title>PunchCards - AI Task Templates</title>
        <meta name="description" content="Generate structured XML task cards for AI coding assistants" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container">
        <div className="header">
          <h1>🎴 PunchCards</h1>
          <p className="subtitle">
            Generate structured task cards for AI coding assistants
          </p>
        </div>

        <div className="card-grid">
          <button
            className="card-button bug-fix"
            onClick={() => handleCardSelect('bug_fix')}
          >
            <div className="card-icon">🐛</div>
            <h2>Bug Fix</h2>
            <p>
              Systematic debugging workflow with reproduction, analysis, and verification steps
            </p>
          </button>

          <button
            className="card-button feature-request"
            onClick={() => handleCardSelect('feature_request')}
          >
            <div className="card-icon">✨</div>
            <h2>Feature Request</h2>
            <p>
              Skeleton-of-Thought approach for building new features with architecture review
            </p>
          </button>

          <button
            className="card-button feature-change"
            onClick={() => handleCardSelect('feature_change')}
          >
            <div className="card-icon">🔄</div>
            <h2>Feature Change</h2>
            <p>
              Safe refactoring workflow with impact analysis and regression testing
            </p>
          </button>
        </div>

        <footer className="footer">
          <p>
            Fill out the form to generate XML that provides context and instructions to your AI assistant
          </p>
        </footer>
      </main>
    </>
  )
}
