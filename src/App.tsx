import { Calendar, LayoutDashboard, ShieldCheck, User } from 'lucide-react';
import { PrimeReactProvider } from 'primereact/api';
import { lazy, Suspense, useState } from 'react';
import { Provider } from 'react-redux';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { store } from './store';

const LeaveRequest = lazy(() => import('./components/LeaveRequest'));
const ManageApprovals = lazy(() => import('./components/ManageApprovals'));
const TeamStatusDashboard = lazy(
  () => import('./components/TeamStatusDashboard'),
);

export default function App() {
  const [activePage, setActivePage] = useState('leave'); // Default to leave as per image

  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <div className='min-h-screen bg-background dark:bg-transparent text-on-surface dark:text-dark-text transition-colors duration-150'>
          <Sidebar activePage={activePage} onPageChange={setActivePage} />
          <div className='md:ml-64 flex flex-col min-h-screen'>
            <Topbar />
            <main className='flex-1 p-8'>
              <Suspense
                fallback={
                  <div className='flex items-center justify-center py-24 text-on-surface-variant dark:text-dark-text-muted font-medium'>
                    Loading…
                  </div>
                }
              >
                {activePage === 'dashboard' && <TeamStatusDashboard />}
                {activePage === 'leave' && <LeaveRequest />}
                {activePage === 'manager' && <ManageApprovals />}
              </Suspense>
              {(activePage === 'settings' || activePage === 'support') && (
                <div className='flex flex-col items-center justify-center h-full text-center py-20'>
                  <div className='w-20 h-20 bg-surface-container-low dark:bg-dark-card rounded-full flex items-center justify-center mb-6'>
                    <ShieldCheck size={40} className='text-primary' />
                  </div>
                  <h2 className='text-2xl font-bold text-on-surface dark:text-white mb-2 capitalize'>
                    {activePage}
                  </h2>
                  <p className='text-on-surface-variant dark:text-dark-text-muted max-w-md'>
                    This section is currently under development. Please check
                    back later for updates.
                  </p>
                </div>
              )}
            </main>
          </div>

          {/* Mobile Navigation Shell */}
          <footer className='md:hidden fixed bottom-0 left-0 right-0 bg-white/70 dark:bg-dark-bg/80 backdrop-blur-xl z-50 border-t border-outline-variant/10 dark:border-dark-border/70'>
            <nav className='flex justify-around items-center h-20 px-4'>
              <button
                onClick={() => setActivePage('dashboard')}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors duration-150 ${activePage === 'dashboard' ? 'bg-surface-container-low dark:bg-dark-card text-primary' : 'text-on-surface-variant dark:text-dark-text-muted'}`}
              >
                <LayoutDashboard size={20} />
                <span className='text-[10px] font-bold'>DASHBOARD</span>
              </button>
              <button
                onClick={() => setActivePage('leave')}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors duration-150 ${activePage === 'leave' ? 'bg-surface-container-low dark:bg-dark-card text-primary' : 'text-on-surface-variant dark:text-dark-text-muted'}`}
              >
                <Calendar size={20} />
                <span className='text-[10px] font-bold'>LEAVE</span>
              </button>
              <button
                onClick={() => setActivePage('manager')}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors duration-150 ${activePage === 'manager' ? 'bg-surface-container-low dark:bg-dark-card text-primary' : 'text-on-surface-variant dark:text-dark-text-muted'}`}
              >
                <ShieldCheck size={20} />
                <span className='text-[10px] font-bold'>APPROVALS</span>
              </button>
              <button className='flex flex-col items-center gap-1 text-on-surface-variant dark:text-dark-text-muted p-3'>
                <User size={20} />
                <span className='text-[10px] font-medium'>PROFILE</span>
              </button>
            </nav>
          </footer>
        </div>
      </PrimeReactProvider>
    </Provider>
  );
}
