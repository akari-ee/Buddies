import React, { useState } from 'react'
import { Switch } from '@headlessui/react'

type Props = {}

export default function BgmSwitch({}: Props) {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex justify-center items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-gray-400' : 'bg-green-600'}
          relative inline-flex h-full w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}

