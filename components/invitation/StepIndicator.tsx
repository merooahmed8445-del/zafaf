'use client';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden md:flex items-start justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 right-0 left-0 h-0.5 bg-parchment-200 z-0" />
        <div
          className="absolute top-5 right-0 h-0.5 bg-gradient-to-l from-gold-500 to-gold-400 z-0 transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={step.number} className="flex flex-col items-center relative z-10 flex-1">
              {/* Circle */}
              <div
                className={[
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md',
                  isCompleted
                    ? 'bg-gradient-to-br from-gold-500 to-gold-400 text-maroon-950'
                    : isActive
                    ? 'gradient-maroon text-gold-300 ring-4 ring-gold-200'
                    : 'bg-white border-2 border-parchment-300 text-maroon-900/40',
                ].join(' ')}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>

              {/* Label */}
              <div className="mt-3 text-center max-w-[140px]">
                <p
                  className={[
                    'text-sm font-bold transition-colors',
                    isActive || isCompleted ? 'text-maroon-900' : 'text-maroon-900/40',
                  ].join(' ')}
                >
                  {step.title}
                </p>
                <p className="text-xs text-maroon-900/50 mt-0.5">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-maroon text-gold-300 flex items-center justify-center font-bold shadow-md">
              {currentStep}
            </div>
            <div>
              <p className="text-sm font-bold text-maroon-900">
                {steps[currentStep - 1].title}
              </p>
              <p className="text-xs text-maroon-900/60">
                الخطوة {currentStep} من {steps.length}
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-parchment-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-l from-gold-500 to-gold-400 transition-all duration-500"
            style={{
              width: `${(currentStep / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}