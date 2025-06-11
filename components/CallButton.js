'use client';

import { PhoneIcon } from '@heroicons/react/24/solid';

export default function CallButton() {
  const phoneNumber = '+359887458463';
  const displayNumber = '+359 887 458 463';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`tel:${phoneNumber}`}
        className="flex items-center justify-center p-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none"
        aria-label={`Обадете се на ${displayNumber}`}
        title={`Обадете се на ${displayNumber}`}
      >
        <PhoneIcon className="h-6 w-6" />
      </a>
    </div>
  );
} 