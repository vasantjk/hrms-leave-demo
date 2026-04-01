import AvatarInitials from './AvatarInitials';

type TeamMember = {
  name: string;
  role: string;
  team: string;
  status: string;
  note: string;
  initials?: string;
  avatar?: string;
};

const teamMembers: TeamMember[] = [
  {
    name: 'Avery Nguyen',
    role: 'Product Designer',
    team: 'Design Systems',
    status: 'Active',
    note: 'Available today • Core hours 10am-6pm',
    initials: 'AN',
  },
  {
    name: 'Kiran Das',
    role: 'Staff Engineer',
    team: 'Platform',
    status: 'Remote',
    note: 'Remote today • Overlapping IST/UTC hours',
    initials: 'KD',
  },
  {
    name: 'Priya Mehta',
    role: 'HR Business Partner',
    team: 'People Ops',
    status: 'On Leave',
    note: 'Out until Apr 4 • PTO approved',
    initials: 'PM',
  },
  {
    name: 'Miguel Torres',
    role: 'Sales Lead',
    team: 'Enterprise',
    status: 'Active',
    note: 'Client meetings • Available after 3pm',
    initials: 'MT',
  },
  {
    name: 'Zoe Alvarez',
    role: 'People Analyst',
    team: 'HR Ops',
    status: 'Sick',
    note: 'Out today • Back tomorrow',
    initials: 'ZA',
  },
  {
    name: 'Noah Patel',
    role: 'Operations Manager',
    team: 'Workplace',
    status: 'Remote',
    note: 'Remote today • Focus hours 1pm-4pm',
    initials: 'NP',
  },
];

const statusStyles: Record<string, string> = {
  Active:
    'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
  'On Leave':
    'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
  Remote:
    'bg-sky-500/10 text-sky-600 border-sky-500/30 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30',
  Sick: 'bg-rose-500/10 text-rose-600 border-rose-500/30 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30',
};

function TeamStatusDashboard() {
  const counts = teamMembers.reduce(
    (acc, member) => {
      acc[member.status] = (acc[member.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const summary = [
    { label: 'Active', value: counts.Active ?? 0, tone: statusStyles.Active },
    { label: 'Remote', value: counts.Remote ?? 0, tone: statusStyles.Remote },
    {
      label: 'On Leave',
      value: counts['On Leave'] ?? 0,
      tone: statusStyles['On Leave'],
    },
    { label: 'Sick', value: counts.Sick ?? 0, tone: statusStyles.Sick },
  ];

  return (
    <div className='max-w-6xl mx-auto'>
      <header className='mb-10'>
        <h1 className='text-4xl font-bold text-on-surface dark:text-white tracking-tight'>
          Team Status
        </h1>
        <p className='text-on-surface-variant dark:text-dark-text-muted mt-2 font-medium'>
          Live availability view for today&apos;s operations.
        </p>
      </header>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10'>
        {summary.map((item) => (
          <div
            key={item.label}
            className='bg-surface-container-lowest dark:bg-dark-card p-5 rounded-2xl border border-outline-variant/10 dark:border-dark-border shadow-sm'
          >
            <p className='text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-dark-text-muted'>
              {item.label}
            </p>
            <div className='flex items-center justify-between mt-4'>
              <span className='text-3xl font-black text-on-surface dark:text-white'>
                {item.value}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${item.tone}`}
              >
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className='bg-surface-container-lowest dark:bg-dark-card p-6 rounded-2xl border border-outline-variant/10 dark:border-dark-border shadow-sm'
          >
            <div className='flex items-center gap-4'>
              <AvatarInitials
                name={member.name}
                initials={member.initials}
                avatar={member.avatar}
                className='w-12 h-12 rounded-2xl bg-secondary-container dark:bg-dark-card-elevated text-sm text-on-secondary-container dark:text-dark-text'
                fallbackClassName='font-bold'
              />
              <div>
                <p className='text-lg font-bold text-on-surface dark:text-white'>
                  {member.name}
                </p>
                <p className='text-sm text-on-surface-variant dark:text-dark-text-muted font-medium'>
                  {member.role} • {member.team}
                </p>
              </div>
              <span
                className={`ml-auto text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${statusStyles[member.status]}`}
              >
                {member.status}
              </span>
            </div>
            <p className='text-sm text-on-surface-variant dark:text-dark-text-muted mt-4 font-medium'>
              {member.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamStatusDashboard;
