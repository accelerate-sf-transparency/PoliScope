'use client'

import { FixedSidebar } from '@/components/FixedSidebar'
import { IOrdinance } from '../src/types/IOrdinance'
import { Intro } from '@/components/Intro'
import { Timeline } from '@/components/Timeline'
import { Ordinance } from '@/components/Ordinance'
import { useCallback, useEffect, useState } from 'react'

//LEFT SIDE OF PAGE
const Avatars = () => {
  return (
    <div className="flex flex-row justify-center space-x-6 pt-4">
      <img
        src="/images/avatar1.jpeg"
        alt="Dean Preston"
        className="avatar avatar-selected" // Apply selected styles to Dean Preston
      />
      <img src="/images/avatar2.jpeg" alt="Avatar 2" className="avatar" />
      <img src="/images/avatar3.jpeg" alt="Avatar 3" className="avatar" />
      <img src="/images/avatar4.jpeg" alt="Avatar 4" className="avatar" />
    </div>
  )
}

export const FeedPage = ({ ordinances }: { ordinances: IOrdinance[] }) => {
  const [currentOrdinance, setCurrentOrdinance] = useState<IOrdinance>(
    ordinances[0] ?? defaultOrdinance,
  )

  // Default ordinance with values set to "0"
  const defaultOrdinance: Partial<IOrdinance> = {
    acc_affordable_housing_development_score: 0,
    acc_tenant_protections_score: 0,
    acc_homelessness_and_supportive_housing_score: 0,
    acc_faster_permitting_process_and_bureaucracy_score: 0,
    acc_land_use_and_zoning_reform: 0,
    // Add other properties as needed with default value "0"
  }

  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset
    const newIndex = Math.round(position / 300)
    if (activeIndex !== newIndex) {
      setActiveIndex(newIndex)
      setCurrentOrdinance(ordinances[newIndex] ?? defaultOrdinance)
    }
  }, [activeIndex, ordinances])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <>
      <FixedSidebar
        main={
          <>
            <Avatars />
            <Intro />
          </>
        }
        currentOrdinance={currentOrdinance}
      />
      <div className="relative flex-auto">
        <Timeline />
        <main className="">
          {ordinances.length > 0 ? (
            ordinances.map((ordinance, index) => (
              <Ordinance
                key={ordinance?.ID ?? index}
                ordinance={ordinance ?? defaultOrdinance}
                isActive={index === activeIndex}
              />
            ))
          ) : (
            <div>Loading...</div> // Placeholder for empty or loading data
          )}
        </main>
      </div>
    </>
  )
}
