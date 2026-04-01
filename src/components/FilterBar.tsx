import { clsx } from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

import { RootState, setFilter } from '../store';

const filters = ['All Requests', 'Time Off', 'Expenses', 'Hardware'];

export default function FilterBar() {
  const dispatch = useDispatch();
  const activeFilter = useSelector(
    (state: RootState) => state.approvals.filter,
  );

  return (
    <div className='flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide'>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => dispatch(setFilter(filter))}
          className={twMerge(
            clsx(
              'px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer',
              activeFilter === filter
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high dark:bg-dark-card text-on-surface-variant dark:text-dark-text-muted hover:bg-surface-container-highest dark:hover:bg-dark-card-elevated',
            ),
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
