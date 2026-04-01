import { clsx } from 'clsx';
import {
  Calendar,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  ShieldCheck,
  Square,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Calendar, label: 'Leave', id: 'leave' },
  { icon: ShieldCheck, label: 'Manage Approvals', id: 'manager' },
];

const bottomItems = [
  { icon: Settings, label: 'Settings', id: 'settings' },
  { icon: LifeBuoy, label: 'Support', id: 'support' },
];

export default function Sidebar({ activePage, onPageChange }: SidebarProps) {
  return (
    <aside className='h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest dark:bg-dark-sidebar shadow-[0_20px_40px_rgba(25,27,35,0.06)] dark:shadow-[0_30px_60px_rgba(2,6,23,0.65)] hidden md:flex flex-col border-r border-outline-variant/10 dark:border-dark-border'>
      <div className='p-6'>
        <div className='flex items-center gap-3 mb-10'>
          <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20'>
            <Square size={24} fill='white' />
          </div>
          <div>
            <p className='text-lg font-black text-on-surface dark:text-white leading-none tracking-tight'>
              Talent Suite
            </p>
            <p className='text-[10px] text-on-surface-variant dark:text-dark-text-muted font-bold uppercase tracking-widest mt-1'>
              Enterprise HR
            </p>
          </div>
        </div>

        <nav className='space-y-2'>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={twMerge(
                clsx(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors duration-150 cursor-pointer',
                  activePage === item.id
                    ? 'bg-surface-container-low dark:bg-dark-card text-primary dark:text-primary shadow-sm dark:shadow-[0_12px_24px_rgba(2,6,23,0.45)]'
                    : 'text-on-surface-variant dark:text-dark-text-muted hover:bg-surface-container-low dark:hover:bg-dark-card-elevated hover:text-primary dark:hover:text-primary',
                ),
              )}
            >
              <item.icon
                size={20}
                className={activePage === item.id ? 'text-primary' : ''}
              />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className='mt-auto p-6 border-t border-outline-variant/10 dark:border-dark-border'>
        <nav className='space-y-2'>
          {bottomItems.map((item) => (
            <button
              key={item.id}
              className='w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-on-surface-variant dark:text-dark-text-muted hover:bg-surface-container-low dark:hover:bg-dark-card-elevated transition-colors duration-150 cursor-pointer'
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
