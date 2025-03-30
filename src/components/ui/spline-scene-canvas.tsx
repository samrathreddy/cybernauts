'use client'

import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneCanvasProps {
  scene: string
  className?: string
}

export function SplineSceneCanvas({ scene, className }: SplineSceneCanvasProps) {
  return (
    <div className="relative w-full h-full">
      {/* Spline scene */}
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
        />
      </Suspense>
    </div>
  )
} 