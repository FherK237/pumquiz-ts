type OptionState = 'default' | 'correct' | 'incorrect' | 'revealed' | 'disabled';

interface OptionButtonProps {
  label: string;
  index: number;
  state: OptionState;
  onClick: (index: number) => void;
}

const optionLetters = ['A', 'B', 'C', 'D'];

export default function OptionButton({ label, index, state, onClick }: OptionButtonProps) {
  const baseClasses = 'w-full flex items-center gap-2.5 sm:gap-3 px-3 py-3 sm:px-4 min-h-[3rem] rounded-xl border-2 text-left text-sm sm:text-base font-medium transition-all duration-200';

  const stateClasses: Record<OptionState, string> = {
    default: 'border-gray-200 bg-white hover:border-purple-400 hover:bg-purple-50 cursor-pointer active:scale-[0.98]',
    correct: 'border-emerald-500 bg-emerald-50 text-emerald-800',
    incorrect: 'border-red-500 bg-red-50 text-red-800',
    revealed: 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-300',
    disabled: 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed',
  };

  const letterClasses: Record<OptionState, string> = {
    default: 'bg-purple-100 text-purple-700',
    correct: 'bg-emerald-500 text-white',
    incorrect: 'bg-red-500 text-white',
    revealed: 'bg-emerald-500 text-white',
    disabled: 'bg-gray-200 text-gray-400',
  };

  const isClickable = state === 'default';

  return (
    <button
      type="button"
      className={`${baseClasses} ${stateClasses[state]}`}
      onClick={() => isClickable && onClick(index)}
      disabled={!isClickable}
      aria-label={`Option ${optionLetters[index]}: ${label}`}
    >
      <span className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-sm font-bold ${letterClasses[state]}`}>
        {optionLetters[index]}
      </span>
      <span className="flex-1 break-words min-w-0">{label}</span>
      {state === 'correct' && <span className="text-emerald-600 text-lg">✓</span>}
      {state === 'incorrect' && <span className="text-red-600 text-lg">✗</span>}
      {state === 'revealed' && <span className="text-emerald-600 text-lg">✓</span>}
    </button>
  );
}
