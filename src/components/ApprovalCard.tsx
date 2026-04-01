import { Monitor,Receipt, Umbrella } from 'lucide-react';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';

import { approveRequest, rejectRequest } from '../store';
import { ApprovalRequest, RequestType } from '../types';
import AvatarInitials from './AvatarInitials';

interface Props {
  request: ApprovalRequest;
}

const iconMap = {
  [RequestType.VACATION]: { icon: Umbrella, color: 'text-primary' },
  [RequestType.SICK]: { icon: Umbrella, color: 'text-primary' },
  [RequestType.PERSONAL]: { icon: Umbrella, color: 'text-primary' },
  [RequestType.EXPENSE]: { icon: Receipt, color: 'text-tertiary' },
  [RequestType.HARDWARE]: { icon: Monitor, color: 'text-primary' },
};

export default function ApprovalCard({ request }: Props) {
  const dispatch = useDispatch();
  const { icon: Icon, color } = iconMap[request.type];

  return (
    <article className='bg-surface-container-lowest dark:bg-dark-card p-6 rounded-xl shadow-[0_20px_40px_rgba(25,27,35,0.06)] dark:shadow-[0_25px_50px_rgba(2,6,23,0.55)] group hover:translate-y-[-2px] transition-transform duration-300 border border-outline-variant/10 dark:border-dark-border'>
      <div className='grid grid-cols-1 md:grid-cols-3 md:items-center gap-6'>
        <div className='flex items-center gap-4 min-w-0'>
          <AvatarInitials
            name={request.user.name}
            initials={request.user.initials}
            avatar={request.user.avatar}
            className='w-14 h-14 rounded-full border border-outline-variant/20 bg-secondary-container dark:bg-dark-card-elevated text-xl text-on-secondary-container dark:text-dark-text'
            fallbackClassName='font-bold'
          />
          <div>
            <h3 className='text-lg font-bold text-on-surface dark:text-white leading-snug'>
              {request.user.name}
            </h3>
            <p className='text-sm text-on-surface-variant dark:text-dark-text-muted font-medium'>
              {request.user.role} • {request.user.team}
            </p>
          </div>
        </div>
        <div className='min-w-0 md:px-8 md:border-x md:border-outline-variant/15 dark:md:border-dark-border/70'>
          <div className='flex items-center gap-2 mb-1'>
            <Icon className={`${color} w-4 h-4`} />
            <span
              className={`text-xs font-bold uppercase tracking-widest ${color}`}
            >
              {request.type}
            </span>
          </div>
          <p className='text-on-surface dark:text-dark-text font-semibold'>
            {request.details}
          </p>
          <p className='text-sm text-on-surface-variant dark:text-dark-text-muted mt-1 italic'>
            {request.description}
          </p>
        </div>
        <div className='flex items-center gap-3 md:justify-end md:justify-self-end'>
          <Button
            label='Reject'
            className='p-button-danger px-6 py-2.5 font-bold text-sm'
            onClick={() => dispatch(rejectRequest(request.id))}
          />
          <Button
            label='Approve'
            className='p-button-primary px-8 py-2.5 font-bold text-sm'
            onClick={() => dispatch(approveRequest(request.id))}
          />
        </div>
      </div>
    </article>
  );
}
