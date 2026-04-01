import { ChevronRight, Info, CheckCircle2, Send } from 'lucide-react';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRequest } from '../store';
import { ApprovalRequest, RequestType } from '../types';
import AvatarInitials from './AvatarInitials';

const leaveTypes = [
  { label: 'Vacation Leave', value: 'vacation' },
  { label: 'Sick Leave', value: 'sick' },
  { label: 'Personal Leave', value: 'personal' },
];

type TeamAvailabilityMember = {
  name: string;
  status: string;
  initials?: string;
  avatar?: string;
};

const teamAvailability: TeamAvailabilityMember[] = [
  { name: 'Alex Rivera', status: 'On Leave: Oct 12 - 15', initials: 'AR' },
  { name: 'Sarah Chen', status: 'Remote: Oct 14', initials: 'SC' },
];

function LeaveRequest() {
  const dispatch = useDispatch();
  const [leaveType, setLeaveType] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reason, setReason] = useState('');

  const requester = {
    name: 'Maya Chen',
    role: 'Product Designer',
    team: 'Design Systems',
    initials: 'MC',
  };
  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const buildDateRange = () => {
    if (startDate && endDate) {
      const dayMs = 24 * 60 * 60 * 1000;
      const days = Math.max(
        1,
        Math.round((endDate.getTime() - startDate.getTime()) / dayMs) + 1,
      );
      const dayLabel = days === 1 ? 'Day' : 'Days';
      return `${formatDate(startDate)} — ${formatDate(endDate)} (${days} ${dayLabel})`;
    }
    if (startDate) {
      return `${formatDate(startDate)} (1 Day)`;
    }
    return 'Dates pending';
  };

  const handleSubmit = () => {
    const leaveTypeConfig = leaveTypes.find((type) => type.value === leaveType);
    const details = `${leaveTypeConfig?.label ?? 'Leave'} • ${buildDateRange()}`;
    const leaveTypeMap: Record<string, RequestType> = {
      vacation: RequestType.VACATION,
      sick: RequestType.SICK,
      personal: RequestType.PERSONAL,
    };

    const newRequest: ApprovalRequest = {
      id: `leave-${Date.now()}`,
      user: requester,
      type: leaveTypeMap[leaveType ?? 'vacation'] ?? RequestType.VACATION,
      details,
      description: reason.trim() || 'No additional notes provided.',
      status: 'pending',
    };

    dispatch(addRequest(newRequest));
    setLeaveType(null);
    setStartDate(null);
    setEndDate(null);
    setReason('');
  };

  return (
    <div className='max-w-6xl mx-auto'>
      {/* Breadcrumbs */}
      <nav className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-dark-text-muted mb-4'>
        <span>Leave Management</span>
        <ChevronRight size={12} />
        <span className='text-primary'>New Request</span>
      </nav>

      <header className='mb-10'>
        <h1 className='text-4xl font-bold text-on-surface dark:text-white tracking-tight'>
          Apply Leave
        </h1>
        <p className='text-on-surface-variant dark:text-dark-text-muted mt-2 font-medium'>
          Submit leave request for approval
        </p>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Form */}
        <div className='lg:col-span-2 space-y-6'>
          <div className='bg-surface-container-lowest dark:bg-dark-card p-8 rounded-2xl border border-outline-variant/10 dark:border-dark-border shadow-sm dark:shadow-[0_25px_50px_rgba(2,6,23,0.55)]'>
            <div className='space-y-8'>
              {/* Leave Type */}
              <div>
                <label className='block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-dark-text-muted mb-3'>
                  Leave Type
                </label>
                <Dropdown
                  value={leaveType}
                  options={leaveTypes}
                  onChange={(e) => setLeaveType(e.value)}
                  placeholder='Select category...'
                  className='w-full rounded-xl'
                />
              </div>

              {/* Dates */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-dark-text-muted mb-3'>
                    From Date
                  </label>
                  <Calendar
                    value={startDate}
                    onChange={(e) => setStartDate(e.value as Date)}
                    placeholder='mm/dd/yyyy'
                    showIcon
                    dateFormat='mm/dd/yy'
                    className='w-full'
                    inputClassName='w-full bg-surface-container-low dark:bg-dark-input border border-outline-variant/20 dark:border-dark-border/70 rounded-xl py-3 pl-4 pr-10 text-sm placeholder:text-on-surface-variant dark:placeholder:text-dark-text-muted outline-none focus:ring-2 focus:ring-primary/20'
                  />
                </div>
                <div>
                  <label className='block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-dark-text-muted mb-3'>
                    To Date
                  </label>
                  <Calendar
                    value={endDate}
                    onChange={(e) => setEndDate(e.value as Date)}
                    placeholder='mm/dd/yyyy'
                    showIcon
                    dateFormat='mm/dd/yy'
                    className='w-full'
                    inputClassName='w-full bg-surface-container-low dark:bg-dark-input border border-outline-variant/20 dark:border-dark-border/70 rounded-xl py-3 pl-4 pr-10 text-sm placeholder:text-on-surface-variant dark:placeholder:text-dark-text-muted outline-none focus:ring-2 focus:ring-primary/20'
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className='block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-dark-text-muted mb-3'>
                  Reason
                </label>
                <InputTextarea
                  placeholder='Provide a brief explanation for your leave...'
                  rows={5}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className='w-full rounded-xl p-4 bg-surface-container-low dark:bg-dark-input border-outline-variant/20 dark:border-dark-border/70 placeholder:text-on-surface-variant dark:placeholder:text-dark-text-muted'
                />
              </div>

              <Button
                label='Submit Request'
                icon={<Send size={18} className='ml-2' />}
                iconPos='right'
                onClick={handleSubmit}
                className='p-button-primary w-full md:w-auto px-10 py-4 rounded-xl shadow-lg shadow-primary/20'
              />
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className='space-y-6'>
          {/* Remaining Balance */}
          <div className='bg-primary p-8 rounded-2xl text-white relative overflow-hidden shadow-xl shadow-primary/20'>
            <div className='relative z-10'>
              <p className='text-[10px] font-bold uppercase tracking-widest opacity-80 mb-6'>
                Remaining Balance
              </p>
              <div className='flex items-baseline gap-3 mb-4'>
                <span className='text-6xl font-black'>14</span>
                <span className='text-sm font-bold opacity-80'>Days Total</span>
              </div>
              <div className='w-full bg-white/20 h-2 rounded-full mb-6'>
                <div className='bg-white h-full rounded-full w-[65%]'></div>
              </div>
              <p className='text-xs font-medium opacity-80 leading-relaxed'>
                You have 65% of your annual leave remaining for this fiscal
                year.
              </p>
            </div>
            {/* Decorative circles */}
            <div className='absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>
            <div className='absolute -top-10 -left-10 w-20 h-20 bg-white/5 rounded-full blur-2xl'></div>
          </div>

          {/* Guidelines */}
          <div className='bg-surface-container-lowest dark:bg-dark-card p-8 rounded-2xl border border-outline-variant/10 dark:border-dark-border shadow-sm dark:shadow-[0_20px_40px_rgba(2,6,23,0.5)]'>
            <div className='flex items-center gap-2 mb-6'>
              <Info size={16} className='text-primary' />
              <h4 className='text-[10px] font-bold uppercase tracking-widest text-on-surface dark:text-white'>
                Guidelines
              </h4>
            </div>
            <ul className='space-y-4'>
              {[
                'Submit at least 48 hours in advance for casual leave.',
                'Medical certificate required for sick leave exceeding 2 days.',
                'Check with your team lead for blackout periods.',
              ].map((text, i) => (
                <li key={i} className='flex gap-3'>
                  <CheckCircle2
                    size={16}
                    className='text-orange-500 shrink-0 mt-0.5'
                  />
                  <p className='text-xs text-on-surface-variant dark:text-dark-text-muted leading-relaxed font-medium'>
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Team Availability */}
          <div className='bg-surface-container-lowest dark:bg-dark-card p-8 rounded-2xl border border-outline-variant/10 dark:border-dark-border shadow-sm dark:shadow-[0_20px_40px_rgba(2,6,23,0.5)]'>
            <h4 className='text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-dark-text-muted mb-6'>
              Team Availability
            </h4>
            <div className='space-y-6'>
              {teamAvailability.map((member) => (
                <div key={member.name} className='flex items-center gap-3'>
                  <AvatarInitials
                    name={member.name}
                    initials={member.initials}
                    avatar={member.avatar}
                    className='w-8 h-8 rounded-lg bg-secondary-container dark:bg-dark-card-elevated text-[10px] text-on-secondary-container dark:text-dark-text'
                    fallbackClassName='font-bold'
                  />
                  <div>
                    <p className='text-xs font-bold text-on-surface dark:text-white'>
                      {member.name}
                    </p>
                    <p className='text-[10px] font-medium text-red-500'>
                      {member.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequest;
