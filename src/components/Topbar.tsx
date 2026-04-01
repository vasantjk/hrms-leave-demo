import { Bell, Moon, Search, Sun } from 'lucide-react';

import AvatarInitials from './AvatarInitials';
import { useTheme } from '../context/ThemeContext';

export default function Topbar() {
  const { isDark, toggleTheme } = useTheme();
  const currentUser = {
    name: 'Maya Chen',
    initials: 'MC',
    avatar: '',
  };

  return (
    <header className='w-full top-0 sticky z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/10 dark:bg-dark-bg/70 dark:border-dark-border/80 dark:shadow-[0_10px_30px_rgba(2,6,23,0.55)]'>
      <div className='flex justify-between items-center w-full px-8 h-16 max-w-screen-2xl mx-auto'>
        <div className='flex-1 max-w-xl'>
          <div className='relative group'>
            <Search
              size={18}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-dark-text-muted group-focus-within:text-primary transition-colors'
            />
            <input
              type='text'
              placeholder='Search tasks, people...'
              className='w-full bg-surface-container-low dark:bg-dark-input border border-transparent dark:border-dark-border/70 rounded-xl py-2 pl-10 pr-4 text-sm placeholder:text-on-surface-variant dark:placeholder:text-dark-text-muted focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 transition-colors duration-150 outline-none text-on-surface dark:text-dark-text'
            />
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2 text-on-surface-variant dark:text-dark-text-muted'>
            <button className='p-2 hover:text-primary transition-colors relative'>
              <Bell size={20} />
              <span className='absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background dark:border-dark-bg'></span>
            </button>
            <button
              onClick={toggleTheme}
              className='p-2 hover:text-primary transition-colors cursor-pointer'
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <AvatarInitials
            name={currentUser.name}
            initials={currentUser.initials}
            avatar={currentUser.avatar}
            className='w-8 h-8 rounded-full border-2 border-surface-container-highest dark:border-dark-border bg-secondary-container dark:bg-dark-card-elevated text-[10px] text-on-secondary-container dark:text-dark-text'
            fallbackClassName='font-bold'
            loading='eager'
          />
        </div>
      </div>
    </header>
  );
}
