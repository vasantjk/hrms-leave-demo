import { CheckCircle2 } from 'lucide-react';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { ApprovalRequest, RequestType } from '../types';
import ApprovalCard from './ApprovalCard';
import FilterBar from './FilterBar';

function ManageApprovals() {
  const { requests, filter } = useSelector(
    (state: RootState) => state.approvals,
  );

  const matchesFilter = (request: ApprovalRequest) => {
    if (filter === 'All Requests') {
      return true;
    }
    if (filter === 'Time Off') {
      return (
        request.type === RequestType.VACATION ||
        request.type === RequestType.SICK ||
        request.type === RequestType.PERSONAL
      );
    }
    if (filter === 'Expenses') {
      return request.type === RequestType.EXPENSE;
    }
    if (filter === 'Hardware') {
      return request.type === RequestType.HARDWARE;
    }
    return true;
  };

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const visibleRequests = pendingRequests.filter(matchesFilter);

  return (
    <div className='max-w-4xl mx-auto'>
      <header className='mb-12'>
        <h1 className='text-[2.5rem] font-bold text-on-surface dark:text-white tracking-tight leading-tight'>
          Manage Approvals
        </h1>
        <p className='text-on-surface-variant dark:text-dark-text-muted text-lg mt-2 font-medium'>
          You have{' '}
          <span className='text-primary dark:text-primary'>
            {visibleRequests.length} pending requests
          </span>{' '}
          awaiting your review.
        </p>
      </header>

      <FilterBar />

      <div className='grid grid-cols-1 gap-6'>
        {visibleRequests.length > 0 ? (
          visibleRequests.map((request) => (
            <ApprovalCard key={request.id} request={request} />
          ))
        ) : (
          <div className='text-center py-12 bg-surface-container-low dark:bg-dark-card/50 rounded-2xl border border-dashed border-outline-variant/30 dark:border-dark-border'>
            <p className='text-on-surface-variant dark:text-dark-text-muted font-medium'>
              No pending requests at the moment.
            </p>
          </div>
        )}
      </div>

      <div className='mt-12 p-8 rounded-2xl bg-surface-container-low dark:bg-dark-card/50 border border-outline-variant/10 dark:border-dark-border text-center'>
        <div className='w-16 h-16 bg-surface-container-lowest dark:bg-dark-card rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm'>
          <CheckCircle2 className='text-primary dark:text-primary w-8 h-8' />
        </div>
        <h4 className='text-xl font-bold text-on-surface dark:text-white'>
          Great work staying on top of requests!
        </h4>
        <p className='text-on-surface-variant dark:text-dark-text-muted mt-2 max-w-sm mx-auto font-medium'>
          Fast approvals keep the team moving. Reach out if anything needs
          clarification.
        </p>
      </div>
    </div>
  );
}

export default ManageApprovals;
