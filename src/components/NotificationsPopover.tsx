import React from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: 'alert' | 'success' | 'info';
  read: boolean;
}

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-16 right-16 w-84 sm:w-96 bg-surface-container-lowest rounded-2xl shadow-2xl border border-[#eaedff] z-50 overflow-hidden animate-in fade-in duration-150">
        <div className="flex items-center justify-between p-4 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">notifications</span>
            <h3 className="font-headline text-[15px] font-bold text-on-surface">Benchmark Intelligence Feed</h3>
          </div>
          <button
            onClick={onMarkAllAsRead}
            className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
          >
            Mark all read
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-[#eaedff]/60">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 flex gap-3 transition-colors ${
                item.read ? 'bg-surface-container-lowest' : 'bg-surface-container-low/50'
              }`}
            >
              <div className="pt-0.5">
                {item.type === 'alert' && (
                  <span className="w-6 h-6 rounded-full bg-error-container text-error flex items-center justify-center text-[14px]">
                    <span className="material-symbols-outlined text-[14px]">flag</span>
                  </span>
                )}
                {item.type === 'success' && (
                  <span className="w-6 h-6 rounded-full bg-secondary-container text-secondary flex items-center justify-center text-[14px]">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  </span>
                )}
                {item.type === 'info' && (
                  <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-[14px]">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                  </span>
                )}
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-on-surface leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-outline">{item.timeAgo}</span>
                </div>
                <p className="text-[12px] text-on-surface-variant mt-1 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
